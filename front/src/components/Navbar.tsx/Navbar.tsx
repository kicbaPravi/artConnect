import {
  Wrapper,
  AccountWrapper,
  CloseBtn,
  HamburgerMenu,
  Menu,
  Page,
  AccountMenu
} from './NavbarStyle.ts';
import closeBtnImg from '../../assets/close.svg';
import menuBtnImg from '../../assets/menu.svg';
import accountIcon from '../../assets/account-icon.svg';
import logoutButton from '../../assets/logoutButton.svg';

import { Flex, Text } from '../../../src/GlobalStyle.ts';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { logOut } from '../../store/slice/authSlice.ts';

const Navbar = (): JSX.Element => {
  const [openMenu, setOpenMenu] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const loggedUser = useAppSelector((state: any) => state.auth.user.name);
  const dispatch = useAppDispatch();

  return (
    <>
      <Wrapper>
        <Flex $justifyContent="space-between" $alignItems="center" $margin="0">
          {/* <Logo src={logoImg}></Logo> */}
          <Flex $gap="1.2em" $alignItems="center">
            <div
              style={{
                width: '5em',
                height: '5em',
                backgroundColor: '#D9D9D9',
                borderRadius: '.4em'
              }}
            />
            <Text
              color="#755F4D"
              fontWeight="700"
              fontSize="1.6rem"
              $lineHeight="2.4em"
              $displayOnMobile="none"
            >
              artConnect
            </Text>
          </Flex>

          <Menu open={openMenu}>
            <CloseBtn src={closeBtnImg} onClick={() => setOpenMenu(false)} />
            {/* <div style={{ borderBottom: '1px solid black', width: '100%' }}> */}
            <Page to="/organizer">Organizer</Page>
            {/* </div> */}
            <Page to="/shop">Shop</Page>
            <Page to="/contacts">Contacts</Page>
            <Page to="/artists">Artists</Page>
          </Menu>

          <AccountWrapper onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
            <img src={accountIcon} alt="" />

            <Text
              fontFamily="Inter"
              fontSize="1.2rem"
              $lineHeight="1.452em"
              color="#0A0A0A"
              $displayOnMobile="none"
            >
              {loggedUser}
            </Text>
            {/* <button onClick={() => dispatch(logOut())}>Logout</button> */}
            {accountMenuOpen && (
              <AccountMenu onClick={() => dispatch(logOut())}>
                <Text fontSize="1.2rem" $lineHeight="14.52px">
                  Logout
                </Text>
                <img src={logoutButton} alt="logout_icon" />
              </AccountMenu>
            )}
          </AccountWrapper>

          <HamburgerMenu src={menuBtnImg} onClick={() => setOpenMenu(true)} />
        </Flex>
      </Wrapper>
    </>
  );
};

export default Navbar;
