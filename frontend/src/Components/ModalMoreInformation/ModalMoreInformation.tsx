import {useDisclosure} from '@mantine/hooks';
import {Modal, Group, Button, Loader, Text, Stack} from '@mantine/core';
import {IconInfoCircle} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {GetBookByIdService} from "../../Services/BookService";
import {BookDTO} from "../../Services/DTOs/BookDTO";

export const ModalMoreInformation = ({bookId}: {bookId: number}) => {
  const [opened, {open, close}] = useDisclosure(false);
  const [book, setBook] = useState<BookDTO | null>(null);
  const [authors, setAuthors] = useState<string[]>([]);

  useEffect(() => {
    if (opened) {
      GetBookByIdService(bookId).then((response) => {
        if (response && response.status === 200) {
          setBook(response.data)
        }
        console.log(response)
      });
    }
  }, [opened])

  return (
    <>
      <Modal opened={opened} onClose={close} title="Book details" centered>
        { book === null && <Loader variant="dots" />}
        {book &&
        <Stack m={"md"}>
            <Text>Title: {book.name}</Text>
            <Text>Description: {book.description}</Text>
            <Text>Publisher: {book.publisher}</Text>
            <Text>Publication date: {book.publicationDate.toString()}</Text>
            <Text>Number of pages: {book.numberOfPages}</Text>
            <Text>Category: {book.category.name}</Text>
            {book.authors.length === 0 &&
            <Text>No authors</Text>
            }
            {book.authors.length > 0 &&
            <Group position={"apart"}>
              <Text>Authors: {book.authors.map((author) => author.name).join(", ")}</Text>
            </Group>
            }
        </Stack>
        }
      </Modal>

      <Button onClick={open} leftIcon={<IconInfoCircle size={"1.125rem"}/>} variant={"subtle"} compact>More information</Button>
    </>
  );
}