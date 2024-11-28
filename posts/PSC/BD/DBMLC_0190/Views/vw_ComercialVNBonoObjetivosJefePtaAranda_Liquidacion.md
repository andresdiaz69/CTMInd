# View: vw_ComercialVNBonoObjetivosJefePtaAranda_Liquidacion

## Usa los objetos:
- [[vw_ComercialVNBonoObjetivosJefePtaAranda_2]]
- [[vw_RangosMaestrasFull]]

```sql

CREATE VIEW [dbo].[vw_ComercialVNBonoObjetivosJefePtaAranda_Liquidacion]
AS
SELECT        dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2.Ano_Periodo, dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2.Mes_Periodo, dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2.CodigoEmpresa, 
                         dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2.CodigoEmpleado, dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2.Empleado, dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2.FechaRetiro, 
                         dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2.VehiculosRecaudados, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2.IdRangoMaestra, 
                         dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, 
                         dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RangosMaestrasFull.Valor AS Comision, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, 
                         dbo.vw_RangosMaestrasFull.MarcaGrupo, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2.VehiculosRecaudados) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_2.VehiculosRecaudados) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 22)


```
