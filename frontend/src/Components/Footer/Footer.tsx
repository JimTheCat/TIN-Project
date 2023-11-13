import {Button, Group, Text} from "@mantine/core";

export const Footer = () => {
  return (
    <Group position={"apart"} p={"xl"} mx={10}>
      <Group position={"center"}>
        <Button variant="outline" color="indigo" radius="md" size="xs">
          Polish
        </Button>
        <Button variant="outline" color="indigo" radius="md" size="xs">
          English
        </Button>
      </Group>
      <Text>Created by s25256</Text>
    </Group>
  );
}