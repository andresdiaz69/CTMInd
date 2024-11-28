# View: vw_Dane_Spiga_Inventarios

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql
CREATE view [dbo].[vw_Dane_Spiga_Inventarios] as
select ano=year(m.FechaAsiento),mes=month(m.FechaAsiento),m.IdEmpresas,m.NombreEmpresa,Valor = ((sum(Debe)-sum(Haber))*-1),ValorDane = round(((sum(Debe)-sum(Haber))*-1)/1000,0)
from [PSCService_DB].dbo.spiga_ContabilidadMovimientos	m
where m.IdEmpresas in (1,5,6,22,24)
and m.cuenta like '1435%'
--and year(m.FechaAsiento) = 2020
--and month(m.FechaAsiento) <= 12
--and m.IdEmpresas = 6
group by year(m.FechaAsiento),month(m.FechaAsiento),m.IdEmpresas,m.NombreEmpresa
	

```
