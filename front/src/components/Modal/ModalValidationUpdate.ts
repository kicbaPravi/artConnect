import { object, string, number, mixed } from 'yup';

export const modalValidationUpdate = object({
  name: string().required(),
  technique: string().required(),
  width: number().required(),
  height: number().required(),
  location: string().required(),
  year: number().required(),
  number: number().required(),
  price: number().required(),
  status: string().required(),
  soldToPersonName: string(),
  file: mixed()
});
