import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Row,
  Stack,
} from "react-bootstrap";
import ReactSelect from "react-select";
import { Tag } from "./App";
function clearBoard() {
  const card = document.querySelector(".select");

  if (card) console.log("called", card?.innerHTML);
}
interface NoteListProps {
  avaiableTags: Tag[];
  notesWithTags: NoteWithtags[];
}
interface NoteWithtags {
  tags: Tag[];
  id: string;
  title: string;
  markdown: string;
  tagIds: string[];
}
export default function NoteList({
  avaiableTags,
  notesWithTags,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  return (
    <>
      <Row className="my-5 align-items-center">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Button>Create</Button>
            <Button variant="outline-secondary" type="button">
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <FormGroup controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  )
                }
                options={avaiableTags.map((avaiable) => {
                  return { label: avaiable.label, value: avaiable.id };
                })}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
      {selectedTags.length === 0 ? (
        <Row xs={1} md={2} lg={3}>
          {notesWithTags.map((note) => {
            return (
              <Card key={note.id} className="my-3 mx-3 text-center">
                <Card.Body>
                  <Card.Title className="text-align-center">
                    {note.title}
                  </Card.Title>
                  <Card.Text>{note.markdown}</Card.Text>
                  {note.tags.map((tag) => {
                    {
                      if (note.tagIds.includes(tag.id)) {
                        return (
                          <Button className="mx-3 py-0" key={tag.id}>
                            {tag.label}
                          </Button>
                        );
                      } else {
                        return null;
                      }
                    }
                  })}
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      ) : (
        <Row xs={1} md={2} lg={3} className="select">
          {notesWithTags.map((note) => {
            // console.log(note.tagIds);
            return note.tagIds.map((id) => {
              return selectedTags.map((select) => {
                if (id === select.id) {
                  clearBoard();

                  return (
                    <Card key={note.id} className="my-3 mx-3 text-center">
                      <Card.Body>
                        <Card.Title className="text-align-center">
                          {note.title}
                        </Card.Title>
                        <Card.Text>{note.markdown}</Card.Text>
                        {note.tags.map((tag) => {
                          {
                            if (note.tagIds.includes(tag.id)) {
                              return (
                                <Button className="mx-3 py-0" key={tag.id}>
                                  {tag.label}
                                </Button>
                              );
                            } else {
                              return null;
                            }
                          }
                        })}
                      </Card.Body>
                    </Card>
                  );
                }
                return null;
              });
              //   console.log(selectedTags);
            });
          })}
        </Row>
      )}
    </>
  );
}
