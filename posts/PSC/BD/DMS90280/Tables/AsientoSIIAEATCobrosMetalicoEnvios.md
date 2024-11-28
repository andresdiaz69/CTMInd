# Table: AsientoSIIAEATCobrosMetalicoEnvios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkAsientoSIIAEATCobrosMetalico | nvarchar | NO |
| PkAsientoSIIAEATCobrosMetalicoEnvios_Iden | tinyint | NO |
| FechaEnvio | datetime | NO |
| FkAsientoSIIAEATEstados | tinyint | NO |
| XMLEnvio | nvarchar | YES |
| XMLRespuesta | nvarchar | YES |
| CSV | nvarchar | YES |
| CodigoError | nvarchar | YES |
| DescripcionError | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Modificacion | bit | YES |
| ImporteEnviado | decimal | YES |
