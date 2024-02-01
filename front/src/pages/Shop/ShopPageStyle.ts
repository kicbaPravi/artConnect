import styled from 'styled-components';

export const HomeWrapper = styled.div`
  height: 100vh;
  padding: 3em;
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5em;

    img {
      max-height: 400px;
      max-width: 500px;
    }
  }
`;

export const Logo = styled.h1`
  @media (min-width: 800px) {
    display: none;
  }
`;

export const Info = styled.div``;

export const Heading = styled.h2`
  text-align: center;
  margin-top: 0.9em;
  margin-bottom: 0.2em;
  font-size: 4rem;
`;

export const Subheading = styled.p`
  font-size: 2rem;
  text-align: center;
  font-weight: 100;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4em;
  gap: 2em;
`;

export const LoginButton = styled.button`
  width: 60%;
  background-color: #0c1e82;
  color: white;
  border-radius: 5px;
  padding: 1.5em;
  font-family: 'Poppins', sans-serif;

  @media (min-width: 800px) {
    max-width: 40%;
  }
`;

export const SignUpButton = styled.button`
  width: 60%;
  border-radius: 5px;
  padding: 1.5em;
  color: #0c1e82;
  border: 2px solid #0c1e82;
  font-family: 'Poppins', sans-serif;

  @media (min-width: 800px) {
    max-width: 40%;
  }
`;
