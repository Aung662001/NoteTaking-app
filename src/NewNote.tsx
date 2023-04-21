import { NoteData } from "./App";
import NoteForm from "./NoteForm";

export default function NewNote() {
  function onSubmit({ title, markdown, tags }: NoteData) {
    console.log(title);
    return null;
  }
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  );
}
