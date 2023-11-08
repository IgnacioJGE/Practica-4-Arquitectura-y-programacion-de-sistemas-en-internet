
import express,{Request,Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { addCar } from "./resolvers/addCar.ts";
import { addConcesionario } from "./resolvers/addConcesionario.ts";
import { addCliente } from "./resolvers/addCliente.ts";
import { getCars } from "./resolvers/getallCars.ts";
import { addCartoConces } from "./resolvers/addCartoConces.ts";
import { getCarsfomConcesionario } from "./resolvers/getCarsfromConcesionario.ts";
import { sellCarto } from "./resolvers/sellCar.ts";
import { getCarsfromCliente } from "./resolvers/getCarsfromCliente.ts";
import { deleteCarfromCliente } from "./resolvers/deleteCarfromCliente.ts";
import { deleteCarfromConcesionario } from "./resolvers/deleteCarfromConces.ts";
import { traspasarCardeClienteaCliente } from "./resolvers/traspasodecoches.ts";
import { addmoneytobuyCar } from "./resolvers/addmoneytobuyCar.ts";
import { bloqueoventa } from "./resolvers/bloqueoventa.ts";
const env = await load();
const MONGO_URL=env.MONGO_URL||Deno.env.get("MONGO_URL")// si hay .emv lo leo si no lo lee de las variables de entorno de deno
const PORT=env.PORT||Deno.env.get("PORT")
if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);

}

try{
await mongoose.connect(MONGO_URL);
console.info("Mongo Concectado")
const app= express();
app.use(express.json())
app.post("/addCar",addCar)
    .post("/addConcesionario",addConcesionario)
    .post("/addCliente",addCliente)
    .get("/getallCars",getCars)
    .put("/addCartoConcesionario",addCartoConces)
    .get("/getCarsfromConcesionario",getCarsfomConcesionario)
    .put("/sellCartoCliente",sellCarto)
    .get("/getCarsfromCliente",getCarsfromCliente)
    .delete("/deleteCarfromConcesionario",deleteCarfromConcesionario)
    .delete("/deleteCarfromCliente",deleteCarfromCliente)
    .put("/traspasodeCoches",traspasarCardeClienteaCliente)
    .put("/addDinero",addmoneytobuyCar)
    .put("/bloqueoventa",bloqueoventa)

app.listen(PORT,()=> console.info ((`Te estoy escuchando desde ${PORT}`)));
}catch(e){
  console.error(e)
}


