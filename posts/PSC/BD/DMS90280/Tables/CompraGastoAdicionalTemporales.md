# Table: CompraGastoAdicionalTemporales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCompraGastoAdicionalTemporales_Iden | bigint | NO |
| FechaAlta | datetime | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | YES |
| SerieExpediente | nvarchar | NO |
| NumExpediente | int | NO |
| AñoExpediente | nvarchar | NO |
| FkTerceros | int | YES |
| FkCompraGastoAdicionalTipos | nvarchar | YES |
| FkDepartamentos | nvarchar | YES |
| BaseImponible | decimal | YES |
| BaseExenta | decimal | YES |
| BaseNoSujeta | decimal | YES |
| ImporteSuplidos | decimal | YES |
| FkMonedas | smallint | YES |
| Descripcion | nvarchar | YES |
| FechaAlbaran | datetime | YES |
| SerieAlbaran | nvarchar | YES |
| NumAlbaran | nvarchar | YES |
| AñoAlbaran | nvarchar | YES |
| FechaFactura | datetime | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FechaContable | datetime | YES |
| FkImpuestos | nvarchar | YES |
| FechaProcesado | datetime | YES |
| FechaBaja | datetime | YES |
| ObservacionesProceso | nvarchar | YES |
| Origen | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FactorCambioMoneda | decimal | YES |
| FkModulos | nvarchar | YES |
