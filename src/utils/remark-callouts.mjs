const KINDS = ['NOTE', 'TIP', 'WARNING', 'DANGER'];

function walk(node, fn) {
  fn(node);
  if (node.children) node.children.forEach((c) => walk(c, fn));
}

export function remarkCallouts() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'blockquote') return;
      const p = node.children?.[0];
      const t = p?.type === 'paragraph' ? p.children?.[0] : null;
      if (!t || t.type !== 'text') return;
      const m = t.value.match(/^\[!(NOTE|TIP|WARNING|DANGER)\]\s*/);
      if (!m || !KINDS.includes(m[1])) return;
      t.value = t.value.slice(m[0].length);
      node.data = {
        hName: 'aside',
        hProperties: { className: ['callout', `callout-${m[1].toLowerCase()}`], 'data-kind': m[1] },
      };
    });
  };
}

// Enlaces externos: nueva pestaña con rel seguro.
export function remarkExternalLinks() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type === 'link' && /^https?:\/\//.test(node.url)) {
        node.data = { ...(node.data || {}), hProperties: { rel: 'noopener noreferrer', target: '_blank' } };
      }
    });
  };
}
