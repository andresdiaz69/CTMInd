# Table: Regularizaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkAñoRegularizacion | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkRegularizacion | int | NO |
| Fecha | datetime | NO |
| FkSecciones | int | NO |
| FkEmpleados_Usuario | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FechaMod | datetime | NO |
| Observaciones | nvarchar | YES |
| FkEmpleados_UsuarioConfirmacion | smallint | YES |
| Fecha_Confirmacion | datetime | YES |
| FkRegularizacionTipos | tinyint | NO |
| FkAsientos_RPC | int | YES |
| FkAñoAsiento_RPC | nvarchar | YES |
