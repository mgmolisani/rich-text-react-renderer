import { BLOCKS } from '@contentful/rich-text-types';
export default function (entry) {
    return {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
            {
                nodeType: BLOCKS.EMBEDDED_ENTRY,
                content: [],
                data: {
                    target: entry,
                },
            },
        ],
    };
}
//# sourceMappingURL=embedded-entry.js.map