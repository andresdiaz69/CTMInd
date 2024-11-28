# View: vw_spiga_CuentasPorPagar

## Usa los objetos:
- [[Empresas]]
- [[spiga_CuentasPorPagar]]
- [[UnidadDeNegocio]]

```sql
CREATE  VIEW [dbo].[vw_spiga_CuentasPorPagar] AS
SELECT DISTINCT 
	a.IdEmpresas,					c.NombreEmpresa,				b.CodCentro,							a.NombreCentro,			
	a.Departamento,					a.NombreDepartamento,			a.IdMonedaOrigen,						a.DescripcionMoneda,					
	a.NifCif,						a.IdTerceros,					a.IdTerceros_Pagador,					a.NombreTercero,				
	a.Factura,						a.FechaFactura,					a.FechaVencimiento,						a.TotalFactura,					
	a.ImportePendiente,				a.VIN,							a.FechaEntregaVO,						a.FechaEntregaVN,
	a.DescripcionPagoFormas,		a.IdSituacionEfectos,			a.DescripcionSituacionEfectos,			a.Referencia,
	Fecha_De_Pago = '',				a.NumRemesa,					a.FechaFicheroRemesa
FROM		[PSCService_DB].dbo.spiga_CuentasPorPagar AS A
LEFT JOIN [UnidadDeNegocio] AS B ON RTRIM(A.NombreCentro) = RTRIM(B.NombreCentro)
LEFT JOIN Empresas AS C ON A.IdEmpresas = C.CodigoEmpresa
WHERE	IdMonedaOrigen <> 3 
	AND	IdMonedaOrigen IS NOT NULL 
	AND IdSituacionEfectos = 1

```
