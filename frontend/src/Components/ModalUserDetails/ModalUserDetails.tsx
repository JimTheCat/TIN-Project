import {Button, Card, Drawer, Modal, PasswordInput, Stack, TextInput, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useAuthUser} from "react-auth-kit";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {GetBorrowedBooksByUserId, ReturnBookService} from "../../Services/BookService";
import {BorrowDTO} from "../../Services/DTOs/BorrowDTO";
import {ModalRating} from "../ModalRating";

type ModalUserDetailsProps = {
  // Props types here
  triggerComponent: (borrowId: number) => void;
};


export const ModalUserDetails = (props: ModalUserDetailsProps) => {
  const {t} = useTranslation("modalUserDetails");

  const [opened, {open, close}] = useDisclosure(false);
  const authUser = useAuthUser();
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowDTO[] | null>(null);

  const returnBook = (borrowId: number) => {
    ReturnBookService(borrowId).then((response) => {
      if (response && response.status === 200) {
        close();
      }
    });
  }

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
              if (borrow.isReturned) return;

              return (
                <Card shadow={"sm"} padding={"md"} key={borrow.borrowId}>
                  <Stack>
                    <Title order={3}>{borrow.bookModel.name}</Title>
                    <TextInput label={t('modal.borrowDate')} value={borrow.borrowDate.toString()} disabled/>
                    <TextInput label={t('modal.dueDate')} value={borrow.dueDate.toString()} disabled/>
                    <Button onClick={() => {
                      props.triggerComponent(borrow.borrowId);
                      returnBook(borrow.borrowId);
                    }}>Click me!</Button>
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