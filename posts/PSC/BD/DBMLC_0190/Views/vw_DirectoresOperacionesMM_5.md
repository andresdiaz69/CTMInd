# View: vw_DirectoresOperacionesMM_5

## Usa los objetos:
- [[vw_DirectoresOperacionesMM_3]]
- [[vw_RangosMaestrasFull]]

```sql
CREATE VIEW [dbo].[vw_DirectoresOperacionesMM_5]
AS
SELECT        dbo.vw_DirectoresOperacionesMM_3.Ano_Periodo, dbo.vw_DirectoresOperacionesMM_3.Mes_Periodo, dbo.vw_DirectoresOperacionesMM_3.CodigoEmpleado, dbo.vw_DirectoresOperacionesMM_3.ValorNetoMostrador, 
                         dbo.vw_DirectoresOperacionesMM_3.ValorNetoTaller, dbo.vw_DirectoresOperacionesMM_3.ValorNetoTotal, dbo.vw_DirectoresOperacionesMM_3.IdRangoMaestra, dbo.vw_DirectoresOperacionesMM_3.IdRangoVersionMax, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 
                         dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         dbo.vw_RangosMaestrasFull.Valor
FROM            dbo.vw_DirectoresOperacionesMM_3 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_DirectoresOperacionesMM_3.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_DirectoresOperacionesMM_3.ValorNetoTotal) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_DirectoresOperacionesMM_3.ValorNetoTotal) AND 
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 24) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 24)


```
