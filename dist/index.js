'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var richTextTypes = require('@contentful/rich-text-types');
var React = _interopDefault(require('react'));

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

var defaultNodeRenderers = (_defaultNodeRenderers = {}, defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.PARAGRAPH, function (node, children, defaultKey) {
  return React.createElement(
    'p',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.HEADING_1, function (node, children, defaultKey) {
  return React.createElement(
    'h1',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.HEADING_2, function (node, children, defaultKey) {
  return React.createElement(
    'h2',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.HEADING_3, function (node, children, defaultKey) {
  return React.createElement(
    'h3',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.HEADING_4, function (node, children, defaultKey) {
  return React.createElement(
    'h4',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.HEADING_5, function (node, children, defaultKey) {
  return React.createElement(
    'h5',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.HEADING_6, function (node, children, defaultKey) {
  return React.createElement(
    'h6',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.EMBEDDED_ENTRY, function (node, children, defaultKey) {
  return React.createElement(
    'div',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.UL_LIST, function (node, children, defaultKey) {
  return React.createElement(
    'ul',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.OL_LIST, function (node, children, defaultKey) {
  return React.createElement(
    'ol',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.LIST_ITEM, function (node, children, defaultKey) {
  return React.createElement(
    'li',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.QUOTE, function (node, children, defaultKey) {
  return React.createElement(
    'blockquote',
    { key: defaultKey },
    children
  );
}), defineProperty(_defaultNodeRenderers, richTextTypes.BLOCKS.HR, function (node, children, defaultKey) {
  return React.createElement('hr', { key: defaultKey });
}), defineProperty(_defaultNodeRenderers, richTextTypes.INLINES.ASSET_HYPERLINK, function (node, children, defaultKey) {
  return defaultInline(node, children, defaultKey);
}), defineProperty(_defaultNodeRenderers, richTextTypes.INLINES.ENTRY_HYPERLINK, function (node, children, defaultKey) {
  return defaultInline(node, children, defaultKey);
}), defineProperty(_defaultNodeRenderers, richTextTypes.INLINES.EMBEDDED_ENTRY, function (node, children, defaultKey) {
  return defaultInline(node, children, defaultKey);
}), defineProperty(_defaultNodeRenderers, richTextTypes.INLINES.HYPERLINK, function (node, children, defaultKey) {
  return React.createElement(
    'a',
    { href: node.data.uri, key: defaultKey },
    children
  );
}), _defaultNodeRenderers);

var defaultMarkRenderers = (_defaultMarkRenderers = {}, defineProperty(_defaultMarkRenderers, richTextTypes.MARKS.BOLD, function (text) {
  return React.createElement(
    'b',
    null,
    text
  );
}), defineProperty(_defaultMarkRenderers, richTextTypes.MARKS.ITALIC, function (text) {
  return React.createElement(
    'i',
    null,
    text
  );
}), defineProperty(_defaultMarkRenderers, richTextTypes.MARKS.UNDERLINE, function (text) {
  return React.createElement(
    'u',
    null,
    text
  );
}), defineProperty(_defaultMarkRenderers, richTextTypes.MARKS.CODE, function (text) {
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
      if (richTextTypes.helpers.isText(node)) {
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

exports.documentToReactTree = documentToReactTree;
//# sourceMappingURL=index.js.map
