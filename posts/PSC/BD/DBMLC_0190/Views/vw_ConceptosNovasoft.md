# View: vw_ConceptosNovasoft

## Usa los objetos:
- [[v_rhh_Concep]]

```sql
create view vw_ConceptosNovasoft as
select cod_con,nom_con
from Novasoft_CT_MM.dbo.v_rhh_Concep
where cod_con like '1%'
and nom_con not like '%(No Usar)%'

```
