import axios from "axios";
import {BookDTO} from "./DTOs/BookDTO";

export const GetAllBooksService = async () => {
  try {
    return await axios.get<BookDTO[]> ('/api/book/getAllBooks', {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export const GetBookByIdService = async (bookId: number) => {
  try {
    return await axios.get<BookDTO> ('/api/book/getBookById', {
      params: {
        bookId: bookId
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
}