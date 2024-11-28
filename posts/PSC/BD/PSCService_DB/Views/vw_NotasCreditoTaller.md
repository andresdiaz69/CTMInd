# View: vw_NotasCreditoTaller

## Usa los objetos:
- [[Facturacion]]
- [[MotivosAbono]]

```sql



CREATE  view [dbo].[vw_NotasCreditoTaller] as
select PkAñoFactura Año, MONTH(FechaFactura) Mes, T1.PkFkEmpresas CodigoEmpresa, T1.PkFkCentros CodigoCentro, T1.PkFkSeries+'/'+T1.PkNumFactura+'/'+T1.PkAñoFactura NumeroNotaCredito, T1.FechaFactura FechaNotaCredito, T1.NifCif Nit, T1.FkSeriesCargo+'/'+T1.FkNumFacturaCargo+'/'+T1.FkAñoFacturaCargo NumeroFactura, T1.FkMotivosAbono MotivoAbono, t2.Descripcion DescripcionMotivoAbono
FROM [192.168.90.10\SPIGAPLUS].[DMS00280].TA.Facturacion T1 
inner join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.MotivosAbono t2 on t2.PkFkEmpresas=T1.PkFkEmpresas 
						and t2.PkMotivosAbono=T1.FkMotivosAbono
where FkMotivosAbono is not null

```
