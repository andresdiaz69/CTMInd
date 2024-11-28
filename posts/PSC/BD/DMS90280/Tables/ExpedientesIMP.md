# Table: ExpedientesIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkExpedientesIMP | bigint | NO |
| FkProcesos | int | YES |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| Expediente | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaProceso | datetime | YES |
| Compra | bit | NO |
| Venta | bit | NO |
| Origen | nvarchar | YES |
| CodigoExpedienteOrigen | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| Observaciones | nvarchar | YES |
