# View: v_GMF_4_ValorCostos

## Usa los objetos:
- [[v_GMF_2_ValoresCostosGastos]]

```sql


CREATE view [dbo].[v_GMF_4_ValorCostos] as
select Empresa,CodigoPresentacion,NombrePresentacion,Año,mes,CodigoConcepto,NombreConcepto,Valor
from(
		select empresa,CodigoPresentacion,nombrepresentacion,Año,Mes,CodigoConcepto,NombreConcepto,Sede,valor
		from v_GMF_2_ValoresCostosGastos
		WHERE  CodigoConcepto not in (101,163,164)
		and valor <> 0
)a 
--where año=2021
--and mes=3

```
