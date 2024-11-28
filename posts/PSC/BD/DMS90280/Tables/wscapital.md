# Table: wscapital

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkWebServices_Iden | smallint | NO |
| FkWebServicesTipos | nvarchar | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| URL | nvarchar | NO |
| Usuario | nvarchar | YES |
| Clave | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| URI | nvarchar | YES |
| Dominio | nvarchar | YES |
| Cliente | bit | NO |
| UsuarioInterno | nvarchar | YES |
| ClaveInterna | nvarchar | YES |
| LiteralUsuarioInterno | nvarchar | YES |
| LiteralClaveInterna | nvarchar | YES |
| SSL | bit | NO |
| FechaMod | datetime | NO |
| ModoPasivo | bit | YES |
| SFTP | bit | YES |
| N_Reintentos | tinyint | YES |
| IntervaloSegundos | smallint | YES |
| DetalleConfiguracion | nvarchar | YES |
| TimeOut | int | YES |
| FkSecciones | int | YES |
| RutaCertificado | nvarchar | YES |
| ClaveCertificado | nvarchar | YES |
| FechaBaja | datetime | YES |
| FkModosEscritura | tinyint | NO |
