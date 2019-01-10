export default function (mark) {
    return {
        nodeType: 'document',
        data: {},
        content: [
            {
                nodeType: 'paragraph',
                data: {},
                content: [
                    {
                        nodeType: 'text',
                        value: 'hello world',
                        marks: [{ type: mark }],
                        data: {},
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=mark.js.map