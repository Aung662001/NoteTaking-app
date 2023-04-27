import React from "react";
import { useNote } from "./NoteLayout";
import { Row, Col, Stack, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
interface NoteProps {
  onDelete: (id: string) => void;
}
export default function Note({ onDelete }: NoteProps) {
  const note = useNote();
  console.log(note);
  const { id, tags, title, markdown } = note;
  const navigate = useNavigate();
  return (
    <>
      <Row className="align-items-center my-4">
        <Col>
          <h1>{title}</h1>
          <Stack direction="horizontal">
            {tags.length > 0 &&
              tags.map((tag) => {
                {
                  return (
                    <Button className="mx-3 py-0" key={tag.id} variant="info">
                      {tag.label}
                    </Button>
                  );
                }
              })}
          </Stack>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="edit">
              <Button variant="outline-primary">Edit</Button>
            </Link>
            <Button
              variant="outline-danger"
              type="button"
              onClick={() => {
                onDelete(id);
                navigate("..");
              }}
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary" type="button">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </>
  );
}
