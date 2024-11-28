# View: vw_TallerTecnicos_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_TallerTecnicos_3]]

```sql
CREATE VIEW [dbo].[vw_TallerTecnicos_Liquidacion]
AS
SELECT        dbo.vw_TallerTecnicos_3.Ano_Periodo, dbo.vw_TallerTecnicos_3.Mes_Periodo, dbo.vw_TallerTecnicos_3.CodigoEmpresa, dbo.vw_TallerTecnicos_3.CedulaOperario, dbo.vw_TallerTecnicos_3.CodigoEmpleado, 
                         dbo.vw_TallerTecnicos_3.Empleado, dbo.vw_TallerTecnicos_3.FechaRetiro, dbo.vw_TallerTecnicos_3.UnidadesVendidas, dbo.vw_TallerTecnicos_3.HorasImproductivas, dbo.vw_TallerTecnicos_3.UnidadesTotales, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_TallerTecnicos_3.IdRangoMaestra, dbo.vw_TallerTecnicos_3.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
                         dbo.vw_TallerTecnicos_3.UnidadesTotales * dbo.vw_RangosMaestrasFull.Valor AS Comision, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 0 AS IdLiquidacion, 0 AS IdHistorico, 
                         GETDATE() AS FechaLiquidacion
FROM            dbo.vw_TallerTecnicos_3 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_TallerTecnicos_3.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_TallerTecnicos_3.UnidadesTotales) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_TallerTecnicos_3.UnidadesTotales) AND 
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 1 OR
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 2)


```
