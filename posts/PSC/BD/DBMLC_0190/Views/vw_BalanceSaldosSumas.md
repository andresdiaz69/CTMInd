# View: vw_BalanceSaldosSumas

## Usa los objetos:
- [[spiga_BalanceSumasSaldos]]

```sql
CREATE  view [dbo].[vw_BalanceSaldosSumas] as

select Ano_Periodo,Mes_Periodo,IdEmpresas,PkContCtas,FkCentros,Centro,saldo
from(
		select Ano_Periodo,Mes_Periodo,IdEmpresas,PkContCtas,FkCentros,Centro,saldo=sum(saldo)
		  from (
				select Ano_periodo,    Mes_periodo,   IdEmpresas,    PkContCtas,   FkCentros,    Centro,        DebeApertura,
					   HaberApertura,  DebePeriodo,   HaberPeriodo,  TotalDebe,    TotalHaber,   saldo=TotalDebe-TotalHaber
				  from [PSCService_DB].dbo.spiga_BalanceSumasSaldos
				 where convert(float,PkContCtas) <= 9999
				   and convert(float,PkContCtas) >= 1000
				   and PkContCtas like '15%'
				   and PkContCtas not like '1592%'
				   and Ano_Periodo >= 2023
				 group by Ano_periodo,    Mes_periodo,  IdEmpresas,    PkContCtas,   FkCentros,    Centro,        DebeApertura,
						  HaberApertura,  DebePeriodo,  HaberPeriodo,  TotalDebe,    TotalHaber
				having (TotalDebe-TotalHaber) <> 0
			   )a  group by Ano_Periodo,Mes_Periodo,IdEmpresas,PkContCtas,FkCentros,Centro
		 union all

		select Ano_Periodo,Mes_Periodo,IdEmpresas,PkContCtas,FkCentros,Centro,saldo=sum(saldo)
		  from (
				select Ano_periodo,    Mes_periodo,   IdEmpresas,     PkContCtas,  FkCentros,    
					   Centro,         DebeApertura,  HaberApertura,  DebePeriodo,                           HaberPeriodo,  TotalDebe,                 TotalHaber,     saldo=TotalDebe-TotalHaber
				  from [PSCService_DB].dbo.spiga_BalanceSumasSaldos
				 where convert(float,PkContCtas) > 1592
				   and convert(float,PkContCtas) <= 159299
				   and PkContCtas like '1592%'
				   and Ano_Periodo >= 2023
				 group by Ano_periodo,    Mes_periodo,  IdEmpresas,    PkContCtas,   FkCentros,    Centro,        DebeApertura,
						  HaberApertura,  DebePeriodo,  HaberPeriodo,  TotalDebe,    TotalHaber
				having (TotalDebe-TotalHaber) <> 0
			   )a group by Ano_Periodo,Mes_Periodo,IdEmpresas,PkContCtas,FkCentros,Centro
)b 
--where Ano_Periodo = 2023
--and Mes_Periodo = 4
```
