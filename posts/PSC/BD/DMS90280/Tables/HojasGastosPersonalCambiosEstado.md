# Table: HojasGastosPersonalCambiosEstado

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkHojasGastoPersonal | int | NO |
| PkHojasGastosPersonalCambiosEstado_Iden | smallint | NO |
| FechaAlta | datetime | NO |
| FkEmpleados_CambiosEstado | smallint | NO |
| Observaciones | nvarchar | YES |
| FkWFEntidades | smallint | NO |
| FkWFEstados | smallint | YES |
| FkWFEstados_Anterior | smallint | YES |
| FkWFMotivosRechazo | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
