import {Button, Card, Drawer, Modal, PasswordInput, Stack, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useAuthUser} from "react-auth-kit";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {GetBorrowedBooksByUserId} from "../../Services/BookService";
import {BorrowDTO} from "../../Services/DTOs/BorrowDTO";

export const ModalUserDetails = () => {
  const {t} = useTranslation("modalUserDetails");

  const [opened, {open, close}] = useDisclosure(false);
  const authUser = useAuthUser();
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowDTO[] | null>(null);

  useEffect(() => {
    if (opened){
      GetBorrowedBooksByUserId(authUser()!.name).then((response) => {
        if (response && response.status === 200) {
          setBorrowedBooks(response.data);
        }
      });
    }
  }, [opened]);

  return (
    <>
      <Drawer position={"right"} opened={opened} onClose={close} title={t('modal.title')}>
          <Stack justify={"center"} spacing={"lg"}>
            {borrowedBooks !== null && borrowedBooks.map((borrow) => {
              if (borrow.bookModel === null) return;

              return (
                <Card shadow={"sm"} padding={"md"}>
                  <Stack>
                    <TextInput label={t('modal.bookName')} value={borrow.bookModel.name} disabled/>
                    <TextInput label={t('modal.borrowDate')} value={borrow.borrowDate.toString()} disabled/>
                    <TextInput label={t('modal.returnDate')} value={borrow.isReturned.toString()} disabled/>
                  </Stack>
                </Card>
              );
            })
            }
          </Stack>
      </Drawer>

      <Button onClick={open}>{t('button')}</Button>
    </>
  );
}