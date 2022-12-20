import React, { useEffect } from "react";
import { useContractRead, useAccount } from "wagmi";
import { Button, Text, HStack } from "@chakra-ui/react";

import { CAW_NAMES_ABI } from 'src/config/ABIs';

export default function AllNFTNames(props) {
  const { address } = useAccount();
  const { setUserName } = props;

  const { data, isError, isLoading } = useContractRead({
    addressOrName: "0x3F63Ad5E6309135a9D5fD3540270b93f56FD9CD9",
    contractInterface: CAW_NAMES_ABI,
    functionName: "tokens",
    args: address,
  });

  useEffect(() => {
    setUserName("");
  }, [ setUserName ]);


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
