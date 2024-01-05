import {Button, Group, Text} from "@mantine/core";
import {useTranslation} from "react-i18next";

export const Footer = () => {
  const {t, i18n} = useTranslation("footer")

  return (
    <Group position={"apart"} p={"xl"} mx={10}>
      <Group position={"center"}>
        <Button variant="outline" color="indigo" radius="md" size="xs" onClick={() => {
          i18n.changeLanguage('pl');
          localStorage.setItem('language', 'pl');
        }}>
          {t('left.polish')}
        </Button>
        <Button variant="outline" color="indigo" radius="md" size="xs" onClick={() => {
          i18n.changeLanguage('en');
          localStorage.setItem('language', 'en');
        }}>
          {t('left.english')}
        </Button>
      </Group>
      <Text>{t('right.text')}</Text>
    </Group>
  );
}