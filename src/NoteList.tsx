import { useMemo, useState } from "react";
import style from "./NoteList.module.css";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import ReactSelect from "react-select";
import { Tag } from "./App";
import { Link } from "react-router-dom";

interface EditTagsModalProps {
  avaiableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  deleteTag: (id: string) => void;
  updateTag: (id: string, label: string) => void;
}

interface SimplifyNotes {
  id: string;
  title: string;
  tags: Tag[];
}
interface NoteListProps {
  avaiableTags: Tag[];
  notes: SimplifyNotes[];
  deleteTag: (id: string) => void;
  updateTag: (id: string, label: string) => void;
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
  notes,
  deleteTag,
  updateTag,
}: NoteListProps) {
  const [editTagsModalOpen, setEditTagsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const filterNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, selectedTags, title]);

  return (
    <>
      <Row className="my-5 align-items-center">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button>Create</Button>
            </Link>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => setEditTagsModalOpen(true)}
            >
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
      {/* {selectedTags.length === 0 ? (
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
      )} */}
      <Row xs={1} md={2} lg={3} xl={4} className="g-3">
        {filterNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModel
        show={editTagsModalOpen}
        handleClose={() => setEditTagsModalOpen(false)}
        avaiableTags={avaiableTags}
        deleteTag={deleteTag}
        updateTag={updateTag}
      />
    </>
  );
}
function NoteCard({ id, title, tags }: SimplifyNotes) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`text-reset h-100 text-decoration-none ${style.card}`}
    >
      <Card.Body className="d-flex justify-content-center align-items-center flex-column ">
        <Card.Title>{title}</Card.Title>
        <Card.Text className="mt-3">
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
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
function EditTagsModel({
  avaiableTags,
  handleClose,
  show,
  deleteTag,
  updateTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {avaiableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    value={tag.label}
                    onChange={(eve) => updateTag(tag.id, eve.target.value)}
                    type="text"
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteTag(tag.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
