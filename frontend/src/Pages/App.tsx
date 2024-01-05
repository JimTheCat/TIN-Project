import React from 'react';
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {AppShell} from "@mantine/core";
import {BookCard} from "../Components/BookCard";
import {useIsAuthenticated} from "react-auth-kit";

function App() {

  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <AppShell
        header={<Header />}
        footer={<Footer />}
      >
        {isAuthenticated() && <BookCard/>}
      </AppShell>
    </>
  );
}

export default App;
