
import { motion, AnimatePresence, MotionStyle } from "framer-motion";

type Props = {
    show: boolean;
    duration?: number;
    exitDuration?: number;
    children: React.ReactNode;
    sx?: MotionStyle
}

export default function WrapperFadeAnimation({ show, duration = 1.7, exitDuration, sx = { width: '100%' }, children }: Props) {

    return (
        <AnimatePresence>
            {show ?
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: duration } }}
                    exit={{ opacity: 0, transition: { duration: exitDuration } }}
                    style={sx}
                >
                    {children}
                </motion.div>
                : null
            }
        </AnimatePresence>
    );
}