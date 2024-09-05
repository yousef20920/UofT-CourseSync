import { Box, Heading, Text, VStack, Input, Flex, Icon, Center } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai'; // Import the search icon
import logo from '../assets/logo.png'; // Make sure the logo path is correct

const BodyContent = () => {
    return (
        <VStack
            spacing={6}
            align="center"
            justify="center"
            width="100%"
            height="80vh" // Adjust height to center content vertically
            bg="black"
            color="white"
        >
            {/* Logo and Tagline */}
            <Center>
                <Box textAlign="center">
                    <Image src={logo} alt="logo" boxSize="50px" mb={4} />
                    <Heading as="h1" size="2xl" mb={2}>
                        Find and browse courses offered at UofT
                    </Heading>
                </Box>
            </Center>

            {/* Search Bar */}
            <Flex
                align="center"
                bg="gray.800"
                borderRadius="md"
                width="50%"
                maxWidth="600px"
                padding={4}
            >
                <Icon as={AiOutlineSearch} boxSize={6} color="gray.400" mr={2} />
                <Input
                    placeholder="Course or Keyword (Press '/' to focus)"
                    variant="unstyled"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                />
            </Flex>

            {/* Decorative Elements (Optional) */}
            <Box position="absolute" top="20%" right="10%" color="red.400" fontSize="4xl">
                <Icon as={AiOutlineSearch} /> {/* Replace this with any decorative icon or shape */}
            </Box>
            <Box position="absolute" bottom="15%" left="10%" color="blue.400" fontSize="4xl">
                <Icon as={AiOutlineSearch} /> {/* Replace with another icon or shape */}
            </Box>
        </VStack>
    );
};

export default BodyContent;
