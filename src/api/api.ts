import axios from "axios";

const baseUrl = "https://cat-fact.herokuapp.com";
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const getCatFact = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/facts/${id}`);

    if (response.status !== 200) {
      throw new Error("server error");
    }

    const fact = response.data;

    return fact;
  } catch (error) {
    throw error;
  }
};
