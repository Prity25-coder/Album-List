
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function Nav() {
  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-between">
      <img src="https://cdn-icons-png.flaticon.com/128/7894/7894161.png" alt="" className="album" />
        <Button className="" >Add
          {/* <Link to="/Album">Add</Link> */}
        </Button>
      </Navbar>

     
    </>
  );
}

export default Nav;
