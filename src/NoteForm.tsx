import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";

import { NoteData, Tag } from "./App";
type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  avaiableTags: Tag[];
};
export default function NoteForm({
  onSubmit,
  onAddTag,
  avaiableTags,
}: NoteFormProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: avaiableTags,
    });
    navigate("..");
  }
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <FormGroup controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required ref={titleRef}></Form.Control>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
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
        <FormGroup controlId="markdowm">
          <Form.Label>Body</Form.Label>
          <Form.Control required as="textarea" rows={15} ref={markdownRef} />
        </FormGroup>
      </Stack>
      <Stack
        direction="horizontal"
        className="my-3 justify-content-end"
        gap={3}
      >
        <Button type="submit" variant="primary">
          Save
        </Button>
        <Link to={"../"}>
          <Button type="button" variant="outline-danger">
            Cancel
          </Button>
        </Link>
      </Stack>
    </Form>
  );
}
