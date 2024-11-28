# View: vw_Spiga_MovimientoContableTercero_original

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
CREATE view [dbo].[vw_Spiga_MovimientoContableTercero_original] as
select   cant= row_number() over (partition by CodigoTercero order by CodigoTercero),fechaasiento,
Empresa,NombreEmpresa,Cuenta,CodigoTercero,Debe=sum(debe), 
Haber=sum(haber),saldo= sum(debe)-sum(haber),
Centro,NombreCentro​,Seccion,NombreSeccion,Departamento,NombreDepartamento,Marca,NombreMarca
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
				n.PkDepartamentos as Departamento, n.Descripcion as NombreDepartamento, d.FkCtaBancarias as IdCtaBancarias, o.Descripcion as CuentaBancaria ​
			​FROM	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[Asientos]  a  ​
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

			WHERE a.FechaBaja IS NULL​
			and d.fechabaja is null​
			and g.fechabaja is null​
)a​ 
--where Empresa = 6
--and FechaAsiento >= '20200101'
--and FechaAsiento <= '20200331'
--and cuenta = '2805051110'
--and CodigoTercero = '15173'
group by Empresa,NombreEmpresa,Cuenta,CodigoTercero,Centro,NombreCentro​,Seccion,NombreSeccion,Departamento,NombreDepartamento,Marca,NombreMarca,fechaasiento


```
