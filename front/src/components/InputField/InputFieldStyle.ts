import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const Input = styled.input`
  font-family: 'Barlow';
  padding: 10px;
  font-size: 1.6rem;
  line-height: 24px;
  border: 0.5px solid #a6a6a6;
  border-radius: 8px;
  outline: none;

  &::placeholder {
    color: #a6a6a6;
  }
`;
