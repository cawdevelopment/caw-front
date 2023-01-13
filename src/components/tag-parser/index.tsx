import { createElement } from 'react';
import { uuidv4 } from 'src/utils/helper';
import { parse, TagType, ActionTagEvent } from "./parser";

export type { TagType, ActionTagEvent };

const hashtagRenderer = (createElement: any, style: React.CSSProperties) => (hashtag: string, onClick: ActionTagEvent) =>
    createElement(
        "span",
        {
            'target': '_blank',
            'rel': 'nofollow noreferrer noopener',
            'key': uuidv4(),
            style: style,
            onClick: onClick ? (e: any) => onClick(hashtag, '#', e) : null
        },
        hashtag
    );

const stockORenderer = (createElement: any, style: React.CSSProperties) => (hashtag: string, onClick: ActionTagEvent) =>
    createElement(
        "span",
        {
            'target': '_blank',
            'rel': 'nofollow noreferrer noopener',
            'key': uuidv4(),
            style: style,
            onClick: onClick ? (e: any) => onClick(hashtag, '$', e) : null
        },
        hashtag
    );

const mentionRenderer = (createElement: any, style: React.CSSProperties) => (hashtag: string, onClick: ActionTagEvent) =>
    createElement(
        "span",
        {
            'target': '_blank',
            'rel': 'nofollow noreferrer noopener',
            'key': uuidv4(),
            style: style,
            onClick: onClick ? (e: any) => onClick(hashtag, '@', e) : null
        },
        hashtag
    );


const urlRenderer = (createElement: any, style: React.CSSProperties) => (hashtag: string, onClick: ActionTagEvent) =>
    createElement(
        "a",
        {
            'target': '_blank',
            'rel': 'nofollow noreferrer noopener',
            'key': uuidv4(),
            style: style,
            onClick: onClick ? (e: any) => onClick(hashtag, 'url', e) : null
        },
        hashtag
    );



type HashTagRenderProps = {
    children: React.ReactNode[] | string;
    htStyle?: React.CSSProperties;
    mtStyle?: React.CSSProperties;
    urlStyle?: React.CSSProperties;
    stockStyle?: React.CSSProperties;
    onActionTag: ActionTagEvent;
}


const minStyle: React.CSSProperties = {
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'limegreen'
}

export default function HashTagRender(props: HashTagRenderProps) {

    const { children, htStyle = {}, mtStyle = {}, urlStyle = {}, stockStyle = {}, onActionTag } = props;
    const contents =
        typeof children === "object" && children.length
            ? !isNaN(children.length)
                ? children[ 0 ]
                : children
            : children;

    const parsed = parse(
        {
            value: contents,
            htRenderer: hashtagRenderer(createElement, { ...minStyle, ...htStyle }),
            atRenderer: mentionRenderer(createElement, { ...minStyle, ...mtStyle }),
            linkRenderer: urlRenderer(createElement, { ...minStyle, ...urlStyle }),
            stockRenderer: stockORenderer(createElement, { ...minStyle, ...stockStyle }),
            action: onActionTag
        });

    return parsed;
};