import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};
export default function NoteForm({ onSubmit }: NoteFormProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
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
                isMulti
                value={tags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) =>
                  setTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  )
                }
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
