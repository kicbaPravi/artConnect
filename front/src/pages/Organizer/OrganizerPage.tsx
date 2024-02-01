import React, { useEffect } from 'react';
import { Wrapper } from '../../GlobalStyle';
import { PicturesSection } from './OrganizerPageStyle';
import { fetchPictures } from '../../store/slice/pictureSlice';
import MainBar from './components/MainBar';
import Picture from './components/Picture';
import Modal from '../../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Pagination from '../../components/Pagination/Pagination';

const OrganizerPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const pictures = useAppSelector((state: any) => state.pictures.pictures);
  const loggedUserId = useAppSelector((state: any) => state.auth.user._id);

  useEffect(() => {
    dispatch(fetchPictures());
  }, []);

  return (
    <Wrapper>
      <MainBar />

      <PicturesSection>
        {!!pictures?.length ? (
          pictures.map((image: Image) => (
            <Picture key={image._id} data={image} />
          ))
        ) : (
          <p style={{ margin: 'auto', marginTop: '80px' }}>
            There are no images in the database
          </p>
        )}
      </PicturesSection>

      <Pagination />

      <Modal />
    </Wrapper>
  );
};

export default OrganizerPage;
