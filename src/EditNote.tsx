import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";
type newNoteProps = {
  onSubmit: (id: string, { tags, ...data }: NoteData) => void;
  onAddTag: (data: Tag) => void;
  avaiableTags: Tag[];
};
export default function NewNote({
  onSubmit,
  onAddTag,
  avaiableTags,
}: newNoteProps) {
  const notes = useNote();
  console.log(notes);

  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={notes.title}
        onSubmit={(data) => onSubmit(notes.id, data)}
        onAddTag={onAddTag}
        avaiableTags={avaiableTags}
        markdown={notes.markdown}
        tags={notes.tags}
      />
    </>
  );
}
