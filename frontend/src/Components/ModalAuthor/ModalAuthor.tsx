import {Button, Modal, Stack, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";
import {NewAuthorDTO} from "../../Services/DTOs/AuthorDTO";
import {AddAuthorService} from "../../Services/AuthorService";

export const ModalAuthor = () => {
  const [opened, {open, close}] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      birthYear: 0,
      nationality: "",
    } as NewAuthorDTO,
  });
  const {t} = useTranslation("modalAuthor");

  return (
    <>
      <Modal opened={opened} onClose={close} title={t('modal.title')} centered>
        <form onSubmit={form.onSubmit((values) => {
          AddAuthorService(values).then((value) => {
            console.log(values);
            if (value && value.status === 200) {
              close();
            }
          });
        })}>
          <Stack justify={"center"} spacing={"lg"}>
            <TextInput
              withAsterisk
              required
              label={t('modal.name.label')}
              placeholder={t('modal.name.placeholder')}
              {...form.getInputProps("name")}
            />

            <TextInput
              withAsterisk
              required
              label={t('modal.birthYear.label')}
              placeholder={t('modal.birthYear.placeholder')}
              {...form.getInputProps("birthYear")}
            />

            <TextInput
              withAsterisk
              required
              label={t('modal.nationality.label')}
              placeholder={t('modal.nationality.placeholder')}
              {...form.getInputProps("nationality")}
            />

            <Button type="submit">{t('modal.submit')}</Button>
          </Stack>
        </form>
      </Modal>

      <Button onClick={open} variant={"outline"}>{t('button')}</Button>
    </>
  );
}