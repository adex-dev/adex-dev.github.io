import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight, dracula, nord, materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LANGUAGE_PRESETS = {
  javascript: { theme: oneDark, overrides: { keyword: { color: '#e5c07b' } } },
  python: {
    theme: oneDark,
    overrides: {
      keyword: { color: '#c678dd' },
      decorator: { color: '#e5c07b' },
      comment: { color: '#7f848e', fontStyle: 'italic' },
    },
  },
  python: {
    theme: oneDark,
    overrides: {
      keyword:   { color: 'var(--color-rust)' },      // sesuai .ck
      function:  { color: '#7ec8e3' },          // sesuai .cf
      string:    { color: '#f9c97c' },          // sesuai .cs_
      comment:   { color: '#555f7a' },          // sesuai .cc_
      'class-name': { color: 'var(--color-teal)' },   // sesuai .ct (Python class)
      builtin:   { color: 'var(--color-teal)' },      // tipe bawaan seperti int, str
    },
  },
  rust: {
    theme: oneDark,
    overrides: {
      keyword:   { color: 'var(--color-rust)' },      // fn, let, impl, match...
      function:  { color: '#7ec8e3' },          // nama fungsi
      string:    { color: '#f9c97c' },          // string literal
      comment:   { color: '#555f7a' },          // // komentar
      'class-name': { color: 'var(--color-teal)' },   // struct, enum, trait
      builtin:   { color: 'var(--color-teal)' },      // tipe seperti i32, String
    },
  },
  sql: { theme: nord, overrides: { keyword: { color: '#81a1c1', fontWeight: 'bold' } } },
  default: { theme: dracula, overrides: {} },
};

function stripBackgrounds(theme) {
  const cleaned = {};
  for (const [key, value] of Object.entries(theme)) {
    if (Array.isArray(value)) {
      // Prism kadang pakai array style
      cleaned[key] = value.map((v) => {
        const { background, backgroundColor, ...rest } = v;
        return rest;
      });
    } else if (value && typeof value === 'object') {
      const { background, backgroundColor, ...rest } = value;
      cleaned[key] = rest;
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}
function buildTheme(preset) {
  const merged = { ...preset.theme };
  for (const [token, style] of Object.entries(preset.overrides)) {
    merged[token] = { ...(merged[token] || {}), ...style };
  }
  return stripBackgrounds(merged);
}

export default function CodeBlock({
  language = 'text',  
  children,
  showLineNumbers = true,
  wrapLongLines = false,
  customStyle = {},
}) {
  const preset = LANGUAGE_PRESETS[language] ?? LANGUAGE_PRESETS.default;
  const theme = buildTheme(preset);

  return (
    <div className="bg-surface">
       <SyntaxHighlighter
      language={language}
      style={theme}
      showLineNumbers={showLineNumbers}
      wrapLongLines={wrapLongLines}
      customStyle={{background: 'transparent', borderRadius: 8, padding: '1rem', fontSize: '0.875rem', margin: 0, ...customStyle }}
      lineNumberStyle={{ opacity: 0.4, minWidth: '2.5em' }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter> 
    </div>
  );
}
