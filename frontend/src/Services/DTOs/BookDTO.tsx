import {AuthorDTO} from "./AuthorDTO";
import {CategoryDTO} from "./CategoryDTO";

export type BookDTO = {
  bookId: number;
  name: string;
  description: string;
  publisher: string;
  publicationDate: Date | string;
  numberOfPages: number;
  authors: AuthorDTO[];
  category: CategoryDTO;
}

export type NewBookDTO = {
  name: string;
  description: string;
  publisher: string;
  publicationDate: string;
  numberOfPages: number;
  authors: AuthorDTO[];
  category: CategoryDTO;
}