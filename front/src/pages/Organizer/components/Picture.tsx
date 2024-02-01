import { Flex } from '../../../GlobalStyle';
import {
  ImageContainer,
  ItemWrapper,
  StatusCircle,
  TextImg,
  TitleImage
} from '../OrganizerPageStyle';
import { openModalAction } from '../../../store/slice/modalSlice';
import { useAppDispatch } from '../../../store/hooks';

interface Props {
  data: Image;
}

const Picture = ({ data }: Props): JSX.Element => {
  const {
    _id: id,
    name,
    technique,
    width,
    height,
    location,
    year,
    number,
    price,
    status,
    imagePath
  } = data;

  const dispatch = useAppDispatch();

  const color = {
    stock: '#2c8a00',
    inProgress: '#CAAC2A',
    sold: '#966FD6'
  };

  return (
    <ItemWrapper>
      <ImageContainer>
        <img
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '4px',
            objectFit: 'contain'
          }}
          src={`${process.env.REACT_APP_BASE_STORAGE_URL}${imagePath.replace(
            'uploads/',
            ''
          )}`}
          alt={name}
          onClick={() => dispatch(openModalAction(data))}
        />
      </ImageContainer>

      <Flex $alignItems="center" $justifyContent="space-between">
        <TitleImage>{name}</TitleImage>
        <StatusCircle color={color[status]} />
      </Flex>
      <TextImg>Gallery {location}</TextImg>
      <TextImg>
        {year}, No {number}
      </TextImg>
      <TextImg>{technique}</TextImg>
      <TextImg>
        {width}x{height} cm
      </TextImg>
      <TextImg>{price} €</TextImg>
    </ItemWrapper>
  );
};

export default Picture;
