import {
  AppRoot,
  SplitLayout,
  SplitCol,
  PanelHeader,
  usePlatform,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { MainPage } from "./pages/MainPage";

const App = () => {
  const platform = usePlatform();

  return (
    <AppRoot>
      <SplitLayout
        header={platform !== "vkcom" && <PanelHeader delimiter="none" />}
      >
        <SplitCol autoSpaced>
          <MainPage />
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
