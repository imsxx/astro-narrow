type MdastNode = {
  type: string
  lang?: string | null
  value?: string
  data?: Record<string, unknown>
  children?: MdastNode[]
}

/**
 * Mermaid blocks must reach the browser as plain text, not as highlighted
 * spans. Marking the node during the remark phase lets mdast-util-to-hast emit
 * the final `<pre class="mermaid">` directly, so nothing depends on the order
 * of rehype plugins relative to Shiki.
 */
export function remarkMermaid() {
  return (tree: MdastNode) => {
    const walk = (node: MdastNode) => {
      if (!node.children) return
      for (const child of node.children) {
        if (child.type === "code" && child.lang === "mermaid") {
          child.data = {
            hName: "div",
            hProperties: { className: ["mermaid"], "data-mermaid": "" },
            hChildren: [{ type: "text", value: child.value ?? "" }],
          }
        }
        walk(child)
      }
    }
    walk(tree)
  }
}
