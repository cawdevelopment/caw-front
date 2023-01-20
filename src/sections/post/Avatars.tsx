import { Tooltip } from "@chakra-ui/react";
import { motion } from 'framer-motion';

import StoryStyledAvatar from "src/components/avatar/StoryStyledAvatar";
import { useDappProvider } from "src/context/DAppConnectContext";

const list = {
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 1.5,
            staggerChildren: 0.1,
        },
    },
    hidden: {
        opacity: 0,
    },
};

const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -10 },
};


const Avatars = () => {

    const { cawAccounts, changeCawAccount } = useDappProvider();

    return (
        <motion.ul
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginLeft: '0px',
                marginBottom: '8px',
                marginTop: '15px',
                paddingLeft: '0px',
            }}
            initial="hidden"
            animate="visible"
            variants={list}
        >
            {cawAccounts.map((acc) => (
                <motion.li
                    style={{
                        listStyle: 'none',
                        marginRight: '-10px',
                    }}
                    key={acc.id}
                    data-testid={acc.id}
                    variants={item}
                    whileHover={{
                        scale: 1.2,
                        marginRight: '5px',
                        transition: { ease: 'easeOut' },
                    }}
                >
                    <Tooltip
                        hasArrow
                        label={acc.userName}
                        borderRadius="md"
                    >
                        <StoryStyledAvatar
                            src={acc?.avatar || ''}
                            alt={acc?.userName || ''}
                            onClick={() => changeCawAccount(acc, true)}
                        />
                    </Tooltip>
                </motion.li>
            ))}
        </motion.ul>
    );
};

export default Avatars;