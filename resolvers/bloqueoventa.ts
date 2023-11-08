import { Request, Response } from "npm:express@4.18.2";
import { ModeloConcesionario } from "../db/conccesionarios.ts";
export const bloqueoventa = async (req: Request, res: Response) => {
  try {
    const {nombre}  = req.query;
    const conces = await ModeloConcesionario.findOne({ nombre }).exec();
    if (!conces) {
        res.status(404).json({
            code: "concesionario_no_existente",
            message: "No se ha encontrado un concesionario con ese nombre"
        });
        return;
    }
    if(typeof nombre!== "string"){
        res.status(500).json({
          code: "invalid_datatype",
          message: "Tipo de dato introducido es incorrecto"
      });
      return;
      }
    
    await ModeloConcesionario.findOneAndUpdate({nombre},{ventablock:true},{new:true}).exec();

    res.status(200).send(`La venta de coches por parte del concesionario ${conces.nombre} ha sido bloqueada`);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

