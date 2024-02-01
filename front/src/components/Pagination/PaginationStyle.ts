import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  margin: auto;
  width: 33.2em;
  padding: 1em;
  display: flex;
  gap: 1.2em;
`;

export const NavButton = styled.div<any>`
  width: 2.4em;
  height: 2.4em;
  display: grid;
  place-items: center;
  border-radius: 0.4em;
  background-color: ${(props) =>
    props.background ? props.background : 'transparent'};
  color: ${(props) => (props.color ? props.color : '#0A0A0A')};
  font-family: Inter;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0em;
  cursor: pointer;
`;
