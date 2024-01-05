export type BookDTO = {
  bookId: number;
  name: string;
  description: string;
  publisher: string;
  publicationDate: Date | string;
  numberOfPages: number;
}