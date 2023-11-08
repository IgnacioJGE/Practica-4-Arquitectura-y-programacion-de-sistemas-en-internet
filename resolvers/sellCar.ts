import { Request, Response } from "npm:express@4.18.2";
import { ModeloCoche } from "../db/coches.ts";
import { ModeloConcesionario } from "../db/conccesionarios.ts";
import { ModeloCliente } from "../db/clientes.ts";
export const sellCarto = async (req: Request, res: Response) => {
  try {

    const {id,nombre,dni} = req.query;
    if (!id||!nombre||!dni) {
      res.status(500).json({
        code: "invalid_data",
        message: "Id y nombre y DNI son campos obligatorios"
    });
      return;
    }


    if(typeof id !== "string"||typeof nombre!=="string"||typeof dni!=="string"){
      res.status(500).json({
        code: "invalid datatype",
        message: "Tipo de dato introducido es incorrecto"
    });
      return;
    }

    const concesionarioencontrado = await ModeloConcesionario.findOne({nombre}).exec();
    const cocheencontrado = await ModeloCoche.findById(id).exec();
    const clienteencontrado = await ModeloCliente.findOne({dni}).exec();


    if (!cocheencontrado || !concesionarioencontrado||!clienteencontrado) {

      res.status(404).json({
        code: "Id_name_dni_incorrrect",
        message: "Nombre del concesionario o id o dni invalidos"
    });
      return;
    }
    const cocheencontradoenconces = concesionarioencontrado.coches.find((coche) => coche==id);
    if(!cocheencontradoenconces){
      res.status(404).json({
        code: "not_found",
        message: "Ese coche no pertenece a ese concesionario"
    });
    return;

    }
    if(cocheencontrado.precio>clienteencontrado.dinero){
    res.status(403).json({
        code: "Insuficent_funds",
        message: "El cliente no tiene suficiente dinero"
    });
      return;
    }
    if(concesionarioencontrado.ventablock==true){
      res.status(500).json({
        code: "concesionario_bloqueado",
        message: "La venta de coches de este concesionario está boqueada"
    });
      return;
    }
    clienteencontrado.cochesenpropiedad.push(id)
  const nuevoscoches=concesionarioencontrado.coches.filter(item => item !== id);

   await ModeloConcesionario.findOneAndUpdate({nombre} ,{coches:nuevoscoches},{new:true}).exec();
   await ModeloCliente.findOneAndUpdate({dni} ,{cochesenpropiedad:clienteencontrado.cochesenpropiedad,dinero:(clienteencontrado.dinero-cocheencontrado.precio)},{new:true}).exec();
   await ModeloCoche.findByIdAndUpdate(id,{vendido:true},{new:true})
    res.send(`Coche ${cocheencontrado.marca} ${cocheencontrado.modelo} comprado del concesionario ${nombre} por ${clienteencontrado.nombre}`);
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};


