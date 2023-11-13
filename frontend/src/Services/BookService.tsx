import axios from "axios";
import {BookDTO} from "./DTOs/BookDTO";

export const BookService = async (controller: AbortController) => {
  try {
    return await axios.get<BookDTO[]> ('/api/book/getAllBooks', {
      withCredentials: true,
      signal: controller.signal,
    });
  } catch (error) {
    console.error(error);
  }
}

