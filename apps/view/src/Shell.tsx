import React from 'react';
import { useColorMode, theme, Text, Box, Flex, Input, Select, Button } from '@chakra-ui/react'

import { Wrapper } from './components/Container'
import { Header } from './components/Header'
import Editor from './components/AceEditor'
import OptionTab from './components/OptionsTab'





export default function Page(): JSX.Element {
    const { colorMode } = useColorMode()

    const bgColor = { light: '#ffffff', dark: 'blue.900' }
    const color = { light: 'gray.800', dark: 'white' }

    return (
        <>

            <Header isDefault={true} />
            <Wrapper>
                <Box
                    position="fixed"
                    left="0"
                    minW="240px"
                    borderRight="1px solid"
                    borderColor={theme.colors.blackAlpha[100]}
                    minHeight="100vh"
                >
                    <Text textAlign="left" p={2} fontSize="small" mt={6}>Request Logs</Text>

                </Box>

                <Box
                    position="relative"
                    ml="240px"
                    pl={2}
                    pt={7}
                    pb={2}
                    bg={bgColor[colorMode]}
                    color={color[colorMode]}
                    borderBottom={theme.borders["1px"]}
                    borderColor={theme.colors.gray[100]}
                >
                    <Flex justify="flex-start">
                        <Box maxW="120px" w="100%">
                            <Select bg="blackAlpha.100">
                                <option value="option1">SEND</option>
                                <option value="option2">EMIT</option>
                            </Select>
                        </Box>

                        <Box maxW="30em" w="100%">
                            <Input bg="blackAlpha.50" borderLeft="none" defaultValue="http://localhost:4222" placeholder="Enter PubSub Server URL" />
                        </Box>
                        <Button ml={2} colorScheme="teal" variant="outline">
                            Request
                        </Button>

                    </Flex>
                </Box>

                <Box
                    position="relative"
                    ml="240px"
                >

                    <Flex minH="calc(100vh - 120px)">
                        <Box w="50%">
                            <OptionTab />
                        </Box>

                        <Box w="50%">
                            <Editor />
                        </Box>

                    </Flex>

                </Box>

            </Wrapper>
        </>
    )
}