import {Button, Modal, PasswordInput, Stack, TextInput, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import LogIn from "../../Services/AuthService";
import {LogInDTO} from "../../Services/DTOs/AuthDTO";
import {useSignIn} from "react-auth-kit";
import {useTranslation} from "react-i18next";

export const ModalLogin = () => {
  const {t} = useTranslation("modalLogin");

  const [opened, {open, close}] = useDisclosure(false);
  const signIn = useSignIn();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    } as LogInDTO,
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title={t('modal.title')}>
        <form onSubmit={form.onSubmit((values) => {
          LogIn(values).then((value) => {
            if (value && value.status === 200) {
              signIn({
                token: value.data.token,
                expiresIn: 60 * 60 * 24 * 3,
                tokenType: "Bearer",
                authState: { name: values.username , role: value.data.role },
              });
              close();
            }

            if (value && value.status === 404) {
              form.setFieldError("username", value.data);
            }

            if (value && value.status === 401) {
              form.setFieldError("password", value.data);

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

          <Button type="submit">{t('modal.submit')}</Button>
          </Stack>
        </form>
      </Modal>

      <Button onClick={open}>{t('button')}</Button>
    </>
  );
}