# View: vw_JefeNacionalRepuestosBonaparte

## Usa los objetos:
- [[vw_BaseComisionesRepuestosBonaparte]]

```sql

CREATE view [dbo].[vw_JefeNacionalRepuestosBonaparte] as 
select Año,MesInicial,MesFinal,Sede,valor
from vw_BaseComisionesRepuestosBonaparte
where sede in ('BN-Bta-Usados Sausalito','Total Mesa de Repuestos',
'JD-Bta-P. Aranda')
--and año = 2021
--and MesFinal = 8
--and MesInicial = 8

```
