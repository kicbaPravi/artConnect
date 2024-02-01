import React, { useEffect, useState } from 'react';
import { Flex, Text } from '../../../GlobalStyle';
import {
  Chips,
  FilterSection,
  MainBarWrapper,
  MainInput,
  MainOptions,
  MainP,
  OpenModalButton,
  Title,
  VerticalSeparator
} from '../OrganizerPageStyle';
import sortByArrowIcon from '../../../assets/sort-by-arrow-icon.svg';
import deleteIcon from '../../../assets/x-chips-icon.svg';
import viewIcon from '../../../assets/view-icon.svg';
import { openModalAction } from '../../../store/slice/modalSlice';
import { removeFilter } from '../../../store/slice/pictureSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import FilteringModal from '../../../components/FilteringModal/FilteringModal';
import { fetchPictures } from '../../../store/slice/pictureSlice';

const MainBar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const dispatch = useAppDispatch();
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener('resize', () => setScreenWidth(window.innerWidth));

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', () =>
        setScreenWidth(window.innerWidth)
      );
    };
  }, []);

  const totalRecords = useAppSelector(
    (state: any) => state.pictures.totalRecords
  );

  const filters = useAppSelector((state: any) => state.pictures.filters);

  return (
    <>
      <MainBarWrapper>
        <Flex $flexDirection="column" $gap="26.5px">
          <Title>ARTWORKS</Title>

          <MainOptions>
            <MainP>
              FOUND<span>{totalRecords} RECORDS</span>
            </MainP>
            <VerticalSeparator>|</VerticalSeparator>

            <MainP>FIND ALL</MainP>
            <VerticalSeparator>|</VerticalSeparator>

            <Flex $alignItems="center" $gap="1.2em">
              <MainP>SORT BY</MainP>
              <img src={sortByArrowIcon} alt="" />
            </Flex>
            <VerticalSeparator>|</VerticalSeparator>

            <Flex $alignItems="center" $gap="1.2em">
              <MainP>VIEW</MainP>
              <img src={viewIcon} alt="" />
            </Flex>
            <VerticalSeparator>|</VerticalSeparator>

            <MainP
              withCursor
              onClick={() => setFilterModalOpen(!filterModalOpen)}
            >
              FILTERS
            </MainP>
          </MainOptions>
        </Flex>
        <Flex>
          <OpenModalButton
            onClick={() => dispatch(openModalAction())}
            style={{ marginTop: screenWidth < 600 ? '4px' : '0px' }}
          >
            {screenWidth > 600 ? 'Add New' : '+'}
          </OpenModalButton>
        </Flex>
      </MainBarWrapper>
      <FilterSection>
        {Object.entries(filters).map(([key, value]) => (
          <Chips key={key}>
            {key}: {value as string | number}
            <img
              src={deleteIcon}
              alt="delete-icon"
              onClick={() => {
                dispatch(removeFilter(key));
                dispatch(fetchPictures());
              }}
            />
          </Chips>
        ))}
      </FilterSection>
      <FilteringModal
        filterModalOpen={filterModalOpen}
        setFilterModalOpen={setFilterModalOpen}
      />
    </>
  );
};

export default MainBar;
