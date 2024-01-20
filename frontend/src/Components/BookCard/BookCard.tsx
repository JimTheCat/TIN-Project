import {ActionIcon, Button, Card, Grid, Group, Pagination, Text, Title} from "@mantine/core";
import {
  IconArrowBarToRight,
  IconArrowBarToLeft,
  IconArrowLeft,
  IconArrowRight,
  IconGripHorizontal, IconSettings,
} from '@tabler/icons-react';
import {useEffect, useState} from "react";
import {BookDTO} from "../../Services/DTOs/BookDTO";
import {GetAllBooksNotBorrowedService, GetAllBooksService} from "../../Services/BookService";
import {useIsAuthenticated, useAuthUser} from "react-auth-kit";
import {ModalMoreInformation} from "../ModalMoreInformation";
import {ModalReserve} from "../ModalReserve";
import {ModalAuthor} from "../ModalAuthor";
import {ModalAddBook} from "../ModalAddBook/ModalAddBook";

export const BookCard = () => {

  const [books, setBooks] = useState<BookDTO[] | null>(null);
  const [countPages, setCountPages] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const AMOUNT_OF_BOOKS_PER_PAGE = 6.0;
  const isAuth = useIsAuthenticated();
  const authUser = useAuthUser();
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(authUser()!.role === "ADMIN");


  useEffect(() => {
    // logic here
    if (isAuth()) {
      GetAllBooksNotBorrowedService().then((response) => {
        if (response) {
          setBooks(response.data);
          setCountPages(Math.ceil(response.data.length / AMOUNT_OF_BOOKS_PER_PAGE));
        }
      });
    }

  }, [isAuth()]);

  return (
    <>
      {useIsAuthenticated() && books &&
        <Card shadow={"sm"} mx={"lg"} padding={"xl"} radius={"md"}>
          <Grid columns={2}>
            <Grid.Col span={2}>
              <Group position={"apart"}>
                <Title order={3}>Dostępne książki</Title>
                {isUserAdmin &&
                <Group position={"apart"}>
                    <ModalAuthor />
                    <ModalAddBook />
                </Group>
                }
              </Group>
            </Grid.Col>
            {
              books?.slice((activePage - 1) * AMOUNT_OF_BOOKS_PER_PAGE, AMOUNT_OF_BOOKS_PER_PAGE * activePage).map((book, k) => {
                return (
                  <Grid.Col span={1} key={k}>
                    <Card withBorder>
                      <Group position={"apart"}>
                        <Title order={4}>{book.name}</Title>
                        {isUserAdmin && <ActionIcon>
                            <IconSettings size={"1.125rem"}/>
                        </ActionIcon>}
                      </Group>
                      <Title order={6}>{book.description}</Title>
                      <Group position={"apart"} mt={"sm"}>
                        <ModalMoreInformation bookId={book.bookId}/>
                        <ModalReserve bookId={book.bookId}/>
                      </Group>
                    </Card>
                  </Grid.Col>
                )
              })
            }
          </Grid>

          {/* Compound pagination */}
          <Pagination.Root total={countPages} value={activePage} onChange={setActivePage}>
            <Group spacing={7} position="center" mt="xl">
              <Pagination.First icon={IconArrowBarToLeft}/>
              <Pagination.Previous icon={IconArrowLeft}/>
              <Pagination.Items dotsIcon={IconGripHorizontal}/>
              <Pagination.Next icon={IconArrowRight}/>
              <Pagination.Last icon={IconArrowBarToRight}/>
            </Group>
          </Pagination.Root>
        </Card>
      }
    </>
  );
}