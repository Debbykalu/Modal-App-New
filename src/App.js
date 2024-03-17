import ModalPage from './Components/ModalPage/ModalPage';
import { styled, useGlobalStyles } from "./stitches.config";
import { TextContent } from './Components/Content/TextContent';

const StyledApp = styled("div", {
  textAlign: "center",
  h1: {
    backgroundImage: "$fontGradient",
    backgroundClip: "text"
  }
});
const Heading = styled("h1", {
  background: "$fontGradient"
  
});

const headerText = "NewDay";
const App = () => {
  useGlobalStyles();
  return (
    <StyledApp>
      <main>
        <section>
          <Heading>
            {headerText}
          </Heading>
             <TextContent />
            <ModalPage />
        </section>
      </main>
    </StyledApp>
  );
}

export default App;
