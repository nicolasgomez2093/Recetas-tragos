import { useState } from "react";
import { Modal, Image, Button } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";

function ModalBebida() {
  const { modal, handleModalClick, infoBebida, cargando } = useBebidas();
  const { strDrink, strInstructions, strDrinkThumb } = infoBebida;

  const mostrarIngredientes = () => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (infoBebida[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {infoBebida[`strIngredient${i}`]} {infoBebida[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };

  return (
    !cargando && (
      <Modal show={modal} onHide={handleModalClick}>
        <Image src={strDrinkThumb} alt={`Imagen receta ${strDrink}`} />
        <Modal.Header>
          <Modal.Title>{strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <h2>Instrucciones</h2>
            {strInstructions}
            <h2>Ingredientes y cantidades</h2>
            {mostrarIngredientes()}
          </div>
        </Modal.Body>
      </Modal>
    )
  );
}
export default ModalBebida;
