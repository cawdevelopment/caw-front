
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    show: boolean;
    duration?: number;
    children: React.ReactNode;
}

export default function WrapperFadeAnimation({ show, duration = 1.7, children }: Props) {

    return (
        <AnimatePresence>
            {show ?
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: duration } }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                >
                    {children}
                </motion.div>
                : null
            }
        </AnimatePresence>
    );
}