export type coche = {
    marca: string;
    modelo: string;
    año: number;
    matricula: string;
    precio:number
    vendido:boolean;
  };

  export type concesionario = {
    nombre: string;
    coches: string[];
    localidad: string;
    ventablock:boolean;
  };
  export type cliente = {
    nombre: string;
    dinero: number;
    cochesenpropiedad: string[];
    dni: string;
  };