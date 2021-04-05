import React from 'react';
import { Box, Flex, Select, theme, useColorMode, Input, Button } from '@chakra-ui/react'
import { ResponseEditorContainer } from '../container'

export default function RequestOptions() {
    const { colorMode } = useColorMode()

    const bgColor = { light: '#ffffff', dark: 'blue.900' }
    const color = { light: 'gray.800', dark: 'white' }

    /* Manage Requests building and api response */
    let responseState = ResponseEditorContainer.useContainer()

    const handleClick = () => {
        responseState.update("$$>>ddd foreign state")

    }

    return (
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
                        <option value="send">SEND</option>
                        <option value="emit">EMIT</option>
                    </Select>
                </Box>

                <Box maxW="30em" w="100%">
                    <Input bg="blackAlpha.50" borderLeft="none" defaultValue="http://localhost:4222" placeholder="Enter PubSub Server URL" />
                </Box>
                <Button onClick={handleClick} ml={2} colorScheme="teal" variant="outline">
                    Request
            </Button>

            </Flex>
        </Box>
    )
}