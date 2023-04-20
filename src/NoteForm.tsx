import { Col, Form, FormGroup, Row, Stack } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";

export default function NoteForm() {
  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <FormGroup controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required></Form.Control>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="title">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect isMulti />
            </FormGroup>
          </Col>
        </Row>
      </Stack>
    </Form>
  );
}
