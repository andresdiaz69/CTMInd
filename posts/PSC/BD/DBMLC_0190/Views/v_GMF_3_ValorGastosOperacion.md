# View: v_GMF_3_ValorGastosOperacion

## Usa los objetos:
- [[v_GMF_2_ValoresCostosGastos]]

```sql

CREATE view [dbo].[v_GMF_3_ValorGastosOperacion] as
select Empresa,CodigoPresentacion,NombrePresentacion,Año,mes,CodigoConcepto =999999,NombreConcepto = 'GastosOperacion',
Valor = sum(GastosOperacion)-sum(Depreciacion)-sum(Amortizacion)
from(
		select empresa,CodigoPresentacion,nombrepresentacion,Año,Mes,CodigoConcepto,NombreConcepto,Sede,
		GastosOperacion = case when CodigoConcepto = 101 then Valor else 0 end ,
		Depreciacion = case when CodigoConcepto = 163 then Valor else 0 end,
		Amortizacion = case when CodigoConcepto = 164 then Valor else 0 end
		from v_GMF_2_ValoresCostosGastos
		WHERE  CodigoConcepto in (101,163,164)
)a 
--where año=2021
--and mes=3
group by Empresa,CodigoPresentacion,NombrePresentacion,Año,mes

```
