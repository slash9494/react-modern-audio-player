import { createGlobalStyle } from "styled-components";
import "./vars.css";
export const GlobalStyle = createGlobalStyle`

.rm-audio-player-provider {
  * {
    box-sizing: border-box;
    font: inherit;
    font-size: 100%;
  }

  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    margin: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    vertical-align: baseline;
    border: 0;
  }
}`;
