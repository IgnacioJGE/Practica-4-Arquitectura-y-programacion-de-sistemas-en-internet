import { Request, Response } from "npm:express@4.18.2";
import { ModeloCoche } from "../db/coches.ts";
import { ModeloCliente } from "../db/clientes.ts";



export const traspasarCardeClienteaCliente = async (req: Request, res: Response) => {
  try {
    const dni1= req.query.dni1
    const dni2= req.query.dni2
    const id=req.query.id
    const cliente1 = await ModeloCliente.findOne({dni:dni1}).exec();
    const cliente2 = await ModeloCliente.findOne({dni:dni2}).exec();
    const cocheencuestion= await ModeloCoche.findById(id).exec();

    if(!cocheencuestion){
        res.status(404).json({
            code: "not_found",
            message: "No se han encontrado ese coche"
        });
        return;
    }
    if (!dni1||!dni2) {
        res.status(250).json({
            code: "No_dni",
            message: "Es necesario el dni de los clientes"
        });
        return;
    }
    if (!id) {
        res.status(520).json({
            code: "no_id",
            message: "Es necesario el id del coche a traspasar"
        });
        return;
    }
    if(!cliente1||!cliente2){

        res.status(404).json({
            code: "not_found",
            message: "No se han encontrado alguno de los clientes"
        });
        return;
    }
    const cocheencontrado1 = cliente1.cochesenpropiedad.find((coche) => coche==id);
    const cocheencontrado2 = cliente2.cochesenpropiedad.find((coche) => coche==id);


    if(!cocheencontrado1&&!cocheencontrado2){
        res.status(404).json({
            code: "not_found",
            message: "Ese coche no le pertenece a ninguno de los clientes"
        });
        return;
    }
    if(cocheencontrado1){
        cliente2.cochesenpropiedad.push(id);
        const nuevoarraydecoches = cliente1.cochesenpropiedad.filter((coche) => coche!==id);
    
        await ModeloCliente.findOneAndUpdate({dni:dni1},{cochesenpropiedad:nuevoarraydecoches},{new:true}).exec();
        await ModeloCliente.findOneAndUpdate({dni:dni2},{cochesenpropiedad:cliente2.cochesenpropiedad},{new:true}).exec();

        res.status(200).send(`Coche ${cocheencuestion?.marca} ${cocheencuestion?.modelo} traspasado de  ${cliente1.nombre} a ${cliente2.nombre}`);
        return;
    }

    cliente1.cochesenpropiedad.push(id);
    const nuevoarraydecoches = cliente2.cochesenpropiedad.filter((coche) => coche!==id);
    await ModeloCliente.findOneAndUpdate({dni:dni2},{cochesenpropiedad:nuevoarraydecoches},{new:true}).exec();
    await ModeloCliente.findOneAndUpdate({dni:dni1},{cochesenpropiedad:cliente1.cochesenpropiedad},{new:true}).exec();

    res.status(200).send(`Coche ${cocheencuestion?.marca} ${cocheencuestion?.modelo} traspasado de  ${cliente2.nombre} a ${cliente1.nombre}`);


  } catch (error) {
    res.status(500).send(error.message);
  }
};

