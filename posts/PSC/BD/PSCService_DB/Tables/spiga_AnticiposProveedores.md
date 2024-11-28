# Table: spiga_AnticiposProveedores

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | NO |
| IdAnticiposProveedor | int | YES |
| Fecha | datetime | YES |
| Importe | decimal | YES |
| Concepto | nvarchar | YES |
| IdTerceros | int | YES |
| NombreTercero | nvarchar | YES |
| Apellido1 | nvarchar | YES |
| Apellido2 | nvarchar | YES |
| UserMod | int | YES |
| NombreEmpleado | nvarchar | YES |
| VersionFila | int | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| IdMonedas | int | YES |
| FactorCambioMoneda | decimal | YES |
| IdReciboEstados | nvarchar | YES |
| IdPagoFormas | nvarchar | YES |
| Observaciones | nvarchar | YES |
| IdEmpleados_Emision | int | YES |
| Abonado | bit | YES |
| IdTalones | int | YES |
| IdTalonesDetalles | int | YES |
| IdContCtasAnticipoImportado | nvarchar | YES |
| IdCentros | smallint | YES |
| Centro | nvarchar | YES |
| ImportePendienteVincular | decimal | YES |
