import {Button, Center, Group, Modal, PasswordInput, Stack, TextInput, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import LogIn from "../../Services/AuthService";
import {LogInDTO} from "../../Services/DTOs/AuthDTO";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export const ModalLogin = () => {
  const [opened, {open, close}] = useDisclosure(false);
  const signIn = useSignIn();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    } as LogInDTO,

    // validate: {
    //   username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // }
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Log in form">
        <form onSubmit={form.onSubmit((values) => {
          LogIn(values).then((value) => {
            if (value && value.status === 200) {
              signIn({
                token: value.data.token,
                expiresIn: 60 * 60 * 24 * 3,
                tokenType: "Bearer",
                authState: { username: values.username },
              });
              close();
            }
          });
          window.location.reload();
        })}>
          <Stack justify={"center"} spacing={"lg"}>
          <TextInput
              withAsterisk
              required
              label="Username"
              placeholder="Enter your username"
              {...form.getInputProps("username")}
            />

            <PasswordInput
              withAsterisk
              required
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps("password")}
            />

            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Modal>

      <Button onClick={open}>Log in</Button>
    </>
  );
}