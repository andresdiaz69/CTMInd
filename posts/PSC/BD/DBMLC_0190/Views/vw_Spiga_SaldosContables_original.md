# View: vw_Spiga_SaldosContables_original

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
CREATE view [dbo].[vw_Spiga_SaldosContables_original] as
select Año,Mes,Empresa,NombreEmpresa,convert(int,Centro)Centro,NombreCentro,Seccion,NombreSeccion,marca,NombreMarca,Debe=sum(debe),Haber=sum(haber),Saldo = sum(debe)-sum(haber)​
from(​
	 SELECT  g.pkfkasientos,g.pkfkasientosdet,g.pkasientodesgloses_iden,a.pkasientos,​a.PkFkEmpresas AS Empresa,NombreEmpresa=e.nombre,​year(a.FechaAsiento) AS Año,month(a.FechaAsiento) AS Mes,​
			 d.FkContCtas AS Cuenta, t.nombre as NombreCuenta,​
			 replace(replace(replace(replace(replace(replace(g.fkcentros ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),​char(248),'')as centro,​
			 replace(replace(replace(replace(replace(replace(c.Nombre ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')​AS NombreCentro,​Seccion=g.fksecciones,
			 ​NombreSeccion=replace(replace(replace(replace(replace(replace(s.descripcion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),'')​,char(248),''),​
			 CONVERT(money, g.ImporteDebe) AS Debe,CONVERT(money, g.ImporteHaber) AS Haber,marca=g.fkmarcas,NombreMarca=m.nombre​
	 ​
	 FROM	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[Asientos]  a  ​
			 join	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[AsientosDet]	d	ON  a.PkAsientos   = d.PkFkAsientos​
							 AND a.PkFkEmpresas = d.PkFkEmpresas ​AND a.PkAñoAsiento = d.PkFkAñoAsiento​
			 join  [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[AsientoDesgloses] g	ON	d.PkFkEmpresas = g.PkFkEmpresas ​
							 AND d.PkFkAñoAsiento =g.PkFKAñoAsiento ​AND d.PkFkAsientos = g.PkFkAsientos AND d.PkAsientosDet_Iden = g.PkFkAsientosDet ​
			 join	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[contctas]  t	on	d.FkContCtas = t.pkcontctas​
							 and t.pkfkempresas=d.PkFkEmpresas​
			 JOIN	[192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[Centros]  c	ON	c.PkCentros = g.fkcentros​
			 join	[192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[secciones]  s	on	s.pksecciones_iden	= g.fksecciones​
			 join	[192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[empresas]  e	on	e.pkempresas = a.PkFkEmpresas​
			 left join    [192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[marcas]	m	on	m.pkmarcas=g.fkmarcas​
	
	 WHERE (FkContCtas like '41%') ​and a.FechaBaja IS NULL​ and d.fechabaja is null​ and g.fechabaja is null​
)a​
group by año,mes,Empresa,NombreEmpresa,centro,nombrecentro,seccion,NombreSeccion,marca,NombreMarca​


```
