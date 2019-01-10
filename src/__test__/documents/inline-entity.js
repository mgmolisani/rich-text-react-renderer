import { BLOCKS } from '@contentful/rich-text-types';
export default function inlineEntity(entry, inlineType) {
    return {
        content: [
            {
                data: {},
                content: [
                    {
                        marks: [],
                        value: '',
                        nodeType: 'text',
                        data: {},
                    },
                    {
                        data: entry,
                        content: [
                            {
                                marks: [],
                                value: '',
                                nodeType: 'text',
                                data: {},
                            },
                        ],
                        nodeType: inlineType,
                    },
                    {
                        marks: [],
                        value: '',
                        nodeType: 'text',
                        data: {},
                    },
                ],
                nodeType: BLOCKS.PARAGRAPH,
            },
        ],
        data: {},
        nodeType: BLOCKS.DOCUMENT,
    };
}
//# sourceMappingURL=inline-entity.js.map