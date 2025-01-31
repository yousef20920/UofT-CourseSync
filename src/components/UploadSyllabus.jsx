import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, VStack, Text, Button, Icon } from '@chakra-ui/react';
import { AiOutlineCloudUpload } from 'react-icons/ai'; // Import the cloud upload icon

const UploadSyllabus = ({ extractSyllabusData }) => {
    const [file, setFile] = useState(null); // State to store the uploaded file
    const [error, setError] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]); // Store the uploaded file in state
            setError(null); // Clear any previous errors
        } else {
            setError('Please upload a valid PDF file.');
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] }, // Restrict to PDF files
        multiple: false,
        noClick: true, // Prevent Dropzone's internal click handling
    });

    const handleBoxClick = () => {
        document.querySelector('input[type="file"]').click(); // Manually trigger the click on the hidden input
    };

    const handleStart = () => {
        if (file) {
            extractSyllabusData(file); // Trigger extraction with the stored file
        } else {
            setError('No file selected. Please upload a syllabus.');
        }
    };

    return (
        <VStack spacing={4} align="center" width="100%" maxWidth="1200px" mx="auto">
            <Text fontSize="lg" fontWeight="bold" color="white" textAlign="center">
                Upload your syllabus here
            </Text>
            <Box
                {...getRootProps()}
                bg="green.400"
                p={10}
                width="100%"
                maxWidth="800px"
                height="250px"
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="md"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                _hover={{ borderColor: 'blue.500' }}
                mx="auto"
                onClick={handleBoxClick} // Trigger the click event
            >
                <input {...getInputProps()} />
                <Icon as={AiOutlineCloudUpload} boxSize={12} color="white" />
                <Text mt={2} color="white" fontWeight="medium">
                    Drop files or click here
                </Text>
                <Button
                    mt={4}
                    size="md"
                    colorScheme="blue"
                    variant="solid"
                    onClick={handleBoxClick} // Ensure button click triggers file selection
                >
                    Choose File
                </Button>
            </Box>
            {error && <Text color="red.500">{error}</Text>}
            <Button colorScheme="blue" mt={2} alignSelf="center" onClick={handleStart}>
                START →
            </Button>
        </VStack>
    );
};

export default UploadSyllabus;
