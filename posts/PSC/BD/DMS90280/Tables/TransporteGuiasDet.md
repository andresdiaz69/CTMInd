# Table: TransporteGuiasDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFKAñoTransporte | nvarchar | NO |
| PkFkSeriesTransporte | nvarchar | NO |
| PkFKNumTransporte | int | NO |
| PkTransporteGuiasDet_Iden | smallint | NO |
| FkAñoExpediente | nvarchar | NO |
| FkSeriesExpediente | nvarchar | NO |
| FkNumExpediente | int | NO |
| FkCentros_Origen | smallint | NO |
| FkUbicaVNO_Origen | nvarchar | NO |
| FkFechaExpedienteAlta_Origen | datetime | NO |
| FkCentros_Destino | smallint | NO |
| FkUbicaVNO_Destino | nvarchar | NO |
| FkFechaExpedienteAlta_Destino | datetime | NO |
| FkVehiculos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkVentas | smallint | YES |
