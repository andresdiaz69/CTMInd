# View: vw_spiga_ComisionesFinanciacion

## Usa los objetos:
- [[spiga_ComisionesFinanciacion]]

```sql

CREATE VIEW [dbo].[vw_spiga_ComisionesFinanciacion]
AS
SELECT        IdSincronizacionSpiga, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, IdCentros, AñoExpediente, SerieExpediente, NumExpediente, IdOfertasPagos, SaldoFavorCliente, ImporteFinanciado, 
                         FechaVencimiento, FechaInicio, ComisionFinanciera, VIN, Matricula, ComisionVehiculo, IdTerceros, NombrePropietario, NifCifPropietario, IdTercerosFinanciera, NombreFinanciera, IdEmpleados, NombreEmpleado, 
                         IdTercerosAgente, NombreAgente, IdMarcas, NombreMarca, IdGamas, NombreGama, IdEmpleadosGestor, NombreGestor, FechaVenta, NombreEmpresa, NombreCentro, IdModulos, Estado, DescripcionSecciones, 
                         FechaEntregaCliente
FROM            PSCService_DB.dbo.spiga_ComisionesFinanciacion

```
