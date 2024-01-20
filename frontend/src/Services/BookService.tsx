import axios from "axios";
import {BookDTO, NewBookDTO} from "./DTOs/BookDTO";
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

export const ReturnBookService = async (borrowId: number) => {
  try {
    return await axios.put<BorrowDTO> ('/api/book/borrowBook',  null, {
      params: {
        borrowId: borrowId
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export const UpdateRatingService = async (borrowId: number, rating: number) => {
  try {
    return await axios.put<BorrowDTO> ('/api/book/updateRating',  null, {
      params: {
        borrowId: borrowId,
        rating: rating
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export const GetAllBooksNotBorrowedService = async () => {
  try {
    return await axios.get<BookDTO[]> ('/api/book/getAllBooksNotBorrowed', {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export const BorrowBookService = async (bookId: number, userId: string, amountOfDays: number) => {
  try {
    console.log(bookId, userId, amountOfDays)

    return await axios.post<BorrowDTO> ('/api/book/borrowBook',  null, {
      params: {
        bookId: bookId,
        userId: encodeURIComponent(userId),
        amountOfDays: amountOfDays
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export const AddBookService = async (book: NewBookDTO) => {
  try {
    return await axios.post<NewBookDTO> ('/api/book/addBook', book, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
}