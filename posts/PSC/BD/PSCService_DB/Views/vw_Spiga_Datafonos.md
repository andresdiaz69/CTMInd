# View: vw_Spiga_Datafonos

## Usa los objetos:
- [[cajas]]
- [[EmpresaCentroCajaTpvs]]
- [[tpvs]]

```sql


CREATE view [dbo].[vw_Spiga_Datafonos] as
select distinct e.PkFkEmpresas,e.PkFkCentros,e.PkFkCajas,c.PkCajas_Iden,DescripcionCaja=c.Descripcion,
c.FkContCtas,t.PkTpvs_Iden,t.Descripcion,t.FkCtaBancarias,t.Codigo
from         [192.168.90.10\SPIGAPLUS].[DMS00280].fi.EmpresaCentroCajaTpvs   e
left join    [192.168.90.10\SPIGAPLUS].[DMS00280].fi.cajas                   c	on      e.PkFkEmpresas = c.PkFkEmpresas and e.PkFkCentros = c.PkFkCentros
																						and e.PkFkCajas = c.PkCajas_Iden
left join    [192.168.90.10\SPIGAPLUS].[DMS00280].fi.tpvs					t	on		e.PkFkEmpresas = T.PkFkEmpresas and e.PkFkTpvs = t.PkTpvs_Iden
where e.FechaBaja is null
and c.FechaBaja is null
and t.FechaBaja is null

```
