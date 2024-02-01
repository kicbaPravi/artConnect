import { Link as LinkFromRouter } from 'react-router-dom';
import styled from 'styled-components';

export const LoginWrapper = styled.div`
  height: 100vh;
  max-width: 600px;
  margin: auto;
  padding: 5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Heading = styled.h2`
  margin-bottom: 0.2em;
  font-size: 4rem;
`;

export const Subheading = styled.p`
  font-size: 2.2rem;
  font-weight: 500;
  color: #755f4d;
`;

export const Section = styled.section`
  padding: 4em 0;
  display: flex;
  flex-direction: column;
  gap: 3em;
`;

export const CtaWrapper = styled.div`
  padding: 1em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
`;

export const LoginButton = styled.button`
  width: 100%;
  background-color: #755f4d;
  color: white;
  border-radius: 5px;
  padding: 1.5em;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;

  @media (min-width: 800px) {
    max-width: 40%;
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed; /* Optionally change the cursor */
  }
`;

export const Link = styled(LinkFromRouter)`
  color: #0c1e82;
  text-decoration: none;
  font-size: 2rem;
  margin: 5px;
  &:hover,
  &:focus {
    color: grey;
  }
`;

export const LineWithMiddleText = styled.p`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin: 50px 0;

  span {
    background: #fff;
    font-size: 1.7em;
    padding: 0 10px;
  }
`;
