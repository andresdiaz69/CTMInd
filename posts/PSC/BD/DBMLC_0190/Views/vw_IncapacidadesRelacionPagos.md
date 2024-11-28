# View: vw_IncapacidadesRelacionPagos

## Usa los objetos:
- [[Incapacidades_InformacionAdd]]
- [[Incapacidades_Pagos]]

```sql
CREATE VIEW [dbo].[vw_IncapacidadesRelacionPagos]
AS
SELECT        dbo.Incapacidades_Pagos.FechaIniIncap, dbo.Incapacidades_Pagos.Documento, dbo.Incapacidades_Pagos.IdPagoIncap, dbo.Incapacidades_Pagos.NoDoc, dbo.Incapacidades_Pagos.Banco, 
                         dbo.Incapacidades_Pagos.FechaPago, dbo.Incapacidades_Pagos.DiasPagados, dbo.Incapacidades_Pagos.VrPagado, dbo.Incapacidades_Pagos.Soporte, dbo.Incapacidades_InformacionAdd.Estado, 
                         dbo.Incapacidades_InformacionAdd.CausaRechazo, dbo.Incapacidades_InformacionAdd.EntidadPagadora, dbo.Incapacidades_InformacionAdd.TipoPago, dbo.Incapacidades_InformacionAdd.NoIncap, 
                         dbo.Incapacidades_InformacionAdd.Asumido, dbo.Incapacidades_InformacionAdd.Pagado, dbo.Incapacidades_InformacionAdd.Diferencia, dbo.Incapacidades_InformacionAdd.Observaciones, 
                         dbo.Incapacidades_InformacionAdd.Reconocido, dbo.Incapacidades_InformacionAdd.DiasTotales
FROM            dbo.Incapacidades_InformacionAdd RIGHT OUTER JOIN
                         dbo.Incapacidades_Pagos ON dbo.Incapacidades_InformacionAdd.Documento = dbo.Incapacidades_Pagos.Documento AND dbo.Incapacidades_InformacionAdd.FechaIniIncap = dbo.Incapacidades_Pagos.FechaIniIncap

```
