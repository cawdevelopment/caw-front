import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  useAccount,
} from "wagmi";

import { Box, Button, Link, Input, Text, HStack } from "@chakra-ui/react";

import { useDebounce } from "use-debounce";
import { parseBytes32String } from "ethers/lib/utils";
import CAW_NAME_ABI from "src/ABIs/CAW_NAME.json";

export function AllNFTNames() {
  const [value, setValue] = React.useState();
  const handleChange = (event) => setValue(event.target.value);
  const [debouncedValue] = useDebounce(value, 500);
  const { address, isConnected } = useAccount();

  const { data, isError, isLoading } = useContractRead({
    addressOrName: "0x3F63Ad5E6309135a9D5fD3540270b93f56FD9CD9",
    contractInterface: CAW_NAME_ABI,
    functionName: "tokens",
    args: "0xBD340D72E572F123B197D7745723deB20a6C8046",
  });
  console.log("data", data);
  if (isError) {
    return <Text>Error</Text>;
  }
  if (isLoading) {
    return <Text>Loading</Text>;
  }
  return (
    <HStack>
      {data?.map((subArr, key) => (
        <Button key={key} bgColor="black">
          <Text fontStyle="b">{subArr["username"]}</Text>
        </Button>
      ))}
    </HStack>
  );
}
