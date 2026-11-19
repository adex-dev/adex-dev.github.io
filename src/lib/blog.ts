import { supabase } from './supabase';

export interface Blog {
  id: number;
  title: string;
  article: string | null;
  readings: number | null;
  modifed_at: string | null;
  created_at: string | null;
  categories: string | null;
  sub_categories: string | null;
  fullname: string | null;
  author_jobs?: string | null;
  author_about?: string | null;
  urls_prefix: string;
  url_images?: string | null;
  status: string;
}

export type BlogPreview = Pick<Blog, 'id' | 'title' | 'urls_prefix' | 'url_images'>;

export interface BlogCategory {
  id: number;
  name: string;
}

export interface BlogPage {
  posts: Blog[];
  hasMore: boolean;
}

const blogSelect = 'id,title,article,readings,modifed_at,created_at,categories,sub_categories,fullname,status';
const pageSize = 9;
const publicStatus = 'status.ilike.published,status.ilike.publish,status.ilike.active,status.ilike.true';

export const blogUrl = (slug: string) => '/blogs/' + encodeURIComponent(slug);

const availableColumns = { urls_prefix: true, url_images: true, author_jobs: true, author_about: true };

function coverProjection(columns: typeof availableColumns) {
  return (columns.urls_prefix ? ',urls_prefix' : '') + (columns.url_images ? ',url_images' : '');
}

function blogProjection(columns: typeof availableColumns, includeAuthor = false) {
  const author = includeAuthor
    ? (columns.author_jobs ? ',author_jobs' : '') + (columns.author_about ? ',author_about' : '')
    : '';
  return blogSelect + coverProjection(columns) + author;
}

async function selectBlogs<Row>(
  select: (columns: typeof availableColumns) => PromiseLike<{
    data: unknown;
    error: { code?: string; message: string } | null;
  }>,
): Promise<Row[]> {
  const columns = { ...availableColumns };
  while (true) {
    const result = await select(columns);
    if (!result.error) return (result.data as Row[] | null) ?? [];
    if (result.error.code !== '42703') throw result.error;
    const missing = (Object.keys(columns) as (keyof typeof columns)[]).find(
      column => columns[column] && result.error?.message.includes(column),
    );
    if (!missing) throw result.error;
    columns[missing] = availableColumns[missing] = false;
  }
}

function withBlogSlug<T extends Pick<Blog, 'id' | 'urls_prefix'>>(post: T): T {
  const slug = post.urls_prefix?.trim();
  return { ...post, urls_prefix: slug && slug !== '.' && slug !== '..' ? slug : 'id-' + post.id };
}

export async function fetchBlogPage(beforeId: number | undefined = undefined, category = '', search = ''): Promise<BlogPage> {
  const db = supabase;
  if (!db) return { posts: [], hasMore: false };
  const posts = await selectBlogs<Blog>(columns => {
    let query = db.rpc('get_blogs').select(blogProjection(columns))
      .or(publicStatus).order('id', { ascending: false });
    if (beforeId !== undefined) query = query.lt('id', beforeId);
    if (category) query = query.eq('categories', category);
    if (search) query = query.ilike('title', '%' + search.replace(/[\\%_*]/g, '\\$&') + '%');
    return query.limit(pageSize + 1);
  });
  return { posts: posts.slice(0, pageSize).map(withBlogSlug), hasMore: posts.length > pageSize };
}

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from('blog_categories').select('id,name').eq('status', true).order('name').returns<BlogCategory[]>();
  if (error) throw error;
  return data ?? [];
}

export async function fetchBlog(slug: string): Promise<Blog | null> {
  const db = supabase;
  if (!db) return null;
  const legacyId = /^id-(-?[0-9]+)$/.exec(slug)?.[1];
  const posts = await selectBlogs<Blog>(async columns => {
    const query = db.rpc('get_blogs').select(blogProjection(columns, true))
      .or(publicStatus).order('id', { ascending: false });
    if (columns.urls_prefix) {
      const result = await query.eq('urls_prefix', slug).limit(1);
      if (result.error || (Array.isArray(result.data) && result.data.length) || !legacyId) return result;
    }
    if (!legacyId) return { data: [], error: null };
    return db.rpc('get_blogs').select(blogProjection(columns, true))
      .or(publicStatus).eq('id', legacyId).limit(1);
  });
  return posts[0] ? withBlogSlug(posts[0]) : null;
}

export async function incrementBlogReading(id: number): Promise<number | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc('increment_blog_reading', { p_blog_id: id });
  if (error) throw error;
  return typeof data === 'number' ? data : null;
}

export async function fetchLatestBlogs(): Promise<BlogPreview[]> {
  const db = supabase;
  if (!db) return [];
  const rows = await selectBlogs<BlogPreview>(columns => db.rpc('get_blogs')
    .select('id,title' + coverProjection(columns))
    .or(publicStatus).order('id', { ascending: false }).limit(4));
  return rows.map(withBlogSlug);
}

export async function fetchBlogSlugs(): Promise<string[]> {
  const db = supabase;
  if (!db) return [];
  const slugs: string[] = [];
  let lastId: number | undefined;
  while (true) {
    const rows = await selectBlogs<Pick<Blog, 'id' | 'urls_prefix'>>(columns => {
      let query = db.rpc('get_blogs').select(columns.urls_prefix ? 'id,urls_prefix' : 'id')
        .or(publicStatus).order('id', { ascending: false });
      if (lastId !== undefined) query = query.lt('id', lastId);
      return query.limit(100);
    });
    if (!rows.length) return slugs;
    slugs.push(...rows.map(row => withBlogSlug(row).urls_prefix));
    lastId = rows[rows.length - 1].id;
  }
}

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' });

export function blogDate(value: string | null): string {
  if (!value) return '';
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? '' : dateFormat.format(timestamp);
}

export function articleText(article: string | null): string {
  return (article ?? '')
    .replace(/<\/(?:p|h[1-6]|li|blockquote|pre)>|<br\s*\/?>/gi, '\n\n')
    .replace(/<\/?[a-z][^>]*>/gi, '')
    .trim();
}

export function blogExcerpt(article: string | null): string {
  const text = articleText(article).replace(/\s+/g, ' ');
  return text.length > 146 ? text.slice(0, 146).replace(/\s+\S*$/, '') + '…' : text;
}
