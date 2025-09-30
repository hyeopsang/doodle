import { useEffect, useMemo, useState } from "react";
import { formatCodeBlock, isLangSupported } from "@platejs/code-block";
import { type TCodeBlockElement, type TCodeSyntaxLeaf, NodeApi } from "platejs";
import {
  type PlateElementProps,
  type PlateLeafProps,
  PlateElement,
  PlateLeaf,
} from "platejs/react";
import { useEditorRef, useElement, useReadOnly } from "platejs/react";

/** --- small cn util (replacement for "@/lib/utils" cn) --- */
function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** --- Inline SVG icon components (replacements for lucide icons) --- */
function BracesIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2" />
      <path d="M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
      <path d="M8 21H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2" />
      <path d="M16 21h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
    </svg>
  );
}
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

/** --- Main exported CodeBlockElement --- */
export function CodeBlockElement(props: PlateElementProps<TCodeBlockElement>) {
  const { editor, element } = props;

  return (
    <PlateElement
      className="py-1 **:[.hljs-addition]:bg-[#f0fff4] **:[.hljs-addition]:text-[#22863a] dark:**:[.hljs-addition]:bg-[#3c5743] dark:**:[.hljs-addition]:text-[#ceead5] **:[.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable]:text-[#005cc5] dark:**:[.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable]:text-[#6596cf] **:[.hljs-built\\\\_in,.hljs-symbol]:text-[#e36209] dark:**:[.hljs-built\\\\_in,.hljs-symbol]:text-[#c3854e] **:[.hljs-bullet]:text-[#735c0f] **:[.hljs-comment,.hljs-code,.hljs-formula]:text-[#6a737d] dark:**:[.hljs-comment,.hljs-code,.hljs-formula]:text-[#6a737d] **:[.hljs-deletion]:bg-[#ffeef0] **:[.hljs-deletion]:text-[#b31d28] dark:**:[.hljs-deletion]:bg-[#473235] dark:**:[.hljs-deletion]:text-[#e7c7cb] **:[.hljs-emphasis]:italic **:[.hljs-keyword,.hljs-doctag,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language\\\\_]:text-[#d73a49] dark:**:[.hljs-keyword,.hljs-doctag,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language\\\\_]:text-[#ee6960] **:[.hljs-name,.hljs-quote,.hljs-selector-tag,.hljs-selector-pseudo]:text-[#22863a] dark:**:[.hljs-name,.hljs-quote,.hljs-selector-tag,.hljs-selector-pseudo]:text-[#36a84f] **:[.hljs-regexp,.hljs-string,.hljs-meta_.hljs-string]:text-[#032f62] dark:**:[.hljs-regexp,.hljs-string,.hljs-meta_.hljs-string]:text-[#3593ff] **:[.hljs-section]:font-bold **:[.hljs-section]:text-[#005cc5] dark:**:[.hljs-section]:text-[#61a5f2] **:[.hljs-strong]:font-bold **:[.hljs-title,.hljs-title.class\\\\_,.hljs-title.class\\\\_.inherited\\\\_\\\\_,.hljs-title.function\\\\_]:text-[#6f42c1] dark:**:[.hljs-title,.hljs-title.class\\\\_,.hljs-title.class\\\\_.inherited\\\\_\\\\_,.hljs-title.function\\\\_]:text-[#a77bfa]"
      {...props}
    >
      <div className="relative rounded-md bg-muted/50">
        <pre className="overflow-x-auto p-8 pr-4 font-mono text-sm leading-[normal] [tab-size:2] print:break-inside-avoid">
          <code>{props.children}</code>
        </pre>

        <div
          className="absolute top-1 right-1 z-10 flex gap-0.5 select-none"
          contentEditable={false}
        >
          {isLangSupported(element.lang) && (
            <button
              className="size-6 text-xs"
              onClick={() => formatCodeBlock(editor, { element })}
              title="Format code"
            >
              <BracesIcon className="!size-3.5 text-muted-foreground" />
            </button>
          )}

          <CodeBlockCombobox />

          <CopyButton
            className="size-6 gap-1 text-xs text-muted-foreground"
            value={NodeApi.string(element)}
          />
        </div>
      </div>
    </PlateElement>
  );
}

/** --- Combobox implemented with plain React + HTML --- */
function CodeBlockCombobox() {
  const [open, setOpen] = useState(false);
  const readOnly = useReadOnly();
  const editor = useEditorRef();
  const element = useElement<TCodeBlockElement>();
  const value = element.lang || "plaintext";
  const [searchValue, setSearchValue] = useState("");

  const items = useMemo(
    () =>
      languages.filter(
        (language) =>
          !searchValue ||
          language.label.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue]
  );

  if (readOnly) return null;

  return (
    <div
      className="relative"
      onBlur={(e) => {
        // close when focus leaves the combobox area
        // relatedTarget is not supported in some browsers but is ok for modern ones
        const next = e.relatedTarget;
        if (!next || !(e.currentTarget as HTMLElement).contains(next as Node)) {
          setOpen(false);
          setSearchValue("");
        }
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-6 justify-between gap-1 px-2 text-xs text-muted-foreground select-none"
        aria-expanded={open}
        role="combobox"
      >
        {languages.find((language) => language.value === value)?.label ??
          "Plain Text"}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-1 w-[200px] rounded-md border bg-popover p-1 shadow-lg"
          role="dialog"
        >
          <div className="p-2">
            <input
              autoFocus
              className="w-full rounded border px-2 py-1 text-sm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search language..."
            />
          </div>

          <div className="max-h-[320px] overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-2 text-xs text-muted-foreground">
                No language found.
              </div>
            ) : (
              <ul role="list">
                {items.map((language) => (
                  <li key={language.value}>
                    <button
                      className={cn(
                        "w-full text-left px-3 py-1 text-sm hover:bg-muted/30",
                        value === language.value ? "font-semibold" : ""
                      )}
                      onClick={() => {
                        editor.tf.setNodes<TCodeBlockElement>(
                          { lang: language.value },
                          { at: element }
                        );
                        setSearchValue("");
                        setOpen(false);
                      }}
                    >
                      <span className="inline-block mr-2 align-middle">
                        {value === language.value ? (
                          <CheckIcon className="!size-3 inline-block" />
                        ) : (
                          <span
                            style={{ width: 14, display: "inline-block" }}
                          />
                        )}
                      </span>
                      <span className="align-middle">{language.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/** --- Copy button unchanged, using Clipboard API --- */
function CopyButton({
  value,
  ...props
}: {
  value: string | (() => string);
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (!hasCopied) return;
    const t = setTimeout(() => {
      setHasCopied(false);
    }, 2000);
    return () => clearTimeout(t);
  }, [hasCopied]);

  return (
    <button
      onClick={() => {
        const text = typeof value === "function" ? value() : value;
        if (typeof text === "string") {
          void navigator.clipboard.writeText(text);
          setHasCopied(true);
        }
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <CheckIcon className="!size-3" />
      ) : (
        <CopyIcon className="!size-3" />
      )}
    </button>
  );
}

export function CodeLineElement(props: PlateElementProps) {
  return <PlateElement {...props} />;
}

export function CodeSyntaxLeaf(props: PlateLeafProps<TCodeSyntaxLeaf>) {
  const tokenClassName = props.leaf.className as string;

  return <PlateLeaf className={tokenClassName} {...props} />;
}

/** --- languages list (kept identical) --- */
const languages: { label: string; value: string }[] = [
  { label: "Auto", value: "auto" },
  { label: "Plain Text", value: "plaintext" },
  { label: "ABAP", value: "abap" },
  { label: "Agda", value: "agda" },
  { label: "Arduino", value: "arduino" },
  { label: "ASCII Art", value: "ascii" },
  { label: "Assembly", value: "x86asm" },
  { label: "Bash", value: "bash" },
  { label: "BASIC", value: "basic" },
  { label: "BNF", value: "bnf" },
  { label: "C", value: "c" },
  { label: "C#", value: "csharp" },
  { label: "C++", value: "cpp" },
  { label: "Clojure", value: "clojure" },
  { label: "CoffeeScript", value: "coffeescript" },
  { label: "Coq", value: "coq" },
  { label: "CSS", value: "css" },
  { label: "Dart", value: "dart" },
  { label: "Dhall", value: "dhall" },
  { label: "Diff", value: "diff" },
  { label: "Docker", value: "dockerfile" },
  { label: "EBNF", value: "ebnf" },
  { label: "Elixir", value: "elixir" },
  { label: "Elm", value: "elm" },
  { label: "Erlang", value: "erlang" },
  { label: "F#", value: "fsharp" },
  { label: "Flow", value: "flow" },
  { label: "Fortran", value: "fortran" },
  { label: "Gherkin", value: "gherkin" },
  { label: "GLSL", value: "glsl" },
  { label: "Go", value: "go" },
  { label: "GraphQL", value: "graphql" },
  { label: "Groovy", value: "groovy" },
  { label: "Haskell", value: "haskell" },
  { label: "HCL", value: "hcl" },
  { label: "HTML", value: "html" },
  { label: "Idris", value: "idris" },
  { label: "Java", value: "java" },
  { label: "JavaScript", value: "javascript" },
  { label: "JSON", value: "json" },
  { label: "Julia", value: "julia" },
  { label: "Kotlin", value: "kotlin" },
  { label: "LaTeX", value: "latex" },
  { label: "Less", value: "less" },
  { label: "Lisp", value: "lisp" },
  { label: "LiveScript", value: "livescript" },
  { label: "LLVM IR", value: "llvm" },
  { label: "Lua", value: "lua" },
  { label: "Makefile", value: "makefile" },
  { label: "Markdown", value: "markdown" },
  { label: "Markup", value: "markup" },
  { label: "MATLAB", value: "matlab" },
  { label: "Mathematica", value: "mathematica" },
  { label: "Mermaid", value: "mermaid" },
  { label: "Nix", value: "nix" },
  { label: "Notion Formula", value: "notion" },
  { label: "Objective-C", value: "objectivec" },
  { label: "OCaml", value: "ocaml" },
  { label: "Pascal", value: "pascal" },
  { label: "Perl", value: "perl" },
  { label: "PHP", value: "php" },
  { label: "PowerShell", value: "powershell" },
  { label: "Prolog", value: "prolog" },
  { label: "Protocol Buffers", value: "protobuf" },
  { label: "PureScript", value: "purescript" },
  { label: "Python", value: "python" },
  { label: "R", value: "r" },
  { label: "Racket", value: "racket" },
  { label: "Reason", value: "reasonml" },
  { label: "Ruby", value: "ruby" },
  { label: "Rust", value: "rust" },
  { label: "Sass", value: "scss" },
  { label: "Scala", value: "scala" },
  { label: "Scheme", value: "scheme" },
  { label: "SCSS", value: "scss" },
  { label: "Shell", value: "shell" },
  { label: "Smalltalk", value: "smalltalk" },
  { label: "Solidity", value: "solidity" },
  { label: "SQL", value: "sql" },
  { label: "Swift", value: "swift" },
  { label: "TOML", value: "toml" },
  { label: "TypeScript", value: "typescript" },
  { label: "VB.Net", value: "vbnet" },
  { label: "Verilog", value: "verilog" },
  { label: "VHDL", value: "vhdl" },
  { label: "Visual Basic", value: "vbnet" },
  { label: "WebAssembly", value: "wasm" },
  { label: "XML", value: "xml" },
  { label: "YAML", value: "yaml" },
];
