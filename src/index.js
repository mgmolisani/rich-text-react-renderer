import {BLOCKS, helpers, INLINES, MARKS} from '@contentful/rich-text-types';
import React, {cloneElement, isValidElement} from 'react';

const defaultInline = (node) => <span key={node.data.target.sys.id}>
  type: {node.nodeType} id: {node.data.target.sys.id}
</span>;

const defaultNodeRenderers = {
  [BLOCKS.PARAGRAPH]: (node, children) => (
    <p>{children}</p>
  ),
  [BLOCKS.HEADING_1]: (node, children) => (
    <h1>{children}</h1>
  ),
  [BLOCKS.HEADING_2]: (node, children) => (
    <h2>{children}</h2>
  ),
  [BLOCKS.HEADING_3]: (node, children) => (
    <h3>{children}</h3>
  ),
  [BLOCKS.HEADING_4]: (node, children) => (
    <h4>{children}</h4>
  ),
  [BLOCKS.HEADING_5]: (node, children) => (
    <h5>{children}</h5>
  ),
  [BLOCKS.HEADING_6]: (node, children) => (
    <h6>{children}</h6>
  ),
  [BLOCKS.EMBEDDED_ENTRY]: (node, children) => (
    <div>{children}</div>
  ),
  [BLOCKS.UL_LIST]: (node, children) => (
    <ul>{children}</ul>
  ),
  [BLOCKS.OL_LIST]: (node, children) => (
    <ol>{children}</ol>
  ),
  [BLOCKS.LIST_ITEM]: (node, children) => (
    <li>{children}</li>
  ),
  [BLOCKS.QUOTE]: (node, children) => (
    <blockquote>{children}</blockquote>
  ),
  [BLOCKS.HR]: () => <hr/>,
  [INLINES.ASSET_HYPERLINK]: defaultInline,
  [INLINES.ENTRY_HYPERLINK]: defaultInline,
  [INLINES.EMBEDDED_ENTRY]: defaultInline,
  [INLINES.HYPERLINK]: (node, children) => (
    <a href={node.data.uri}>
      {children}
    </a>
  )
};

const defaultMarkRenderers = {
  [MARKS.BOLD]: (text) => <b>{text}</b>,
  [MARKS.ITALIC]: (text) => <i>{text}</i>,
  [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
  [MARKS.CODE]: (text) => <code>{text}</code>
};

/**
 * Serialize a Contentful Rich Text `document` to React tree
 */
export function documentToReactTree(richTextDocument, options = {}) {
  const renderNode = {
    ...defaultNodeRenderers,
    ...options.renderNode
  };
  const renderMark = {
    ...defaultMarkRenderers,
    ...options.renderMark,
  };

  function convertNodeList(nodes) {
    return nodes.map((node, index) => {
      return appendKeyToValidElement(convertNode(node), index);
    });
  }

  function convertNode(node) {
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
      return renderNode[node.nodeType](node, convertNodeList(node.content));
    }
  }

  return convertNodeList(richTextDocument.content);
}

const appendKeyToValidElement = (element, key) => {
  if (element && isValidElement(element) && element.key === null) {
    return cloneElement(element, {key});
  }
  return element;
};
