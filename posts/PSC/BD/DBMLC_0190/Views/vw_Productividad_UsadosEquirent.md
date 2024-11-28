# View: vw_Productividad_UsadosEquirent

## Usa los objetos:
- [[ExogenasVehiculosVentasEquirent]]
- [[v_EmpleadosActivosRetirados]]

```sql
CREATE VIEW [dbo].[vw_Productividad_UsadosEquirent] AS
SELECT Año_Periodo, Mes_Periodo, CONVERT(nvarchar, CodigoEmpresa) AS CodigoEmpresa, NombreEmpresa, NombreMarca, CONVERT(nvarchar, CodigoCentro) AS CodigoCentro,
	NombreCentro, CodigoEmpleado, NombreEmpleado, Cantidad, TipoVenta, PrecioVenta
FROM (
		SELECT Año_Periodo = Equirent.Ano, Mes_Periodo = Equirent.Mes, CodigoEmpresa = AddEmple.CodigoEmpresa, NombreEmpresa = AddEmple.Empresa, NombreMarca = Equirent.Marca, 
			CodigoCentro = AddEmple.codigo_centro, NombreCentro = AddEmple.nombre_centro, Cantidad = 1, TipoVenta = 'Usados', CodigoEmpleado = Equirent.CodigoEmpleado,
			NombreEmpleado = LTRIM(RTRIM(AddEmple.Nombres)) + ' ' + LTRIM(RTRIM(AddEmple.Apellido1)) + ' ' + LTRIM(RTRIM(AddEmple.Apellido2)), Equirent.PrecioVenta
		FROM		ExogenasVehiculosVentasEquirent AS Equirent 
		LEFT JOIN	v_EmpleadosActivosRetirados AS AddEmple	ON Equirent.CodigoEmpleado  = AddEmple.CodigoEmpleado
															AND Equirent.Ano = AddEmple.Ano_Periodo 
															AND Equirent.Mes = AddEmple.Mes_Periodo
) A

```
