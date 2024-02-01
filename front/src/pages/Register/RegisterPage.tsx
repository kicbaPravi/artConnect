import React from 'react';
import { Formik } from 'formik';
import GoogleIcon from '../../assets/icons/GoogleIcon.svg';
import FacebookIcon from '../../assets/icons/FacebookIcon.svg';
import AppleIcon from '../../assets/icons/AppleIcon.svg';

import {
  CtaWrapper,
  Heading,
  LineWithMiddleText,
  LoginButton,
  LoginWrapper,
  Section,
  Subheading
} from '../Login/LoginPageStyle';
import InputField from '../../components/InputField/InputField';
import { Flex, Link, Text } from '../../GlobalStyle';
import { registerValidation } from './RegisterValdiationSchema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const submitForm = async (values: any) => {
    const response = await axios.post('auth/signup', values);

    if (response.status === 200) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title:
          'You have successfully created an account. You will be transferred to the sign in page.',
        showConfirmButton: false,
        timer: 5000
      });

      setTimeout(() => {
        navigate('/login');
      }, 5000);
    }
  };

  return (
    <LoginWrapper>
      <Heading>Hi !</Heading>
      <Subheading>Create a new account</Subheading>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={submitForm}
        validationSchema={registerValidation}
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
                name="name"
                value={values.name}
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.name}
                touched={touched.name}
              />

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
                SIGN UP
              </LoginButton>
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
        Already have an account ? &nbsp;
        <Link fontSize="1.2rem" fontWeight="bold" to="/">
          Sign in
        </Link>
      </Text>
    </LoginWrapper>
  );
};

export default RegisterPage;
