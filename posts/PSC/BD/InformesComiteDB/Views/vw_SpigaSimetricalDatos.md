# View: vw_SpigaSimetricalDatos

## Usa los objetos:
- [[AsientoDesgloses]]
- [[Asientos]]
- [[AsientosDet]]
- [[Centros]]
- [[contctas]]
- [[empresas]]
- [[marcas]]
- [[secciones]]

```sql
CREATE view [dbo].[vw_SpigaSimetricalDatos] as
select   Empresa,year(Fecha) Año,month(Fecha)Mes,Fecha,Cuenta,Centro CentroCosto,NombreCentro,
SaldoInicial, Debe Debitos,Haber Creditos,SaldoInicial+Debe-Haber Saldo,
'' Naturaleza,'' TipoCuenta,'' Descripcion,
ModDebito,ModCredito,FinDebito,FinCredito,FechaAsiento

from(​
 
		SELECT  g.pkfkasientos,g.pkfkasientosdet,g.pkasientodesgloses_iden,a.pkasientos,​a.PkFkEmpresas AS Empresa,NombreEmpresa=e.nombre,
				​a.FechaAsiento,​
				CONVERT(date,DATEADD(dd,-(DAY(DATEADD(mm,1,​a.FechaAsiento))),DATEADD(mm,1,​a.FechaAsiento)),105) Fecha,
				d.FkContCtas AS Cuenta, 
				replace(replace(replace(replace(replace(replace(replace(g.fkcentros ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),​char(248),''),char(31),'') as centro,​
				replace(replace(replace(replace(replace(replace(replace(c.Nombre ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')​,char(31),'') AS NombreCentro,​
				Seccion=g.fksecciones,​
				NombreSeccion=replace(replace(replace(replace(replace(replace(s.descripcion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),'')​,char(248),''),​
				marca=g.fkmarcas,NombreMarca=m.nombre,CodigoTercero=d.FkTerceros,​a.NumeroAsiento_Iden,Factura=a.fkseries + '/' + a.NumFactura + '/' + a.añoFactura,a.FechaFactura,
				TipoFactura=a.fkfacturatipos,​ReferenciaInterna=a.ReferenciaInterna,
				
				case when d.FkOperacionTipos = 2 then CONVERT(decimal(18,4), g.ImporteDebe-g.ImporteHaber) else 0 end as SaldoInicial, 
				case when d.FkOperacionTipos <> 2 then CONVERT(decimal(18,4), g.ImporteDebe) else 0 end as Debe, 
				case when d.FkOperacionTipos <> 2 then CONVERT(decimal(18,4), g.ImporteHaber) else 0 end as Haber, 
				
				--CONVERT(decimal(18,4), g.ImporteDebe-g.ImporteDebe) AS SaldoInicial, 
				--CONVERT(decimal(18,4), g.ImporteDebe) AS Debe, 
				--CONVERT(decimal(18,4), g.ImporteHaber) AS Haber,

				d.Concepto,​	FacturaConciliacion= CASE WHEN d.FKSeries_Conciliacion IS NULL OR d.FkSeries_Conciliacion = '' ​THEN NULL ELSE d.FkSeries_Conciliacion + '/' + d.FkNumFactura_Conciliacion + '/' + d.FkAñoFactura_Conciliacion END,
				ExpedienteConciliacion = d.FkSeries_Expediente_Conciliacion + '/' + CONVERT(nchar, d.FkNumExpediente_Conciliacion) + '/' + ​d.FkAñoExpediente_Conciliacion,
				--n.PkDepartamentos as Departamento, n.Descripcion as NombreDepartamento, d.FkCtaBancarias as IdCtaBancarias, o.Descripcion as CuentaBancaria,
				
			​	CONVERT(decimal(18,4), g.ImporteDebe-g.ImporteDebe) AS ModDebito, 
				CONVERT(decimal(18,4), g.ImporteHaber-g.ImporteHaber) AS ModCredito,
				case when d.FkOperacionTipos <> 2 then CONVERT(decimal(18,4), g.ImporteDebe) else 0 end as FinDebito, 
				case when d.FkOperacionTipos <> 2 then CONVERT(decimal(18,4), g.ImporteHaber) else 0 end as FinCredito

			FROM	    [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[Asientos]  a  ​
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
			--left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].CM.Departamentos n on n.PkDepartamentos=g.FkDepartamentos
            --left outer join [192.168.90.10\SPIGAPLUS].[DMS00280].FI.CtaBancarias o on o.PkFkEmpresas=d.PkFkEmpresas and o.PkCtaBancarias_Iden=d.FkCtaBancarias

			WHERE a.FechaBaja IS NULL​
			and d.fechabaja is null​
			and g.fechabaja is null​
			and ​d.FkContCtas is not null
			and d.FkContCtas < '699999'
			and ​a.PkFkEmpresas in (1,3,19)
			and (g.fkcentros in (147,8,7,11,27,70,58) 
			or (g.fkcentros = 28 and g.fksecciones in (597,598))
			or (g.fkcentros = 69 and g.fksecciones in (606))
			or (g.fkcentros = 54 and g.fksecciones in (614))
			)
)a​


```
