# View: vw_TallerTecnicosV3_2_Final

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_TallerTecnicosV3_2]]

```sql


CREATE VIEW [dbo].[vw_TallerTecnicosV3_2_Final]
AS
SELECT        dbo.vw_TallerTecnicosV3_2.Ano_Periodo, dbo.vw_TallerTecnicosV3_2.Mes_Periodo, dbo.vw_TallerTecnicosV3_2.CodigoEmpresa, dbo.vw_TallerTecnicosV3_2.CodigoEmpleado, dbo.vw_TallerTecnicosV3_2.CedulaOperario, 
                         dbo.vw_TallerTecnicosV3_2.UnidadesVendidas_Total, dbo.vw_TallerTecnicosV3_2.UnidadesVendidas_Elevado, dbo.vw_TallerTecnicosV3_2.Empleado, dbo.vw_TallerTecnicosV3_2.FechaRetiro, 
                         dbo.vw_TallerTecnicosV3_2.IdRangoMaestra, dbo.vw_TallerTecnicosV3_2.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.Desde AS Desde_Elevado, dbo.vw_RangosMaestrasFull.Hasta AS Hasta_Elevado, 
                         dbo.vw_RangosMaestrasFull.Valor AS Valor_Elevado, dbo.vw_TallerTecnicosV3_2.UnidadesVendidas_Elevado * dbo.vw_RangosMaestrasFull.Valor AS Comision_Elevado
FROM            dbo.vw_TallerTecnicosV3_2 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_TallerTecnicosV3_2.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_TallerTecnicosV3_2.UnidadesVendidas_Total) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_TallerTecnicosV3_2.UnidadesVendidas_Total)

```
