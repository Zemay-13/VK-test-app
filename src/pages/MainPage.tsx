import { View, Panel, PanelHeader, Header, Group, Div } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { FactsForm } from "../features/factsForm";
import { UserForm } from "../features/userForm";

export const MainPage = () => {
  return (
    <View
      activePanel="main"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <Panel id="main">
        <PanelHeader>Привет!</PanelHeader>
        <Div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Group
            style={{
              maxWidth: "650px",
              width: "100%",
              marginTop: "10px",
            }}
            header={<Header mode="secondary">Задание №1</Header>}
          >
            <FactsForm />
          </Group>
          <Group
            style={{
              maxWidth: "650px",
              width: "100%",
              marginTop: "10px",
            }}
            header={<Header mode="secondary">Задание №2</Header>}
          >
            <UserForm />
          </Group>
        </Div>
      </Panel>
    </View>
  );
};
