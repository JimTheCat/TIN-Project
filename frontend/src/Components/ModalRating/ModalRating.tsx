import {Button, Modal, Rating, rem, Stack, Title, useMantineTheme} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {
  IconMoodCrazyHappy,
  IconMoodCry,
  IconMoodEmpty,
  IconMoodHappy,
  IconMoodSad,
  IconMoodSmile
} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {UpdateRatingService} from "../../Services/BookService";
import {useTranslation} from "react-i18next";

type ModalRatingProps = {
  // Props types here
  borrowId: number;
  handleClosure: () => void;
};

export const ModalRating = (props: ModalRatingProps) => {
  const [opened, {open, close}] = useDisclosure(true);
  const [value, setValue] = useState<number | null>(null);
  const {t} = useTranslation("modalRating");

  const GetEmptyIcon = (value: number) => {
    const defaultProps = { size: rem(32), color: 'gray' };
    switch (value) {
      case 1:
        return <IconMoodCry {...defaultProps} />;
      case 2:
        return <IconMoodSad {...defaultProps} />;
      case 3:
        return <IconMoodSmile {...defaultProps} />;
      case 4:
        return <IconMoodHappy {...defaultProps} />;
      case 5:
        return <IconMoodCrazyHappy {...defaultProps} />;
      default:
        return <IconMoodEmpty {...defaultProps} />;
    }
  };

  const GetFullIcon = (value: number) => {
    const defaultProps = { size: rem(32) };
    const theme = useMantineTheme();

    switch (value) {
      case 1:
        return <IconMoodCry {...defaultProps} color={theme.colors.red[7]} />;
      case 2:
        return <IconMoodSad {...defaultProps} color={theme.colors.orange[7]} />;
      case 3:
        return <IconMoodSmile {...defaultProps} color={theme.colors.yellow[7]} />;
      case 4:
        return <IconMoodHappy {...defaultProps} color={theme.colors.lime[7]} />;
      case 5:
        return <IconMoodCrazyHappy {...defaultProps} color={theme.colors.green[7]} />;
      default:
        return <IconMoodEmpty {...defaultProps} />;
    }
  };

  useEffect(() => {
    if (!opened){
      props.handleClosure();
    }
  }, [opened]);

  return(
    <Modal opened={opened} onClose={() => close()} title={t('title')} centered>
      <Stack align={"center"} justify={"center"}>
        <Title order={2}>{t('text')}</Title>
        <Rating emptySymbol={GetEmptyIcon} fullSymbol={GetFullIcon} highlightSelectedOnly onChange={item => setValue(item)}/>
        <Button onClick={() => {
          handleSendButton(props.borrowId, value!);
          close();
        } }>{t('button')}</Button>
      </Stack>
    </Modal>
  );
}

const handleSendButton = (borrowId: number, value: number) => {
  //if rating is not selected just skip
  if (value === null) return;

  UpdateRatingService(borrowId, value).then((response) => {
    if (response && response.status === 200) {
      console.log(response);
    }
  });
}