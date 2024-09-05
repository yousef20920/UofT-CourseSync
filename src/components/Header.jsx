import { Flex, HStack, Heading, Image, Button, Link, Divider, IconButton } from '@chakra-ui/react';
import { AiOutlineSetting } from 'react-icons/ai'; // Import the settings icon
import logo from '../assets/logo.png'; // Make sure the logo path is correct

const Header = () => {
    return (
        <Flex
            as="header"
            alignItems="center"
            justifyContent="center"
            width="100%"
            px={8}
            py={4}
            bg="transparent" // Set to transparent to blend with the page
            color="white"
            position="absolute" // Make the header fixed to the top
            top={0}
            zIndex={1000} // Ensure the header is always on top
        >
            {/* Centered Header Content */}
            <Flex
                alignItems="center"
                justifyContent="space-between"
                width="80%"
                maxWidth="1200px"
            >
                {/* Logo and Title */}
                <HStack spacing={1}>
                    <Link href="/" display="flex" alignItems="center"> {/* Wrap logo and title with Link */}
                        <Image src={logo} alt="logo" boxSize={10} /> {/* Adjusted size */}
                        <Heading fontSize="2xl" fontWeight="extrabold" ml={2}>
                            UofT CourseSync
                        </Heading>
                    </Link>
                </HStack>

                {/* Navigation Links */}
                <HStack spacing={7}>
                    <Link href="#" fontSize="lg" fontWeight="medium" _hover={{ color: 'blue.400' }}>
                        Courses
                    </Link>
                    <Link href="#" fontSize="lg" fontWeight="medium" _hover={{ color: 'blue.400' }}>
                        Assignments
                    </Link>
                    <Link href="#" fontSize="lg" fontWeight="medium" _hover={{ color: 'red.500' }}>
                        Tests
                    </Link>
                    <Link href="#" fontSize="lg" fontWeight="medium" _hover={{ color: 'green.500' }}>
                        Grade Calculation
                    </Link>
                    <Link href="#" fontSize="lg" fontWeight="medium" _hover={{ color: 'blue.100' }}>
                        Compare
                    </Link>
                </HStack>

                {/* Action Buttons, Divider, and Settings Icon */}
                <HStack spacing={4}>
                    <Button variant="link" color="white" fontSize="md" fontWeight="medium">
                        Log In
                    </Button>
                    <Button colorScheme="blue" size="md" variant="solid">
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
