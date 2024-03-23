import PropTypes from "prop-types";

import { Card } from "react-bootstrap";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import FORM_MODE from "../constants/formMode";

function AlbumList({
  albums,
  setMode,
  setCurrentUpdateData,
  deleteAlbumListData,
}) {
  return (
    <div className="container">
      {albums.map((item) => (
        <Card
          className="card p-3 mt-2 mb-4 bg-warning text-dark bg-opacity-50"
          key={item.id}
        >
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.userId}</Card.Text>

            <div className="d-flex justify-content-end mt-2 gap-2">
              <PencilIcon
                height="20px"
                width="20px"
                cursor="pointer"
                onClick={() => {
                  setMode(FORM_MODE.UPDATE);
                  setCurrentUpdateData(item);
                }}
              />
              <TrashIcon
                height="20px"
                width="20px"
                cursor="pointer"
                onClick={() => {
                  deleteAlbumListData(item.id);
                }}
              />
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

AlbumList.propTypes = {
  albums: PropTypes.array.isRequired,
  setMode: PropTypes.func.isRequired,
  setCurrentUpdateData: PropTypes.func.isRequired,
  deleteAlbumListData: PropTypes.func.isRequired,
};

export default AlbumList;
