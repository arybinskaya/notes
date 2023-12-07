import { NoteProvider } from "./store";
import Input from "./components/Input";
import List from "./components/List";

function App() {
  return (
    <NoteProvider>
      <Input />
      <List />
    </NoteProvider>
  );
}

export default App;
