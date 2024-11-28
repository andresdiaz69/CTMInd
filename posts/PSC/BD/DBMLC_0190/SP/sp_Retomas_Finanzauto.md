# Stored Procedure: sp_Retomas_Finanzauto

## Usa los objetos:
- [[ComisionesSpigaVO]]
- [[spiga_CompraDeUsados]]
- [[spiga_TipoClasificacionesVehiculos]]
- [[vw_vehiculos_Carroceria]]

```sql

CREATE PROCEDURE sp_Retomas_Finanzauto
   @idEmpresa INT,  
   @Ano VARCHAR(20),  
   @Mes VARCHAR(20)
AS
SELECT DISTINCT [Mes/Año], Matricula, NumExpediente, NombreMarca, Gama, CodigoModelo, Modelo, AñoModelo, Condicion 
               , Licencia='Particular', Clase=NombreClasificacion, Carroceria, Kilometraje, NumeroFactura, Estado
FROM(
	 SELECT DISTINCT [Mes/Año]
	 --= convert(varchar,month(b.FechaEntregaCliente))+ '/' + convert(varchar,year(b.FechaEntregaCliente))
	 =convert(varchar,a.Mes_Periodo)+'/'+convert(varchar, a.Ano_Periodo) , a.Mes_Periodo, a.Ano_Periodo, a.Matricula
	 , a.NombreMarca, Gama=a.NombreGama, a.AñoModelo, Condicion=a.DescripcionCompraTipos , a.VIN, b.Codigoempresa
	 , b.NumeroFactura, m.NombreClasificacion, c.carroceria, CodigoModelo=a.CodModelo, Modelo=a.NombreModelo, Kilometraje=a.Kms
	 , a.NumExpediente, Estado=CASE WHEN b.NumeroFactura IS NOT NULL THEN 'Facturado' ELSE 'Disponible' END
	 FROM [PSCService_DB].dbo.spiga_CompraDeUsados a

	 LEFT JOIN (SELECT Gama, CodigoModelo, Modelo, AñoModelo, NumeroFactura, FechaEntregaCliente, FechaFactura, Codigoempresa
	                 , Marca, EntregaEfectiva, Nit, VIN, CodigoMArca, CodigoGama 
			            FROM(SELECT orden= row_number() over (partition by vin order by FechaFactura desc)
			            , Gama, CodigoModelo, Modelo, AñoModelo, NumeroFactura, FechaEntregaCliente, FechaFactura
			            , Codigoempresa, Marca, EntregaEfectiva, Nit, VIN, CodigoMArca, CodigoGama 
			   FROM ComisionesSpigaVO )a where orden=1 ) b ON a.VIN=b.VIN

	 LEFT JOIN [PSCService_DB].[dbo].spiga_TipoClasificacionesVehiculos m ON m.PkFkMarcas = a.IdMarcas
	 AND m.PkFkGamas = a.IdGamas AND a.CodModelo  = m.PkCodModelo AND m.PkAnoModelo = a.AñoModelo	

	 LEFT JOIN [DBMLC_0190].[dbo].[vw_vehiculos_Carroceria] c ON c.vin = b.VIN
	 WHERE a.IdEmpresas = @idEmpresa
	 AND a.IdCompraEstados <> 'A' AND a.FechaAnulacion IS NULL AND a.FechaAsiento IS NOT NULL
)a
WHERE [Mes/Año] = @Mes+'/'+@Ano 
```
