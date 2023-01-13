import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'
import { StyleConfig } from "@chakra-ui/theme-tools";
import foundations from './foundations'

const direction = 'ltr'

const config = {
  useSystemColorMode: true,
  initialColorMode: 'light',
  cssVarPrefix: 'teh',
  colorSchema: 'caw',
  theme: 'caw'
}

const components: Record<string, StyleConfig> = {
  CustomBadge: {
    baseStyle: ({ colorMode }) => ({
      bg: colorMode === "dark" ? "green.300" : "green.500",
      color: colorMode === "dark" ? "gray.800" : "white",
      textTransform: "uppercase",
      fontWeight: "semibold",
      letterSpacing: "0.02em",
      padding: "4px",
      borderRadius: "2px",
      fontSize: "12px"
    }),
    variants: {
      custom: ({ colorMode }) => ({
        bg: colorMode === "dark" ? "blue.200" : "blue.500",
        padding: "8px"
      })
    }
  },
  Text: {
    baseStyle: ({ colorMode }) => ({
      color: colorMode === "dark" ? "gray.50" : "gray.800",
    }),
    variants: {
      'with-shadow': {
        bg: 'red.400',
        boxShadow: '0 0 2px 2px #efdfde',
      },
      // 4. We can override existing variants
      solid: (props: StyleFunctionProps) => ({
        bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
      }),
      // 5. We can add responsive variants
      sm: {
        bg: 'teal.500',
        fontSize: 'md',
      },
    },

  },
  // Textarea: {
  //   baseStyle: ({ colorMode }) => ({
  //     _focus: {
  //       outlineColor: 'caw.500',
  //       borderColor: 'caw.500',
  //       focusBorderColor: 'caw.500',
  //       ringColor: 'caw.500',
  //     },
  //     borderColor: 'caw.500',
  //     borderInlineColor: 'caw.500',
  //     ringColor: 'caw.500',
  //     outlineColor: 'caw.500',
  //     field: {
  //       _focus: {
  //         outlineColor: 'caw.500',
  //         borderColor: 'caw.500',
  //         focusBorderColor: 'caw.500',
  //       }
  //     },
  //   }),
  // },
  // Input: {
  //   defaultProps: {
  //     colorScheme: "caw",
  //   },
  //   baseStyle: ({ colorMode }) => ({
  //     field: {
  //       _focus: {
  //         outlineColor: 'caw.500',
  //         borderColor: 'caw.500',
  //         focusBorderColor: 'caw.500',
  //       }
  //     },
  //   }),
  //   variants: {
  //     outline: ({ colorMode }) => ({
  //       field: {
  //         _focus: {
  //           borderColor: colorMode === "dark" ? "gray.500" : "gray.300",
  //         }
  //       }
  //     }),
  //   }
  // },
  Flex: {
    baseStyle: ({ colorMode }) => ({
      color: colorMode === "dark" ? "gray.50" : "gray.800",
    }),
  },
  Divider: {
    baseStyle: ({ colorMode }) => ({
      borderColor: colorMode === "dark" ? "gray.700" : "gray.400",
    }),
  },
  Button: {
    baseStyle: ({ colorMode, colorScheme }) => ({
      borderRadius: "md",
    }),
  },
  MenuList: {
    baseStyle: ({ colorMode }) => ({
      borderRadius: 10,
    }),
  },
  MenuItem: {
    baseStyle: ({ colorMode }) => ({
      borderRadius: 10,
    }),
  },
};

export const theme = {
  direction,
  ...foundations,
  config,
  components: components,
  styles: {
    global: () => ({
      body: {
        bg: "gray.50",
      },
    }),
  },
}

//* overide default text color to white for black background.  Adding brand colors
export default extendTheme(theme);
