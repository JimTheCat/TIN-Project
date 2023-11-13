import {Button, Center, Group, Title, Text} from "@mantine/core";
import {ModalLogin} from "../ModalLogin";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {ModalRegister} from "../ModalRegister";

export const Header = () => {
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const signOut = useSignOut();

  return (
    <Group position={"apart"} p={"xl"} mx={10}>
      <Title order={1}>Księgarnia</Title>

      {isAuthenticated() &&
          <Group align={"center"}>
              <Text>Welcome user!</Text>
              <Button
                  onClick={() => {
                    signOut();
                    window.location.reload();
                  }}
              >
                  Log out
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