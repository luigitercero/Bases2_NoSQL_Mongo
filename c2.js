

db.createCollection("Maximos")
db.createCollection("Totales")

db.jugadores.aggregate([
  {
    $group : {
      _id : { temporada: "$Temporada"},
      Goles: { $max: "$Goles"}
    }
  },
  {
    $project:{
      Clave: { $concat: ["$_id.temporada","-", {$substr: ["$Goles",0,50]}]},
      Temporada: 2,
      Goles:1
    }
  },
  {
    $out : "Maximos"
  }
])


db.jugadores.aggregate([
  {
    $project:{
      Clave: { $concat: ["$Temporada","-", {$substr: ["$Goles",0,50]}]},
      Nombre: 1,
      Temporada: 1,
      Goles:1
    }
  },
  {
    $out: "Totales"
  }
])


// Este se corre en visual studio code
db.Maximos.aggregate([
  {
    $lookup:{
      from: "Totales",
      localField: "Clave",
      foreignField: "Clave",
      as: "aux"
    }
  },
  {
    $group:{
      _id: {jugador: "$aux.Nombre"},
      veces_pichichi:{ $sum: 1 }
    }
  },
  {
    $project: 
    {
      Jugador: "$aux.Nombre",
      veces_pichichi: "$veces_pichichi"
    }
  },
  {
    $sort: { veces_pichichi: -1 }
  }  
])

db.inventory.find()

db.inventory.insertMany([
   // MongoDB adds the _id field with an ObjectId if _id is not present
   { item: "journal", qty: 25, status: "A", size: { h: 14, w: 21, uom: "cm" }, tags: [ "blank", "red" ] },
   { item: "notebook", qty: 50, status: "A",
       size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank" ] },
   { item: "paper", qty: 100, status: "D",
       size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank", "plain" ] },
   { item: "planner", qty: 75, status: "D",
       size: { h: 22.85, w: 30, uom: "cm" }, tags: [ "blank", "red" ] },
   { item: "postcard", qty: 45, status: "A",
       size: { h: 10, w: 15.25, uom: "cm" }, tags: [ "blue" ] }
]);

db.inventory.update(
   { item: "inventory" },
   {
     item: "XYZ123",
     stock: 10,
     info: { publisher: "2255", pages: 150 },
     tags: [ "baking", "cooking" ]
   }
)

