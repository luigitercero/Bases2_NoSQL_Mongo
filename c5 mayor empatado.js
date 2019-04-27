
use mydb
db.createCollection("MayorEmpatado")


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
    	  		  	then: "$Equipo_Local"      		  
      		  	}
      		  ],
      		  default: 0
      		}
       }      
    }
  },
  {
    $out: "MayorEmpatado"    
  }
])



agregados = db.docs.aggregate([{
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
    	  		  	then: "$Equipo_Visita"      		  
      		  	}
      		  ],
      		  default: 0
      		}
       }      
    }
  }
]).toArray()

db.MayorEmpatado.insert(agregados)
db.MayorEmpatado.find()

db.MayorEmpatado.aggregate([
  {
    $group: {
      _id: { Ganador: "$Resultado"},
      VecesEmpatado: { $sum: 1 }
    }
  },
  {
    $sort: { VecesEmpatado: -1 }    
  }
])



