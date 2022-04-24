import axios from "axios";
import { useState, useEffect, createContext } from "react";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([]);
  const [modal, setModal] = useState(false);
  const [bebidaId, setBebidaId] = useState(null);
  const [infoBebida, setInfoBebida] = useState({});
  const [cargando, setCargando] = useState(false);
  const [bebidaLikes, setBebidaLikes] = useState({})
  const [arrayLikes, setArrayLikes] = useState([])

  console.log(arrayLikes)


  const consultarBebida = async (datos) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;
      const { data } = await axios(url);
      setBebidas(data.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCargando(true);
    const obtenerReceta = async () => {
      if (!bebidaId) return;

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
        const { data } = await axios(url);
        setInfoBebida(data.drinks[0]);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerReceta();
  }, [bebidaId]);


  const handleModalClick = () => {
    setModal(!modal);
  };

  const handleBebidaIdClick = (id) => {
    setBebidaId(id);
  };

  useEffect(() => {
    if (bebidaLikes.idDrink) {
      const bebidasFiltrados = arrayLikes.filter(
        (bebida) => bebida.idDrink !== bebidaLikes.idDrink
      );
      setArrayLikes( bebidasFiltrados);
    }
  }, [bebidaLikes]);

  return (
    <BebidasContext.Provider
      value={{
        consultarBebida,
        bebidas,
        setBebidas,
        handleModalClick,
        modal,
        handleBebidaIdClick,
        infoBebida,
        cargando,
        bebidaLikes,
        setBebidaLikes,

      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

export { BebidasProvider };

export default BebidasContext;
