import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

const UNSPLASH_ACCESS_KEY = 'nrt2_X9rhmfggYGjlByY5m5iNsF4xYbOIV_PzQ_WLAA';
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  description: string | null;
  likes: number;
  user: {
    name: string;
  };
}

interface ModalImage {
  url: string;
  description: string | null;
  likes: number;
  author: string;
}

function App() {
  const [searchWord, setSearchWord] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<ModalImage | null>(null);
  const [moreImages, setMoreImages] = useState<boolean>(false);

  const openModal = (image: Image) => {
    console.log('Image object:', image);
    setModalImg({
      url: image.urls.regular,
      description: image.description,
      likes: image.likes,
      author: image.user.name,
    });
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImg(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputElement = form.elements.namedItem(
      'searchBarInput'
    ) as HTMLInputElement;
    const inputValue = inputElement.value.trim();
    if (inputValue === '') {
      toast.error('Enter a search word!');
      return;
    }
    setSearchWord(inputValue);
    setPage(1);
    setImages([]);
    form.reset();
  };

  useEffect(() => {
    if (!searchWord) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<{ results: Image[] }>(
          UNSPLASH_API_URL,
          {
            params: {
              query: searchWord,
              client_id: UNSPLASH_ACCESS_KEY,
              per_page: 16,
              page: page,
            },
          }
        );
        if (response.data.results.length === 0) {
          toast.error('No images found!');
          setMoreImages(false);
        } else {
          setImages(prevImages => [...prevImages, ...response.data.results]);
          setMoreImages(response.data.results.length >= 16);
        }
      } catch (error) {
        setError('Something went wrong. Please try again later.');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [searchWord, page]);

  const handleClick = () => {
    if (moreImages) {
      setPage(prevPage => prevPage + 1);
    }
  };
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'; // Clean up on unmount
    };
  }, []);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster position="top-right" />
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={openModal} />
      )}

      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          selectedImg={modalImg}
        />
      )}
      {!loading && moreImages && <LoadMoreBtn onClick={handleClick} />}
    </div>
  );
}

export default App;
