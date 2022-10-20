
## Getting Started

First, add a .env.local file with a single var. EG:

```bash
NEXT_PUBLIC_ALCHEMY_HTTPS_KEY = https://eth-goerli.g.alchemy.com/v2/SOME-STRING-OF-CHARS
NEXT_CAW_SM_ADDRESS = CAW-CONTRACT-ADDRESS
NEXT_CAWNAMES_SM_ADDRESS = CAW-NAMES-CONTRACT-ADDRESS
```


Then, run the development server:

```bash
npm run dev
# or
yarn dev
```