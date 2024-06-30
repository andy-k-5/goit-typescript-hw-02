import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/search";

export interface ImageApi {
  total: number;
  total_pages: number;
  results: {
    id: number;
    alt_description: string;
    urls: {
      small: string;
      regular: string;
    };
  }[];
}

export const getPhotos = async (
  data: string,
  curentPage: number
): Promise<ImageApi> => {
  const params = {
    query: data,
    page: curentPage,
    per_page: 15,
    client_id: "12_CemR0-ylx8v3obvcQn0UsGoQ6hoGbx_nd5LssPaY",
  };
  const response = await axios.get<ImageApi>("/photos", {
    params,
  });
  return response.data;
};
