import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";
type newNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  avaiableTags: Tag[];
};
export default function NewNote({
  onSubmit,
  onAddTag,
  avaiableTags,
}: newNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        avaiableTags={avaiableTags}
      />
    </>
  );
}
