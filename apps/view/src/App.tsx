import * as React from "react"
import {
  ChakraProvider,
  Box
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Shell from './Shell'
import theme from './theme'
import GlobalSetup from './components/Global'
import { ResponseEditorContainer, PayloadEditorContainer, ConfigurationEditorContainer } from './container'

export const App = () => (
  <ChakraProvider theme={theme}>
    <GlobalSetup />
    <Box textAlign="center" fontSize="xl">
      <ColorModeSwitcher justifySelf="flex-end" />
      <ConfigurationEditorContainer.Provider>
        <ResponseEditorContainer.Provider>
          <PayloadEditorContainer.Provider>
            <Shell />
          </PayloadEditorContainer.Provider>
        </ResponseEditorContainer.Provider>
      </ConfigurationEditorContainer.Provider>
    </Box>
  </ChakraProvider>
)
