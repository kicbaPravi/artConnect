import { Input, Wrapper } from './InputFieldStyle';

interface InputProps {
  name?: string;
  value?: any;
  type?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  onBlur?: any;
  errors?: string;
  touched?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const errorStyle = {
  marginLeft: 'auto',
  color: 'red',
  fontSize: '13px'
};

const InputField = ({
  type = 'text',
  width = '100%',
  errors,
  onChange,
  touched,
  ...restProps
}: InputProps): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Input
          type={type}
          style={{ width }}
          onChange={onChange}
          {...restProps}
        />
      </Wrapper>

      {errors && touched ? <div style={errorStyle}>{errors}</div> : null}
    </>
  );
};

export default InputField;
