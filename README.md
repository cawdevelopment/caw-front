
## Getting Started

```bash
git clone
cd
npm install
```

Add the .env file (be aware that this file is not tracked by git) and add the following:

```bash
ALCHEMY_API_KEY=SOME-STRING-OF-CHARS
INFURA_API_KEY=SOME-STRING-OF-CHARS
CAW_CONTRACT ="0xf3b9569F82B18aEf890De263B84189bd33EBe452"
CAW_NAME_CONTRACT="0x3F63Ad5E6309135a9D5fD3540270b93f56FD9CD9"
CAW_NAME_MINTER_CONTRACT="0x56F0d5DA1Bc735e03d6A4cd988784ED498FD9Ee3"
MINTABLE_CAW_CONTRACT="0x0bc5f399265fA0Fb95F5473c8ec1737d1dBB015c"
NETWORK="goerli"

```

INFURA_API_KEY : Make sure to create a WEB3 API (Formely Ethereum) project on Infura and add the API key here.

Then, run the development server:

```bash
npm start dev
```


## Contributing
