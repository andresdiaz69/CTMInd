# Table: CajasIntegracionesCobros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCajasIntegracionesTipos | nvarchar | NO |
| PkCajasIntegracionesCobros | nvarchar | NO |
| FkCentros | smallint | YES |
| FkCajas | smallint | YES |
| FkCajasDet | int | YES |
| ImporteCobrado | decimal | NO |
| FechaCobroIntegracion | datetime | YES |
| FechaCobroSpiga | datetime | YES |
| UsuarioCobroIntegracion | smallint | NO |
| HostCobroIntegracion | nvarchar | NO |
| UsuarioCobroSpiga | smallint | YES |
| HostCobroSpiga | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpleadosCobroIntegracion | smallint | YES |
| FkEmpleadosCobroSpiga | smallint | YES |
| ComandoCobroIntegracion | nvarchar | YES |
