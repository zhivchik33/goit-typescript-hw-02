import { Image } from "../../App";
import ImageCard from "../ImageCard/ImageCard";
import style from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: Image[];
  onClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onClick }) => {
  return (
    <ul className={style.list}>
      {images.map(image => {
        return (
          <li key={image.id}>
            <ImageCard image={image} onClick={() => onClick(image)} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
