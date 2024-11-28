# View: vw_Dane_SpigaConsolidadoPersonal

## Usa los objetos:
- [[DaneCuentasPersonal]]
- [[spiga_ContabilidadMovimientos]]
- [[vw_Spiga_CuentasContables]]

```sql

 CREATE view [dbo].[vw_Dane_SpigaConsolidadoPersonal] as
		select ano=year(m.FechaAsiento),mes=month(m.FechaAsiento),m.IdEmpresas,m.NombreEmpresa,
		m.Cuenta,c.nombre,d.ConceptoPerCuenta,
		Valor = ((sum(Debe)-sum(Haber))*-1),ValorDane = round(((sum(Debe)-sum(Haber))*-1)/1000,0)
		from PSCService_DB.dbo.spiga_ContabilidadMovimientos	m
		left join vw_Spiga_CuentasContables	c	on	convert(varchar,m.Cuenta) COLLATE DATABASE_DEFAULT = convert(varchar,c.cuenta)
	    join DaneCuentasPersonal	d	on  m.cuenta = d.CodigoCuenta
		where m.IdEmpresas in (1,5,6,22,24)
		--and year(m.FechaAsiento) = 2020
		--and month(m.FechaAsiento) = 6
		group by year(m.FechaAsiento),month(m.FechaAsiento),m.IdEmpresas,m.NombreEmpresa,
		m.Cuenta,c.nombre,d.ConceptoPerCuenta

```
