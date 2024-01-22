import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, Button, Group, Loader, Modal, Stack, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {DeleteBookByIdService, GetBookByIdService} from "../../Services/BookService";
import {BookDTO} from "../../Services/DTOs/BookDTO";
import {useTranslation} from "react-i18next";

export const ModalDeleteBook = ({bookId}: {bookId: number}) => {
  const [opened, {open, close}] = useDisclosure(false);
  const [book, setBook] = useState<BookDTO | null>(null);
  const {t} = useTranslation("modalDeleteBook");

  useEffect(() => {
    if (opened) {
      GetBookByIdService(bookId).then((response) => {
        if (response && response.status === 200) {
          setBook(response.data);
        }
      });

    }
  }, [opened]);

  const handleDelete = () => {
    DeleteBookByIdService(bookId).then((response) => {
      if (response && response.status === 200) {
        close();
      }
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title={t('modal.title')} centered>
        { book === null && <Loader variant={"dots"}/>}
        {book &&
          <Stack m={"md"}>
            <Text>{t('modal.text')} "{book.name}"?</Text>  {/*Are you sure you want to delete book "book.name"?*/}
            <Group position={"apart"}>
              <Button onClick={close}>{t('modal.button.cancel')}</Button>
              <Button color={"red"} onClick={handleDelete}>{t('modal.button.delete')}</Button>
            </Group>
          </Stack>
        }
      </Modal>

      <ActionIcon onClick={open}>
        <IconTrash size={"1.125rem"}/>
      </ActionIcon>
    </>
  );
}