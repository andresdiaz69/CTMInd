# View: Vw_Finanzauto_Vehiculos

## Usa los objetos:
- [[spiga_Vehiculos]]
- [[v_SegurosVehiculos]]

```sql


CREATE view [dbo].[Vw_Finanzauto_Vehiculos] as
select 
ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY A.vin)) AS INT),0) AS Id,
	   a.Placa,   
	   a.vin,                   a.NumDocumentoPropietario,    a.CodigoMarca, 	           a.NombreMarca, 
	   a.CodigoGama,            a.NombreGama,                 a.CodModelo,                 a.NombreModelo,
	   a.ExtModelo,             a.AñoModelo,                  a.Potencia,				   a.Torque, 
	   a.Cilindrada,            a.Combustible,                a.Carroceria,                a.NumeroMotor,              
	   a.SitioPlaca,            a.Servicio, 	              a.PaisOrigen,                a.FechaFinGarantiaMecanica,    
	   a.KilometrosFinGarantia, a.FechaUltimaInspeccion,      a.FechaProximaInspeccion,    a.KilometrosInspeccion,    a.KmsActuales,
	   a.TipoSeguro,            a.CiaSeguros,                 a.FechaAlta,                 a.Deducible,               
	   vs.FechaAlta FechaAdquisicionSeguro,            vs.FechaVencimiento FechaVencimientoSeguro, vs.Importe ValorSeguro,
	   vs.NumeroPoliza	                   
	                
  from (select orden = ROW_NUMBER() over(partition by vin, placa order by FechaDeActualizacion desc) ,
               Ano_Periodo,           Mes_Periodo,                FechaDeCorte,              Placa,   
	           vin,                   NumDocumentoPropietario,    CodigoMarca, 	             NombreMarca, 
	           CodigoGama,            NombreGama,                 CodModelo,                 NombreModelo,
	           ExtModelo,             AñoModelo,                  Potencia,					 Torque, 
	           Cilindrada,            Combustible,                Carroceria,                NumeroMotor,              
	           SitioPlaca,            Servicio, 	              PaisOrigen,                FechaFinGarantiaMecanica,    
	           KilometrosFinGarantia, FechaUltimaInspeccion,      FechaProximaInspeccion,    KilometrosInspeccion,    KmsActuales,
	           TipoSeguro,            CiaSeguros,                 FechaAlta,                 Deducible,               NumeroPoliza
			   
          from [PSCService_DB].dbo.spiga_Vehiculos (nolock)  --where VIN='WVWZZZ60ZFT043507'
       ) a
 left join [DBMLC_0190]..v_SegurosVehiculos vs on vs.VIN  = a.vin
                                and vs.NifCif = a.NumDocumentoPropietario
 where a.orden = 1
   --and (placa is not null or vin is not null)--341.474
--   and vin  ='9BFZB55F4F8512971'



```
