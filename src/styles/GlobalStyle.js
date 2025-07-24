import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    }

    body {
    font-family: 'Roboto', sans-serif;
    background-color: #FFF8F2;
    color: #4B4B4B;
    }`

export default GlobalStyle;