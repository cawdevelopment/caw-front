import { useEffect, useState } from "react";
import { Text, useToken, chakra, useColorModeValue } from "@chakra-ui/react";
import { m, AnimatePresence } from "framer-motion";

const items = [
    {
        id: 0,
        content: `BY`,
        pl: 3
    },
    {
        id: 1,
        content: "FOR",
        pl: 0
    },
];

export function FlippingText() {

    const [ index, setIndex ] = useState(0);
    const color = useToken('colors', 'caw.dark');
    const textColor = useColorModeValue('gray.900', 'gray.100');

    useEffect(() => {

        const id = setInterval(() => {
            setIndex((state) => {
                if (state >= items.length - 1)
                    return 0;
                return state + 1;
            });
        }, 3000);

        return () => clearInterval(id);
    }, []);

    return (
        <Text fontSize="2xl" as='b' sx={{ color: 'gray.50' }}>
            <div style={{ position: 'relative', display: 'flex' }}>
                <AnimatePresence>
                    <chakra.span color={textColor}>BUILT</chakra.span>
                    <m.div
                        key={items[ index ].id}
                        initial={{ x: 80, y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ x: 80, y: -10, opacity: 0 }}
                        transition={{ ease: "easeInOut" }}
                        style={{ position: "absolute" }}
                    >
                        <chakra.span color={color} pl={items[ index ].pl}>
                            {`${items[ index ].content}`}
                        </chakra.span>
                    </m.div>
                </AnimatePresence>
                <chakra.span color={textColor} pl={20}>TEH PPL</chakra.span>
            </div>
        </Text>
    );
}
