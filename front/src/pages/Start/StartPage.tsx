import {
  ButtonsWrapper,
  Heading,
  Info,
  LoginButton,
  HomeWrapper,
  Logo,
  SignUpButton,
  Subheading
} from './StartPageStyle';
import { useNavigate } from 'react-router-dom';
import loginImageMobile from '../../assets/login-picture.png';

const StartPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <HomeWrapper>
      <Logo>artConnect</Logo>
      <img src={loginImageMobile} alt="login" style={{ width: '100%' }} />
      <Info>
        <Heading>Hello !</Heading>
        <Subheading>
          Organize, discover, and connect with amazing artists.
        </Subheading>
        <ButtonsWrapper>
          <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
          <SignUpButton onClick={() => navigate('/register')}>
            Register
          </SignUpButton>
        </ButtonsWrapper>
      </Info>
    </HomeWrapper>
  );
};

export default StartPage;
