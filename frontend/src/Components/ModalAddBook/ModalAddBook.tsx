import {Button, Modal, MultiSelect, NativeSelect, NumberInput, SelectItem, Stack, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";
import {AuthorDTO, NewAuthorDTO} from "../../Services/DTOs/AuthorDTO";
import {useEffect, useState} from "react";
import {GetAllCategoryService} from "../../Services/CategoryService";
import {CategoryDTO} from "../../Services/DTOs/CategoryDTO";
import {NewBookDTO} from "../../Services/DTOs/BookDTO";
import {GetAllAuthorsService} from "../../Services/AuthorService";
import {AddBookService} from "../../Services/BookService";

type BooksModel= {
  name: string;
  description: string;
  publisher: string;
  publicationDate: string;
  numberOfPages: number;
  authors: number[];
  category: string;
}

export const ModalAddBook = () => {
  const [opened, {open, close}] = useDisclosure(false);
  const [categories, setCategories] = useState<CategoryDTO[] | null>(null);
  const [originalAuthors, setOriginalAuthors] = useState<AuthorDTO[] | null>(null);
  const [authors, setAuthors] = useState<any>(null);
  const {t} = useTranslation("modalAuthor");

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      publisher: "",
      publicationDate: "",
      numberOfPages: 1,
      category: categories ? categories[0].name : "",
      authors: [],
    } as BooksModel,

    validate: {
      publicationDate: (value) => (/^\d{4}-\d{2}-\d{2}$/.test(value) ? null : 'Invalid date format. Use YYYY-MM-DD'),
      authors: (value) => (value.length > 0 ? null : 'Select at least one author'),
    }
  });

  useEffect(() => {
    if(opened) {
      // take categories from backend
      GetAllCategoryService().then((value) => {
        if (value && value.status === 200) {
          setCategories(value.data);
          form.setFieldValue("category", value.data[0].name);
        }
      });

      // take authors from backend
      GetAllAuthorsService().then((value) => {
        if (value && value.status === 200) {
          const authors = value.data.map((author: AuthorDTO) => {
            return {label: author.name, value: author.authorId}
          });

          setAuthors(authors);
          setOriginalAuthors(value.data);
        }
      });
    }
  }, [opened]);


  return (
    <>
      <Modal opened={opened} onClose={close} title={t('modal.title')} centered>
        <form onSubmit={form.onSubmit((values) => {
          console.log(values)
          // TODO: Add service to add books
          if (!categories || !originalAuthors) {
            return;
          }

          const CategoryDTO: CategoryDTO | undefined = categories.find((category) => {
            return category.name === values.category;
          });
          console.log(CategoryDTO);

          const filteredAuthors = originalAuthors.filter((author: AuthorDTO) => values.authors.includes(author.authorId));
          console.log(filteredAuthors)
          if (filteredAuthors.length === 0) return;

          const newBookDTO: NewBookDTO = {
            name: values.name,
            description: values.description,
            publisher: values.publisher,
            publicationDate: values.publicationDate,
            numberOfPages: values.numberOfPages,
            authors: filteredAuthors as AuthorDTO[],
            category: CategoryDTO as CategoryDTO,
          }
          console.log(newBookDTO)

          AddBookService(newBookDTO).then((value) => {
            if (value && value.status === 200) {
              close();
            }
          });
        })}>
          <Stack justify={"center"} spacing={"lg"}>
            <TextInput
              withAsterisk
              required
              label={t('modal.name.label')}
              placeholder={t('modal.name.placeholder')}
              {...form.getInputProps("name")}
            />

            <TextInput
              withAsterisk
              required
              label={t('modal.description.label')}
              placeholder={t('modal.description.placeholder')}
              {...form.getInputProps("description")}
            />

            <TextInput
              withAsterisk
              required
              label={t('modal.publisher.label')}
              placeholder={t('modal.publisher.placeholder')}
              {...form.getInputProps("publisher")}
            />

            <TextInput
              withAsterisk
              required
              label={t('modal.publicationDate.label')}
              placeholder={t('modal.publicationDate.placeholder')}
              {...form.getInputProps("publicationDate")}
            />

            <NumberInput
              withAsterisk
              required
              min={1}
              label={t('modal.numberOfPages.label')}
              placeholder={t('modal.numberOfPages.placeholder')}
              {...form.getInputProps("numberOfPages")}
            />

            <NativeSelect
              withAsterisk
              required
              data={categories ? categories.map((category) => { return category.name;}) : []}
              label={t('modal.category.label')}
              placeholder={t('modal.category.placeholder')}
              {...form.getInputProps("category")}
            />

            <MultiSelect
              withAsterisk
              required
              data={authors ? authors : []}
              label={t('modal.authors.label')}
              placeholder={t('modal.authors.placeholder')}
              {...form.getInputProps("authors")}
            />

            <Button type="submit">{t('modal.submit')}</Button>
          </Stack>
        </form>
      </Modal>

      <Button onClick={open} variant={"outline"}>Dodaj książke</Button>
    </>
  );
}