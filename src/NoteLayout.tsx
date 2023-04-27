import React from "react";
import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "./App";
interface NoteLayoutProps {
  note: Note[];
}
export default function NoteLayout({ note }: NoteLayoutProps) {
  const { id } = useParams();
  const tarNote = note.find((n) => n.id === id);
  console.log(tarNote);
  if (tarNote === null || tarNote === undefined) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <>
      <Outlet context={tarNote} />
    </>
  );
}
export function useNote() {
  return useOutletContext<Note>();
}
