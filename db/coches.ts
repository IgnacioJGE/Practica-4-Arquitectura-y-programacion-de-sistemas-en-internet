import mongoose from "npm:mongoose@7.6.3";
import { coche } from "../types.ts";


const Schema = mongoose.Schema;

const cocheSchema = new Schema(
  {
    marca: { type: String, required: true },
    modelo: { type: String,required: true },
    año: { type: Number, required: true},
    matricula: { type: String, required: true,unique:true},
    precio: { type: Number, required: true},
    vendido:{type: Boolean, required:true}
  },
  { timestamps: true }
);

export type tipocoche = mongoose.Document&(coche) ;// definir el ripo del modelo

export const ModeloCoche= mongoose.model<tipocoche>("Coches",cocheSchema);
