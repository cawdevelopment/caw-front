import {
    Text, Button, Image, Box, VStack, Popover, PopoverTrigger,
    PopoverFooter, PopoverContent, PopoverArrow, PopoverHeader,
    PopoverCloseButton, PopoverBody, Avatar, HStack,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

type Props = {
    connectWalletPressedProp: any,
    walletAddressProp: string,
}
const ConnectWalletButton = ({ connectWalletPressedProp, walletAddressProp, }: Props) => (
    <ConnectButton.Custom>
        {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            // authenticationStatus,
            mounted,
        }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = String(mounted) !== "loading";
            // const ready = mounted && authenticationStatus !== "loading";
            const connected = ready && account && chain;
            // && (!authenticationStatus || authenticationStatus === "authenticated");

            return (
                <Box>
                    {(() => {
                        if (!connected) {
                            return (
                                <Button
                                    width="10vw"
                                    variant="outline"
                                    // bgGradient="linear(to-l, brand.100, brand.200)"
                                    onClick={openConnectModal}
                                >
                                    Connect Wallet
                                </Button>
                            );
                        }

                        if (chain.unsupported) {
                            return (
                                <Button
                                    width="10vw"
                                    variant="outline"
                                    // bgGradient="linear(to-l, brand.100, brand.200)"
                                    onClick={openChainModal}
                                >
                                    Wrong network
                                </Button>
                            );
                        }

                        return (
                            <VStack>
                                <Box width="15vw">
                                    <Popover>
                                        <PopoverTrigger
                                        // display="flex"
                                        // flexDirection="row"
                                        // alignItems="center"
                                        // justifyContent="space-around"
                                        >
                                            <HStack
                                                _hover={{
                                                    background: "grey",
                                                    transition: "all 0.7s",
                                                    transform: "scale(1.005)",
                                                }}
                                                rounded="lg"
                                            >
                                                <Avatar
                                                    name="Dan Abrahmov"
                                                    src="https://bit.ly/dan-abramov"
                                                />
                                                <VStack spacing={1}>
                                                    <Text as="b" noOfLines={1}>
                                                        Mr DanZo
                                                    </Text>
                                                    <Text noOfLines={1}>@THE_ReeALZOO</Text>
                                                </VStack>
                                            </HStack>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverHeader>
                                                <Avatar
                                                    name="Dan Abrahmov"
                                                    src="https://bit.ly/dan-abramov"
                                                />{" "}
                                                {account.displayBalance
                                                    ? ` (${account.displayBalance})`
                                                    : ""}
                                            </PopoverHeader>
                                            <PopoverCloseButton />
                                            <PopoverBody>
                                                <Button>Create New Profile</Button>
                                            </PopoverBody>
                                            <PopoverFooter>
                                                <Button
                                                    onClick={openAccountModal}
                                                    width="10vw"
                                                    variant="outline"
                                                // bgGradient="linear(to-l, brand.100, brand.200)"
                                                >
                                                    {account.displayName}
                                                </Button>
                                            </PopoverFooter>
                                        </PopoverContent>
                                    </Popover>
                                </Box>

                                <Button
                                    onClick={openChainModal}
                                    width="15vw"
                                    variant="outline"
                                // bgGradient="linear(to-l, brand.100, brand.200)"
                                >
                                    {chain.hasIcon && (
                                        <Box
                                            style={{
                                                background: chain.iconBackground,
                                                width: 12,
                                                height: 12,
                                                borderRadius: 999,
                                                overflow: "hidden",
                                                marginRight: 4,
                                            }}
                                        >
                                            {chain.iconUrl && (
                                                <Image
                                                    alt={chain.name ?? "Chain icon"}
                                                    src={chain.iconUrl}
                                                    style={{ width: 12, height: 12 }}
                                                />
                                            )}
                                        </Box>
                                    )}
                                    {chain.name}
                                </Button>
                            </VStack>
                        );
                    })()}
                </Box>
            );
        }}
    </ConnectButton.Custom>
);

export default ConnectWalletButton;