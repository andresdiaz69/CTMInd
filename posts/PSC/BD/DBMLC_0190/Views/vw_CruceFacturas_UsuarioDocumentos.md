# View: vw_CruceFacturas_UsuarioDocumentos

## Usa los objetos:
- [[spiga_UsuariosDocumentos]]
- [[vw_CruceFacturas_EmpleadosActivos]]

```sql


CREATE VIEW [dbo].[vw_CruceFacturas_UsuarioDocumentos]
AS

SELECT PkFkempresas CodEmpresa,		CodigoTercero,		a.Ano_Factura Ano_Periodo,		a.Mes_Periodo,				
	   Serie = replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(FkSeries,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),char(45),''),char(46), ''),char(42),''), char(43), ''), char(35), ''), char(44), ''), char(09), ''), ('|'), ''), 
	   Numero = replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(NumFactura,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),char(45),''), char(46),''), char(42),''), char(43), ''), char(35), ''), char(44), ''), char(09),''), '|', ''),
	   CedulaEmpleado,				Nombre,				b.Unidad_Negocio,				b.Nombre_Unidad_Negocio,		
	   b.codigo_centro,				b.nombre_centro,    b.Email_Corporativo		
  FROM [PSCService_DB].[dbo].[spiga_UsuariosDocumentos] A
  LEFT JOIN vw_CruceFacturas_EmpleadosActivos B ON A.CedulaEmpleado = CONVERT(NVARCHAR(50), B.CodigoEmpleado)


```
