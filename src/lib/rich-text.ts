const allowedTags = new Set([
  'p', 'br', 'hr', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li',
  'blockquote', 'code', 'pre', 'span',
]);
const voidTags = new Set(['br', 'hr']);
const blockedTags = new Set(['script', 'style', 'iframe', 'object', 'svg', 'math']);

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!);
}

export function richHtml(markup?: string | null) {
  if (!markup) return '';
  const tokens = markup.split(/(<!--[\s\S]*?-->|<[^>]*>)/g).filter(Boolean);
  const stack: string[] = [];
  let blocked: string | null = null;
  let html = '';

  for (const token of tokens) {
    if (token.startsWith('<!--')) continue;
    const match = token.match(/^<\s*(\/?)\s*([a-z\d-]+)\b[^>]*>$/i);
    if (!match) {
      if (!blocked) html += token.replace(/&(?!(?:#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);)/gi, '&amp;').replace(/</g, '&lt;');
      continue;
    }

    const closing = Boolean(match[1]);
    const tag = match[2].toLowerCase();
    const selfClosing = /\/\s*>$/.test(token) || voidTags.has(tag);
    if (blocked) {
      if (closing && tag === blocked) blocked = null;
      continue;
    }
    if (blockedTags.has(tag)) {
      if (!closing && !selfClosing) blocked = tag;
      continue;
    }
    if (!allowedTags.has(tag)) continue;
    if (closing) {
      const index = stack.lastIndexOf(tag);
      if (index >= 0) {
        for (let i = stack.length - 1; i >= index; i -= 1) html += `</${stack.pop()}>`;
      }
      continue;
    }
    html += `<${tag}>`;
    if (!selfClosing) stack.push(tag);
  }

  while (stack.length) html += `</${stack.pop()}>`;
  return html;
}
