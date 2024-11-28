# Table: Encuestas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoEncuestas | nvarchar | NO |
| PkFkSeries_Encuestas | nvarchar | NO |
| PkNumEncuestas | int | NO |
| FkCentros | smallint | NO |
| FkDocumentos | smallint | YES |
| FkDocumentosRespuestas | int | YES |
| FechaAlta | datetime | NO |
| Observaciones | nvarchar | YES |
| FkEmpleados | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
