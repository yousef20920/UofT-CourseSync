import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    VStack,
} from '@chakra-ui/react';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleLogIn = async () => {
        setMessage('');
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error details:', errorText);
                throw new Error('Failed to log in');
            }

            const json = await response.json();
            console.log('Log-In Successful:', json);
            setMessage('Logged in successfully!');
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <Box
            bg="white"
            color="black"
            p={6}
            borderRadius="md"
            boxShadow="md"
            maxW="md"
            mx="auto"
        >
            <VStack spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    Log In
                </Text>
                {message && <Text color="green.500">{message}</Text>}
                {error && <Text color="red.500">{error}</Text>}
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
                <Button colorScheme="blue" onClick={handleLogIn}>
                    Log In
                </Button>
            </VStack>
        </Box>
    );
};

export default LogIn;
