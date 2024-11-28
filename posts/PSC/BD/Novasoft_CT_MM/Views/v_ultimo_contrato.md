# View: v_ultimo_contrato

## Usa los objetos:
- [[gth_contratos]]

```sql

create view [dbo].[v_ultimo_contrato] as
select cod_emp,num_cont,cod_con,fec_con
from(
	select cod_emp,num_cont= max(num_cont),cod_con=max(cod_con),fec_con=max(fec_con)
	from gth_contratos
	group by cod_emp
) a

```
