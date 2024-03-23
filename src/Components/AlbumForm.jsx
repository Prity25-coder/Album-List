import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FORM_MODE from "../constants/formMode";
import { useEffect, useState } from "react";

const AlbumForm = ({ mode, onSubmit, albumData, setAlbumData, setMode }) => {
  const cardTitle = mode === FORM_MODE.CREATE ? "Create" : "Update";

  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      userId,
      title,
    });

    setUserId("");
    setTitle("");
  };

  useEffect(() => {
    if (mode === FORM_MODE.UPDATE) {
      setUserId(albumData.userId);
      setTitle(albumData.title);
    }

    if (!albumData) {
      setUserId("");
      setTitle("");
    }
  }, [mode, albumData]);

  return (
    <Form onSubmit={handleSubmit} >
      <Card className="m-2 border border-success">
        <Card.Body>
          <Card.Title>{cardTitle} Album</Card.Title>
          <div>
            <Form.Label htmlFor="userId">User Id</Form.Label>
            <Form.Control
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div>
            <Form.Label htmlFor="title">Album title</Form.Label>
            <Form.Control
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end mt-2 gap-2">
            <Button
              variant="secondary"
              type="reset"
              onClick={() => {
                setAlbumData(null);
                setMode(FORM_MODE.CREATE);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {mode === FORM_MODE.CREATE ? "Add" : "Update"} Album
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Form>
  );
};

AlbumForm.propTypes = {
  mode: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  albumData: PropTypes.object,
  setAlbumData: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default AlbumForm;
