# View: vw_NotasCreditoRepuestos

## Usa los objetos:
- [[asientos]]
- [[MotivosAbono]]
- [[Salidas]]
- [[SalidasDetSalidasDet]]
- [[Terceros]]

```sql




CREATE view [dbo].[vw_NotasCreditoRepuestos] as
select distinct t1.PkAñoAsiento Año, MONTH(t1.FechaFactura) Mes, t1.PkFkEmpresas, t1.FkCentros CodigoCentro, 
t1.FkSeries+'/'+t1.NumFactura+'/'+t1.AñoFactura NumeroNotaCredito, t1.FechaFactura FechaNotaCredito, 
t4.NifCif Nit, t2.fkseries+'/'+t2.numfactura+'/'+t2.añofactura Factura, t1.FkMotivosAbono MotivoAbono, t3.Descripcion DescripcionMotivoAbono 
from [192.168.90.10\SPIGAPLUS].[DMS00280].FI.asientos as t1 with(nolock) 
inner join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.Salidas as t15 with(nolock) on t15.PkFkEmpresas=t1.PkFkEmpresas and t15.FkAñoasiento=t1.PkAñoasiento and t15.Fkasientos=t1.pkasientos
inner join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.SalidasDetSalidasDet as t16 with(nolock) on t16.PkFkEmpresas_D=t15.PkFkEmpresas and t16.PkFkAñoSalidasAlbaran_D=t15.PkAñoSalidasAlbaran and t16.PkFKCentros_D=t15.PkFkCentros and t16.PkFkNumSalidasAlbaran_D=t15.PkNumSalidasAlbaran and t16.PkFkSeries_Salidas_D=t15.PkFkSeries_Salidas
inner join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.Salidas as t17 with(nolock) on t16.PkFkEmpresas_O=t17.PkFkEmpresas and t16.PkFkAñoSalidasAlbaran_O=t17.PkAñoSalidasAlbaran and t16.PkFKCentros_O=t17.PkFkCentros and t16.PkFkNumSalidasAlbaran_O=t17.PkNumSalidasAlbaran and t16.PkFkSeries_Salidas_O=t17.PkFkSeries_Salidas
inner join [192.168.90.10\SPIGAPLUS].[DMS00280].FI.asientos as t2 with(nolock) on t2.PkFkEmpresas=t17.PkFkEmpresas and t2.PkAñoasiento=t17.FkAñoasiento and t2.Pkasientos=t17.Fkasientos
inner join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.MotivosAbono t3 on t3.PkFkEmpresas=t1.PkFkEmpresas and t3.PkMotivosAbono=t1.FkMotivosAbono
inner join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Terceros t4 on t4.PkTerceros=t1.FkTerceros
--where month(t1.FechaFactura)=2
--and year(t1.FechaFactura)=2022
--and t2.fkseries = 'R027'
--and t2.numfactura= '101046'
--and t2.añofactura=2022


```
