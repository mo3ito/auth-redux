import axios, { AxiosError } from "axios";

const getDataAuth = async (url: string, id: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: id,
      },
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log("status error=>", error.response?.status);
      console.log("response error=>", error.response?.data);
    }
    throw error;
  }
};

export default getDataAuth;
