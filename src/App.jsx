import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container, VStack, Text } from '@chakra-ui/react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import UploadSyllabus from './components/UploadSyllabus.jsx';
import SignUp from './components/SignUp.jsx'; // Import SignUp component

// Home Page Component
const Home = () => (
    <Box bg="rgb(21, 57, 107)" color="white" minH="100vh" py={10}>
        <Header /> {/* Updated Header */}
        <Container maxW="7xl" centerContent>
            <VStack spacing={10} align="center" mt={60}>
                <Text fontSize="4xl" fontWeight="bold" textAlign="center">
                    Find and manage your courses at UofT
                </Text>
                <UploadSyllabus />
            </VStack>
            <Footer />
        </Container>
    </Box>
);

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    </Router>
);

export default App;
