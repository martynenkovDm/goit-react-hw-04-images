import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  GalleryItem,
  GalleryImage,
  ModalPicture,
} from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ url, tags }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <GalleryItem>
        <GalleryImage src={url} alt={tags} onClick={toggleModal} />
      </GalleryItem>
      {showModal && (
        <Modal onModalClose={toggleModal}>
          <ModalPicture src={url} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
