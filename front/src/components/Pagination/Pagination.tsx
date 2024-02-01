import React from 'react';
import { NavButton, PaginationWrapper } from './PaginationStyle';
import arrowBack from '../../assets/arrowBack.svg';
import arrowBegining from '../../assets/arrowBegining.svg';
import arrowForward from '../../assets/arrowForward.svg';
import arrowEnd from '../../assets/arrowEnd.svg';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPage } from '../../store/slice/pictureSlice';
import { fetchPictures } from '../../store/slice/pictureSlice';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const totalPages = useAppSelector((state: any) => state.pictures.totalPages);
  const currentPage = useAppSelector((state: any) => state.pictures.page);

  const goToPage = (page: number) => {
    dispatch(setPage(page));
    dispatch(fetchPictures());
  };

  const renderButtons = () => {
    let pages = [];

    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
    }

    if (!!pages.length) {
      return pages.map((page: number, index: number) => (
        <NavButton
          background={
            (index + 1 === currentPage || (!currentPage && index === 0)) &&
            '#0047FF'
          }
          color={
            (index + 1 === currentPage || (!currentPage && index === 0)) &&
            '#FCFCFC'
          }
          onClick={() => goToPage(index + 1)}
        >
          {page}
        </NavButton>
      ));
    }

    return null;
  };

  return (
    <PaginationWrapper>
      <NavButton background="#E6E6E6" onClick={() => goToPage(1)}>
        <img src={arrowBegining} alt="" />
      </NavButton>
      <NavButton background="#E6E6E6" onClick={() => goToPage(currentPage - 1)}>
        <img src={arrowBack} alt="" />
      </NavButton>

      {renderButtons()}

      <NavButton background="#E6E6E6" onClick={() => goToPage(currentPage + 1)}>
        <img src={arrowForward} alt="" />
      </NavButton>
      <NavButton background="#E6E6E6" onClick={() => goToPage(totalPages)}>
        <img src={arrowEnd} alt="" />
      </NavButton>
    </PaginationWrapper>
  );
};

export default Pagination;
