# Stored Procedure: SPIGA_auditoria_Creacion_referencias_Impuestos

## Usa los objetos:
- [[Centros]]
- [[EmpresaCentroImpuestos]]
- [[EmpresaCentroImpuestosDesdeHasta]]
- [[EmpresaCentros]]
- [[Empresas]]
- [[ReferenciaImpuestos]]
- [[Referencias]]
- [[ReferenciasEmpresasCentros]]

```sql



CREATE procedure [dbo].[SPIGA_auditoria_Creacion_referencias_Impuestos]

@fecha_ini	datetime,
@fecha_fin datetime

as


select distinct t4.PkFkMR as MR, t4.PkReferencias, t4.Descripcion, t2.Nombre as Empresa, t3.Nombre as Centro, t1.PrecioMedio, t13.Descripcion as descImpuesto, t12.Porc,t4.fechaalta
from  [192.168.90.10\SPIGAPLUS].[DMS00280].RE.ReferenciasEmpresasCentros as t1
inner join  [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Empresas as t2 on t2.pkempresas=t1.PkFkEmpresas
inner join  [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Centros as t3 on t3.PkCentros=t1.PkFkCentros
inner join  [192.168.90.10\SPIGAPLUS].[DMS00280].RE.Referencias as t4 on t4.PkFkMR=t1.PkFkMR and t4.pkreferencias=t1.PkFkReferencias
left outer join  [192.168.90.10\SPIGAPLUS].[DMS00280].RE.ReferenciaImpuestos as t11 on t11.PkFkMR=t1.PkFkMR and t11.PkFkReferencias=t1.PkFkReferencias 
left outer join  [192.168.90.10\SPIGAPLUS].[DMS00280].CM.EmpresaCentros as t18 on t18.pkfkempresas=t1.pkfkempresas and t18.pkfkcentros=t1.pkfkcentros
left outer join  [192.168.90.10\SPIGAPLUS].[DMS00280].CM.EmpresaCentroImpuestosDesdeHasta as t12 on t12.pkfkempresas=t1.PkFkEmpresas and t12.PkFkCentros=t1.PkFkCentros and t12.PkFkImpuestos=isnull(t11.FkImpuestos, t18.FkImpuestos_IvaPorDefecto)  and t12.PkFechaECIDesde<=CONVERT(date,getdate()) and (t12.FechaHasta is null or t12.FechaHasta >= CONVERT(date, getdate()))
left outer join  [192.168.90.10\SPIGAPLUS].[DMS00280].CM.EmpresaCentroImpuestos as t13 on t13.pkfkempresas=t12.pkfkempresas and t13.pkfkcentros=t12.pkfkcentros and t13.pkimpuestos=t12.pkfkimpuestos
where  t4.FechaAlta > = @fecha_ini
and  t4.FechaAlta <= @fecha_fin
order by t4.PkReferencias

```
