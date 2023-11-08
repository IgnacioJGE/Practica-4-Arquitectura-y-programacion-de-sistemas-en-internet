import { Request, Response } from "npm:express@4.18.2";
import { ModeloConcesionario } from "../db/conccesionarios.ts";

export const addConcesionario = async (req: Request, res: Response) => {
  try {

    const { nombre, coches, localidad} = req.body;
    if (!nombre || !coches || !localidad) {
      res.status(500).json({
        code: "invalid_request",
        message: "Nombre, coches y localidad son campos obligatorios"
    });
      return;
    }


    if(typeof nombre!== "string"||typeof localidad!== "string"){
      res.status(500).json({
        code: "invalid_datatype",
        message: "Tipo de dato introducido es incorrecto"
    });
    return;
    }
    const alreadyExists = await ModeloConcesionario.findOne({nombre}).exec();
    if (alreadyExists) {
      res.status(404).json({
        code: "concesionario_existente",
        message: "Este concesionario ya existe"
    });
  }
    const newConcesionario = new ModeloConcesionario({ nombre,coches,localidad,ventablock:false});
    await newConcesionario.save();

    res.status(200).send({
        nombre: newConcesionario.nombre,
        localidad:newConcesionario.localidad,
        coches: newConcesionario.coches,
        ventablock:newConcesionario.ventablock,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

