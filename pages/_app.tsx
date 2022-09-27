import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react"

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  default: {
    "primary": "#FE715D",
    "secondary": "#F4724A",
    "terciary": "#631C1C",
    "background": "#080A0B",
    "white": "#FFFFFF",
    "gray": "#959595",
    "zinc": "#202020",
    "blue": "#2F2E41",
  }
}

const theme = extendTheme({ colors })


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp
