# View: vw_movimiento_contable_spiga_original

## Usa los objetos:
- [[AsientoDesgloses]]
- [[Asientos]]
- [[AsientosDet]]
- [[Centros]]
- [[contctas]]
- [[Empresas]]
- [[marcas]]
- [[Secciones]]

```sql




---Tabla spiga_ContabilidadMovimientos 
-- sacara backup antes de cambiar _original

CREATE view [dbo].[vw_movimiento_contable_spiga_original] as
select   Empresa,NombreEmpresa,Cuenta,CodigoTercero,FechaAsiento,NumeroAsiento=NumeroAsiento_Iden,Factura,FechaFactura,
TipoFactura,ReferenciaInterna,Debe, Haber,concepto,FacturaConciliacion,ExpedienteConciliacion,Centro,NombreCentro
from(
		SELECT  g.pkfkasientos,g.pkfkasientosdet,g.pkasientodesgloses_iden,a.pkasientos,
		a.PkFkEmpresas AS Empresa,NombreEmpresa=e.nombre,
		a.FechaAsiento,
		d.FkContCtas AS Cuenta, t.nombre as NombreCuenta,
		replace(replace(replace(replace(replace(replace(g.fkcentros ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),
		char(248),'')as centro,
		replace(replace(replace(replace(replace(replace(c.Nombre ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')
		AS NombreCentro,
		Seccion=g.fksecciones,
		NombreSeccion=replace(replace(replace(replace(replace(replace(s.descripcion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),'')
		,char(248),''),
		marca=g.fkmarcas,NombreMarca=m.nombre,CodigoTercero=d.FkTerceros,
		a.NumeroAsiento_Iden,Factura=a.fkseries + '/' + a.NumFactura + '/' + a.añoFactura,a.FechaFactura,TipoFactura=a.fkfacturatipos,
		ReferenciaInterna=a.ReferenciaInterna,CONVERT(money, g.ImporteDebe) AS Debe, CONVERT(money, g.ImporteHaber) AS Haber,d.Concepto,
		FacturaConciliacion= CASE WHEN d.FKSeries_Conciliacion IS NULL OR d.FkSeries_Conciliacion = '' 
				THEN NULL ELSE d.FkSeries_Conciliacion + '/' + d.FkNumFactura_Conciliacion + '/' + d.FkAñoFactura_Conciliacion END, 
		 ExpedienteConciliacion = d.FkSeries_Expediente_Conciliacion + '/' + CONVERT(nchar, d.FkNumExpediente_Conciliacion) + '/' + 
		 d.FkAñoExpediente_Conciliacion 
         
		FROM	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[Asientos]		a	 with(nolock)
		join	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[AsientosDet]	d	ON  a.PkAsientos   = d.PkFkAsientos
																		AND a.PkFkEmpresas = d.PkFkEmpresas 
																		AND a.PkAñoAsiento = d.PkFkAñoAsiento
		join	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[AsientoDesgloses] g	ON	d.PkFkEmpresas = g.PkFkEmpresas 
																		AND d.PkFkAñoAsiento =g.PkFKAñoAsiento 
																		AND d.PkFkAsientos = g.PkFkAsientos 
																		AND d.PkAsientosDet_Iden = g.PkFkAsientosDet 
		join	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[contctas]		t	on	d.FkContCtas = t.pkcontctas
																		and t.pkfkempresas=d.PkFkEmpresas
		JOIN	[192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[Centros]		c	ON	c.PkCentros = g.fkcentros
		join	[192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[secciones]		s	on	s.pksecciones_iden	= g.fksecciones
		join	[192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[empresas]		e	on	e.pkempresas = a.PkFkEmpresas
		left join    [192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[marcas]	m	on	m.pkmarcas=g.fkmarcas
		WHERE a.FechaBaja IS NULL
		and d.fechabaja is null
		and g.fechabaja is null
		--a.PkFkEmpresas=1
		--and (FkContCtas like '13%') 
		--and d.FkTerceros =248019
		--and FI.AsientoDesgloses.fkcentros = '1'
)a



```
