import { parseFragment, type DefaultTreeAdapterTypes } from 'parse5';

type HtmlNode = DefaultTreeAdapterTypes.ChildNode;
type HtmlElement = DefaultTreeAdapterTypes.Element;

export type ArticleNode =
  | { kind: 'text'; value: string }
  | { kind: 'code'; source: string; language: string; title: string }
  | { kind: 'element'; tag: string; children: ArticleNode[]; href?: string };

const articleTags = new Set([
  'p', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'ul', 'ol', 'li', 'div',
  'a', 'strong', 'b', 'em', 'i', 's', 'u', 'sub', 'sup', 'code', 'br', 'hr',
]);
const hiddenTags = new Set(['script', 'style', 'template', 'iframe', 'object', 'svg', 'math']);
const languageAliases: Record<string, string> = { js: 'javascript', py: 'python', rs: 'rust', plaintext: 'text', plain: 'text' };

function attribute(element: HtmlElement | undefined, name: string) {
  return element?.attrs.find(attr => attr.name === name)?.value;
}

function readCode(nodes: HtmlNode[]): string {
  return nodes.map(node => {
    if ('value' in node) return node.value;
    if (!('tagName' in node)) return '';
    if (node.tagName === 'br') return '\n';
    return hiddenTags.has(node.tagName) ? '' : readCode(node.childNodes);
  }).join('');
}

function codeBlock(container: HtmlElement, code?: HtmlElement): ArticleNode {
  const classes = [attribute(code, 'class'), attribute(container, 'class')].join(' ');
  const declared = attribute(code, 'data-language') || attribute(container, 'data-language')
    || /(?:^|\s)language-([\w+-]+)/i.exec(classes)?.[1] || 'text';
  const key = declared.trim().toLowerCase();
  const language = (Object.hasOwn(languageAliases, key) ? languageAliases[key] : key) || 'text';
  const title = attribute(code, 'data-filename') || attribute(container, 'data-filename') || language;
  return { kind: 'code', language, title, source: readCode((code ?? container).childNodes) };
}

function safeHref(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const target = new URL(value, 'https://akmadnudin.com');
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(target.protocol) ? value.trim() : undefined;
  } catch {
    return undefined;
  }
}

function convert(nodes: HtmlNode[], root = false): ArticleNode[] {
  return nodes.flatMap((node): ArticleNode[] => {
    if ('value' in node) return [{ kind: 'text', value: node.value }];
    if (!('tagName' in node) || hiddenTags.has(node.tagName)) return [];
    const tag = node.tagName;
    if (tag === 'pre') {
      const code = node.childNodes.find((child): child is HtmlElement => 'tagName' in child && child.tagName === 'code');
      return [codeBlock(node, code)];
    }
    if (tag === 'code' && root) return [codeBlock(node)];
    if (tag === 'p' || tag === 'div') {
      const content = node.childNodes.filter(child => 'tagName' in child || ('value' in child && child.value.trim()));
      const first = content[0];
      if (content.length === 1 && 'tagName' in first && first.tagName === 'code') return [codeBlock(first)];
    }
    const children = convert(node.childNodes);
    if (!articleTags.has(tag)) return children;
    return [{ kind: 'element', tag, children, href: tag === 'a' ? safeHref(attribute(node, 'href')) : undefined }];
  });
}

export function parseBlogArticle(article: string | null): ArticleNode[] {
  if (!article?.trim()) return [];
  const fragment = parseFragment(article);
  if (fragment.childNodes.every(node => 'value' in node)) {
    return fragment.childNodes.map(node => node.value).join('')
      .split(/\r?\n\s*\r?\n/).filter(text => text.trim())
      .map(value => ({ kind: 'element', tag: 'p', children: [{ kind: 'text', value }] }));
  }
  return convert(fragment.childNodes, true);
}
