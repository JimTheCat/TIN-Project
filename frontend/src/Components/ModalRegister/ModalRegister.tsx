import {Button, Modal, PasswordInput, Stack, TextInput} from "@mantine/core";
import {Register} from "../../Services/AuthService";
import {useDisclosure} from "@mantine/hooks";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {useForm} from "@mantine/form";
import {RegisterDTO} from "../../Services/DTOs/AuthDTO";

export const ModalRegister = () => {
  const [opened, {open, close}] = useDisclosure(false);
  const signIn = useSignIn();

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    } as RegisterDTO,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    }
  });


  return (
    <>
      <Modal opened={opened} onClose={close} title="Log in form">
        <form onSubmit={form.onSubmit((values) => {
          Register(values).then((value) => {
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
          // window.location.reload();
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

            <TextInput
              withAsterisk
              required
              label="Email"
              placeholder="Enter your email"
              {...form.getInputProps("email")}
            />

            <TextInput
              withAsterisk
              required
              label="First name"
              placeholder="Enter your first name"
              {...form.getInputProps("firstName")}
            />

            <TextInput
              withAsterisk
              required
              label="Last name"
              placeholder="Enter your last name"
              {...form.getInputProps("lastName")}
            />

            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Modal>

      <Button onClick={open}>Register</Button>
    </>
  );
}