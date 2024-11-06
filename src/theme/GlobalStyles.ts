import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html, body{
    margin: 0;

    font-size: ${props => props.theme.media.mobile.size};

    ${props => props.theme.media.tablet.query} {
      font-size: ${props => props.theme.media.tablet.size}
    }

    ${props => props.theme.media.HD.query} {
      font-size: ${props => props.theme.media.HD.size}
    }

    ${props => props.theme.media.fullHD.query} {
      font-size: ${props => props.theme.media.fullHD.size}
    }

    *::selection {
      background: transparent;
    }

    * {
      box-sizing: border-box;
      font-family: ${props => props.theme.typography.fontMulish.family};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    figure,
    pre,
    dl,
    dd,
    blockquote,
    input[type="radio"],
    input[type="checkbox"] {
      margin: 0
    }

    h2 {
      &:not([class]) {
        margin: 0
      }
    }

    legend {
      padding: 0
    }

    fieldset,
    ol {
      padding: 0;
      margin: 0
    }

    ul,
    ol {
      list-style: none
    }

    figure,
    figcaption,
    img {
      display: block
    }

    img {
      max-width: 100%;
    }

    a {
      text-decoration: none
    }

    fieldset {
      border: 0
    }

    label {
      display: flex
    }

    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="search"] {
      appearance: none
    }

    button::-moz-focus-inner {
      border: 0
    }

    button {
      cursor: pointer;
      border: 0;
      box-shadow: none;
    }

    button[disabled] {
      cursor: default;
    }
  };
`

export default GlobalStyles
