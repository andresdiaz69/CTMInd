# View: v_ClubIntegral_Cuenta_Vin_Financieras

## Usa los objetos:
- [[ComisionesSpigaInformacionCreditos]]

```sql
CREATE view [dbo].[v_ClubIntegral_Cuenta_Vin_Financieras] as
Select Distinct Ano_Periodo ,Mes_Periodo,
NitFinanciera = case	when Nit = '8600280611' then '8600286019'
						when Nit = '860028601' then '8600286019'
				else NIT end ,
NombreFinanciera = Nombre,VIN
from ComisionesSpigaInformacionCreditos
where (TipoFactura like '%Comisi%' and TipoFactura like '%cr%')
and ambito like '%VN%'
--and Ano_Periodo = 2019
--and Mes_Periodo in (7,8,9)
--and Nombre like '%finanza%'


```
