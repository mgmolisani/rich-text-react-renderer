import { BLOCKS } from '@contentful/rich-text-types';
export default function (heading) {
    return {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
            {
                nodeType: heading,
                data: {},
                content: [
                    {
                        nodeType: 'text',
                        value: 'hello world',
                        marks: [],
                        data: {},
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=heading.js.map