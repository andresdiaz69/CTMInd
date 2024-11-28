# Table: VehiculosCertificados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAño | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkNumero | nvarchar | NO |
| FkVehiculos | int | NO |
| FkVehiculosCertificadosTipos | smallint | NO |
| FechaAlta | datetime | NO |
| FkUsuarios_Alta | smallint | NO |
| FechaEmision | datetime | NO |
| FkEmpleados_Autorizacion | smallint | YES |
| FechaAnulacion | datetime | YES |
| FkUsuarios_Anulacion | smallint | YES |
| FkAñoExpediente | nvarchar | YES |
| FkSeries_Expediente | nvarchar | YES |
| FkNumExpediente | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| DatosImpresion | xml | YES |
| FkCentros | smallint | YES |
