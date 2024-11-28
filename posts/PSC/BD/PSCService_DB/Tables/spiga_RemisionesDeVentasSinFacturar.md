# Table: spiga_RemisionesDeVentasSinFacturar

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| PkFkEmpresas | smallint | YES |
| Empresa | nvarchar | YES |
| PkFkCentros | smallint | YES |
| Centro | nvarchar | YES |
| TipoMovimiento | nvarchar | YES |
| IdTerceros | int | YES |
| Tercero | nvarchar | YES |
| FDocumento | datetime | YES |
| ValorNeto | decimal | YES |
| ValorMedioMovimiento | decimal | YES |
| ValorBruto | decimal | YES |
| Prefijo | nvarchar | YES |
| Num | nvarchar | YES |
| Año | nvarchar | YES |
| PrefijoFactura | nvarchar | YES |
| IdSecciones | int | YES |
| IdEmpleado | smallint | YES |
| Empleado | varchar | YES |
| IdEmpleadoVendedor | smallint | YES |
| EmpleadoVendedor | varchar | YES |
| MR | varchar | YES |
| IdReferencias | varchar | YES |
