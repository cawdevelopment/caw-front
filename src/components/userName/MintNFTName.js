import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { Box, Button, Link, Input, Text } from "@chakra-ui/react";

import { useDebounce } from "use-debounce";
import { parseBytes32String } from "ethers/lib/utils";

export function MintNFTName() {
  const [value, setValue] = React.useState();
  const handleChange = (event) => setValue(event.target.value);
  const [debouncedValue] = useDebounce(value, 500);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: "0x56F0d5DA1Bc735e03d6A4cd988784ED498FD9Ee3",
    contractInterface: [
      {
        name: "mint",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ internalType: "string", name: "username", type: "string" }],
        outputs: [],
      },
    ],
    functionName: "mint",
    args: [debouncedValue],
    enabled: Boolean(debouncedValue),
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Box>
      <Input value={value} onChange={handleChange} />

      <Button
        disabled={!write || isLoading}
        onClick={() => {
          write?.();
        }}
      >
        {isLoading ? "Minting.." : "Mint"}
      </Button>
      {isSuccess && (
        <Box>
          {" "}
          <Text>Success!</Text>
          <Box>
            <Text>
              Etherscan {`https://goerli.etherscan.io/tx/${data?.hash}`}
            </Text>
            <Link href={`https://etherscan.io/tx/${data?.hash}`} isExternal />
          </Box>
        </Box>
      )}
      {(isPrepareError || isError) && (
        <Text>
          {/* Lowercase letters and numbers only */}
          Error: {(prepareError || error)?.message}
        </Text>
      )}
    </Box>
  );
}
