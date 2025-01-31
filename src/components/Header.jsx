import { Flex, HStack, Heading, Image, Button, Divider, IconButton, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'; // Import React Router Link
import { AiOutlineSetting } from 'react-icons/ai';
import logo from '../assets/logo.png'; // Ensure the logo path is correct

const Header = () => {
    return (
        <Flex
            as="header"
            alignItems="center"
            justifyContent="center"
            width="100%"
            px={8}
            py={4}
            bg="transparent"
            color="white"
            position="absolute"
            top={0}
            zIndex={1000}
        >
            <Flex
                alignItems="center"
                justifyContent="space-between"
                width="80%"
                maxWidth="1200px"
            >
                {/* Logo and Title */}
                <HStack spacing={1}>
                    <Link as={RouterLink} to="/" display="flex" alignItems="center">
                        <Image src={logo} alt="logo" boxSize={10} />
                        <Heading fontSize="2xl" fontWeight="extrabold" ml={2}>
                            UofT CourseSync
                        </Heading>
                    </Link>
                </HStack>

                {/* Navigation Links */}
                <HStack spacing={7}>
                    <Link
                        href="#"
                        fontSize="lg"
                        fontWeight="medium"
                        _hover={{ color: 'blue.400' }}
                    >
                        Courses
                    </Link>
                    <Link
                        href="#"
                        fontSize="lg"
                        fontWeight="medium"
                        _hover={{ color: 'blue.400' }}
                    >
                        Assignments
                    </Link>
                    <Link
                        href="#"
                        fontSize="lg"
                        fontWeight="medium"
                        _hover={{ color: 'red.500' }}
                    >
                        Tests
                    </Link>
                    <Link
                        href="#"
                        fontSize="lg"
                        fontWeight="medium"
                        _hover={{ color: 'green.500' }}
                    >
                        Grade Calculation
                    </Link>
                    <Link
                        href="#"
                        fontSize="lg"
                        fontWeight="medium"
                        _hover={{ color: 'blue.100' }}
                    >
                        Compare
                    </Link>
                </HStack>

                {/* Action Buttons */}
                <HStack spacing={4}>
                    <Button variant="link" color="white" fontSize="md" fontWeight="medium">
                        Log In
                    </Button>
                    <Button
                        as={RouterLink} // Use Chakra's `as` prop to enable routing
                        to="/signup" // Navigate to the Sign Up page
                        colorScheme="blue"
                        size="md"
                        variant="solid"
                    >
                        Sign Up
                    </Button>
                    <Divider orientation="vertical" borderColor="whiteAlpha.500" height="24px" />
                    <IconButton
                        icon={<AiOutlineSetting />}
                        aria-label="Settings"
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'whiteAlpha.200' }}
                    />
                </HStack>
            </Flex>
        </Flex>
    );
};

export default Header;
