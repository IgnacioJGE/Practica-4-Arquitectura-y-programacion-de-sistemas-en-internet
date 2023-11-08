import { Request, Response } from "npm:express@4.18.2";
import { ModeloCoche } from "../db/coches.ts";
import { ModeloConcesionario } from "../db/conccesionarios.ts";
import { ModeloCliente } from "../db/clientes.ts";
export const addmoneytobuyCar = async (req: Request, res: Response) => {
  try {

    const {id,dni} = req.query;
    if (!id||!dni) {
      res.status(500).json({
        code: "invalid_data",
        message: "Id y DNI son campos obligatorios"
    });
      return;
    }


    if(typeof id !== "string"||typeof dni!=="string"){
      res.status(500).json({
        code: "invalid datatype",
        message: "Tipo de dato introducido es incorrecto"
    });
      return;
    }

    const cocheencontrado = await ModeloCoche.findById(id).exec();
    const clienteencontrado = await ModeloCliente.findOne({dni}).exec();


    if (!cocheencontrado ||!clienteencontrado) {

      res.status(404).json({
        code: "Id_name_dni_incorrrect",
        message: "La id del coche o dni invalidos"
    });
      return;
    }
    if(cocheencontrado.precio<=clienteencontrado.dinero){
        res.status(404).json({
            code: "sufficeient_funds",
            message: "Este cliente tiene dinero para comprarse el coche que se indica"
        });
          return;
    }

    const diferencia =cocheencontrado.precio-clienteencontrado.dinero;

   await ModeloCliente.findOneAndUpdate({dni} ,{dinero:(clienteencontrado.dinero+diferencia)},{new:true}).exec();
   await ModeloCoche.findByIdAndUpdate(id,{vendido:true},{new:true})
    res.send(`Al cliente ${clienteencontrado.nombre} se le ha añadido ${diferencia}`);
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};


