import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, VStack, Text, Button, Icon, HStack, Progress } from '@chakra-ui/react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdCancel, MdInfoOutline, MdUpload } from 'react-icons/md';

const UploadSyllabus = ({ extractSyllabusData }) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setError(null);
            startFileUpload();
        } else {
            setError('Please upload a valid file.');
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.pdf',
        multiple: false,
    });

    const startFileUpload = () => {
        setUploading(true);
        setProgress(0);
        const uploadInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(uploadInterval);
                    setUploading(false);
                    return 100;
                }
                return prev + 10; // Simulate upload progress
            });
        }, 200); // Simulate upload every 200ms
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
                width="300%"
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
            >
                <input {...getInputProps()} />
                <Icon as={AiOutlineCloudUpload} boxSize={12} color="white" />
                <Text mt={2} color="white" fontWeight="medium">
                    {file ? 'File added! Start task' : 'Drop files or click here'}
                </Text>
                <Button
                    mt={4}
                    size="md"
                    colorScheme="blue"
                    variant="solid"
                    onClick={() => document.querySelector('input[type="file"]').click()}
                >
                    Choose File
                </Button>
            </Box>
            {file && (
                <Box
                    bg="blue.500"
                    p={2}
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    width="126%" // Wider box for file name
                    mt={2}
                    color="white"
                    position="relative"
                >
                    <HStack justifyContent="space-between" width="100%">
                        <Text isTruncated>{file.name}</Text> {/* Truncated if file name is too long */}
                        <HStack spacing={2}>
                            <Text>{(file.size / 1024).toFixed(2)} KB</Text>
                            <Icon as={MdInfoOutline} />
                            <Icon as={MdUpload} />
                            <Icon as={MdCancel} color="red.500" cursor="pointer" onClick={() => setFile(null)} />
                        </HStack>
                    </HStack>
                    <Progress
                        value={progress}
                        size="xs" // Thinner progress bar
                        colorScheme={uploading ? 'orange' : 'green'}
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                        borderBottomRadius="md"
                    />
                </Box>
            )}
            {error && <Text color="red.500">{error}</Text>}
            <Button colorScheme="blue" mt={2} alignSelf="center" onClick={extractSyllabusData}>
                START →
            </Button>
        </VStack>
    );
};

export default UploadSyllabus;
