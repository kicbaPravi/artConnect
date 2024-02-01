import { useState } from 'react';
import ReactModal from 'react-modal';
import { Formik } from 'formik';
import InputField from '../InputField/InputField';
import Select from 'react-select';
import axios from 'axios';
import { modalValidation } from './ModalValidation';
import api from '../../config/axios';
import { SubmitBtn, reactSelectStyle } from './ModalStyle';
import FileUpload from '../FileUpload/FileUpload';
import { Flex } from '../../GlobalStyle';
import xIcon from '../../assets/x-icon.svg';
import { closeModalAction } from '../../store/slice/modalSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import pick from 'lodash/pick';
import Swal from 'sweetalert2';
import { fetchPictures } from '../../store/slice/pictureSlice';
import { modalValidationUpdate } from './ModalValidationUpdate';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '40px 20px 40px 20px',
    width: '400px',
    borderRadius: '8px'
  }
};

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
  loggedUserId: string;
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
  loggedUserId: '',
  technique: '',
  width: null,
  height: null,
  status: '',
  location: '',
  year: null,
  number: null,
  price: null,
  soldToPersonName: '',
  file: undefined
};

const Modal = () => {
  console.log(
    'process.env.REACT_APP_BASE_STORAGE_URL',
    process.env.REACT_APP_BASE_STORAGE_URL
  );

  const dispatch = useAppDispatch();

  const modalIsOpen = useAppSelector((state: any) => state.modal.open);
  const loggedUserId = useAppSelector((state: any) => state.auth.user._id);
  const selectedImage = useAppSelector(
    (state: any) => state.modal.selectedImage
  );

  const getInitials = (): ModalValues => {
    if (selectedImage) {
      const { imagePath, _id: id } = selectedImage;

      const imageName = imagePath.replace('uploads/', '');

      const keys = Object.keys(initialValues);

      const pickedValue = pick(selectedImage, keys) as ModalValues;

      return {
        ...pickedValue,
        imageName,
        id,
        loggedUserId
      };
    }

    return { ...initialValues, loggedUserId };
  };

  const submitForm = (values: any) => {
    if (selectedImage?._id) {
      api
        .patch(`gallery/update-image-info/${selectedImage._id}`, values)
        .then((res) => {
          dispatch(closeModalAction());
          dispatch(fetchPictures());
        })
        .catch((err) => console.log('error during upload', err));
    } else {
      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }

      api
        .put('/gallery/upload', formData)
        .then((res) => {
          dispatch(closeModalAction());
          dispatch(fetchPictures());
        })
        .catch((err) => console.log('error during upload', err));
    }
  };

  const deleteImage = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`api/gallery/delete-image/${id}`)
          .then(() => dispatch(closeModalAction()))
          .then(() => dispatch(fetchPictures()));

        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        });
      }
    });
  };

  return (
    <>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => dispatch(closeModalAction())}
        style={customStyles}
      >
        <Formik
          initialValues={getInitials()}
          onSubmit={submitForm}
          validationSchema={
            !selectedImage ? modalValidation : modalValidationUpdate
          }
        >
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
                      onClick={() => dispatch(closeModalAction())}
                    />
                  </Flex>

                  <InputField
                    name="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.name}
                    touched={touched.name}
                  />

                  <Select
                    placeholder={<div>Painting Technique</div>}
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

                  <Flex $gap="10px">
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

                  <Select
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

                  <Flex $gap="10px">
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

                  <InputField
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.price}
                    touched={touched.price}
                  />

                  <Select
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

                  {values.status === 'sold' && (
                    <InputField
                      name="soldToPersonName"
                      placeholder="Sold To Person Name..."
                      value={values.soldToPersonName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors.soldToPersonName}
                      touched={touched.soldToPersonName}
                    />
                  )}
                </Flex>

                <Flex
                  $flexDirection="column"
                  $gap="1.6em"
                  $margin="4.4em 0 0 0"
                >
                  {!selectedImage && (
                    <FileUpload
                      name="file"
                      fileData={values.file}
                      onChange={(e: any) => {
                        setFieldValue('file', e.currentTarget.files[0]);
                      }}
                    />
                  )}

                  {/* <SubmitBtn type="submit" disabled={!isValid || !dirty}> */}
                  <SubmitBtn type="submit">
                    {!selectedImage ? 'Add new image' : 'Update image info'}
                  </SubmitBtn>

                  {selectedImage && (
                    <Flex $alignItems="center" $justifyContent="space-around">
                      <img
                        style={{ borderRadius: '8px' }}
                        width="100px"
                        height="100px"
                        src={`${process.env.REACT_APP_BASE_STORAGE_URL}${values.imageName}`}
                        alt=""
                      />
                      <button
                        type="button"
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'tomato',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                        onClick={() => deleteImage(selectedImage._id)}
                      >
                        Delete image with all data
                      </button>
                    </Flex>
                  )}
                </Flex>
              </form>
            );
          }}
        </Formik>
      </ReactModal>
    </>
  );
};

export default Modal;
