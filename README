Dejo aquí todas las funcionalidades del programa y algunos ejemplos de como deberian ser las llamadas a las mismas.
    Añadir concesionario:
      /addConcesionario
      body:
      {
        "nombre": "Concesionario de coches de lujo clásicos",
        "coches": [],
        "localidad": "Madrid"
      }
    Añadir cliente:
      /addCliente
      body:
      {
        "nombre": "Ignacio",
        "dinero": 10000000000000,
        "dni":"12975402I",
        "cochesenpropiedad":[]
      }
    Mostrar todos los coches:
        /getallCars
    Añadir coche a un concesionario:
        /addCartoConcesionario?id=654be54bc30a3ad0218e6885&nombre=Concesionario de coches de lujo clásicos
    Mostrar los coches de un concesionario:
        /getCarsfromConcesionario?nombre=Concesionario Honda Madrid
    Vender coche a un cliente:
        /sellCartoCliente?id=654be4f1c30a3ad0218e687f&nombre=Concesionario de coches de lujo clásicos&dni=12975402I
    Mostrar coches de un cliente:
        /getCarsfromCliente?dni=12975402I
    Borrar coche de un concesionario:
        /deleteCarfromConcesionario?nombre=Concesionario Suzuki Parla&id=654be3f4c30a3ad0218e686d
    Borrar un coche de un cliente:
        /deleteCarfromCliente?dni=12975402I&id=654be3f4c30a3ad0218e686d
    Traspasar un coche entre clientes:
        /traspasodeCoches?id=654be3f4c30a3ad0218e686d&dni1=12863505I&dni2=12975402I
    Añadir dinero suficiente para comprar un coche:
        /addDinero?id=654be42fc30a3ad0218e6871&dni=12863505I
    Bloquear la venta de coches de un concesionario:
        /bloqueoventa?nombre=Concesionario Honda Madrid