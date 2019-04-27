use mydb
db.docs.find()


db.docs.aggregate([
  {
    $group : {
      _id : { Temporada_Local: "$Temporada_Local", jornada: "$Jornada", Equipo_Local: "$Equipo_Local"},
      "RM" : {
      $switch:{
        branches:[
        	{
        	  case: { $eq: ["$Marcador_Local", "$Marcador_Visitante"] },
        	  then: "$Equipo_Visita"
        	}
        ],
        default: 0
      }      
      
      }
    }
  },
  {
    $project:{
      Temporada_Local: 1,
      Jornada: 1
    }
  },
  {
  	$sort: { jornada: -1 }
  }
])

