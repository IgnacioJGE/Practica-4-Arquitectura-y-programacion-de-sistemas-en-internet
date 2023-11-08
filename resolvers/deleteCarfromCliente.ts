import { Request, Response } from "npm:express@4.18.2";
import { ModeloCliente } from "../db/clientes.ts";
import { ModeloCoche } from "../db/coches.ts";
export const deleteCarfromCliente = async (req: Request, res: Response) => {
  try {
    const {id,dni}  = req.query;
    const cliente = await ModeloCliente.findOne({ dni }).exec();
    if (!cliente) {
        res.status(404).json({
            code: "cliente_no_existente",
            message: "No se ha encontrado ningun cliente con ese dni"
        });
        return;
    }
    const cocheencontrado = cliente.cochesenpropiedad.find((coche) => coche==id);
    if(!cocheencontrado){
        res.status(410).json({
        code: "coche_no_existente",
        message: "No se ha encontrado ningun coche con esa id"
    });
    return;
    }
    const nuevoarraydecoches = cliente.cochesenpropiedad.filter((coche) => coche!==id);
    const clienteactualizado= await ModeloCliente.findOneAndUpdate({dni},{cochesenpropiedad:nuevoarraydecoches},{new:true}).exec();
    const cocheencuestion= await ModeloCoche.findByIdAndUpdate(id,{vendido:false},{new:true}).exec();
    
    res.status(200).send(`Coche ${cocheencuestion?.marca} ${cocheencuestion?.modelo} eliminado del cliente ${clienteactualizado?.nombre}`);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

