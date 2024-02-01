import React, { useState } from 'react';
import { Content, Title, Wrapper } from './AccordionStyle';
import accordianArrowDown from '../../assets/accordianArrowDown.svg';
import accordianArrowUp from '../../assets/accordianArrowUp.svg';

const Accordion = ({ pictureName, component }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Title onClick={() => setOpen(!open)}>
        {pictureName}{' '}
        <img src={!open ? accordianArrowDown : accordianArrowUp} alt="" />
      </Title>
      {open ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Content style={{ width: '250px' }}>{component}</Content>
          <button
            style={{
              padding: '5px 10px',
              borderRadius: '5px',
              border: '0.5px solid black',
              marginRight: '25px',
              cursor: 'pointer'
            }}
            onClick={() => setOpen(false)}
          >
            Apply
          </button>
        </div>
      ) : null}
    </Wrapper>
  );
};

export default Accordion;
