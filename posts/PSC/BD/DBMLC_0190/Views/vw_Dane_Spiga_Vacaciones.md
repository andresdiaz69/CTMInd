# View: vw_Dane_Spiga_Vacaciones

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]
- [[vw_Spiga_CuentasContables]]

```sql
CREATE view [dbo].[vw_Dane_Spiga_Vacaciones] as
select ano=year(m.FechaAsiento),mes=month(m.FechaAsiento),m.IdEmpresas,m.NombreEmpresa,m.Centro,m.NombreCentro,
m.Cuenta,c.nombre,m.concepto,
Valor = (sum(Debe)-sum(Haber)),ValorDane = round((sum(Debe)-sum(Haber))/1000,0)
from [PSCService_DB].dbo.spiga_ContabilidadMovimientos	m
left join vw_Spiga_CuentasContables	c	on	convert(varchar,m.Cuenta) COLLATE DATABASE_DEFAULT = convert(varchar,c.cuenta)
where m.Cuenta = '2610150505'
and m.IdEmpresas in (1,5,6,22,24)
and m.concepto in ('Vacaciones','Vacaciones en Dinero','Dias habiles en Vacaciones')
--and year(m.FechaAsiento) = 2021
--and month(m.FechaAsiento) =5
	group by year(m.FechaAsiento),month(m.FechaAsiento),m.IdEmpresas,m.NombreEmpresa,m.Centro,m.NombreCentro,
m.Cuenta,c.nombre,m.concepto
--order by concepto

```
