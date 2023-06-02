import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalBackdrop, ModalContent } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ onModalClose, children }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === `Escape`) {
        onModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onModalClose]);

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  // handleClickBackdrop = e => {
  //   if (e.target === e.currentTarget) {
  //     this.props.onClose();
  //   }
  // };

  // handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     this.props.onClose();
  //   }
  // };

  return createPortal(
    <ModalBackdrop onClick={handleClickBackdrop}>
      <ModalContent>{children}</ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
};
Modal.propTypes = {
  children: PropTypes.node,
  onModalClose: PropTypes.func,
};
