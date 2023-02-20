import { Text, useColorModeValue } from '@chakra-ui/react';

import { TextAlign } from 'src/components/Interface.Props';
import HashTagRender, { ActionTagEvent } from "./tag-parser";

type Props = {
    align?: TextAlign;
    htStyle?: React.CSSProperties;
    mtStyle?: React.CSSProperties;
    urlStyle?: React.CSSProperties;
    onHashtagClick: ActionTagEvent;
    content: React.ReactNode[] | string;
}

export default function PostContent(props: Props) {

    const { align, htStyle, mtStyle, urlStyle, content, onHashtagClick } = props;
    const textColor = useColorModeValue('gray.900', 'gray.50');

    return (
        <Text
            as="p"
            textAlign={align}
            fontSize="md"
            color={textColor}
        >
            <HashTagRender
                htStyle={htStyle}
                mtStyle={mtStyle}
                urlStyle={urlStyle}
                onActionTag={onHashtagClick}
            >
                {content}
            </HashTagRender>
        </Text>
    );

}