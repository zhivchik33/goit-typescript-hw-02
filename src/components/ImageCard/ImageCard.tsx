import { Image } from "../../App";
import style from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  onClick: (url: string) => void;
}
const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div>
      <img
        className={style.card}
        src={image.urls.small}
        alt={image.alt_description || 'Image'}
        onClick={() => onClick(image.urls.regular)}
      />
    </div>
  );
};

export default ImageCard;
