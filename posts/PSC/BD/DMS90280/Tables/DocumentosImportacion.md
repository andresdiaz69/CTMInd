# Table: DocumentosImportacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkDocumentosImportacion_Iden | int | NO |
| NumeroDocumento | nvarchar | NO |
| FechaDocumento | datetime | YES |
| Documento | nvarchar | YES |
| FechaAlta | datetime | NO |
| FechaProcesado | datetime | YES |
| ErrorProcesado | nvarchar | YES |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
