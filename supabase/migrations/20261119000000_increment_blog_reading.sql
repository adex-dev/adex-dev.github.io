begin;

-- Run as postgres in the Supabase SQL Editor. The function runs with its owner's
-- privileges, so the WHERE clause explicitly limits updates to public articles.
create function public.increment_blog_reading(p_blog_id integer)
returns integer
language sql
volatile
security definer
set search_path = ''
as $$
  update public.blogs as blog
  set readings = coalesce(blog.readings, 0) + 1
  where blog.id = p_blog_id
    and lower(blog.status) in ('published', 'publish', 'active', 'true')
  returning blog.readings;
$$;

revoke all on function public.increment_blog_reading(integer) from public, anon, authenticated;
grant execute on function public.increment_blog_reading(integer) to anon, authenticated;

commit;
