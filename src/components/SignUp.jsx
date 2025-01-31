import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    VStack,
    Image,
    Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ensure the logo path is correct

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        setMessage('');
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:5000/api/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error details:', errorText);
                throw new Error('Failed to sign up');
            }

            const json = await response.json();
            console.log('Sign-Up Successful:', json);
            setMessage('User signed up successfully!');

            // Navigate back to the home page after a short delay
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error signing up:', error);
            setError('There was a problem signing up. Please try again.');
        }
    };

    return (
        <Box bg="rgb(21, 57, 107)" color="white" minH="100vh" py={10}>
            <VStack spacing={8} align="center">
                {/* Logo */}
                <Image src={logo} alt="UofT CourseSync Logo" boxSize="80px" />
                <Heading fontSize="3xl" fontWeight="bold">
                    Create an account
                </Heading>
                {message && <Text color="green.500">{message}</Text>}
                {error && <Text color="red.500">{error}</Text>}
                <Box
                    bg="white"
                    color="black"
                    p={6}
                    borderRadius="md"
                    boxShadow="md"
                    maxW="md"
                    width="100%"
                >
                    <VStack spacing={4}>
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button colorScheme="blue" onClick={handleSignUp} width="100%">
                            Sign Up
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Box>
    );
};

export default SignUp;
