# View: vw_VehiculosDisponibles_Spiga

## Usa los objetos:
- [[VehiculosDisponibles]]

```sql


CREATE VIEW [dbo].[vw_VehiculosDisponibles_Spiga]
AS
SELECT [FkMarcas]
      ,[Marca]
      ,[FkGamas]
      ,[Gama]
      ,[FkCodModelo]
      ,REPLACE([FkAñoModelo], 'O', 0) AS FkAñoModelo
      ,ISNULL(MIN([PrecioVenta_MonedaOrigen]), 0) AS PrecioListaAntesDeImpuestos
	  ,ISNULL(MIN([PrecioVenta_MonedaOrigen_iva]), 0) AS PrecioLista_Iva
	  ,ISNULL(MIN([PrecioVenta_MonedaOrigen_consumo]), 0) AS PrecioLista_Consumo
      ,ISNULL(MIN([ImporteTotal_monedaOrigen]), 0) AS PrecioListaFull
      ,ISNULL(MIN([BaseImponible] + [GastosAdicionalesIncrementaStock] - [BonoFabricaReclamado]), 0) AS Costo
      ,CAST(MAX(CAST(ISNULL(ModeloActivo, 0) as INT)) AS BIT) AS ModeloActivo
 FROM [192.168.80.18].[DMS90280].[dbo].[VehiculosDisponibles]
  GROUP BY [FkMarcas]
      ,[Marca]
      ,[FkGamas]
      ,[Gama]
      ,[FkCodModelo]
      ,[FkAñoModelo]

```
