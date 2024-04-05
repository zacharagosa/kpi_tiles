import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#ed0002',  // Verizon Red
    },
    secondary: {
      main: '#000000',  // Black
      contrastText: '#fff' // Ensure good contrast on the dark background
    },
    // Optional additions for a more robust palette:
    error: { 
      main: '#ed0002', // A darker shade of red can be used for errors
    },
    warning: { 
      main: '#b8b8b8', 
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)', // Slightly softened black for text
      secondary: 'rgba(0, 0, 0, 0.54)'
    }
  },




  typography: {
    fontFamily: "Roboto",
    h1: {
      fontSize: '3rem', // Adjust font size as needed
      fontWeight: 600,   // Set font weight
      lineHeight: 1.2,  // Adjust line height if desired
    },
  },
  // Other customizations
});

export default myTheme; 