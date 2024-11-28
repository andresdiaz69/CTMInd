# Table: Inventarios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkInventarios_Iden | bigint | NO |
| FechaAlta | datetime | NO |
| FkModulos | nvarchar | NO |
| FkEmpleados | smallint | YES |
| FkVehiculos | int | YES |
| FkUbicacionGenerica | nvarchar | YES |
| Matricula | nvarchar | YES |
| VIN | nvarchar | YES |
| Marca | nvarchar | YES |
| Gama | nvarchar | YES |
| Modelo | nvarchar | YES |
| Color | nvarchar | YES |
| Observaciones | nvarchar | YES |
| FkDocumentos | smallint | YES |
| FkDocumentosRespuestas | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Latitud | decimal | YES |
| Longitud | decimal | YES |
| FkEmpresas_Expediente | smallint | YES |
| FkCentros_Expediente | smallint | YES |
| FkSeries_Expediente | nvarchar | YES |
| FkNumExpediente | int | YES |
| FkAñoExpediente | nvarchar | YES |
| FkComprasNumDet_VN | smallint | YES |
| FkComprasNumDet_VO | smallint | YES |
