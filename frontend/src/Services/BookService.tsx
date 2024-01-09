import axios from "axios";
import {BookDTO} from "./DTOs/BookDTO";
import {BorrowDTO} from "./DTOs/BorrowDTO";

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

export const GetBorrowedBooksByUserId = async (userId: number) => {
  try {
    return await axios.get<BorrowDTO[]> ('/api/book/getBorrowedBooksByUserId', {
      params: {
        userId: userId
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
}