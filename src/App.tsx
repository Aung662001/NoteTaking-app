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
import NoteList from "./NoteList";
import NoteLayout from "./NoteLayout";
import Note from "./Note";
import EditNote from "./EditNote";
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
  function deleteTag(id: string) {
    setTags((tags) => tags.filter((tag) => tag.id !== id));
  }
  function updateTag(id: string, label: string) {
    setTags((prevTag) => {
      return prevTag.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }
  function onEditNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id == id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }
  function onDelete(id: string) {
    setNotes((notes) => {
      return notes.filter((note) => note.id !== id);
    });
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path={"/"}
          element={
            <NoteList
              avaiableTags={tags}
              notes={nodesWithTags}
              deleteTag={deleteTag}
              updateTag={updateTag}
            />
          }
        />
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
        <Route path={"/:id"} element={<NoteLayout note={nodesWithTags} />}>
          <Route index element={<Note onDelete={onDelete} />} />
          <Route
            path={"edit"}
            element={
              <EditNote
                onSubmit={onEditNote}
                onAddTag={onAddtag}
                avaiableTags={tags}
              />
            }
          />
        </Route>
        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  );
}

export default App;
