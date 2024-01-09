import {Button, Group, Title, Text} from "@mantine/core";
import {ModalLogin} from "../ModalLogin";
import {ModalRegister} from "../ModalRegister";
import {useAuthUser, useIsAuthenticated, useSignOut} from "react-auth-kit";
import {useTranslation} from "react-i18next";
import {ModalUserDetails} from "../ModalUserDetails";

export const Header = () => {
  const {t} = useTranslation("header")

  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const signOut = useSignOut();

  return (
    <Group position={"apart"} p={"xl"} mx={10}>
      <Title order={1}>{t('left.title')}</Title>

      {/*TODO: Check if user have valid token if not then log out*/}
      {isAuthenticated() &&
          <Group align={"center"}>
              <Text>{t('right.text')} {authUser()!.name}!</Text>
              <ModalUserDetails />
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