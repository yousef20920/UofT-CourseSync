import { useState } from 'react';
import { Container, Box, VStack, Spinner, Text } from '@chakra-ui/react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import UploadSyllabus from './components/UploadSyllabus';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [syllabusData, setSyllabusData] = useState(null);
  const [error, setError] = useState(null);

  const extractSyllabusData = async (file) => {
    console.log('Extracting syllabus data for file:', file);
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('syllabus', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/extract-syllabus', {
        method: 'POST',
        body: formData,
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error details:', errorText);
        throw new Error('Failed to extract syllabus data');
      }

      const json = await response.json();
      console.log('Extracted Syllabus Data:', json);
      setSyllabusData(json);
    } catch (error) {
      console.error('Error extracting syllabus data:', error);
      setError('There was a problem extracting syllabus data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box bg="rgb(21, 57, 107)" color="white" minH="100vh" py={10}>
        <Container maxW="7xl" centerContent>
          <Header />
          <VStack spacing={10} align="center" mt={60}> {/* Increased mt for more space */}
            <Text fontSize="4xl" fontWeight="bold" textAlign="center">
              Find and manage your courses at UofT
            </Text>
            {error && (
                <Box bg="red.500" color="white" p={4} borderRadius="md">
                  {error}
                </Box>
            )}
            <UploadSyllabus extractSyllabusData={extractSyllabusData} />
          </VStack>
          {loading && <Spinner size="xl" mt={5} />}
          <Footer />
        </Container>
      </Box>
  );
};

export default App;
