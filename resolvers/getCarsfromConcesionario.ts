import { Request, Response } from "npm:express@4.18.2";
import { ModeloCoche} from "../db/coches.ts";
import { ModeloConcesionario } from "../db/conccesionarios.ts";

export const getCarsfomConcesionario = async (req: Request, res: Response) => {
  try {
    const {nombre}= req.query
    const concesionarioseleccionado = await ModeloConcesionario.findOne({nombre}).exec();
    const arraydecoches=[];
    if (!nombre) {
        res.status(250).json({
            code: "No_name",
            message: "Es necesario el nombre del concesionario"
        });
        return;
    }
    if(!concesionarioseleccionado){
        res.status(404).json({
            code: "not_found",
            message: "No se ha encontrado ese concesionario"
        });
        return;
    }

    for (let index = 0; index < concesionarioseleccionado.coches.length; index++) {
        const cocheencontrado = await ModeloCoche.findById(concesionarioseleccionado.coches.at(index)).exec();
        arraydecoches.push({       
             marca: cocheencontrado?.marca,
            modelo: cocheencontrado?.modelo,
            año: cocheencontrado?.año,
            matricula: cocheencontrado?.matricula,
            precio: cocheencontrado?.precio,
            id:cocheencontrado?.id
          })
        
    }


    res.status(200).send(arraydecoches);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

