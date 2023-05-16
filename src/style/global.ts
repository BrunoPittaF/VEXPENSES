import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
    border: 0;
    background: transparent;
  }

  body, input, textarea, button {
    font-size: 1rem;
  }

  a {
    text-decoration: none;
  }


`