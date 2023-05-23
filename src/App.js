import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import './app.css';
import Demo from './pages/demo';

function App() {
  return (
    <ChakraProvider theme={theme} bgColor='#f7fafc'>
      <Demo />
    </ChakraProvider>
  );
}
export default App;
