# View: vw_TallerTecnicosV3_1_Final

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_TallerTecnicosV3_1]]

```sql

CREATE VIEW [dbo].[vw_TallerTecnicosV3_1_Final]
AS
SELECT        dbo.vw_TallerTecnicosV3_1.Ano_Periodo, dbo.vw_TallerTecnicosV3_1.Mes_Periodo, dbo.vw_TallerTecnicosV3_1.CodigoEmpresa, dbo.vw_TallerTecnicosV3_1.CodigoEmpleado, dbo.vw_TallerTecnicosV3_1.CedulaOperario, 
                         dbo.vw_TallerTecnicosV3_1.UnidadesVendidas_Total, dbo.vw_TallerTecnicosV3_1.UnidadesVendidas_Normal, dbo.vw_TallerTecnicosV3_1.Empleado, dbo.vw_TallerTecnicosV3_1.FechaRetiro, 
                         dbo.vw_TallerTecnicosV3_1.IdRangoMaestra, dbo.vw_TallerTecnicosV3_1.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.Desde AS Desde_Normal, dbo.vw_RangosMaestrasFull.Hasta AS Hasta_Normal, 
                         dbo.vw_RangosMaestrasFull.Valor AS Valor_Normal, dbo.vw_TallerTecnicosV3_1.UnidadesVendidas_Normal * dbo.vw_RangosMaestrasFull.Valor AS Comision_Normal
FROM            dbo.vw_TallerTecnicosV3_1 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_TallerTecnicosV3_1.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_TallerTecnicosV3_1.UnidadesVendidas_Total) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_TallerTecnicosV3_1.UnidadesVendidas_Total)

```
