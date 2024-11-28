# View: vw_Atenea_Vehiculos

## Usa los objetos:
- [[spiga_Vehiculos]]
- [[spiga_vehiculosterceros]]
- [[VW_Terceros_consolidado]]

```sql

CREATE view [dbo].[vw_Atenea_Vehiculos] as
select Placa,          vin,          NombreMarca,     NombreGama,   
	   modelo,         kmsActuales,  NumeroMotor,     CodigoGama ,
	   CodigoMarca,    IdVehiculos,  vt.PkFkTerceros, a.nombre_completo ContactoConductor,
	   a.TelPrincipal, celular1
  from (select orden = ROW_NUMBER() over(partition by vin,placa order by fecha desc),--MS:140224 se agrega la placa en el orden
               Placa,       vin,          NombreMarca,     NombreGama,   
			   modelo,      kmsActuales,  NumeroMotor,     CodigoGama ,
			   CodigoMarca, IdVehiculos
          from (select Placa,         vin,        NombreMarca,                       NombreGama,              
                       NumeroMotor,   CodigoGama ,max(fechadeactualizacion ) fecha,  nombremodelo modelo,
					   kmsActuales,   CodigoMarca, IdVehiculos
                  from [PSCService_DB].dbo.spiga_Vehiculos (nolock)  --where VIN='W1K2050801F982713'
		         group by Placa,         vin,        NombreMarca,    NombreGama,              
                          NumeroMotor,   CodigoGama, nombremodelo,   kmsActuales,
						  CodigoMarca,IdVehiculos) a
			     where VIN is not null
				  --and placa = 'JMR578'
	    ) cv 
   left join ( select PkFkVehiculos, PkFkTerceros, orden = ROW_NUMBER() over(partition by PkFkVehiculos order by FechaMod desc) 
		         from [PSCService_DB].dbo.spiga_vehiculosterceros
				where PkFkVehiculoTerceroTipos = 'CH'
			 ) vt   on vt.PkFkVehiculos= cv.IdVehiculos
			       and vt.orden=1
   left join [DBMLC_0190].[dbo].VW_Terceros_consolidado a on a.PkTerceros = vt.PkFkTerceros
 where cv.orden=1  

  --and placa = 'JMR578'

```
