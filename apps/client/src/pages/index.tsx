import React from 'react';
import Head from 'next/head'
// import { NextPageContext } from 'next'
import { useColorMode, Box, Flex, Input, Select, Button } from '@chakra-ui/react'



import { Wrapper } from '../components/Container'
import Editor from '../components/Editor'

import { Header } from '../components/Header'
import theme from '../theme';




export default function Page(): JSX.Element {
  const { colorMode } = useColorMode()

  const bgColor = { light: '#f7f7f7', dark: 'blue.900' }
  const color = { light: 'gray.800', dark: 'white' }

  return (
    <>
      <Head>
        <title>Natsman | Nestjs Message Pattern Client</title>
      </Head>
      <Header isDefault={true} />
      <Wrapper>
        <Box
          position="fixed"
          left="0"
          minW="40px"
          borderRight="1px solid"
          borderColor={theme.colors.blackAlpha[100]}
          height="100%">

        </Box>

        <Box position="relative" zIndex="10" pl={12} mt="48px"
          pt={6}
          pb={4}
          bg={bgColor[colorMode]}
          color={color[colorMode]}
          borderBottom={theme.borders["1px"]}
          borderColor={theme.colors.gray[100]}
        >
          <Flex justify="flex-start">
            <Box maxW="120px" w="100%">
              <Select>
                <option value="option1">SEND</option>
                <option value="option2">EMIT</option>
              </Select>
            </Box>

            <Box maxW="30em" w="100%">
              <Input borderLeft="none" defaultValue="http://localhost:4222" placeholder="Enter PubSub Server URL" />
            </Box>
            <Button ml={2} colorScheme="teal" variant="outline">
              Request
            </Button>

          </Flex>

        </Box>


        {process.browser && <Editor />}


      </Wrapper>
    </>
  )
}


// Page.getInitialProps = async (ctx: NextPageContext) => {

//   if (Auth.redirectIfNotAuthenticated(ctx, '/login')) {
//     return { props: {} };
//   }

//   return {
//     props: {

//     }
//   }
// }