import { Request, Response } from "npm:express@4.18.2";
import { ModeloConcesionario } from "../db/conccesionarios.ts";
import { ModeloCoche } from "../db/coches.ts";
export const deleteCarfromConcesionario = async (req: Request, res: Response) => {
  try {
    const {id,nombre}  = req.query;
    const conces = await ModeloConcesionario.findOne({ nombre }).exec();
    if (!conces) {
        res.status(404).json({
            code: "concesionario_no_existente",
            message: "No se ha encontrado un concesionario con ese nombre"
        });
        return;
    }
    const cocheencontrado = conces.coches.find((coche) => coche==id);
    if(!cocheencontrado){
        res.status(410).json({
        code: "coche_no_existente",
        message: "No se ha encontrado ningun coche con esa id"
    });
    return;
    }
    const nuevoarraydecoches = conces.coches.filter((coche) => coche!==id);
    await ModeloConcesionario.findOneAndUpdate({nombre},{coches:nuevoarraydecoches},{new:true}).exec();
    const cocheencuestion= await ModeloCoche.findById(id).exec();

    res.status(200).send(`Coche ${cocheencuestion?.marca} ${cocheencuestion?.modelo} eliminado del concesionario ${nombre}`);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

