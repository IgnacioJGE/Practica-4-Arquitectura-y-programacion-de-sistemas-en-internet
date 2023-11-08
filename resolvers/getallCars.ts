import { Request, Response } from "npm:express@4.18.2";
import { ModeloCoche } from "../db/coches.ts";

export const getCars = async (req: Request, res: Response) => {
  try {
    const coches = await ModeloCoche.find().exec();

    if (!coches) {
        res.status(250).json({
            code: "Empty_list",
            message: "No se han encontrado coches"
        });
    }

    const cochesformat = coches.map((Coche) => ({
      marca: Coche.marca,
      modelo: Coche.modelo,
      año: Coche.año,
      matricula: Coche.matricula,
      precio: Coche.precio,
      id: Coche._id
    }));

    res.status(200).send(cochesformat);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

