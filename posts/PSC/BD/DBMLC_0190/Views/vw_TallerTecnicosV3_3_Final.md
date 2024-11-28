# View: vw_TallerTecnicosV3_3_Final

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_TallerTecnicosV3_3]]

```sql



CREATE VIEW [dbo].[vw_TallerTecnicosV3_3_Final]
AS
SELECT        dbo.vw_TallerTecnicosV3_3.Ano_Periodo, dbo.vw_TallerTecnicosV3_3.Mes_Periodo, dbo.vw_TallerTecnicosV3_3.CodigoEmpresa, dbo.vw_TallerTecnicosV3_3.CodigoEmpleado, dbo.vw_TallerTecnicosV3_3.CedulaOperario, 
                         dbo.vw_TallerTecnicosV3_3.UnidadesVendidas_Total, dbo.vw_TallerTecnicosV3_3.UnidadesVendidas_MuyElevado, dbo.vw_TallerTecnicosV3_3.Empleado, dbo.vw_TallerTecnicosV3_3.FechaRetiro, 
                         dbo.vw_TallerTecnicosV3_3.IdRangoMaestra, dbo.vw_TallerTecnicosV3_3.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.Desde AS Desde_MuyElevado, dbo.vw_RangosMaestrasFull.Hasta AS Hasta_MuyElevado, 
                         dbo.vw_RangosMaestrasFull.Valor AS Valor_MuyElevado, dbo.vw_TallerTecnicosV3_3.UnidadesVendidas_MuyElevado * dbo.vw_RangosMaestrasFull.Valor AS Comision_MuyElevado
FROM            dbo.vw_TallerTecnicosV3_3 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_TallerTecnicosV3_3.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_TallerTecnicosV3_3.UnidadesVendidas_Total) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_TallerTecnicosV3_3.UnidadesVendidas_Total)

```
