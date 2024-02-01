import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 15px;
  width: 100%;
  margin-bottom: 2.4em;

  @media screen and (min-width: 600px) {
    margin-bottom: 4.3em;
  }

  @media screen and (min-width: 1050px) {
    margin-bottom: 4.8em;
  }
`;

export const Logo = styled.img`
  width: 6em;
`;

export const Menu = styled.div<any>`
  display: flex;
  flex-direction: column;
  padding: 3.6em;
  align-items: center;
  width: 34.3em;
  border-radius: 12px;
  gap: 2.4em;
  position: fixed;
  top: 121px;
  left: ${(props) => props.open && '50%'};
  /* transform: translate(-50%, 0); */
  transform: ${(props) => props.open && 'translate(-50%, 0)'};
  right: ${(props) => (props.open ? 0 : '-100%')};
  background-color: ${(props) => (props.open ? '#ffffff' : 'unset')};
  transition: center 0.5s ease-in-out;
  border: 1px solid black;

  @media screen and (min-width: 600px) {
    position: unset;
    border: none;
    flex-direction: row;
    height: auto;
    width: auto;
  }

  @media screen and (min-width: 950px) {
    padding: 3.8em;
  }
`;

export const Page = styled(NavLink)<any>`
  color: ${(props) => (props.active ? 'black' : '#0A0A0A')};
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.4em;
  letter-spacing: 0em;
  padding-bottom: 8px;

  border-bottom: 0.5px solid #a6a6a6;
  width: 100%;
  text-align: center;

  &:hover,
  &:focus {
    color: #755f4d;
    cursor: pointer;
  }

  &:visited,
  &:active {
    text-decoration: none;
  }

  @media screen and (min-width: 600px) {
    border: none;
    font-size: 1.5rem;
  }

  @media screen and (min-width: 1000px) {
    font-size: 2rem;
  }
`;

export const CloseBtn = styled.img`
  &:hover,
  &:focus {
    cursor: pointer;
  }

  @media screen and (min-width: 600px) {
    display: none;
  }
`;

export const HamburgerMenu = styled.img`
  width: 4em;

  &:hover,
  &:focus {
    cursor: pointer;
  }

  @media screen and (min-width: 600px) {
    display: none;
  }

  @media screen and (max-width: 600px) {
    order: 2;
  }
`;

export const RoundedSearch = styled.input`
  width: 250px;
  border-radius: 35px;
  border: none;
  background: #eff2f5;
  padding-left: 15px;
  margin-left: 10px;
  font-size: 15px;
`;

export const AccountWrapper = styled.div`
  display: flex;
  margin: 0;
  align-items: center;
  border-left: 1px solid #0a0a0a;
  position: relative;
  cursor: pointer;

  img {
    margin-left: 3em;
    margin-right: 1.2em;
  }

  @media screen and (max-width: 600px) {
    order: 3;
    border-left: none;

    img {
      margin: 0;
    }
  }
`;

export const AccountMenu = styled.div`
  display: flex;
  gap: 1em;
  border-radius: 4px;
  position: absolute;
  top: 27px;
  right: 0;
  border: 0.5px solid black;
  padding: 10px 15.5px;
  cursor: pointer;
`;
