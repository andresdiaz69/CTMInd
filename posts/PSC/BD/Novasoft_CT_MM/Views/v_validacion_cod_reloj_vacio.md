# View: v_validacion_cod_reloj_vacio

## Usa los objetos:
- [[rhh_emplea]]

```sql
CREATE view [dbo].[v_validacion_cod_reloj_vacio] as
select cod_emp,nom_emp,cod_reloj
from rhh_emplea
where (cod_reloj = '' or cod_reloj is null)  
and  (fec_egr is null or fec_egr > getdate())
and cod_emp <> '0' 

```
