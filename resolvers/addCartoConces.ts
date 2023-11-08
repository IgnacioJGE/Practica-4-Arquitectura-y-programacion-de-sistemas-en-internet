import { Request, Response } from "npm:express@4.18.2";
import { ModeloCoche } from "../db/coches.ts";
import { ModeloConcesionario } from "../db/conccesionarios.ts";
export const addCartoConces = async (req: Request, res: Response) => {
  try {

    const {id,nombre} = req.query;
    if (!id||!nombre) {
      res.status(500).json({
        code: "invalid_data",
        message: "Id y nombre son campos obligatorios"
    });
      return;
    }


    if(typeof id !== "string"||typeof nombre!=="string"){
      res.status(500).json({
        code: "invalid datatype",
        message: "Tipo de dato introducido es incorrecto"
    });
      return;
    }
    const concesionarioencontrado = await ModeloConcesionario.findOne({nombre}).exec();
    const cocheencontrado = await ModeloCoche.findById(id).exec();

    if (!cocheencontrado || !concesionarioencontrado) {

      res.status(404).json({
        code: "Id_name_incorrrect",
        message: "Nombre del concesionario o id invalidos"
    });
      return;
    }
    const cocheencontradoenconces = concesionarioencontrado.coches.find((coche) => coche==id);
if(cocheencontradoenconces){
  res.status(414).json({
    code: "coche_en_pertenencia",
    message: "Este coche ya le pertenece a este concesionario"
});
  return;
}
    if(concesionarioencontrado.coches.length===10){
      res.status(404).json({
        code: "Full",
        message: "Concesionario lleno, no se pueden añadir más coches"
    });
      return;
    }
    if(cocheencontrado.vendido==true){
      res.status(404).json({
        code: "unable_to_add_car",
        message: "Este coche ya ha sido vendio"
    });
      return;
    }
    const concesionario = await ModeloConcesionario.find().exec();
    const todoslosconces = concesionario.map((conces) => ({
      coches:conces.coches
    }));
    let encontradoenotroconces=false;

    for (let index = 0; index < todoslosconces.length; index++) {
      for (let indice = 0; indice < todoslosconces[index].coches.length; indice++) {
        if(todoslosconces[index].coches[indice]===id)
        encontradoenotroconces=true;
        
      }
    }
    if(encontradoenotroconces==true){
      res.status(400).json({
        code: "coche_en_otro_concesionario",
        message: "Este coche le pertenece a otro concesionario"
    });
      return;
    }
    concesionarioencontrado.coches.push(id);
   await ModeloConcesionario.findOneAndUpdate({nombre} ,{coches:concesionarioencontrado.coches},{new:true}).exec();
   const cocheencuestion= await ModeloCoche.findById(id).exec();

    res.send(`Coche ${cocheencontrado.marca} ${cocheencontrado.modelo} guardado en el concesionario ${nombre}`);
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};


