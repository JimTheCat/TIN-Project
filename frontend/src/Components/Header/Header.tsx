import {Button, Group, Title, Text} from "@mantine/core";
import {ModalLogin} from "../ModalLogin";
import {ModalRegister} from "../ModalRegister";
import {useAuthUser, useIsAuthenticated, useSignOut} from "react-auth-kit";
import {useTranslation} from "react-i18next";
import {ModalUserDetails} from "../ModalUserDetails";
import {useDisclosure} from "@mantine/hooks";
import {ModalRating} from "../ModalRating";
import {useState} from "react";

export const Header = () => {
  const {t} = useTranslation("header")
  // const [opened, {open, close}] = useDisclosure(false);
  const [borrowId, setBorrowId] = useState<number | null>(null);

  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const signOut = useSignOut();

  const handleTriggerComponent = (borrowId: number) => {
    setBorrowId(borrowId);
  }

  const handleClosure = () => {
    setBorrowId(null);
  }


  return (
    <Group position={"apart"} p={"xl"} mx={10}>
      <Title order={1}>{t('left.title')}</Title>

      {/*TODO: Check if user have valid token if not then log out*/}
      {isAuthenticated() &&
          <Group align={"center"}>
              {borrowId && <ModalRating borrowId={borrowId} handleClosure={handleClosure}/>}
              <Text>{t('right.text')} {authUser()!.name}!</Text>
              <ModalUserDetails triggerComponent={handleTriggerComponent}/>
              <Button
                  onClick={() => {
                    signOut();
                  }}
              >
                {t('right.button')}
              </Button>
          </Group>
      }
      {!isAuthenticated() &&
          <Group align={"center"}>
              <ModalLogin/>
              <ModalRegister/>
          </Group>
      }
    </Group>
  );
}