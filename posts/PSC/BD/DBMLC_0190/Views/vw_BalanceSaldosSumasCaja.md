# View: vw_BalanceSaldosSumasCaja

## Usa los objetos:
- [[spiga_BalanceSumasSaldos]]

```sql
CREATE view [dbo].[vw_BalanceSaldosSumasCaja] as
select Ano_Periodo,Mes_Periodo,IdEmpresas,PkContCtas,FkCentros,Centro,saldo=sum(saldo)
from (
	select Ano_periodo,    Mes_periodo,   IdEmpresas,    PkContCtas,   FkCentros,    Centro,        DebeApertura,
			HaberApertura,  DebePeriodo,   HaberPeriodo,  TotalDebe,    TotalHaber,   saldo=TotalDebe-TotalHaber
		from [PSCService_DB].dbo.spiga_BalanceSumasSaldos
		where PkContCtas = '1105050500'
		and Ano_Periodo >= 2023
		group by Ano_periodo,    Mes_periodo,  IdEmpresas,    PkContCtas,   FkCentros,    Centro,        DebeApertura,
				HaberApertura,  DebePeriodo,  HaberPeriodo,  TotalDebe,    TotalHaber
	--having (TotalDebe-TotalHaber) <> 0
)a  
group by Ano_Periodo,Mes_Periodo,IdEmpresas,PkContCtas,FkCentros,Centro



```
