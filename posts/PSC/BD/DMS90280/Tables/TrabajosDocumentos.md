# Table: TrabajosDocumentos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries_OT | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFkNumTrabajo | tinyint | NO |
| PkFkDocumentos | smallint | NO |
| FkDocumentosRespuestas | int | YES |
| Observaciones | nvarchar | YES |
| FkEmpleados | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkVehiculos | int | YES |
| FkVehiculoGarantia | smallint | YES |
| PkTrabajosDocumentos_Iden | int | NO |
