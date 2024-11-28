# View: vw_Dane_Spiga_Ingresos

## Usa los objetos:
- [[CentrosMunicipios]]
- [[DaneCuentas]]
- [[DaneMunicipios]]
- [[spiga_ContabilidadMovimientos]]
- [[Tramite_Ciudades]]
- [[Tramite_Departamentos]]
- [[vw_Spiga_CuentasContables]]

```sql
CREATE view [dbo].[vw_Dane_Spiga_Ingresos] as
	select ano=year(m.FechaAsiento),mes=month(m.FechaAsiento),m.IdEmpresas,m.NombreEmpresa,m.Centro,m.NombreCentro,
	m.Cuenta,C.Nombre,d.ConceptoCuenta,e.CodigoDepartamento,NombreDepartamento = y.descripcion,u.ConceptoDepartamento,e.CodigoCiudad,NombreCiudad = z.descripcion,
	Valor = ((sum(Debe)-sum(Haber))*-1),
	ValorDane = round(((sum(Debe)-sum(Haber))*-1)/1000,0)
	from [PSCService_DB].dbo.spiga_ContabilidadMovimientos	m
	left join DaneCuentas         d	on  m.cuenta = d.CodigoCuenta
	Left join vw_Spiga_CuentasContables	c	on	m.Cuenta = c.cuenta
    left join CentrosMunicipios	e	on	m.IdEmpresas = d.CodigoEmpresa
	and m.centro = e.CodigoCentro
    left join DaneMunicipios         u	on	m.IdEmpresas = u.CodigoEmpresa
	and e.CodigoDepartamento = u.CodigoDepartamento
	left join Tramite_Departamentos y on e.CodigoDepartamento = y.departamento
    left join Tramite_Ciudades z on e.CodigoDepartamento = z.departamento and e.CodigoCiudad = z.Ciudad 
	where m.Cuenta like '4%'
	and m.IdEmpresas in (1,5,6,22,24)
	 --and year(m.FechaAsiento) = 2020
	 --and month(m.FechaAsiento) = 6
	 group by year(m.FechaAsiento),month(m.FechaAsiento),m.IdEmpresas,m.NombreEmpresa,m.Centro,m.NombreCentro,
	m.Cuenta,C.Nombre,d.ConceptoCuenta,e.CodigoDepartamento,y.descripcion,u.ConceptoDepartamento,e.CodigoCiudad,z.descripcion

```
