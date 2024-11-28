# Table: AutoFacturacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PKFkTerceros_AutoFacturacion | int | NO |
| PkAutoFacturacion | nvarchar | NO |
| TipoDocumento | nvarchar | NO |
| Status | nvarchar | YES |
| FechaEmision | datetime | YES |
| FechaVencimiento | datetime | YES |
| MetodoPago | nvarchar | YES |
| FechaPrestacionServicio | datetime | YES |
| OrdenPrestacionServicio | nvarchar | YES |
| NumeroOrden | nvarchar | YES |
| TotalNeto | decimal | YES |
| TotalIVA | decimal | YES |
| Total | decimal | YES |
| NumeroVersionCertificacion | nvarchar | YES |
| HasCode | nvarchar | YES |
| FechaEnvioDocumento | datetime | YES |
| FirmaUtilizador | nvarchar | YES |
| FirmaCortaUtilizador | nvarchar | YES |
| Matricula | nvarchar | YES |
| Marca | nvarchar | YES |
| Modelo | nvarchar | YES |
| Kms | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Abono | bit | NO |
| FacturaOriginal | nvarchar | YES |
| MotivoAbono | nvarchar | YES |
| FkCentros | smallint | YES |
