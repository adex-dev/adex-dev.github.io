export type CodeToken = { value: string; kind: 'plain' | 'keyword' | 'string' | 'comment' | 'number' | 'function' };

const keywordSets: Record<string, Set<string>> = {
  javascript: new Set('async await const let var function return if else class new import from export default try catch throw true false null undefined'.split(' ')),
  python: new Set('async await def return if elif else class import from as try except raise with for in while pass True False None self'.split(' ')),
  rust: new Set('async await fn let mut pub use mod struct enum impl trait for in while loop if else match return self Self true false move'.split(' ')),
  sql: new Set('select from where join left right inner outer on as and or not null insert into values update set delete create table primary key foreign references order by group limit offset'.split(' ')),
};

export function highlightLine(line: string, language: string): CodeToken[] {
  if (language === 'text') return [{ value: line, kind: 'plain' }];
  const tokens: CodeToken[] = [];
  const pattern = /(\/\/.*|#.*|--.*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g;
  const keywords = keywordSets[language.toLowerCase()] ?? keywordSets.javascript;
  let cursor = 0;
  for (const match of line.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > cursor) tokens.push({ value: line.slice(cursor, index), kind: 'plain' });
    const value = match[0];
    const kind: CodeToken['kind'] = match[1] ? 'comment' : match[2] ? 'string' : match[3] ? 'number' : keywords.has(value) ? 'keyword' : /^\w+\s*\(/.test(line.slice(index)) ? 'function' : 'plain';
    tokens.push({ value, kind });
    cursor = index + value.length;
  }
  if (cursor < line.length) tokens.push({ value: line.slice(cursor), kind: 'plain' });
  return tokens;
}
