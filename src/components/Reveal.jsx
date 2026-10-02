// Fades/slides its children in when scrolled into view (see useReveal + index.css).
export default function Reveal({ as: Tag = "div", variant = "up", delay = 0, className = "", style, children, ...rest }) {
  return (
    <Tag data-reveal={variant} style={{ "--d": `${delay}ms`, ...style }} className={className} {...rest}>
      {children}
    </Tag>
  );
}
