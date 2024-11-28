# Table: AsientoSIIAEATSaldar

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkAsientoSIIAEATSaldar | uniqueidentifier | NO |
| FkEmpresas | smallint | NO |
| FkAñoAsiento_Saldar | nvarchar | NO |
| FkAsientos_Saldar | int | NO |
| FkAñoAsiento | nvarchar | NO |
| FkAsientos | int | NO |
| FkEfectosNumDet | smallint | NO |
| Importe | decimal | NO |
| FkPagoFormas | nvarchar | NO |
| FechaEnvio | datetime | YES |
| FkAsientoSIIAEATEstados | tinyint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
