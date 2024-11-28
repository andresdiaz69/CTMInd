# Table: spiga_AnticiposClientes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | NO |
| IdRecibos | int | YES |
| IdTerceros | int | YES |
| Fecha | datetime | YES |
| Importe | decimal | YES |
| Concepto | nvarchar | YES |
| IdReciboEstados | nvarchar | YES |
| UserMod | int | YES |
| HostMod | nvarchar | YES |
| VersionFila | int | YES |
| IdRecibosAnula | int | YES |
| Origen | nvarchar | YES |
| SerieFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| IdModulosGenera | nvarchar | YES |
| NumFactura | nvarchar | YES |
| IdEmpleados | int | YES |
| Abonado | bit | YES |
| FechaMod | datetime | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| NombreTercero | nvarchar | YES |
| Apellido1 | nvarchar | YES |
| Apellido2 | nvarchar | YES |
| DescripcionEstadoRecibo | nvarchar | YES |
| NombreUsuario | nvarchar | YES |
| NombreEmpleado | nvarchar | YES |
| DescripcionMoneda | nvarchar | YES |
| DescripcionPlural | nvarchar | YES |
| Simbolo | nvarchar | YES |
| IdContCtasVentasTerceroGrupo | nvarchar | YES |
| IdMonedas | int | YES |
| FactorCambioMoneda | decimal | YES |
| Observaciones | nvarchar | YES |
| IdCentros | int | YES |
| FechaVto | datetime | YES |
| Voucher | nvarchar | YES |
| FechaUltimaVinculacion | datetime | YES |
