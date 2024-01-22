import {useDisclosure} from '@mantine/hooks';
import {Modal, Group, Button, Loader, Text, Stack} from '@mantine/core';
import {IconInfoCircle} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {GetBookByIdService} from "../../Services/BookService";
import {BookDTO} from "../../Services/DTOs/BookDTO";
import {useTranslation} from "react-i18next";

export const ModalMoreInformation = ({bookId}: {bookId: number}) => {
  const [opened, {open, close}] = useDisclosure(false);
  const [book, setBook] = useState<BookDTO | null>(null);
  const {t} = useTranslation("modalMoreInformation");

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
      <Modal opened={opened} onClose={close} title={t('modal.title')} centered>
        { book === null && <Loader variant="dots" />}
        {book &&
        <Stack m={"md"}>
            <Text>{t('modal.name')}: {book.name}</Text>
            <Text>{t('modal.description')}: {book.description}</Text>
            <Text>{t('modal.publisher')}: {book.publisher}</Text>
            <Text>{t('modal.publicationDate')}: {book.publicationDate.toString()}</Text>
            <Text>{t('modal.numberOfPages')}: {book.numberOfPages}</Text>
            <Text>{t('modal.category')}: {book.category.name}</Text>
            {book.authors.length === 0 &&
            <Text>{t('modal.authors.none')}</Text>
            }
            {book.authors.length > 0 &&
            <Group position={"apart"}>
              <Text>{t('modal.authors.filled')}: {book.authors.map((author) => author.name).join(", ")}</Text>
            </Group>
            }
        </Stack>
        }
      </Modal>

      <Button onClick={open} leftIcon={<IconInfoCircle size={"1.125rem"}/>} variant={"subtle"} compact>{t('button')}</Button>
    </>
  );
}