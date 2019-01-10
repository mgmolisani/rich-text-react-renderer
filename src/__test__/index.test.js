import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactTree } from '../';
import React from 'react';

import {
  embeddedEntryDoc,
  headingDoc,
  hrDoc,
  hyperlinkDoc,
  inlineEntityDoc,
  invalidMarksDoc,
  invalidTypeDoc,
  marksDoc,
  olDoc,
  paragraphDoc,
  quoteDoc,
  ulDoc,
} from './documents';

describe('documentToReactTree', function() {
  it('returns null when given an empty document', () => {
    var document = {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [],
    };
    expect(documentToReactTree(document)).toEqual([]);
  });
  it('renders nodes with default node renderer', function() {
    var docs = [
      paragraphDoc,
      headingDoc(BLOCKS.HEADING_1),
      headingDoc(BLOCKS.HEADING_2),
    ];
    docs.forEach(function(doc) {
      expect(documentToReactTree(doc)).toMatchSnapshot();
    });
  });
  it('renders marks with default mark renderer', function() {
    var docs = [
      marksDoc(MARKS.ITALIC),
      marksDoc(MARKS.BOLD),
      marksDoc(MARKS.UNDERLINE),
      marksDoc(MARKS.CODE),
    ];
    docs.forEach(function(doc) {
      expect(documentToReactTree(doc)).toMatchSnapshot();
    });
  });
  it('renders nodes with passed custom node renderer', function() {
    var options = {
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children, defautKey) => (
          <p key={defautKey}>{children}</p>
        ),
      },
    };
    var document = paragraphDoc;
    expect(documentToReactTree(document, options)).toMatchSnapshot();
  });
  it('renders marks with the passed custom mark rendered', function() {
    var options = {
      renderMark: {
        [MARKS.UNDERLINE]: text => <u>{text}</u>,
      },
    };
    var document = marksDoc(MARKS.UNDERLINE);
    expect(documentToReactTree(document, options)).toMatchSnapshot();
  });
  it('does not render unrecognized marks', function() {
    var document = invalidMarksDoc;
    expect(documentToReactTree(document)).toMatchSnapshot();
  });
  it('renders empty node if type is not recognized', function() {
    var document = invalidTypeDoc;
    expect(documentToReactTree(document)).toMatchSnapshot();
  });
  it('renders default entry link block', function() {
    var entrySys = {
      sys: {
        id: '9mpxT4zsRi6Iwukey8KeM',
        link: 'Link',
        linkType: 'Entry',
      },
    };
    var document = embeddedEntryDoc(entrySys);
    expect(documentToReactTree(document)).toMatchSnapshot();
  });
  it('renders ordered lists', function() {
    var document = olDoc;
    expect(documentToReactTree(document)).toMatchSnapshot()
  });
  it('renders unordered lists', function() {
    var document = ulDoc;
    expect(documentToReactTree(document)).toMatchSnapshot()
  });
  it('renders blockquotes', function() {
    var document = quoteDoc;
    expect(documentToReactTree(document)).toMatchSnapshot()
  });
  it('renders horizontal rule', function() {
    var document = hrDoc;
    expect(documentToReactTree(document)).toMatchSnapshot()
  });
  it('does not crash with inline elements (e.g. hyperlink)', function() {
    var document = hyperlinkDoc;
    expect(documentToReactTree(document)).toBeTruthy();
  });
  it('renders hyperlink', function() {
    var document = hyperlinkDoc;
    expect(documentToReactTree(document)).toMatchSnapshot()
  });
  it('renders asset hyperlink', function() {
    var asset = {
      target: {
        sys: {
          id: '9mpxT4zsRi6Iwukey8KeM',
          link: 'Link',
          type: 'Asset',
        },
      },
    };
    var document = inlineEntityDoc(asset, INLINES.ASSET_HYPERLINK);
    expect(documentToReactTree(document)).toMatchSnapshot()
  });
  it('renders entry hyperlink', function() {
    var entry = {
      target: {
        sys: {
          id: '9mpxT4zsRi6Iwukey8KeM',
          link: 'Link',
          type: 'Entry',
        },
      },
    };
    var document = inlineEntityDoc(entry, INLINES.ENTRY_HYPERLINK);
    expect(documentToReactTree(document)).toMatchSnapshot()
  });
  it('renders embedded entry', function() {
    var entry = {
      target: {
        sys: {
          id: '9mpxT4zsRi6Iwukey8KeM',
          link: 'Link',
          type: 'Entry',
        },
      },
    };
    var document = inlineEntityDoc(entry, INLINES.EMBEDDED_ENTRY);
    expect(documentToReactTree(document)).toMatchSnapshot()
  });
});
