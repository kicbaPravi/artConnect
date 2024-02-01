import styled from 'styled-components';

export const reactSelectStyle = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    borderRadius: '8px',
    border: '0.5px solid #A6A6A6',
    fontSize: '1.6rem',
    lineHeight: '24px',
    cursor: 'pointer'
  }),
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    padding: '10.5px 8px',
    margin: '0'
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    margin: '0px',
    padding: '0px'
  }),
  indicatorSeparator: (state: any) => ({
    display: 'none'
  }),
  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    paddingRight: '2px'
  }),
  menu: (state: any) => ({
    marginTop: '5px',
    color: '#0A0A0A',
    border: '1px solid #A6A6A6',
    borderRadius: '8px',
    fontSize: '12px',
    lineHeight: '14.52px'
  })
};

export const SubmitBtn = styled.button`
  width: 190px;
  margin: auto;
  height: 50px;
  background: rgb(117, 95, 77);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #fcfcfc;
  font-family: Barlow;
  font-size: 1.6rem;
  line-height: 24px;

  &:disabled {
    background-color: rgba(117, 95, 77, 0.5);
  }
`;
