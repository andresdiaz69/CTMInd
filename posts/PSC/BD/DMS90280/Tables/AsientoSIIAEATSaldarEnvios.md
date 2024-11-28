# Table: AsientoSIIAEATSaldarEnvios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkAsientoSIIAEATSaldar | uniqueidentifier | NO |
| PkAsientoSIIAEATSaldarEnvios_Iden | tinyint | NO |
| FechaEnvio | datetime | NO |
| FkAsientoSIIAEATEstados | tinyint | NO |
| XMLEnvio | nvarchar | NO |
| XMLRespuesta | nvarchar | NO |
| CSV | nvarchar | YES |
| CodigoError | nvarchar | YES |
| DescripcionError | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
