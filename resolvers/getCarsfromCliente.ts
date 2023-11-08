import { Request, Response } from "npm:express@4.18.2";
import { ModeloCoche } from "../db/coches.ts";
import { ModeloCliente } from "../db/clientes.ts";



export const getCarsfromCliente = async (req: Request, res: Response) => {
  try {
    const {dni}= req.query
    const clienteseleccionado = await ModeloCliente.findOne({dni}).exec();
    const arraydecoches=[];
    if (!dni) {
        res.status(250).json({
            code: "No_dni",
            message: "Es necesario el dni del cliente"
        });
        return;
    }
    if(!clienteseleccionado){
        res.status(404).json({
            code: "not_found",
            message: "No se ha encontrado ese cliente"
        });
        return;
    }

    for (let index = 0; index < clienteseleccionado.cochesenpropiedad.length; index++) {
        const cocheencontrado = await ModeloCoche.findById(clienteseleccionado.cochesenpropiedad.at(index)).exec();
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

