# View: vw_Spiga_MovimientoContableSincronizacion

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

CREATE VIEW [dbo].[vw_Spiga_MovimientoContableSincronizacion] AS
select   Empresa,NombreEmpresa,Cuenta,CodigoTercero,FechaAsiento,NumeroAsiento=NumeroAsiento_Iden,Factura,FechaFactura,TipoFactura,ReferenciaInterna,Debe, 
Haber,concepto,FacturaConciliacion,ExpedienteConciliacion,Centro,NombreCentro​,Seccion,NombreSeccion,Departamento,NombreDepartamento,IdCtaBancarias,
CuentaBancaria,Marca,NombreMarca,centroAux,NombreCentroAux,SeccionAux,NombreSeccionAux,DepartamentoAux,NombreDepartamentoAux,referencia,TipoAsiento=FkAsientotipos
from(​
 		SELECT  g.pkfkasientos,g.pkfkasientosdet,g.pkasientodesgloses_iden,a.pkasientos,​a.PkFkEmpresas AS Empresa,NombreEmpresa=e.nombre,​a.FechaAsiento,​d.FkContCtas AS Cuenta, 
				t.nombre as NombreCuenta,​
				replace(replace(replace(replace(replace(replace(g.fkcentros ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),​char(248),'')as centro,​
				replace(replace(replace(replace(replace(replace(c.Nombre ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')​ AS NombreCentro,​
				Seccion=g.fksecciones,​
				NombreSeccion=replace(replace(replace(replace(replace(replace(s.descripcion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),'')​,char(248),''),​
				marca=g.fkmarcas,NombreMarca=m.nombre,CodigoTercero=d.FkTerceros,​a.NumeroAsiento_Iden,Factura=a.fkseries + '/' + a.NumFactura + '/' + a.añoFactura,a.FechaFactura,
				TipoFactura=a.fkfacturatipos,​ReferenciaInterna=a.ReferenciaInterna,CONVERT(money, g.ImporteDebe) AS Debe, CONVERT(money, g.ImporteHaber) AS Haber,d.Concepto,​
				FacturaConciliacion= CASE WHEN d.FKSeries_Conciliacion IS NULL OR d.FkSeries_Conciliacion = '' ​THEN NULL ELSE d.FkSeries_Conciliacion + '/' + d.FkNumFactura_Conciliacion + '/' + d.FkAñoFactura_Conciliacion END,
				ExpedienteConciliacion = d.FkSeries_Expediente_Conciliacion + '/' + CONVERT(nchar, d.FkNumExpediente_Conciliacion) + '/' + ​d.FkAñoExpediente_Conciliacion,
				n.PkDepartamentos as Departamento, n.Descripcion as NombreDepartamento, d.FkCtaBancarias as IdCtaBancarias, o.Descripcion as CuentaBancaria,
				replace(replace(replace(replace(replace(replace(p.PkCentros ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')as centroAux,
				replace(replace(replace(replace(replace(replace(p.Nombre ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') AS NombreCentroAux,
				r.PkSecciones_Iden as SeccionAux,
				replace(replace(replace(replace(replace(replace(r.Descripcion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') as NombreSeccionAux,
				q.PkDepartamentos as DepartamentoAux, q.Descripcion as NombreDepartamentoAux,d.referencia,a.FkAsientotipos
 ​	​			FROM	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[Asientos]  a  ​
				left join	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[AsientosDet]	d	ON  a.PkAsientos   = d.PkFkAsientos​
								AND a.PkFkEmpresas = d.PkFkEmpresas ​
								AND a.PkAñoAsiento = d.PkFkAñoAsiento​
				left join	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[AsientoDesgloses] g	ON	d.PkFkEmpresas = g.PkFkEmpresas ​
								AND d.PkFkAñoAsiento =g.PkFKAñoAsiento ​
								AND d.PkFkAsientos = g.PkFkAsientos ​
								AND d.PkAsientosDet_Iden = g.PkFkAsientosDet ​
				left join	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[contctas]  t	on	d.FkContCtas = t.pkcontctas​
								and t.pkfkempresas=d.PkFkEmpresas​
				left join	[192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[Centros]  c	ON	c.PkCentros = g.fkcentros​
				left join	[192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[secciones]  s	on	s.pksecciones_iden	= g.fksecciones​
				left join	[192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[empresas]  e	on	e.pkempresas = a.PkFkEmpresas​
				left join    [192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[marcas]	m	on	m.pkmarcas=g.fkmarcas​
				left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Departamentos n on n.PkDepartamentos=g.FkDepartamentos
				left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].FI.CtaBancarias o on o.PkFkEmpresas=d.PkFkEmpresas and o.PkCtaBancarias_Iden=d.FkCtaBancarias
				left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Centros			p on	p.PkCentros=g.FkCentros_Aux
				left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Departamentos		q on	q.PkDepartamentos=g.FkDepartamentos_Aux
				left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Secciones			r on	r.PkSecciones_Iden=g.FkSecciones_Aux
				WHERE a.FechaBaja IS NULL​
				and d.fechabaja is null​
				and g.fechabaja is null​
)a​

WHERE FechaAsiento >= '20221201' --JCS:2024/01/31 - EN PRO DEL PERFORMANCE

--where Empresa = 1
--and year(FechaAsiento)=2020
--and month(FechaAsiento)=10
--and FkAsientotipos = 'NO'

```
