import css from "./ImageCard.module.css";
import { FC } from "react";
interface PropsCard {
  url: { small: string; regular: string };
  alt_description: string;
  onClick: (regular: string) => void;
}
const ImageCard: FC<PropsCard> = ({
  url: { small, regular },
  alt_description,
  onClick,
}) => {
  const handleClick = () => {
    onClick(regular);
  };
  return (
    <div>
      <img
        className={css.imges}
        src={small}
        alt={alt_description}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageCard;