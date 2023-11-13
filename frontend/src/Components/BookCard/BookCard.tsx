import {Button, Card, Center, Grid, Group, Pagination, Title} from "@mantine/core";
import {
  IconArrowBarToRight,
  IconArrowBarToLeft,
  IconArrowLeft,
  IconArrowRight,
  IconGripHorizontal,
} from '@tabler/icons-react';
import {useEffect, useRef, useState} from "react";
import {BookDTO} from "../../Services/DTOs/BookDTO";
import {BookService} from "../../Services/BookService";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

export const BookCard = () => {

  const [books, setBooks] = useState<BookDTO[] | null>(null);
  const [countPages, setCountPages] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const AMOUNT_OF_BOOKS_PER_PAGE = 6.0;
  const isAuth = useIsAuthenticated();


  useEffect(() => {
    const abortController = new AbortController();

    // logic here
    if(isAuth().valueOf()) {
      BookService(abortController).then((response) => {
        if (response) {
          setBooks(response.data);
          setCountPages(Math.ceil(response.data.length / AMOUNT_OF_BOOKS_PER_PAGE));
        }
      });
    }

    // cleanup
    return () => {
      abortController.abort();
    }
  }, []);

  return (
    <>{ useIsAuthenticated() && books &&
      <Center>
        <Card shadow={"sm"} padding={"md"} radius={"md"} w={"fit-content"}>
          <Title order={3}>Dostępne książki</Title>

          <Grid columns={2} m={"xs"}>
            {
              books?.slice((activePage - 1) * AMOUNT_OF_BOOKS_PER_PAGE, AMOUNT_OF_BOOKS_PER_PAGE * activePage).map((book, k) => {
                return (
                  <Grid.Col span={1} key={k}>
                    <Card withBorder>
                      <Title order={4}>{book.title}</Title>
                      <Title order={5}>{book.publisher}</Title>
                      <Title order={6}>{book.description}</Title>
                      <Button>Reserve</Button>
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
      </Center>}

    </>
  );
}