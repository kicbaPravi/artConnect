import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Formik } from 'formik';
import InputField from '../InputField/InputField';
import Select from 'react-select';
import axios from 'axios';
// import { modalValidation } from './ModalValidation';
import api from '../../config/axios';
import { SubmitBtn, reactSelectStyle } from './FilteringModalStyle';
import FileUpload from '../FileUpload/FileUpload';
import { Flex } from '../../GlobalStyle';
import xIcon from '../../assets/x-icon.svg';
import { closeModalAction } from '../../store/slice/modalSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import pick from 'lodash/pick';
import Swal from 'sweetalert2';
import { fetchPictures } from '../../store/slice/pictureSlice';
import Accordion from '../Accordion/Accordion';
import { Chips, FilterSection } from '../../pages/Organizer/OrganizerPageStyle';
// import { modalValidationUpdate } from './ModalValidationUpdate';
// import deleteIcon from '../../../assets/x-chips-icon.svg';
import deleteIcon from '../../assets/x-chips-icon.svg';
// import { addFilters } from '../../store/slice/pictureSlice';
import { addFilters } from '../../store/slice/pictureSlice';

const statuses = [
  {
    value: 'inProgress',
    label: 'In Progress'
  },
  { value: 'stock', label: 'Stock' },
  { value: 'sold', label: 'Sold' }
];

const techniques = [
  {
    value: 'oilOnCanvas',
    label: 'Oil on canvas'
  },
  { value: 'combinedTechnique', label: 'Combined technique' },
  { value: 'acrylicOnCanvas', label: 'Acrylic on canvas' },
  { value: 'aquarelle', label: 'Aquarelle' },
  { value: 'acrylicOnPlywood', label: 'Acrylic on plywood' }
];

const locations = [
  { value: 'private', label: 'Private' },
  { value: 'vujadinovic', label: 'Gallery Vujadinović' },
  { value: 'singidunum', label: 'Gallery Singidunum' },
  { value: 'marina', label: 'Gallery Marina' },
  { value: 'artZona', label: 'Gallery Art zona' },
  { value: 'marta', label: 'Gallery Marta' },
  { value: 'jolanda', label: 'Gallery Jolanda' },
  { value: 'cvetkov', label: 'Gallery Cvetkov' }
];

interface ModalValues {
  id?: string;
  name: string;
  technique: string;
  width: number | null;
  height: number | null;
  status: string;
  location: string;
  year: number | null;
  number: number | null;
  price: number | null;
  soldToPersonName: string;
  file?: File;
  imageName?: string;
}

const initialValues: ModalValues = {
  name: '',
  technique: '',
  width: null,
  height: null,
  status: '',
  location: '',
  year: null,
  number: null,
  price: null,
  soldToPersonName: ''
};

const filterObject = (object: Object) =>
  Object.fromEntries(
    Object.entries(object).filter(
      ([key, value]) => value !== null && value !== undefined && value !== ''
    )
  );

const FilteringModal = ({ filterModalOpen, setFilterModalOpen }: any) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: windowWidth <= 600 ? '20px' : '40px 20px 40px 20px',
      width: windowWidth <= 600 ? '90%' : '400px',
      borderRadius: '8px'
    }
  };

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  const dispatch = useAppDispatch();

  const getInitials = (): ModalValues => {
    const filters = useAppSelector((state: any) => state.pictures.filters);

    const keys = Object.keys(initialValues);

    const pickedValue = pick(filters, keys) as ModalValues;

    return pickedValue;
  };

  const submitForm = (values: any) => {
    const filteredValues = filterObject(values);

    dispatch(addFilters(filteredValues));
    dispatch(fetchPictures());
    setFilterModalOpen(false);
  };

  const renderSelectedFilters = (
    formValues: ModalValues,
    setFieldValue: any
  ) => {
    const filteredValues = filterObject(formValues);

    return (
      <>
        {!!Object.entries(filteredValues).length ? (
          <h2>Selected filters</h2>
        ) : (
          <h2 style={{ marginBottom: '-15px' }}>Search by</h2>
        )}

        <FilterSection style={{ marginTop: 0 }}>
          {Object.entries(filteredValues).map(([key, value]) => (
            <Chips key={key}>
              {key}: {value}{' '}
              <img
                src={deleteIcon}
                alt="delete-icon"
                onClick={() => setFieldValue(key, '')}
              />
            </Chips>
          ))}
        </FilterSection>
      </>
    );
  };

  return (
    <>
      <ReactModal
        isOpen={filterModalOpen}
        onRequestClose={() => setFilterModalOpen(false)}
        style={customStyles}
      >
        <Formik initialValues={getInitials()} onSubmit={submitForm}>
          {({
            values,
            errors,
            touched,
            handleChange,
            isValid,
            dirty,
            setFieldValue,
            handleBlur,
            handleSubmit
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Flex $flexDirection="column" $gap="24px">
                  <Flex $justifyContent="flex-end">
                    <img
                      src={xIcon}
                      alt=""
                      style={{ cursor: 'pointer' }}
                      onClick={() => setFilterModalOpen(false)}
                    />
                  </Flex>

                  {renderSelectedFilters(values, setFieldValue)}

                  <Accordion
                    pictureName="Picture name"
                    component=<InputField
                      name="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors.name}
                      touched={touched.name}
                    />
                  />

                  <Accordion
                    pictureName="Painting Technique"
                    component=<Select
                      options={techniques}
                      value={techniques.filter(
                        (option) => option.value === values.technique
                      )}
                      onChange={(e: any) => {
                        setFieldValue('technique', e.value);
                      }}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          neutral50: '#A6A6A6' // Placeholder color
                        }
                      })}
                      styles={reactSelectStyle}
                    />
                  />

                  <Accordion
                    pictureName="Dimensions"
                    component=<Flex $gap="10px">
                      <InputField
                        name="width"
                        type="number"
                        placeholder="Width"
                        value={values.width}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.width}
                        touched={touched.width}
                      />

                      <InputField
                        name="height"
                        type="number"
                        placeholder="Height"
                        value={values.height}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.height}
                        touched={touched.height}
                      />
                    </Flex>
                  />

                  <Accordion
                    pictureName="Location"
                    component=<Select
                      placeholder={<div>Select location</div>}
                      options={locations}
                      value={locations.filter(
                        (option) => option.value === values.location
                      )}
                      onChange={(e: any) => {
                        setFieldValue('location', e.value);
                      }}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          neutral50: '#A6A6A6' // Placeholder color
                        }
                      })}
                      styles={reactSelectStyle}
                    />
                  />

                  <Accordion
                    pictureName="Year and number"
                    component=<Flex $gap="10px">
                      <InputField
                        name="year"
                        type="number"
                        placeholder="Year"
                        value={values.year}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.year}
                        touched={touched.year}
                      />

                      <InputField
                        name="number"
                        type="number"
                        placeholder="No"
                        value={values.number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.number}
                        touched={touched.number}
                      />
                    </Flex>
                  />

                  <Accordion
                    pictureName="Price"
                    component=<InputField
                      name="price"
                      type="number"
                      placeholder="Price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors.price}
                      touched={touched.price}
                    />
                  />

                  <Accordion
                    pictureName="Status"
                    component=<Select
                      placeholder={<div>Select status</div>}
                      options={statuses}
                      value={statuses.filter(
                        (option) => option.value === values.status
                      )}
                      onChange={(e: any) => {
                        setFieldValue('status', e.value);
                      }}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          neutral50: '#A6A6A6' // Placeholder color
                        }
                      })}
                      styles={reactSelectStyle}
                    />
                  />

                  <Accordion
                    pictureName="Sold to person"
                    component=<InputField
                      name="soldToPersonName"
                      placeholder="Sold To Person Name..."
                      value={values.soldToPersonName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors.soldToPersonName}
                      touched={touched.soldToPersonName}
                    />
                  />
                </Flex>

                <Flex
                  $flexDirection="column"
                  $gap="1.6em"
                  $margin="4.4em 0 0 0"
                >
                  {/* <SubmitBtn type="submit" disabled={!isValid || !dirty}> */}
                  <SubmitBtn type="submit">Search</SubmitBtn>
                </Flex>
              </form>
            );
          }}
        </Formik>
      </ReactModal>
    </>
  );
};

export default FilteringModal;
