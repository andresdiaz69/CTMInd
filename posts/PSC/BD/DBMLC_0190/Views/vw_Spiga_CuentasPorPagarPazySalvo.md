# View: vw_Spiga_CuentasPorPagarPazySalvo

## Usa los objetos:
- [[Empresas]]
- [[spiga_CuentasPorPagar]]

```sql



CREATE VIEW [dbo].[vw_Spiga_CuentasPorPagarPazySalvo] AS
	SELECT a.IdEmpresas,b.NombreEmpresa,a.NombreCentro,a.Factura,a.FechaFactura,a.FechaVencimiento,
	a.Departamento,a.NombreDepartamento,a.TotalFactura,a.ImportePendiente,a.IdTerceros,a.Ano_Periodo,a.Mes_Periodo
	FROM PSCService_DB.dbo.spiga_CuentasPorPagar AS a
	left join Empresas AS b ON a.IdEmpresas = b.CodigoEmpresa

```
