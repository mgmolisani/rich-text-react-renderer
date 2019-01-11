import { BLOCKS, helpers, INLINES, MARKS } from '@contentful/rich-text-types';
import React from 'react';

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _defaultNodeRenderers, _defaultMarkRenderers;

var defaultNodeRenderers = (_defaultNodeRenderers = {}, defineProperty(_defaultNodeRenderers, BLOCKS.PARAGRAPH, function (node, children, defaultKey) {
  return React.createElement(
    'p',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, BLOCKS.HEADING_1, function (node, children, defaultKey) {
  return React.createElement(
    'h1',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, BLOCKS.HEADING_2, function (node, children, defaultKey) {
  return React.createElement(
    'h2',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, BLOCKS.HEADING_3, function (node, children, defaultKey) {
  return React.createElement(
    'h3',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, BLOCKS.HEADING_4, function (node, children, defaultKey) {
  return React.createElement(
    'h4',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, BLOCKS.HEADING_5, function (node, children, defaultKey) {
  return React.createElement(
    'h5',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, BLOCKS.HEADING_6, function (node, children, defaultKey) {
  return React.createElement(
    'h6',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, BLOCKS.EMBEDDED_ENTRY, function (node, children, defaultKey) {
  return React.createElement(
    'div',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, BLOCKS.UL_LIST, function (node, children, defaultKey) {
  return React.createElement(
    'ul',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, BLOCKS.OL_LIST, function (node, children, defaultKey) {
  return React.createElement(
    'ol',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, BLOCKS.LIST_ITEM, function (node, children, defaultKey) {
  return React.createElement(
    'li',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, BLOCKS.QUOTE, function (node, children, defaultKey) {
  return React.createElement(
    'blockquote',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, BLOCKS.HR, function (node, children, defaultKey) {
  return React.createElement('hr', { key: defaultKey });
}), defineProperty(_defaultNodeRenderers, INLINES.ASSET_HYPERLINK, function (node, children, defaultKey) {
  return defaultInline(node, children, defaultKey);
}), defineProperty(_defaultNodeRenderers, INLINES.ENTRY_HYPERLINK, function (node, children, defaultKey) {
  return defaultInline(node, children, defaultKey);
}), defineProperty(_defaultNodeRenderers, INLINES.EMBEDDED_ENTRY, function (node, children, defaultKey) {
  return defaultInline(node, children, defaultKey);
}), defineProperty(_defaultNodeRenderers, INLINES.HYPERLINK, function (node, children, defaultKey) {
  return React.createElement(
    'a',
    { href: node.data.uri, key: defaultKey },
    children
  );
}), _defaultNodeRenderers);

var defaultMarkRenderers = (_defaultMarkRenderers = {}, defineProperty(_defaultMarkRenderers, MARKS.BOLD, function (text) {
  return React.createElement(
    'b',
    null,
    text
  );
}), defineProperty(_defaultMarkRenderers, MARKS.ITALIC, function (text) {
  return React.createElement(
    'i',
    null,
    text
  );
}), defineProperty(_defaultMarkRenderers, MARKS.UNDERLINE, function (text) {
  return React.createElement(
    'u',
    null,
    text
  );
}), defineProperty(_defaultMarkRenderers, MARKS.CODE, function (text) {
  return React.createElement(
    'code',
    null,
    text
  );
}), _defaultMarkRenderers);

var defaultInline = function defaultInline(node, children, defaultKey) {
  return React.createElement(
    'span',
    { key: node.data.target.sys.id },
    'type: ',
    node.nodeType,
    ' id: ',
    node.data.target.sys.id
  );
};

/**
 * Serialize a Contentful Rich Text `document` to React tree
 */
function documentToReactTree(richTextDocument) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var renderNode = _extends({}, defaultNodeRenderers, options.renderNode);
  var renderMark = _extends({}, defaultMarkRenderers, options.renderMark);

  function convert(nodes) {
    return nodes.map(function (node, index) {
      if (helpers.isText(node)) {
        return node.marks.reduce(function (value, mark) {
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

export { documentToReactTree };
//# sourceMappingURL=index.es.js.map
