import * as React from "react"
import {
  ChakraProvider,
  Box,
  Link,
  VStack,
  Grid,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Shell from './Shell'
import theme from './theme'
import GlobalSetup from './components/Global'

export const App = () => (
  <ChakraProvider theme={theme}>
    <GlobalSetup />
    <Box textAlign="center" fontSize="xl">
      <ColorModeSwitcher justifySelf="flex-end" />
      <Shell />
    </Box>
  </ChakraProvider>
)
