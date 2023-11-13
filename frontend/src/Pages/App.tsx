import React from 'react';
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {AppShell} from "@mantine/core";
import {BookCard} from "../Components/BookCard";

function App() {
  return (
    <>
      <AppShell
        header={<Header />}
        footer={<Footer />}
      >
        <BookCard />
      </AppShell>
    </>
  );
}

export default App;
