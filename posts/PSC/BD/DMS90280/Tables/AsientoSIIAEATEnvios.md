# Table: AsientoSIIAEATEnvios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| PkAsientoSIIAEATEnvios_Iden | tinyint | NO |
| FechaEnvio | datetime | NO |
| FkAsientoSIIAEATEstados | tinyint | NO |
| XMLEnvio | nvarchar | NO |
| XMLRespuesta | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| CSV | nvarchar | YES |
| CodigoError | nvarchar | YES |
| DescripcionError | nvarchar | YES |
| Modificacion | bit | YES |
