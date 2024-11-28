# View: vw_Spiga_MovimientoContableColision_original

## Usa los objetos:
- [[AsientoDesgloses]]
- [[Asientos]]
- [[AsientosDet]]
- [[Centros]]
- [[contctas]]
- [[CtaBancarias]]
- [[Departamentos]]
- [[Empresas]]
- [[marcas]]
- [[Secciones]]

```sql
CREATE view [dbo].[vw_Spiga_MovimientoContableColision_original] as
select  a.PkFkEmpresas as Empresa,NombreEmpresa=e.nombre,year(a.FechaAsiento) as año,month(a.FechaAsiento) as mes,
d.FkContCtas AS Cuenta,t.nombre as NombreCuenta,
replace(replace(replace(replace(replace(replace(g.fkcentros ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')as centro,
replace(replace(replace(replace(replace(replace(c.Nombre ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') AS NombreCentro,
replace(replace(replace(replace(replace(replace(p.PkCentros ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')as centroAux,
replace(replace(replace(replace(replace(replace(p.Nombre ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') AS NombreCentroAux,
Seccion=g.fksecciones,
NombreSeccion=replace(replace(replace(replace(replace(replace(s.descripcion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
r.PkSecciones_Iden as SeccionAux,
replace(replace(replace(replace(replace(replace(r.Descripcion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') as NombreSeccionAux,
n.PkDepartamentos as Departamento, n.Descripcion as NombreDepartamento,q.PkDepartamentos as DepartamentoAux, q.Descripcion as NombreDepartamentoAux,
marca=g.fkmarcas,NombreMarca=m.nombre,d.Concepto,CONVERT(money, sum(g.ImporteDebe)) AS Debe, CONVERT(money, sum(g.ImporteHaber)) AS Haber
FROM   [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[Asientos]				a 
left join [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[AsientosDet]			d on	a.PkAsientos = d.PkFkAsientos AND a.PkFkEmpresas = d.PkFkEmpresas 
																		and a.PkAñoAsiento = d.PkFkAñoAsiento
left join [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[AsientoDesgloses]	g on	d.PkFkEmpresas = g.PkFkEmpresas AND d.PkFkAñoAsiento =g.PkFKAñoAsiento 
																		and d.PkFkAsientos = g.PkFkAsientos AND d.PkAsientosDet_Iden = g.PkFkAsientosDet
left join [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[contctas]			t on	d.FkContCtas = t.pkcontctas and t.pkfkempresas=d.PkFkEmpresas
left join [192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[Centros]				c on	c.PkCentros = g.fkcentros
left join [192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[secciones]			s on	s.pksecciones_iden  = g.fksecciones
left join [192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[empresas]			e on	e.pkempresas = a.PkFkEmpresas
left join [192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[marcas]				m on	m.pkmarcas=g.fkmarcas
left join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Departamentos			n on	n.PkDepartamentos=g.FkDepartamentos
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].FI.CtaBancarias		o on	o.PkFkEmpresas=d.PkFkEmpresas and o.PkCtaBancarias_Iden=d.FkCtaBancarias
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Centros			p on	p.PkCentros=g.FkCentros_Aux
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Departamentos		q on	q.PkDepartamentos=g.FkDepartamentos_Aux
left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Secciones			r on	r.PkSecciones_Iden=g.FkSecciones_Aux
WHERE a.FechaBaja IS NULL
and d.fechabaja is null
and g.fechabaja is null
and n.PkDepartamentos = 'RE'
and a.PkFkEmpresas in (1,5,6,22)
and c.Nombre like 'CO-%'
group by a.PkFkEmpresas,e.nombre,a.FechaAsiento,d.FkContCtas,t.nombre,g.fkcentros,c.Nombre,g.fksecciones,s.descripcion,g.fkmarcas,m.nombre,
d.Concepto,n.PkDepartamentos, n.Descripcion, p.PkCentros,p.Nombre,r.PkSecciones_Iden,r.Descripcion,q.PkDepartamentos, q.Descripcion 


```
