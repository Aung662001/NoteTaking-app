import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewNote from "./NewNote";
import useLocalStorage from "./useLocalStorage";
export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};
export type Tag = {
  id: string;
  label: string;
};
function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  return (
    <Container className="my-4">
      <Routes>
        <Route path={"/"} element={<h2>Home</h2>} />
        <Route path={"/new"} element={<NewNote />} />
        <Route path={"/:id"}>
          <Route index element={<h2>Show</h2>} />
          <Route path={"edit"} element={<h2>Edit</h2>} />
        </Route>
        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  );
}

export default App;
