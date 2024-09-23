import axios, { AxiosError, AxiosResponse } from "axios";

const sendData = async (
  url: string,
  body: object,
  id?: string
): Promise<AxiosResponse> => {
  try {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (id) {
      headers.Authorization = id;
    }
    const response = await axios.post(url, body, {
      headers,
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

export default sendData;
