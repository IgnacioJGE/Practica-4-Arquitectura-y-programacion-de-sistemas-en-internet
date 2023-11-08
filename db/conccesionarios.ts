import mongoose from "npm:mongoose@7.6.3";
import { concesionario } from "../types.ts";


const Schema = mongoose.Schema;

const concesionarioSchema = new Schema(
  {
    nombre: { type: String, required: true,unique:true },
    coches: { type: Array<string>,required: true },
    localidad: { type: String, required: true},
    ventablock:{type:Boolean,required:true},


  },
  { timestamps: true }
);

export type tipoconcesionario = mongoose.Document&(concesionario) ;// definir el ripo del modelo

export const ModeloConcesionario= mongoose.model<tipoconcesionario>("Concesionarios",concesionarioSchema);

  