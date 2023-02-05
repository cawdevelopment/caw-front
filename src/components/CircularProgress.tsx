import { CircularProgress, type CircularProgressProps, CircularProgressLabel } from "@chakra-ui/react";

interface ProgressProps extends CircularProgressProps {
    text: string;
    value: number;
    color: string;
}

export default function CircularProgressWithLabel({ text, value, color, ...props }: ProgressProps) {

    return (
        <CircularProgress
            value={value}
            color={color}
            {...props}
        >
            <CircularProgressLabel>
                {text}
            </CircularProgressLabel>
        </CircularProgress>
    );
}