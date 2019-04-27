

db.createCollection("MayorGanadoPerdido")


db.docs.aggregate([{
  $project:{
    "Temporada_Local":1,	
    "Jornada Fecha": 1,	
    "Tipo_Local": 1,	
    "Equipo_Local": 1,
    "Marcador_Local": 1,
    "Marcador_Visitante":1,
    "Equipo_Visita":1,	
    "Tipo_Visita":1,
    "Resultado": {
      		$switch:{
      		  branches:[
      		  	{
	      		  	case: { $eq: ["$Marcador_Local", "$Marcador_Visitante"] },
    	  		  	then: 0      		  
      		  	},
      		  	{
	      		  	case: { $gt: ["$Marcador_Local", "$Marcador_Visitante"] },
    	  		  	then: "$Equipo_Local"
      		  	},
      		  ],
      		  default: "$Equipo_Visita"
      		}
       }
    }
  },
  {
    $out: "MayorGanadoPerdido"    
  }
])


db.MayorGanadoPerdido.find()

db.MayorGanadoPerdido.aggregate([
  {
    $group: {
      _id: { Ganador: "$Resultado"},
      VecesGanado: { $sum: 1 }
    }
  },
  {
    $sort: { VecesGanado: -1 }    
  }
])



