# View: vw_ProgramaFidelizacionTaller

## Usa los objetos:
- [[spiga_ProgramaDeFidelizacionTA]]

```sql
CREATE view [dbo].[vw_ProgramaFidelizacionTaller]  as

SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY  CodEmpresa)) AS INT),0) id, CodEmpresa, NombreEmpresa, Cedula, NombreCompleto, NombreMarca, NombreModelo, 
	AñoModelo, TrabajoRealizado, Particular, Celular, Factura, FechaFactura
FROM
(
	SELECT DISTINCT Idempresas AS CodEmpresa, NombreEmpresa, Cedula, NombreCompleto, NombreMarca, NombreModelo, AñoModelo, TrabajoRealizado, Particular, 
		Celular, Factura, convert(datetime,FechaFactura,103)FechaFactura
	FROM [PSCService_DB].[dbo].[spiga_ProgramaDeFidelizacionTA]
)a 
WHERE  FechaFactura >= DATEADD(mm, -6, GETDATE())
AND FechaFactura <=  GETDATE()

```
