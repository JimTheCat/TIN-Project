import {AuthorDTO, NewAuthorDTO} from "./DTOs/AuthorDTO";
import axios from "axios";

export const AddAuthorService = async (author: NewAuthorDTO) => {
  try {
    return await axios.post<NewAuthorDTO>('/api/authors', author);
  } catch (error: any) {
    console.error(error);
    return error.response;
  }
}

export const GetAllAuthorsService = async () => {
  try {
    return await axios.get<AuthorDTO[]>('/api/authors/getAll');
  } catch (error: any) {
    console.error(error);
    return error.response;
  }
}