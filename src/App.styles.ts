import styled, { createGlobalStyle } from "styled-components";
import BGImage from "./assets/images/JTA-logo.png";

export const GlobalStyle = createGlobalStyle`
html{
height:100%;
}

body{
background-image:url(${BGImage});
background-size:cover;
background-position: center;
margin:0;
padding:0 20px;
display:flex;
justify-content:center;
}

*{
box-sizing:border-box;
font-family:'Catamaran', "Arial"
}

`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .text-bg {
    font-family: "Catamaran";
    background-image: linear-gradient(180deg, #18222f, #6b9bd5);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-kit: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
  }

  > p {
    font-family: "Arial" !important;
    font-size: 4rem;
    font-weight: bolder;
    filter: drop-shadow(2px 2px 5px #ffeda3) !important;
    margin: 0;
    -webkit-text-stroke: 2px black;
  }

  h1 {
    font-size: 80px;
    font-weight: bolder;
    text-align: center;
    margin: 0px;
  }

  .start {
    cursor: pointer;
    background-image: linear-gradient(180deg, #18222f, #6b9bd5);
    border: 2px solid lightblue;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
    color: white;
    max-width: 200px;
    font-size: 1.5rem;
  }
`;
