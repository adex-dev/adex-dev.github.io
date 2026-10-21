import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
  dracula,
  nord,
} from "react-syntax-highlighter/dist/esm/styles/prism";

type PrismTheme = Record<string, React.CSSProperties | React.CSSProperties[]>;

const LANGUAGE_PRESETS: Record<string, Preset> = {
  javascript: { theme: oneLight as PrismTheme, overrides: { keyword: { color: "#e5c07b" } } },
  python: {
    theme: oneDark as PrismTheme,
    overrides: {
      keyword: { color: "var(--color-rust)" }, // sesuai .ck
      function: { color: "#7ec8e3" }, // sesuai .cf
      string: { color: "#f9c97c" }, // sesuai .cs_
      comment: { color: "#555f7a" }, // sesuai .cc_
      "class-name": { color: "var(--color-teal)" }, // sesuai .ct (Python class)
      builtin: { color: "var(--color-teal)" }, // tipe bawaan seperti int, str
    },
  },
  rust: {
    theme: oneDark as PrismTheme,
    overrides: {
      keyword: { color: "var(--color-rust)" }, // fn, let, impl, match...
      function: { color: "#7ec8e3" }, // nama fungsi
      string: { color: "#f9c97c" }, // string literal
      comment: { color: "#555f7a" }, // // komentar
      "class-name": { color: "var(--color-teal)" }, // struct, enum, trait
      builtin: { color: "var(--color-teal)" }, // tipe seperti i32, String
    },
  },
  sql: {
    theme: nord as PrismTheme,
    overrides: { keyword: { color: "#81a1c1", fontWeight: "bold" } },
  },
  default: { theme: dracula as PrismTheme, overrides: {} },
};
function stripBackgrounds(theme: PrismTheme): PrismTheme {
  const cleaned: PrismTheme = {};
  for (const [key, value] of Object.entries(theme)) {
    if (Array.isArray(value)) {
      cleaned[key] = value.map((v) => {
        const { background, backgroundColor, ...rest } =
          v as React.CSSProperties & {
            background?: unknown;
            backgroundColor?: unknown;
          };
        return rest;
      });
    } else if (value && typeof value === "object") {
      const { background, backgroundColor, ...rest } =
        value as React.CSSProperties & {
          background?: unknown;
          backgroundColor?: unknown;
        };
      cleaned[key] = rest;
    } else {
      cleaned[key] = value as React.CSSProperties;
    }
  }
  return cleaned;
}

interface Preset {
  theme: PrismTheme;
  overrides: Record<string, React.CSSProperties>;
}
function buildTheme(preset: Preset): PrismTheme {
  const merged: PrismTheme = { ...preset.theme };
  for (const [token, style] of Object.entries(preset.overrides)) {
    const existing = merged[token];
    merged[token] = {
      ...(Array.isArray(existing) ? existing[0] : existing || {}),
      ...style,
    };
  }
  return stripBackgrounds(merged);
}

interface CodeBlockInterface {
  children: React.ReactNode;
  language?: string;
  showLineNumbers?: boolean;
  wrapLongLines?: boolean;
  customStyle?: React.CSSProperties;
}

const CodeBlock: React.FC<CodeBlockInterface> = ({
  language = "text",
  children,
  showLineNumbers = true,
  wrapLongLines = false,
  customStyle = {},
}) => {
  const preset = LANGUAGE_PRESETS[language] ?? LANGUAGE_PRESETS.default;
  const theme = buildTheme(preset);

  return (
    <div className="bg-surface">
      <SyntaxHighlighter
        language={language as any}
        style={theme as { [key: string]: React.CSSProperties }}
        showLineNumbers={showLineNumbers}
        wrapLongLines={wrapLongLines}
        customStyle={{
          background: "transparent",
          borderRadius: 8,
          padding: "1rem",
          fontSize: "0.875rem",
          margin: 0,
          ...customStyle,
        }}
        lineNumberStyle={{ opacity: 0.4, minWidth: "2.5em" }}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
