import { Link as LinkFromRouter } from 'react-router-dom';
import styled from 'styled-components';

export const Title = styled.h1`
  color: #0a0a0a;
  font-size: 3.4rem;
  font-weight: 700;
  line-height: 40.8px;

  @media screen and (max-width: 600px) {
    font-size: 2.1rem;
  }
`;

export const VerticalSeparator = styled.span`
  font-size: 2rem;
  color: #a6a6a6;
`;

export const CategoryTitle = styled.h1`
  color: #b8b8b8;
  font-size: 2.9rem;
`;

export const MainOptions = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8em;

  @media screen and (min-width: 1050px) {
    gap: 3em;
  }
`;

export const MainInput = styled.input`
  border-color: #b8b8b8;
  padding: 15px;
  font-size: 2rem;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
`;

export const MainBarWrapper = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;
  /* margin-bottom: 44px; */

  @media screen and (min-width: 600px) {
    align-items: center;
  }

  @media screen and (min-width: 1050px) {
    /* margin-bottom: 94px; */
  }
`;

export const MainP = styled.p<any>`
  font-size: 1.8rem;
  line-height: 21.6px;
  color: #8d8d8d;
  cursor: ${(props: any) => props.withCursor && 'pointer'};

  span {
    color: #212121;
    margin-left: 10px;
    font-weight: 500;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
  }
`;

export const PicturesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7.25em;
  margin-bottom: 8.4em;
  margin-top: 44px;

  img {
    width: 300px;
  }

  @media screen and (min-width: 1050px) {
    margin-top: 94px;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  max-width: 120px;

  @media screen and (min-width: 1050px) {
    max-width: unset;
  }
`;

export const ImageContainer = styled.div`
  /* display: flex; */
  width: 120px;
  height: 120px;
  cursor: pointer;
  /* height: 274px; */
  &:hover {
    transform: scale(1.05);
    transition: transform 0.5s;
  }

  @media screen and (min-width: 1050px) {
    width: 190px;
    height: 230px;
  }
`;

export const TitleImage = styled.h3`
  margin: 1em 0;
  font-family: Barlow;
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 25.2px;
  letter-spacing: 0em;
  color: #0a0a0a;
  max-width: 90%;

  @media screen and (min-width: 1050px) {
    margin: 2.4em 0 1.6em 0;
    font-size: 2.1rem;
  }
`;

export const StatusCircle = styled.div<{ color: string }>`
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: ${(props: any) => props.color};
`;

export const TextImg = styled.p`
  text-transform: capitalize;
  font-family: Barlow;
  font-size: 1.4rem;
  line-height: 24px;
  letter-spacing: 0em;
  color: #0a0a0a;
  margin-bottom: 0.4em;

  @media screen and (min-width: 1050px) {
    font-size: 1.6rem;
  }
`;

export const OpenModalButton = styled.button`
  padding: 10px 65px;
  color: #fcfcfc;
  border-radius: 4px;
  background: #755f4d;
  font-size: 1.6rem;
  line-height: 24px;
  cursor: pointer;
  border: none;
  font-family: 'Barlow';

  @media screen and (max-width: 600px) {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    padding: 0;
    font-size: x-large;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2em;
  margin-top: 2.4em;
`;

export const Chips = styled.div`
  padding: 5.5px 10px;
  display: flex;
  gap: 1.2em;
  border: 0.5px solid black;
  border-radius: 4px;
  font-family: Inter;
  font-size: 1.2rem;
  line-height: 15px;
  letter-spacing: 0em;
  color: #141414;

  img {
    cursor: pointer;
  }
`;
