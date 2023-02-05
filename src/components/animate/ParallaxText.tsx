import { useRef } from "react";
import { wrap } from "@motionone/utils";
import { m, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { chakra } from "@chakra-ui/react";


export interface ParallaxProps {
    children: React.ReactNode;
    baseVelocity: number;
}

export function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {

    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

    const velocityFactor = useTransform(smoothVelocity, [ 0, 1000 ], [ 0, 5 ], { clamp: true });

    /**
     * This is a magic wrapping for the length of the card - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    // const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
    const x = useTransform(baseX, (v) => `${wrap(-30, -0, v)}%`);
    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {

        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamically calculated
     * based on the size of the text and viewport. Likewise, the x motion value is
     * currently wrapped between -20 and -45% - this 25% is derived from the fact
     * we have four children (100% / 4). This would also want deriving from the
     * dynamically generated number of children.
     */
    return (
        <div className="parallax">
            <m.div className="scroller" style={{ x }}>
                {children}
            </m.div>
        </div>
    );
}

export const ParallaxItemWrapper = ({ id, children }: { id: string, children: React.ReactNode }) => (
    <chakra.div
        id={id}
        display={"flex"}
        gap={4}
        p={2}
        flexDirection={{ base: "column", md: "row" }}
        overflow={"hidden"}
        zIndex={1}
    >
        {children}
    </chakra.div>
)

