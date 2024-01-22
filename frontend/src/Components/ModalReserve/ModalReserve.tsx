import {Button, Group, Loader, Modal, NumberInput, Stack, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {BorrowBookService, GetBookByIdService} from "../../Services/BookService";
import {BookDTO} from "../../Services/DTOs/BookDTO";
import {useAuthUser} from "react-auth-kit";
import {useTranslation} from "react-i18next";

export const ModalReserve = ({bookId}: {bookId: number}) => {
  const [opened, {open, close}] = useDisclosure(false);
  const [book, setBook] = useState<BookDTO | null>(null);
  const [days, setDays] = useState<number | ''>(1);
  const authUser = useAuthUser();
  const {t} = useTranslation('modalReserve');

  useEffect(() => {
    // logic here
    if (opened){
      GetBookByIdService(bookId).then((response) => {
        if (response && response.status === 200) {
          setBook(response.data)
        }
      });
    }
  }, [opened]);

  const handleConfirm = () => {
    // logic here
    BorrowBookService(bookId, authUser()!.name, Number(days)).then((response) => {
      if (response && response.status === 200) {
        close();
      }
    });
  }

  return(
    <>
      <Modal opened={opened} onClose={close} title={t('modal.title')} centered sx={{overflow: "auto"}}>
        { book === null && <Loader variant="dots" />}
        {book &&
          <Stack m={"md"}>
            <Text>{t('modal.name')}: {book.name}</Text>
            <Text>{t('modal.description')}: {book.description}</Text>
            <Text>{t('modal.category')}: {book.category.name}</Text>
            {book.authors.length === 0 &&
              <Text>{t('modal.authors.none')}</Text>
            }
            {book.authors.length > 0 &&
              <Group position={"apart"}>
                <Text>{t('modal.authors.filled')}: {book.authors.map((author) => author.name).join(", ")}</Text>
              </Group>
            }
            <NumberInput
                label={t('modal.dueDate.label')}
                description={t('modal.dueDate.description')}
                placeholder={t('modal.dueDate.placeholder')}
                max={120}
                min={1}
                value={days}
                onChange={(value) => setDays(value)}
            />
          </Stack>
        }

        <Group position={"apart"}>
          <Button onClick={close} color={'red'}>{t('modal.button.cancel')}</Button>
          <Button onClick={handleConfirm} color={'green'}>{t('modal.button.confirm')}</Button>
        </Group>
      </Modal>

      <Button onClick={open}>{t('button')}</Button>
    </>
  );
}