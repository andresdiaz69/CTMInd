# View: vw_FacturasProveedores

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]
- [[vw_Terceros_Consolidado]]

```sql



CREATE view [dbo].[vw_FacturasProveedores] as
SELECT año,					mes,				IdEmpresas,		
	   NombreEmpresa,		CodigoTercero,		nit,
	   nombres,				Serie = rtrim(ltrim(replace(serie,' ',''))),
	   Numero = rtrim(ltrim(replace(numero,' ','')))
  FROM (SELECT año,				mes,				IdEmpresas,
			   NombreEmpresa,	CodigoTercero,		nit,
			   nombres,
	           Serie  = replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(substring(factura,1,(primer-1)),char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),char(45),''),char(46), ''),char(42),''), char(43), ''), char(35), ''), char(44), ''), char(09), ''), ('|'), ''),
			   Numero = replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(substring(factura,(primer+1),(Segundo-primer)-1),char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),char(45),''), char(46),''), char(42),''), char(43), ''), char(35), ''), char(44), ''), char(09),''), '|', '')  
	      FROM (SELECT año,				mes,			IdEmpresas,
					   NombreEmpresa,	CodigoTercero,	nit,   
					   nombres,			Primer,			Segundo=charindex('/',factura,(primer+1)),
					   factura
		          FROM (SELECT DISTINCT Año=year(m.FechaAsiento),	Mes=month(m.FechaAsiento),	m.IdEmpresas,
										m.NombreEmpresa,			m.CodigoTercero,		    Nit= CASE WHEN t.TipoDocumento = 'CEDULA' THEN t.Nifcif else substring(t.Nifcif,1,9) END,
										Nombres= isnull(t.NombreComercial, isnull(t.Nombre,' ') + ' ' + isnull(t.Apellido1,' ') + ' ' +isnull(t.Apellido2, ' ')),
										Primer=charindex('/',m.Factura,1),
										m.Factura
								   FROM	[PSCService_DB].dbo.spiga_ContabilidadMovimientos	m
							  LEFT JOIN	vw_Terceros_Consolidado	 t	on	m.CodigoTercero = t.PkTerceros
								  WHERE m.TipoFactura = 'R'
								    and m.CodigoTercero is not null
			                        and m.IdEmpresas in (1,5,6,22,24)
								  --and m.CodigoTercero = 897893
									)a
								)b  where nit is not null 
							)c 
--where serie like'%E%'
--and numero like '%162%'
--AND Año = 2023

```
