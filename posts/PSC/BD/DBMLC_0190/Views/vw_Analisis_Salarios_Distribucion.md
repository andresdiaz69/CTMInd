# View: vw_Analisis_Salarios_Distribucion

## Usa los objetos:
- [[v_distribucion_por_empleado]]

```sql
create view vw_Analisis_Salarios_Distribucion as
select distinct cedula,Codigo_Distribucion,Descripcion_Distribucion
from Novasoft_CT_MM.dbo.v_distribucion_por_empleado

```
