import styled from 'styled-components';

export const LoginWrapper = styled.div`
  height: 100vh;
  max-width: 600px;
  margin: auto;
  padding: 5em;
  display: flex;
  flex-direction: column;
`;

export const Heading = styled.h2`
  margin-bottom: 0.2em;
  font-size: 4rem;
`;

export const Subheading = styled.p`
  font-size: 2.2rem;
  font-weight: 500;
  color: #283893;
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
  background-color: #0c1e82;
  color: white;
  border-radius: 5px;
  padding: 1.5em;
  font-family: 'Poppins', sans-serif;

  @media (min-width: 800px) {
    max-width: 40%;
  }
`;
