import React from 'react';
import styled from 'styled-components';

// Define styled components
export const FileInputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  min-width: 190px;
  margin: auto;
`;

export const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  background-color: white;
  color: #0a0a0a;
  padding: 10px 39px;
  border: 0.5px solid #0a0a0a;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: Barlow;
  font-size: 1.6rem;
  line-height: 24px;
  border-radius: 8px;
`;
