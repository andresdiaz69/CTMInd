# View: vw_ProgramaFidelizacionVehiculosNuevos

## Usa los objetos:
- [[spiga_ProgramaDeFidelizacion]]

```sql
CREATE VIEW [dbo].[vw_ProgramaFidelizacionVehiculosNuevos] AS
SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY  modulo)) AS INT),0) id, modulo, CodigoEmpresa, Empresa, Cedula, NombreCompleto, marca, modelo, AñoModelo, ModoPago,
	EntidadFinanciera, telefono, celular, Factura, FechaFactura, Email, FechaNacimiento, FechaEntregaCliente, ImportePago
FROM 
(
	SELECT modulo, pkfkempresas AS CodigoEmpresa, Empresa, Cedula, [NombreCompleto] AS NombreCompleto, marca, modelo, AñoModelo, [ModoPago] AS ModoPago, 
		[EntidadFinanciera] AS EntidadFinanciera, telefono = replace(telefono, ',', '\'), celular = replace(celular, ',', '\'), Factura, 
		CONVERT(datetime, [FechaFactura], 103) FechaFactura, Email, FechaNacimiento, FechaEntregaCliente, ImportePago
	FROM [PSCService_DB].[dbo].spiga_ProgramaDeFidelizacion
)a 	
WHERE FechaFactura >= DATEADD(mm, - 6, GETDATE()) 
AND FechaFactura <= GETDATE()	

```
