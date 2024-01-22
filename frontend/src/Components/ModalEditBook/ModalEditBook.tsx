import {useDisclosure} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {BookDTO} from "../../Services/DTOs/BookDTO";
import {GetBookByIdService, UpdateBookService} from "../../Services/BookService";
import {
  ActionIcon,
  Button,
  Loader,
  Modal, MultiSelect,
  NativeSelect,
  NumberInput,
  Stack,
  TextInput
} from "@mantine/core";
import {IconSettings} from "@tabler/icons-react";
import {GetAllCategoryService} from "../../Services/CategoryService";
import {CategoryDTO} from "../../Services/DTOs/CategoryDTO";
import {GetAllAuthorsService} from "../../Services/AuthorService";
import {AuthorDTO} from "../../Services/DTOs/AuthorDTO";
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";

type BooksModel = {
  name: string;
  description: string;
  publisher: string;
  publicationDate: string;
  numberOfPages: number;
  authors: string[];
  category: string;
}

export const ModalEditBook = ({bookId}: {bookId: number}) => {
  const [opened, {open, close}] = useDisclosure(false);
  const [book, setBook] = useState<BookDTO | null>(null);
  const [categories, setCategories] = useState<CategoryDTO[] | null>(null);
  const [authors, setAuthors] = useState<any>(null);
  const [originalAuthors, setOriginalAuthors] = useState<AuthorDTO[] | null>(null);
  const {t} = useTranslation("modalEditBook");

  useEffect(() => {
    if (opened) {
      GetBookByIdService(bookId).then((response) => {
        if (response && response.status === 200) {
          setBook(response.data);
          form.setFieldValue("name", response.data.name);
          form.setFieldValue("description", response.data.description);
          form.setFieldValue("publisher", response.data.publisher);
          form.setFieldValue("publicationDate", response.data.publicationDate.toString());
          form.setFieldValue("numberOfPages", response.data.numberOfPages);
          form.setFieldValue("category", response.data.category.name);
          form.setFieldValue("authors", response.data.authors.map((author) => author.authorId.toString()));
        }
      });

      GetAllCategoryService().then((response) => {
        if (response && response.status === 200) {
          setCategories(response.data);
        }
      });

      GetAllAuthorsService().then((value) => {
        if (value && value.status === 200) {
          const authors = value.data.map((author: AuthorDTO) => {
            return {label: author.name, value: author.authorId.toString()}
          });

          setAuthors(authors);
          setOriginalAuthors(value.data);
        }
      });
    }
  }, [opened])

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      publisher: "",
      publicationDate: "",
      numberOfPages: 1,
      category: "",
      authors: [],
    } as BooksModel,

    validate: {
      publicationDate: (value) => (/^\d{4}-\d{2}-\d{2}$/.test(value) ? null : t('modal.publicationDate.error')), //Invalid date format. Use YYYY-MM-DD
      authors: (value) => (value.length > 0 ? null : t('modal.authors.error')), //Select at least one author
    }
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title={t('modal.title')} centered>
        { book === null && categories === null && authors === null && <Loader variant="dots" />}
        {book && categories && authors &&
            <form onSubmit={form.onSubmit((newBook) => {
              const bookToReturn: BookDTO = {
                bookId: book.bookId,
                name: newBook.name,
                description: newBook.description,
                publisher: newBook.publisher,
                publicationDate: newBook.publicationDate,
                numberOfPages: newBook.numberOfPages,
                authors: originalAuthors!.filter((author) => newBook.authors.includes(author.authorId.toString())),
                category: categories.find((category) => category.name === newBook.category)!
              }

              UpdateBookService(bookToReturn).then((response) => {
                if (response && response.status === 200) {
                  close();
                }
              });
            })}>
              <Stack m={"md"}>
                    <TextInput
                        label={t('modal.name.label')}
                        placeholder={t('modal.name.placeholder')}
                        required
                        withAsterisk
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label={t('modal.description.label')}
                        placeholder={t('modal.description.placeholder')}
                        required
                        withAsterisk
                        {...form.getInputProps("description")}
                    />
                    <TextInput
                        label={t('modal.publisher.label')}
                        placeholder={t('modal.publisher.placeholder')}
                        required
                        withAsterisk
                        {...form.getInputProps("publisher")}
                    />
                    <TextInput
                        label={t('modal.publicationDate.label')}
                        placeholder={t('modal.publicationDate.placeholder')}
                        required
                        withAsterisk
                        {...form.getInputProps("publicationDate")}
                    />
                    <NumberInput
                        label={t('modal.numberOfPages.label')}
                        placeholder={t('modal.numberOfPages.placeholder')}
                        min={1}
                        hideControls
                        required
                        withAsterisk
                        {...form.getInputProps("numberOfPages")}
                    />
                    <NativeSelect
                        data={categories ? categories.map((category) => { return category.name;}) : []}
                        label={t('modal.category.label')}
                        placeholder={t('modal.category.placeholder')}
                        required
                        withAsterisk
                        {...form.getInputProps("category")}
                    />
                    <MultiSelect
                        withAsterisk
                        required
                        data={authors ? authors : []}
                        defaultValue={book.authors.map((author) => author.authorId.toString())}
                        label={t('modal.authors.label')}
                        placeholder={t('modal.authors.placeholder')}
                        {...form.getInputProps("authors")}
                    />
                    <Button type="submit">{t('modal.submit')}</Button>
                </Stack>
            </form>
        }
      </Modal>

      <ActionIcon onClick={open}>
        <IconSettings size={"1.125rem"}/>
      </ActionIcon>
    </>
  );
}