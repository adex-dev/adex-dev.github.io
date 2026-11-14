import { createElement } from "react";

type RichNode = {
  tag: string;
  children: (RichNode | string)[];
};

const allowedTags = new Set([
  "p",
  "br",
  "hr",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "blockquote",
  "code",
  "pre",
  "span",
]);
const voidTags = new Set(["br", "hr"]);
const blockedTags = new Set(["script", "style", "iframe", "object", "svg", "math"]);

function decodeText(value: string) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code) => {
    if (code[0] === "#") {
      const number = code[1]?.toLowerCase() === "x"
        ? Number.parseInt(code.slice(2), 16)
        : Number.parseInt(code.slice(1), 10);
      return Number.isFinite(number) && number >= 0 && number <= 0x10ffff
        ? String.fromCodePoint(number)
        : "";
    }

    return ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0" } as Record<string, string>)[code.toLowerCase()] ?? entity;
  });
}

function parseSafeMarkup(markup: string): (RichNode | string)[] {
  const root: RichNode = { tag: "root", children: [] };
  const stack = [root];
  let blockedTag: string | null = null;
  const tokens = markup.split(/(<!--[\s\S]*?-->|<[^>]*>)/g).filter(Boolean);

  for (const token of tokens) {
    if (token.startsWith("<!--")) continue;

    const match = token.match(/^<\s*(\/?)\s*([a-z\d-]+)\b[^>]*>$/i);
    if (!match) {
      if (!blockedTag) stack[stack.length - 1].children.push(decodeText(token));
      continue;
    }

    const closing = Boolean(match[1]);
    const tag = match[2].toLowerCase();
    const selfClosing = /\/\s*>$/.test(token) || voidTags.has(tag);

    if (blockedTag) {
      if (closing && tag === blockedTag) blockedTag = null;
      continue;
    }

    if (blockedTags.has(tag)) {
      if (!closing && !selfClosing) blockedTag = tag;
      continue;
    }

    if (!allowedTags.has(tag)) continue;

    if (closing) {
      for (let index = stack.length - 1; index > 0; index -= 1) {
        if (stack[index].tag === tag) {
          stack.length = index;
          break;
        }
      }
      continue;
    }

    const node: RichNode = { tag, children: [] };
    stack[stack.length - 1].children.push(node);
    if (!selfClosing) stack.push(node);
  }

  return root.children;
}

function renderNodes(nodes: (RichNode | string)[]): React.ReactNode[] {
  return nodes.map((node, index) =>
    typeof node === "string"
      ? node
      : createElement(node.tag, { key: index }, ...renderNodes(node.children)),
  );
}

export default function RichText({
  content,
  className,
}: {
  content?: string | null;
  className?: string;
}) {
  const children = renderNodes(parseSafeMarkup(content ?? ""));
  return className ? <div className={className}>{children}</div> : <>{children}</>;
}
