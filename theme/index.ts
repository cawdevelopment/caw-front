import { extendTheme } from '@chakra-ui/react'
import foundations from './foundations'

const direction = 'ltr'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
  cssVarPrefix: 'chakra',
}

export const theme = {
  direction,
  ...foundations,
  config,
  components: {
    Text: {
      baseStyle: {
        color: "black"
      },
    },
    Flex: {
      _hover: {
        bg: "caw.400"
      }
    }
  },
}

export default extendTheme(theme)
