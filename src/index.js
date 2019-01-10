import { BLOCKS, helpers, INLINES, MARKS } from '@contentful/rich-text-types';
import React from 'react';

const defaultNodeRenderers = {
  [BLOCKS.PARAGRAPH]: (node, children, defaultKey) => (
    <p key={defaultKey}>{children}</p>
  ),
  [BLOCKS.HEADING_1]: (node, children, defaultKey) => (
    <h1 key={defaultKey}>{children}</h1>
  ),
  [BLOCKS.HEADING_2]: (node, children, defaultKey) => (
    <h2 key={defaultKey}>{children}</h2>
  ),
  [BLOCKS.HEADING_3]: (node, children, defaultKey) => (
    <h3 key={defaultKey}>{children}</h3>
  ),
  [BLOCKS.HEADING_4]: (node, children, defaultKey) => (
    <h4 key={defaultKey}>{children}</h4>
  ),
  [BLOCKS.HEADING_5]: (node, children, defaultKey) => (
    <h5 key={defaultKey}>{children}</h5>
  ),
  [BLOCKS.HEADING_6]: (node, children, defaultKey) => (
    <h6 key={defaultKey}>{children}</h6>
  ),
  [BLOCKS.EMBEDDED_ENTRY]: (node, children, defaultKey) => (
    <div key={defaultKey}>{children}</div>
  ),
  [BLOCKS.UL_LIST]: (node, children, defaultKey) => (
    <ul key={defaultKey}>{children}</ul>
  ),
  [BLOCKS.OL_LIST]: (node, children, defaultKey) => (
    <ol key={defaultKey}>{children}</ol>
  ),
  [BLOCKS.LIST_ITEM]: (node, children, defaultKey) => (
    <li key={defaultKey}>{children}</li>
  ),
  [BLOCKS.QUOTE]: (node, children, defaultKey) => (
    <blockquote key={defaultKey}>{children}</blockquote>
  ),
  [BLOCKS.HR]: (node, children, defaultKey) => <hr key={defaultKey}/>,
  [INLINES.ASSET_HYPERLINK]: (node, children, defaultKey) =>
    defaultInline(node, children, defaultKey),
  [INLINES.ENTRY_HYPERLINK]: (node, children, defaultKey) =>
    defaultInline(node, children, defaultKey),
  [INLINES.EMBEDDED_ENTRY]: (node, children, defaultKey) =>
    defaultInline(node, children, defaultKey),
  [INLINES.HYPERLINK]: (node, children, defaultKey) => (
    <a href={node.data.uri} key={defaultKey}>
      {children}
    </a>
  ),
};

const defaultMarkRenderers = {
  [MARKS.BOLD]: text => <b>{text}</b>,
  [MARKS.ITALIC]: text => <i>{text}</i>,
  [MARKS.UNDERLINE]: text => <u>{text}</u>,
  [MARKS.CODE]: text => <code>{text}</code>,
};

const defaultInline = (node, children, defaultKey) => (
  <span key={node.data.target.sys.id}>
		type: {node.nodeType} id: {node.data.target.sys.id}
	</span>
);

/**
 * Serialize a Contentful Rich Text `document` to React tree
 */
export function documentToReactTree(richTextDocument, options = {}) {
  const renderNode = {
    ...defaultNodeRenderers,
    ...options.renderNode,
  };
  const renderMark = {
    ...defaultMarkRenderers,
    ...options.renderMark,
  };

  function convert(nodes) {
    return nodes.map((node, index) => {
      if (helpers.isText(node)) {
        return node.marks.reduce((value, mark) => {
          if (!renderMark[mark.type]) {
            return value;
          }
          return renderMark[mark.type](value);
        }, node.value);
      } else {
        if (!node.nodeType || !renderNode[node.nodeType]) {
          return null;
        }
        return renderNode[node.nodeType](node, convert(node.content), index);
      }
    });
  }

  return convert(richTextDocument.content);
}
