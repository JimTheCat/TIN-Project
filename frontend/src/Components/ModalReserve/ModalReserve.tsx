import {Button, Group, Loader, Modal, NumberInput, Stack, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {BorrowBookService, GetBookByIdService} from "../../Services/BookService";
import {BookDTO} from "../../Services/DTOs/BookDTO";
import {useAuthUser} from "react-auth-kit";

export const ModalReserve = ({bookId}: {bookId: number}) => {
  const [opened, {open, close}] = useDisclosure(false);
  const [book, setBook] = useState<BookDTO | null>(null);
  const [days, setDays] = useState<number | ''>(1);
  const authUser = useAuthUser();

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
      <Modal opened={opened} onClose={close} title="Book details" centered sx={{overflow: "auto"}}>
        { book === null && <Loader variant="dots" />}
        {book &&
          <Stack m={"md"}>
            <Text>Title: {book.name}</Text>
            <Text>Description: {book.description}</Text>
            <Text>Category: {book.category.name}</Text>
            {book.authors.length === 0 &&
              <Text>No authors</Text>
            }
            {book.authors.length > 0 &&
              <Group position={"apart"}>
                <Text>Authors: {book.authors.map((author) => author.name).join(", ")}</Text>
              </Group>
            }
            <NumberInput
                label="Due date"
                description={"How many days you want to borrow this book?"}
                placeholder="Due date"
                max={120}
                min={1}
                value={days}
                onChange={(value) => setDays(value)}
            />
          </Stack>
        }

        <Group position={"apart"}>
          <Button onClick={close} color={'red'}>Cancel</Button>
          <Button onClick={handleConfirm} color={'green'}>Confirm</Button>
        </Group>
      </Modal>

      <Button onClick={open}>Reserve</Button>
    </>
  );
}