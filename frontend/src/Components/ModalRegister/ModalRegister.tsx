import {Button, Modal, PasswordInput, Stack, TextInput} from "@mantine/core";
import {Register} from "../../Services/AuthService";
import {useDisclosure} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import {RegisterDTO} from "../../Services/DTOs/AuthDTO";
import {useSignIn} from "react-auth-kit";
import {useTranslation} from "react-i18next";

export const ModalRegister = () => {
  const {t} = useTranslation("modalRegister");

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
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('modal.email.error')),
    }
  });


  return (
    <>
      <Modal opened={opened} onClose={close} title={t('modal.title')}>
        <form onSubmit={form.onSubmit((values) => {
          Register(values).then((value) => {
            if (value && value.status === 200) {
              signIn({
                token: value.data.token,
                expiresIn: 60 * 60 * 24 * 3,
                tokenType: "Bearer",
                authState: { name: values.username , role: value.data.role },
              });
              close();
            }

            if (value && value.status === 401) {
              form.setFieldError("username", value.data);
            }
          });
        })}>
          <Stack justify={"center"} spacing={"lg"}>
            <TextInput
              withAsterisk
              required
              label={t('modal.username.label')}
              placeholder={t('modal.username.placeholder')}
              {...form.getInputProps("username")}
            />

            <PasswordInput
              withAsterisk
              required
              label={t('modal.password.label')}
              placeholder={t('modal.password.placeholder')}
              {...form.getInputProps("password")}
            />

            <TextInput
              withAsterisk
              required
              label={t('modal.email.label')}
              placeholder={t('modal.email.placeholder')}
              {...form.getInputProps("email")}
            />

            <TextInput
              withAsterisk
              required
              label={t('modal.first.label')}
              placeholder={t('modal.first.placeholder')}
              {...form.getInputProps("firstName")}
            />

            <TextInput
              withAsterisk
              required
              label={t('modal.last.label')}
              placeholder={t('modal.last.placeholder')}
              {...form.getInputProps("lastName")}
            />

            <Button type="submit">{t('modal.submit')}</Button>
          </Stack>
        </form>
      </Modal>

      <Button onClick={open}>{t('button')}</Button>
    </>
  );
}