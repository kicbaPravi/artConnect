import styled from 'styled-components';
import { Link as LinkFromRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import '@fontsource/barlow/100.css';
import '@fontsource/barlow'; // Defaults to weight 400
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow/800.css';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    font-family: "Barlow", sans-serif;
  }

  body {
    background-color: #FCFCFC;
  }

  a {
    text-decoration: none;
  }

 a.active{
  /* color: #a3d1ee; */
  color: #755F4D;
}

`;

// paragraph

interface ParagraphProps {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  $lineHeight?: string;
  $margin?: string;
  $displayOnMobile?: string;
}

export const Text = styled.p<ParagraphProps>`
  font-family: 'Inter', sans-serif;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1.6rem')};
  font-weight: ${(props) => (props.fontWeight ? props.fontSize : 400)};
  line-height: ${(props) => (props.$lineHeight ? props.$lineHeight : 'normal')};
  color: ${(props) => (props.color ? props.color : 'black')};
  margin: ${(props) => props.$margin};

  @media screen and (max-width: 700px) {
    display: ${(props) => props.$displayOnMobile};
  }
`;

// link

interface LinkProps {
  to: string;
  fontSize?: string;
  fontWeight?: string;
}

export const Link = styled(LinkFromRouter)<LinkProps>`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1.6rem')};
  font-weight: ${(props) => props.fontWeight};
  /* color: #0c1e82; */
  color: #755f4d;
  text-decoration: none;
  margin: 5px 0;
  &:hover,
  &:focus {
    color: grey;
  }
`;

interface FlexProps {
  $flexDirection?: string;
  $gap?: string;
  $margin?: string;
  padding?: string;
  $justifyContent?: string;
  $alignItems?: string;
  flex?: string;
  $borderLeft?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  gap: ${(props) => props.$gap};
  justify-content: ${(props) => props.$justifyContent};
  align-items: ${(props) => props.$alignItems};
  flex-direction: ${(props) => props.$flexDirection};
  margin: ${(props) => (props.$margin ? props.$margin : 0)};
  padding: ${(props) => props.padding};
  flex: ${(props) => props.flex};
  border-left: ${(props) => props.$borderLeft};
`;

export const Wrapper = styled.div`
  max-width: 1240px;
  margin: 0 auto;

  @media screen and (max-width: 600px) {
    padding: 0.5em 1.8em;
  }

  @media screen and (min-width: 601px) {
    padding: 0 2.5em;
  }
`;
