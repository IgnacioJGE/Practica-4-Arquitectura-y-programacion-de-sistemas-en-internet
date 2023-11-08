import mongoose from "npm:mongoose@7.6.3";
import { cliente } from "../types.ts";


const Schema = mongoose.Schema;

const clienteSchema = new Schema(
  {
    nombre: { type: String, required: true },
    dinero: { type: Number,required: true },
    cochesenpropiedad: { type: Array<string>, required: true},
    dni: { type: String, required: true,unique:true},

  },
  { timestamps: true }
);

export type tipocoche = mongoose.Document&(cliente) ;// definir el ripo del modelo

export const ModeloCliente= mongoose.model<tipocoche>("Clientes",clienteSchema);


