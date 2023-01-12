import { Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

type Props = {
    label: string,
    value: string | React.ReactNode,
    showIndicator: boolean,
    indicatorType: 'increase' | 'decrease' | 'helper',
    indicatorValue: string,
}

function StatHelper({ type, value }: { type: 'increase' | 'decrease' | 'helper', value: string }) {

    if (type === 'helper')
        return (
            <StatHelpText>
                {value}
            </StatHelpText>
        );

    return (
        <StatHelpText>
            <StatArrow type={type} />
            {value}
        </StatHelpText>
    );
}

export default function StatSummary(props: Props) {

    const { label, value, showIndicator, indicatorType, indicatorValue } = props;

    return (
        <Stat>
            <StatLabel>{label}</StatLabel>
            <StatNumber>{value}</StatNumber>
            {showIndicator && <StatHelper type={indicatorType} value={indicatorValue} />}
        </Stat>
    );
}