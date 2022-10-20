import {
    Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, IconButton,
    Stack, Flex, useDisclosure, PlacementWithLogical
} from '@chakra-ui/react';
import Iconify from "src/components/icons/Iconify";

type Props = {
    children: React.ReactNode;
    placement?: PlacementWithLogical;
}

export default function MenuPopover({ children, placement = "bottom" }: Props) {

    const { onOpen, onClose, isOpen } = useDisclosure()

    return (
        <Flex justifyContent="center" mt={4}>
            <Popover
                isOpen={isOpen}
                placement={placement}
                isLazy
                closeOnBlur={true}
                onOpen={onOpen}
                onClose={onClose}
            >
                <PopoverTrigger>
                    <IconButton
                        aria-label="More post options"
                        icon={<Iconify icon="eva:more-vertical-fill" />}
                        variant="ghost"
                        w="fit-content"
                    />
                </PopoverTrigger>
                <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                    <PopoverArrow />
                    <PopoverBody>
                        <Stack onClick={onClose}>
                            {children}
                        </Stack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
}