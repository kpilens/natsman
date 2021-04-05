import * as React from "react"
import {
  ChakraProvider,
  Box
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Shell from './Shell'
import theme from './theme'
import GlobalSetup from './components/Global'
import { ResponseContainer, PayloadContainer, ConfigurationContainer } from './container'

export const App = () => (
  <ChakraProvider theme={theme}>
    <GlobalSetup />
    <Box textAlign="center" fontSize="xl">
      <ColorModeSwitcher justifySelf="flex-end" />
      <ConfigurationContainer.Provider>
        <ResponseContainer.Provider>
          <PayloadContainer.Provider>
            <Shell />
          </PayloadContainer.Provider>
        </ResponseContainer.Provider>
      </ConfigurationContainer.Provider>
    </Box>
  </ChakraProvider>
)
