import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../App/App";
import { FC } from "react";

interface PropsGallery {
  photos: Image[];
  open: (imageUrl: string) => void;
}

const ImageGallery: FC<PropsGallery> = ({ photos, open }) => {
  return (
    <ul>
      {photos.map(({ id, urls, alt_description }) => (
        <li className={css.link} key={id}>
          <ImageCard
            url={urls}
            alt_description={alt_description}
            onClick={open}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;