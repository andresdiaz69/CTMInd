# Stored Procedure: SPIGA_auditoria_Creacion_referencias

## Usa los objetos:
- [[Clasificacion1]]
- [[Clasificacion2]]
- [[Clasificacion3]]
- [[Clasificacion4]]
- [[Clasificacion5]]
- [[Clasificacion6]]
- [[Fabricantes]]
- [[Gamas]]
- [[Marcas]]
- [[MR]]
- [[PartidasArancelarias]]
- [[REferencias]]
- [[ReferenciasModelos]]
- [[ReferenciasTarifas]]

```sql


CREATE procedure [dbo].[SPIGA_auditoria_Creacion_referencias]
@fecha_ini	datetime,
@fecha_fin datetime
as
select distinct t1.PkFkMR as MR, t2.Descripcion as DescMR, t1.PkReferencias as Referencia, t1.Descripcion, t4.Descripcion as Clasificacion1, t5.Descripcion as Clasificacion2, 
t6.Descripcion as Clasificacion3, t7.Descripcion as Clasificacion4, t8.Descripcion as Clasificacion5, t9.Descripcion as Clasificacion6,
t3.PrecioCompra, t3.PrecioVenta, t3.UndEnvaseCompra, t3.UndEnvaseVenta, t1.FkPartidaArancelaria as CodPartidaArancelaria, t10.Descripcion as PartidaArancelaria, 
t14.Nombre as Fabricante,
t16.Nombre as Marca, t17.Nombre as Gama, t15.PkFkCodModelo as CodModelo, t1.Peso, t1.Alto, t1.Ancho, t1.Largo, t1.Volumen, t1.FechaAlta
from [192.168.90.10\SPIGAPLUS].[DMS00280].RE.REferencias as t1
inner join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.MR as t2 on t2.pkmr=t1.pkfkmr
inner join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.ReferenciasTarifas as t3 on t3.pkfkmr=t1.PkFkMR and t3.PkFkReferencias=t1.PkReferencias
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.Clasificacion1 as t4 on t4.PkFkMR=t1.PkFkMR and t4.PkFkTarifas=t3.PkFkTarifas and t4.PkClasificacion1=t3.FkClasificacion1
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.Clasificacion2 as t5 on t5.PkFkMR=t1.PkFkMR and t5.PkFkTarifas=t3.PkFkTarifas and t5.PkClasificacion2=t3.FkClasificacion2
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.Clasificacion3 as t6 on t6.PkFkMR=t1.PkFkMR and t6.PkFkTarifas=t3.PkFkTarifas and t6.PkClasificacion3=t3.FkClasificacion3
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.Clasificacion4 as t7 on t7.PkFkMR=t1.PkFkMR and t7.PkFkTarifas=t3.PkFkTarifas and t7.PkClasificacion4=t3.FkClasificacion4
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.Clasificacion5 as t8 on t8.PkFkMR=t1.PkFkMR and t8.PkFkTarifas=t3.PkFkTarifas and t8.PkClasificacion5=t3.FkClasificacion5
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.Clasificacion6 as t9 on t9.PkFkMR=t1.PkFkMR and t9.PkFkTarifas=t3.PkFkTarifas and t9.PkClasificacion6=t3.FkClasificacion6
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.PartidasArancelarias as t10 on t10.PkPartidasArancelarias=t1.FkPartidaArancelaria
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.Fabricantes as t14 on t14.PkFabricantes_iden=t1.FkFabricantes
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].RE.ReferenciasModelos as t15 on t15.PkFkMR=t1.PkFkMR and t15.PkFkReferencias=t1.PkReferencias
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Marcas as t16 on t16.PkMarcas=t15.PkFkMarcas
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Gamas as t17 on t17.PkFkMarcas=t15.PkFkMarcas and t17.PkGamas=t15.PkFkGamas
where	t1.FechaAlta > = @fecha_ini
and		t1.FechaAlta <= @fecha_fin

```
