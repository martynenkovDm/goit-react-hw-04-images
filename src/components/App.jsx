import imagesAPI from 'services/getImageFromApi';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { LoadButton } from './LoadButton/LoadButton';
import { Loader } from './Loader/Loader';
import ErrorImages from 'components/ErrorImages/ErrorImages';
import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  // state = {
  //   images: [],
  //   status: Status.IDLE,
  //   valueInput: '',
  //   error: '',
  //   page: 1,
  //   totalPages: 0,
  //   showModal: false,
  //   modalImage: '',
  // };

  const [images, setImages] = useState([]);
  const [valueInput, setValueInput] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  // componentDidUpdate(_, prevState) {
  //   if (
  //     prevState.page !== this.state.page ||
  //     prevState.valueInput !== this.state.valueInput
  //   ) {
  //     this.setState({ status: Status.PENDING });
  //     this.handleFetch();
  //   }
  // }

  useEffect(() => {
    if (valueInput !== '') {
      setStatus(Status.PENDING);
      if (page === 1) {
        setImages([]);
      }

      imagesAPI
        .getImages(valueInput, page)
        .then(images => {
          setImages(prevData => [...prevData, ...images.hits]);
          setTotalPages(Math.floor(images.totalHits / 12));
          setStatus(Status.RESOLVED);
        })
        .catch(err => {
          setError(err);
          setStatus(Status.REJECTED);
        });
    }
  }, [valueInput, page]);
  //  const handleFetch() {
  //   try {
  //     const { valueInput, page } = this.state;
  //     const images = await getImages(valueInput, page);
  //     console.log(images);

  //     if (images.total !== 0) {
  //       this.setState(prevState => ({
  //         images:
  //           page === 1 ? images.hits : [...prevState.images, ...images.hits],
  //         totalPages: Math.ceil(images.total / 12),
  //         status: Status.RESOLVED,
  //       }));
  //     } else {
  //       this.setState({ status: Status.REJECTED });
  //       toast.info('No images found', notifyOptions);
  //     }
  //   } catch (myError) {
  //     this.setState({ error: myError, status: Status.REJECTED });
  //     toast.info(myError, notifyOptions);
  //   }
  // }

  const getInputValue = inputValue => {
    setValueInput(inputValue);
    setPage(1);
  };

  const LoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <>
      <Searchbar
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={valueInput}
        onSubmit={getInputValue}
      />
      <ImageGallery images={images} />
      {images.length > 0 && status !== Status.PENDING && page < totalPages && (
        <LoadButton onLoadMore={LoadMore} />
      )}
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <ErrorImages message={error} />}
    </>
  );
}
