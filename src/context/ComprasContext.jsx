import { useContext, useState, createContext, useEffect } from "react";
import {
  createComprasRequest,
  deleteComprasRequest,
  getComprasRequest,
  updateComprasRequest,
  getCompraRequest
} from "../api/compras";

const CompraContext = createContext();

export const useCompras = () => {
  const context = useContext(CompraContext);
  if (!context)
    throw new Error(
      "useCompras debe ser usado en CompraProvider"
    );
  return context;
};

export function CompraProvider({ children }) {
  const [compras, setCompras] = useState([]);
  const [errors, setErrors] = useState([]);
  const [anulado, setAnulado] = useState(false)

  const getCompras = async () => {
    try {
      const res = await getComprasRequest();
      console.log(res);
      setCompras(res);
    } catch (error) {
      console.error(error);
    }
  };

  const createCompra = async (compra) => {
    try {
      return  await createComprasRequest(compra);
      // console.log("ventas:", response);
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error);
    }
  };

  const getCompra = async (id) => {
    try {
      const res = await getCompraRequest(id);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const updateCompra = async (id, compra) => {
    try {
      return await updateComprasRequest(id, compra);
    } catch (error) {
      console.error(error);
      setErrors(error.response.data.message);
    }
  };
  
  const deleteCompra = async (id) => {
    try {
      const res = await deleteComprasRequest(id);
      console.log(res);
      if (res.status === 204) {
        setCompras(compras.filter((compra) => compra._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const anularCompra = (req, res) => {
    setAnulado(true)
    console.log("anuladdoo",anulado);
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <CompraContext.Provider
      value={{
        compras,
        anulado,
        anularCompra,
        errors,
        getCompras,
        createCompra,
        getCompra,
        updateCompra,
        deleteCompra
      }}
    >
      {children}
    </CompraContext.Provider>
  );
}