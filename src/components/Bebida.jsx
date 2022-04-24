import { useState } from "react";
import { Col, Button, Card } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";

function Bebida({ bebida }) {
  const [like, setLike] = useState(true);
  const {
    handleModalClick,
    handleBebidaIdClick,
    setBebidaLikes,
    bebidaLikes,
 
  } = useBebidas();

  const handleLikeClick = () => {
    if (like) {
      setLike(false);
    } else {
      setLike(true);
    }
  };

  const bebidaLike = (id) => {
    if (bebida.idDrink === id) {
      bebida = { ...bebida, like: like };
      setBebidaLikes(bebida);
      return;
    }
  };

  return (
    <Col md={6} lg={4}>
      <Card className="mb-4">
        <Card.Img
          variant="top"
          src={bebida.strDrinkThumb}
          alt={`Imagen de ${bebida.strDrink}`}
        />

        <Card.Body>
          {bebida.strDrink}
          <Button
            name="like"
            className="d-block mt-2"
            variant={like ? "outline-danger" : "danger"}
            onClick={() => {
              handleLikeClick();
              bebidaLike(bebida.idDrink);
            }}
          >
            <i className="far fa-heart"></i>
          </Button>

          <Button
            variant="warning"
            className="text-uppercase w-100 mt-2"
            onClick={() => {
              handleModalClick();
              handleBebidaIdClick(bebida.idDrink);
            }}
          >
            Ver Receta
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
export default Bebida;
