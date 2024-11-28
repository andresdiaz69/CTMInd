# Table: EmpresaTercerosDocumentosRespuestas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkDocumentos | smallint | NO |
| FkDocumentosRespuestas | int | YES |
| FechaConsentimiento | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| CodigoOrigen | nvarchar | YES |
| CodConcesionario | nvarchar | YES |
| FechaExpiracion | datetime | YES |
