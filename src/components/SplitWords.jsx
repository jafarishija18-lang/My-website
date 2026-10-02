import { Children, isValidElement } from "react";

/*
 * Splits text into individually animated words (see `.word` in index.css).
 * Must sit inside a <Reveal>; words rise in one after another once it's visible.
 * Simple inline elements like <span className="text-violet">two words</span> are
 * flattened: each of their words gets the element's className instead.
 *
 * step: delay between words (ms) · start: extra delay before the first word (ms)
 */
export default function SplitWords({ children, step = 60, start = 0 }) {
  let index = 0;

  const split = (node, className) => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node)
        // ordinary whitespace only (not \s), so non-breaking spaces stay inside a word
        .split(/([ \t\n\r]+)/)
        .map((part) => {
          if (!part) return null;
          if (/^[ \t\n\r]+$/.test(part)) return " ";
          const i = index++;
          return (
            <span key={i} className="word">
              <span className={className} style={{ "--wi": i }}>
                {part}
              </span>
            </span>
          );
        });
    }
    if (isValidElement(node)) {
      return Children.toArray(node.props.children).flatMap((child) =>
        split(child, [className, node.props.className].filter(Boolean).join(" "))
      );
    }
    return node;
  };

  return (
    <span style={{ "--ws": `${step}ms`, "--w0": `${start}ms` }}>
      {Children.toArray(children).flatMap((child) => split(child, undefined))}
    </span>
  );
}
