import { GalleryImage } from './ImageGallery.styled';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images }) => {
  return (
    <>
      <GalleryImage>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            url={image.largeImageURL}
            tags={image.tags}
          />
        ))}
      </GalleryImage>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
