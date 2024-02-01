import React from 'react';
import { FileInput, FileInputLabel, FileInputWrapper } from './FileUploadStyle';
import uploadIcon from '../../assets/upload-icon.svg';
import { Flex } from '../../GlobalStyle';

interface Props {
  name: string;
  fileData?: File;
  onChange: any;
}

const FileUpload = ({ name, fileData, onChange }: Props): JSX.Element => {
  return (
    <FileInputWrapper>
      <FileInputLabel>
        <Flex $alignItems="center" $gap="10px">
          {fileData ? (
            <span>{fileData.name}</span>
          ) : (
            <>
              <span>Choose file</span>
              <img src={uploadIcon} alt="upload_icon" />
            </>
          )}
        </Flex>

        <FileInput type="file" onChange={onChange} name={name} />
      </FileInputLabel>
    </FileInputWrapper>
  );
};

export default FileUpload;
