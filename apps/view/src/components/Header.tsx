import React from 'react';
import { Box, theme, Heading, Flex, Tooltip, Divider, Badge, Text, AvatarBadge, Stack, useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { styleConstants } from '../theme';



const HeaderBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    min-height: ${styleConstants.headerHeight};
    position: fixed;
    top: 0;
    z-index: ${styleConstants.topZindex};
`;


export const HeaderElement: React.FC = () => {
    return (
        <>
            <a href="/">
                <Heading
                    as="h1"
                    cursor="pointer"
                    bgGradient="linear(to-l, #07522c,#FF0080)"
                    bgClip="text"
                    letterSpacing="0.2rem" size="sm">NATSMAN</Heading>
            </a>

            <Stack isInline alignItems="center" justifyContent="flex-end" width="130px">

                {/* <Badge
                    _hover={{
                        opacity: '0.7'
                    }}
                    cursor="pointer"
                    fontSize=".85rem"
                    colorScheme="red">
                    settings
                    </Badge> */}
            </Stack>
        </>
    );
};

export const Header: React.FC<{ isDefault?: boolean }> = ({
    isDefault,
}): JSX.Element => {
    const { colorMode } = useColorMode()

    const bgColor = { light: '#ffffff', dark: 'blue.900' }
    const color = { light: 'gray.800', dark: 'white' }

    return (
        <header>
            {isDefault ? (
                <HeaderBox
                    borderBottom="1px solid"
                    borderColor={theme.colors.gray[100]}
                    display="flex" width="100%"
                    alignItems="center"
                    bg={bgColor[colorMode]}
                    color={color[colorMode]}
                    pl={2}
                >
                    <HeaderElement />
                </HeaderBox>
            ) : (
                    <HeaderBox
                        display="flex"
                        width="100%"
                        alignItems="center"
                    >
                        <HeaderElement />
                    </HeaderBox>
                )}
        </header>
    );
};

export const FormPageHeader: React.FC<{ formHeading: string; formSubHeading?: string }> = (props): JSX.Element => {
    const { formHeading, formSubHeading } = props;
    return (
        <React.Fragment>
            <Heading as="h3" fontWeight="500" size="lg">
                {formHeading}
            </Heading>
            {formSubHeading && (
                <Flex my="2" mb={4} justifyContent="flex-start">
                    <Text fontSize="sm">{formSubHeading}</Text>
                </Flex>
            )}
            <Divider mb={12} pb={2} />
        </React.Fragment>
    );
};