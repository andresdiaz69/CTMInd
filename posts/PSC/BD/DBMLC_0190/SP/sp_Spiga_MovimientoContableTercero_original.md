# Stored Procedure: sp_Spiga_MovimientoContableTercero_original

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
CREATE PROCEDURE [dbo].[sp_Spiga_MovimientoContableTercero_original] 
	(
	@Empresa int,
	@FechaInicial date,
	@FechaFinal date,
	@Cuenta varchar(255)
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
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
			​FROM	[192.168.90.10\SPIGAPLUS].[FI].[Asientos]  a  ​
			left join	[192.168.90.10\SPIGAPLUS].[FI].[AsientosDet]	d	ON  a.PkAsientos   = d.PkFkAsientos​
							AND a.PkFkEmpresas = d.PkFkEmpresas ​
							AND a.PkAñoAsiento = d.PkFkAñoAsiento​
			left join	[192.168.90.10\SPIGAPLUS].[FI].[AsientoDesgloses] g	ON	d.PkFkEmpresas = g.PkFkEmpresas ​
							AND d.PkFkAñoAsiento =g.PkFKAñoAsiento ​
							AND d.PkFkAsientos = g.PkFkAsientos ​
							AND d.PkAsientosDet_Iden = g.PkFkAsientosDet ​
			left join	[192.168.90.10\SPIGAPLUS].[FI].[contctas]  t	on	d.FkContCtas = t.pkcontctas​
							and t.pkfkempresas=d.PkFkEmpresas​
			left join	[192.168.90.10\SPIGAPLUS].[CM].[Centros]  c	ON	c.PkCentros = g.fkcentros​
			left join	[192.168.90.10\SPIGAPLUS].[CM].[secciones]  s	on	s.pksecciones_iden	= g.fksecciones​
			left join	[192.168.90.10\SPIGAPLUS].[CM].[empresas]  e	on	e.pkempresas = a.PkFkEmpresas​
			left join    [192.168.90.10\SPIGAPLUS].[CM].[marcas]	m	on	m.pkmarcas=g.fkmarcas​
			left outer join [192.168.90.10\SPIGAPLUS].CM.Departamentos n on n.PkDepartamentos=g.FkDepartamentos
			left outer join [192.168.90.10\SPIGAPLUS].FI.CtaBancarias o on o.PkFkEmpresas=d.PkFkEmpresas and o.PkCtaBancarias_Iden=d.FkCtaBancarias

			WHERE a.FechaBaja IS NULL​
			and d.fechabaja is null​
			and g.fechabaja is null​

and a.PkFkEmpresas = @Empresa
and ​a.FechaAsiento between @FechaInicial and @FechaFinal
and ​d.FkContCtas = @Cuenta


)a
group by Empresa,NombreEmpresa,Cuenta,CodigoTercero,Centro,NombreCentro​,Seccion,NombreSeccion,Departamento,NombreDepartamento,Marca,NombreMarca,fechaasiento
END

```
