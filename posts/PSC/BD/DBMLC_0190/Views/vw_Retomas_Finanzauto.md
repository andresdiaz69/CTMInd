# View: vw_Retomas_Finanzauto

## Usa los objetos:
- [[ComisionesSpigaVO]]
- [[spiga_CompraDeUsados]]
- [[vw_Spiga_ModelosVehiculos]]
- [[vw_vehiculos_Carroceria]]

```sql
--DROP VIEW vw_Retomas_Finanzauto
CREATE VIEW vw_Retomas_Finanzauto AS
SELECT DISTINCT [Mes/Año], Matricula, NumExpediente, NombreMarca, Gama, CodigoModelo, Modelo, AñoModelo, Condicion 
                   ,Licencia='Particular', Clase=NombreClasificacion, Carroceria, Kilometraje, NumeroFactura, Estado
 FROM(
			 SELECT 'Mes/Año'= convert(varchar,month(b.FechaEntregaCliente)) + '/' + convert(varchar,year(b.FechaEntregaCliente))
			        , FechaFactura= max(b.FechaFactura), a.Matricula, a.NumExpediente, a.NombreMarca, b.Gama, b.CodigoModelo, b.Modelo
					, b.AñoModelo, Condicion=a.DescripcionCompraTipos, m.NombreClasificacion, Carroceria=c.carroceria, Kilometraje=a.Kms
					, b.NumeroFactura, 
					Estado=CASE WHEN b.NumeroFactura IS NOT NULL THEN 'Facturado' ELSE 'Disponible' END
			 FROM [PSCService_DB].dbo.spiga_CompraDeUsados a
			 LEFT JOIN ComisionesSpigaVO b ON a.Ano_Periodo=b.Ano_Periodo 
											 AND a.Mes_Periodo=b.Mes_Periodo   AND a.IdCentros=b.CodigoCentro
											 AND a.IdSecciones=b.CodigoSeccion AND a.VIN=b.VIN
											 AND a.NombreModelo=b.Modelo
			 LEFT JOIN	[PSCService_DB].[dbo].[vw_Spiga_ModelosVehiculos] m	 ON m.PkFkMarcas = b.CodigoMArca
											 AND m.PkFkGamas  = b.CodigoGama   AND b.CodigoModelo COLLATE DATABASE_DEFAULT = m.PkCodModelo 
											 AND m.PkAñoModelo COLLATE DATABASE_DEFAULT = b.AñoModelo	
             LEFT JOIN   [dbo].[vw_vehiculos_Carroceria]				  c	ON	c.vin = b.VIN
			 WHERE b.Codigoempresa in (1,6,24) 		
			 AND a.IdCompraEstados <> 'A' AND a.FechaAnulacion IS NULL AND a.FechaAsiento IS NOT NULL
 			 AND b.marca not in ('John Deere Agrícola','Hamm','Implementos','Wirtgen','John Deere Construccion','John Deere Golf & Turf',
					             'VÖGELE','KLEEMANN','CIBER')
			 AND b.EntregaEfectiva = 1
			 AND b.nit not in ('8300049938','9002830997')
			 GROUP BY b.FechaEntregaCliente, a.Matricula, a.NumExpediente,a.NombreMarca, b.FechaFactura, b.Gama, b.CodigoModelo 
					 ,b.Modelo, b.AñoModelo, a.DescripcionCompraTipos, m.NombreClasificacion, c.carroceria, a.Kms, NumeroFactura, NumFactura			 
  )a 
```
