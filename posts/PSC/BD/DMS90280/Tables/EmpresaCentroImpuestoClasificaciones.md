# Table: EmpresaCentroImpuestoClasificaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkImpuestos | nvarchar | NO |
| PkFkImpuestoClasificaciones | nvarchar | NO |
| FkContCtas_Emitida | nvarchar | YES |
| FkContCtas_Recibida | nvarchar | YES |
| FkContCtas_Emitida_Abono | nvarchar | YES |
| FkContCtas_Recibida_Abono | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
