import { motion } from 'framer-motion';
import { useColorModeValue, useToken } from "@chakra-ui/react";

type Props = {
    src: string,
    alt: string,
    height?: string,
    width?: string,
    onClick?: () => void,
}

const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -10 },
};


export default function StoryStyledAvatar({ src, alt, height = '3.125rem', width = '3.125rem', onClick }: Props) {

    const [ PRIMARY_MAIN, PRIMARY_DARKER, BORDER_LOGO ] = useToken('colors', [ 'caw.main', 'caw.darker', 'caw.border' ]);
    const bg = useColorModeValue('cawAlpha.400', 'cawAlpha.50');
    const hoverBg = useColorModeValue(BORDER_LOGO, PRIMARY_MAIN);

    return (
        <motion.div
            variants={item}
            whileHover={{
                scale: 1.2,
                marginRight: '5px',
                transition: { ease: 'easeOut' },
            }}
        >
            <div
                style={{
                    background: `linear-gradient(90deg, ${hoverBg} 0%,${PRIMARY_DARKER} 105%)`,
                    height: height,
                    width: width,
                    borderRadius: '50%',
                    border: `3px solid ${bg}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '38px',
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    role="img"
                    style={{
                        paddingRight: 0,
                        borderRadius: '50%',
                        padding: '0.2rem',
                        cursor: 'pointer',
                    }}
                    onClick={onClick}
                />
            </div>
        </motion.div>
    );
}