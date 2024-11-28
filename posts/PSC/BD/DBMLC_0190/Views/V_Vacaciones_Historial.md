# View: V_Vacaciones_Historial

## Usa los objetos:
- [[rhh_hisvac]]

```sql



CREATE view [dbo].[V_Vacaciones_Historial]
as
select 
	cod_emp, 
	fec_vac, 
	fec_sal,
	fec_ent,
	pag_vac,
	hab_dis,
	nha_dis,
	diasHabiles = sum(hab_dis + nha_dis),
	hab_pag,
	nha_pag,
	diasPagados = sum(hab_pag + nha_pag)
from [Novasoft_CT_MM].[dbo].rhh_hisvac
group by 
	cod_emp,fec_vac, 
	fec_sal,
	fec_ent,
	pag_vac,
	hab_dis,
	nha_dis,hab_pag,
	nha_pag


```
