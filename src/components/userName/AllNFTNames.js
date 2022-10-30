import React, { useEffect } from "react";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  useAccount,
} from "wagmi";

import { Box, Button, Link, Input, Text, HStack } from "@chakra-ui/react";

import CAW_NAME_ABI from "src/ABIs/CAW_NAME.json";

export function AllNFTNames(props) {
  const { address } = useAccount();
  const { setUserName } = props;

  const { data, isError, isLoading } = useContractRead({
    addressOrName: "0x3F63Ad5E6309135a9D5fD3540270b93f56FD9CD9",
    contractInterface: CAW_NAME_ABI,
    functionName: "tokens",
    args: address,
  });

  useEffect(() => {
    setUserName("");
  }, [address]);

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
        <Button
          key={key}
          onClick={() => setUserName(subArr["username"])}
          size="sm"
        >
          <Text fontStyle="b" size="xl">
            {subArr["username"]}
          </Text>
        </Button>
      ))}
    </HStack>
  );
}
