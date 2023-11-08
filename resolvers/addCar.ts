import { Request, Response } from "npm:express@4.18.2";
import { ModeloCoche } from "../db/coches.ts";
const regex = /^[0-9]{4}[A-Z]{3}$/;
export const addCar = async (req: Request, res: Response) => {
  try {

    const { marca, modelo, año,matricula,precio } = req.body;
    if (!marca || !modelo || !año||!matricula||!precio) {
      res.status(500).json({
        code: "invalid_data",
        message: "Marca, modelo, año, matricula y precio son campos obligatorios"
    });
      return;
    }
    if(!regex.test(matricula)){
      res.status(401).json({
        code: "formato_matricula_invalid",
        message: "El formato de la matricula es invalido"
    });
      return;
    }
    if(año<1886){
      res.status(400).json({
        code: "invalid_year",
        message: "El año introducido es previo a la inveenvión del coche"
    });
    return;        
    }
    if(typeof marca!== "string"||typeof modelo!== "string"||typeof año!== "number"||typeof matricula!== "string"){
      res.status(500).json({
        code: "invalid datatype",
        message: "Tipo de dato introducido es incorrecto"
    });
      return;
    }
    const alreadyExists = await ModeloCoche.findOne({matricula }).exec();
    if (alreadyExists) {
      res.status(404).json({
        code: "coche_existente",
        message: "Este coche ya existe"
    });
      return;
    }

    const newCoche = new ModeloCoche({ marca,modelo,año,matricula,precio,vendido:false});
    await newCoche.save();

    res.status(200).send({
        marca: newCoche.marca,
        modelo: newCoche.modelo,
        año: newCoche.año,
        matricula: newCoche.matricula,
        precio: newCoche.precio
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

