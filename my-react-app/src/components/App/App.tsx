import { useEffect, useState } from "react";
import { getPhotos, ImageApi } from "../baseUrl";
import SeatchBar from "../SearchBar/SearchBar";
import "./App.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

export interface Image {
  id: number;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}
function App() {
  const [photos, setPhotos] = useState<Image[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [submitQuery, setSubmitQuery] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number | boolean>(0);
  const [image, setImage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = (imageUrl: string) => {
    setImage(imageUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setImage("");
    setIsOpen(false);
  };

  useEffect(() => {
    if (submitQuery.trim() === "") {
      return;
    }
    async function fetchPhotos() {
      try {
        setIsLoader(true);
        setIsError(false);
        const items = await getPhotos(submitQuery, page);
        setTotalPage(page < Math.ceil(items.total / 15));
        setPhotos((prevState) => [...prevState, ...items.results]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoader(false);
      }
    }

    fetchPhotos();
  }, [page, submitQuery]);

  const handleSubmit = async (data: string) => {
    setSubmitQuery(data);
    setPage(1);
    setPhotos([]);
  };
  const handLoadMore = async () => {
    setPage(page + 1);
  };
  const isLast = totalPage;
  return (
    <>
      <SeatchBar onSubmit={handleSubmit} />
      {photos.length > 0 && <ImageGallery photos={photos} open={openModal} />}
      {isError && <ErrorMessage />}
      {photos.length > 0 && !isLoader && isLast && (
        <LoadMoreBtn newSubmit={handLoadMore} />
      )}
      {isLoader && <Loader />}
      {isOpen && (
        <ImageModal image={image} isOpen={isOpen} isClose={closeModal} />
      )}
    </>
  );
}

export default App;