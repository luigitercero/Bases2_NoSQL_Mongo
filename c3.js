
db.createCollection("MayorGoleada")


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
    "Goles": {
      		$switch:{
      		  branches:[
      		  	{
	      		  	case: { $eq: ["$Marcador_Local", "$Marcador_Visitante"] },
    	  		  	then: 0      		  
      		  	},
      		  	{
	      		  	case: { $gt: ["$Marcador_Local", "$Marcador_Visitante"] },
    	  		  	then: {$subtract: [ "$Marcador_Local", "$Marcador_Visitante" ]}  
      		  	},
      		  ],
      		  default: {$subtract: [ "$Marcador_Visitante", "$Marcador_Local" ]}
      		}
       }
    }
  },
  {
    $out: "MayorGoleada"    
  }
])


db.MayorGoleada.aggregate([
  {
    $sort: { "Goles": -1 }
  }
])





