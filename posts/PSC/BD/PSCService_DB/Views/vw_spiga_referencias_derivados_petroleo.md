# View: vw_spiga_referencias_derivados_petroleo

## Usa los objetos:
- [[centros]]
- [[EmpresaCentroImpuestos]]
- [[empresas]]
- [[ReferenciaImpuestos]]
- [[REferencias]]

```sql




CREATE view [dbo].[vw_spiga_referencias_derivados_petroleo] as
select CodigoEmpresa=t2.pkfkempresas,NombreEmpresa=t4.nombre,CodigoCentro=t2.PkFkCentros, NombreCentro=t5.nombre,
MarcaReferencia=t1.PKFkMR,Referencia=t1.PkReferencias,DescripcionReferencia=t1.Descripcion,t1.Referencialimpia,
t1.FkpartidaArancelaria,t2.FkImpuestos,t2.PkFkImpuestoTipos,t3.PkImpuestos,t1.PermiteGarantia,t1.Habilitado,t1.Fechaalta,t1.FkFabricantes,
t3.descripcion
from [192.168.90.10\SPIGAPLUS].DMS00280.RE.REferencias					as t1
inner join [192.168.90.10\SPIGAPLUS].DMS00280.RE.ReferenciaImpuestos		as t2	on	t2.pkfkmr=t1.pkfkmr and t2.pkfkreferencias=t1.pkreferencias
inner join [192.168.90.10\SPIGAPLUS].DMS00280.CM.EmpresaCentroImpuestos	as t3	on	t3.pkfkempresas=t2.pkfkempresas and t3.pkfkcentros=t2.pkfkcentros 
																			and t3.pkimpuestos=t2.FkImpuestos 
																			and t3.FkImpuestoTipos=t2.PkFkImpuestoTipos
inner join [192.168.90.10\SPIGAPLUS].DMS00280.CM.empresas					as	t4	on	t4.pkempresas = t2.Pkfkempresas
inner join [192.168.90.10\SPIGAPLUS].DMS00280.CM.centros					as	t5	on	t5.PkCentros = t2.PkfkCentros	
where t3.Descripcion like '%deriva%'
and t1.FechaBaja is null

```
