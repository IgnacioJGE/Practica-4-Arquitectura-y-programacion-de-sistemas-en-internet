import { Request, Response } from "npm:express@4.18.2";
import { ModeloCliente } from "../db/clientes.ts";

const regex = /^[0-9]{8}[A-Z]{1}$/;
export const addCliente = async (req: Request, res: Response) => {
  try {

    const { nombre, dinero, cochesenpropiedad,dni } = req.body;
    if (!nombre || !dinero || !cochesenpropiedad||!dni) {
      res.status(404).json({
        code: "campos_incorrectos",
        message: "Nombre, dinero, cochesenpropiedad y dni son campos obligatorios"
    });
      return;
    }
    if(!regex.test(dni)){
      res.status(305).json({
        code: "invalid_format",
        message: "EL formato del DNI es incorrecto"
    });
      return;
    }

    if(typeof nombre!== "string"||typeof dni!== "string"||typeof dinero!== "number"){
      res.status(500).json({
        code: "invalid datatype",
        message: "Tipo de dato introducido es incorrecto"
    });
    return;
    }
    const alreadyExists = await ModeloCliente.findOne({dni }).exec();
    if (alreadyExists) {
      res.status(404).json({
        code: "cliente_existente",
        message: "Este cliente ya existe"
    });
      return;
    }

    const newCliente = new ModeloCliente({ nombre,dinero,cochesenpropiedad,dni});
    await newCliente.save();

    res.status(200).send({
        nombre:newCliente.nombre,
        dinero:newCliente.dinero,
        cochesenpropiedad: newCliente.cochesenpropiedad,
        dni: newCliente.dni
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

