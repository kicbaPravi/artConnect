import React from 'react';
import { Formik } from 'formik';
import GoogleIcon from '../../assets/icons/GoogleIcon.svg';
import FacebookIcon from '../../assets/icons/FacebookIcon.svg';
import AppleIcon from '../../assets/icons/AppleIcon.svg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import {
  CtaWrapper,
  Heading,
  LineWithMiddleText,
  LoginButton,
  LoginWrapper,
  Section,
  Subheading
} from './LoginPageStyle';
import InputField from '../../components/InputField/InputField';
import { Flex, Link, Text } from '../../GlobalStyle';
import { loginValidation } from './LoginValdiationSchema';
import api from '../../config/axios';
import {
  loginStart,
  loginSucces,
  loginFailure
} from '../../store/slice/authSlice';
import { useAppDispatch } from '../../store/hooks';
import { AppDispatch } from '../../store';

interface LoginCredentials {
  email: string;
  password: string;
}

const LoginPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitForm = async (values: LoginCredentials) => {
    dispatch(loginStart());

    try {
      const response = await api.post('/auth/signin', values);

      dispatch(loginSucces(response.data));

      navigate('/organizer');
    } catch (err: any) {
      dispatch(loginFailure());
    }
  };

  return (
    <LoginWrapper>
      <Heading>Welcome !</Heading>
      <Subheading>Sign in to continue</Subheading>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={submitForm}
        validationSchema={loginValidation}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          isValid,
          dirty,
          handleBlur,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <Section>
              <InputField
                name="email"
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.email}
                touched={touched.email}
              />

              <InputField
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.password}
                touched={touched.password}
              />
            </Section>

            <CtaWrapper>
              <LoginButton type="submit" disabled={!isValid || !dirty}>
                Login
              </LoginButton>
              <Link to="/">Forgot passsword?</Link>
            </CtaWrapper>
          </form>
        )}
      </Formik>

      <LineWithMiddleText>
        <span>or</span>
      </LineWithMiddleText>

      <Flex $justifyContent="center" $gap="3em">
        <img src={GoogleIcon} alt="Google" />
        <img src={FacebookIcon} alt="Facebook" />
        <img src={AppleIcon} alt="Apple" />
      </Flex>

      <Text fontSize="1.2rem" $margin="3em 0">
        Don't have an account ? &nbsp;
        <Link fontSize="1.2rem" fontWeight="bold" to="/">
          Sign up
        </Link>
      </Text>
    </LoginWrapper>
  );
};

export default LoginPage;
