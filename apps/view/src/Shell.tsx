import React from 'react';
import { theme, Text, Box, Flex } from '@chakra-ui/react'

import { Wrapper } from './components/Container'
import { Header } from './components/Header'
import ApiResponseView from './components/EditorResponseView'
import OptionTab from './components/OptionsTab'
import RequestOptions from './components/RequestOptions';





export default function Page(): JSX.Element {

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
                    minHeight="calc(100vh - 88px)"
                >
                    <Text textAlign="left" p={2} fontSize="small" mt={6}>Request Logs</Text>

                </Box>
                <RequestOptions />

                <Box
                    position="relative"
                    ml="240px"
                >
                    <Flex minH="calc(100vh - 120px)">
                        <Box w="50%"><OptionTab /></Box>
                        <Box w="50%"><ApiResponseView /></Box>
                    </Flex>
                </Box>

            </Wrapper>
        </>
    )
}