# Table: IMSComunicacionVentas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkVentas | smallint | NO |
| FkIMSConcesionarios | smallint | NO |
| FkIMSCuentas | smallint | NO |
| FkIMSSucursales | smallint | NO |
| FkIMSVendedores | smallint | YES |
| FkTerceros_Propietario | int | YES |
| FkTerceros_Financiera | int | YES |
| FkTerceros_Alquilador | int | YES |
| FkTerceros_Conductor | int | YES |
| FkVentaFinanciacionTipos | nvarchar | YES |
| FechaVenta | datetime | YES |
| FechaEntregaCliente | datetime | YES |
| FechaMatriculacion | datetime | YES |
| FechaAlta | datetime | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaRecepcion | datetime | YES |
| Matricula | nvarchar | YES |
| ImporteProvisionGarantias | decimal | YES |
| FkAñoAsiento_ProvisionGarantias | nvarchar | YES |
| FkAsientos_ProvisionGarantias | int | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FactorCambioMonedaContravalor | decimal | YES |
