
import { extendTheme } from '@chakra-ui/react'

//overide default text color to white for black background.  Adding brand colors
const theme = extendTheme({
    initialColorMode: 'dark',
    useSystemColorMode: true,
    components: {
        Text: {
            baseStyle: {
                color: "black"
            },
        },
    },
    colors: {
        brand: {
            100: "#f2e266",
            200: "#e3d464",
            900: "#1a202c",
        },
    },
});

export default theme;
