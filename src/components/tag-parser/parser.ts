export type TagType = '@' | '#' | '$' | 'url';
export type ActionTagEvent = (ht: string, type: TagType, element: any) => void;

const rule = /([#@$\bwww\bhttp|#@$\bwww\bhttp][^\s]+)/g;

type parserProps = {
    value: any,
    htRenderer: any,
    linkRenderer: any,
    atRenderer: any,
    stockRenderer: any,
    action: ActionTagEvent,
}

export const parse = ({ value, htRenderer, linkRenderer, atRenderer, stockRenderer, action }: parserProps) => {

    if (!value?.split)
        return value;

    const hts = value.split(rule).map((chunk: string) => {

        if (chunk.match(rule)) {
            if (chunk.includes('@'))
                return atRenderer(chunk, action);

            if (chunk.includes('#'))
                return htRenderer(chunk, action);

            if (chunk.includes('$'))
                return stockRenderer(chunk, action);

            if (chunk.includes('http') || chunk.includes('www')) 
                return linkRenderer(chunk, action);

            return chunk;
        }
        return chunk;
    });

    return hts;
};