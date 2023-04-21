import "bootstrap/dist/css/bootstrap.min.css";
import {
  Routes,
  Route,
  Navigate,
  Link,
  RedirectFunction,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import NewNote from "./NewNote";
import useLocalStorage from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
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

  const nodesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    console.log("create note");
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }
  function onAddtag(newTag: Tag) {
    setTags((prev) => {
      return [...prev, newTag];
    });
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route path={"/"} element={<h2>Home</h2>} />
        <Route
          path={"/new"}
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={onAddtag}
              avaiableTags={tags}
            />
          }
        />
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
