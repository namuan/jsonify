import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: sans-serif;
    transition: all 0.25s linear;

    --primary-color: ${({ theme }) => theme.primary};
    --secondary-color: ${({ theme }) => theme.secondary};
    --text-color: ${({ theme }) => theme.text};
  }
`;
