# Table: EmpresaEmails

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkEmpresaEmails_Iden | tinyint | NO |
| FkCentros | smallint | YES |
| FkAplicacionEventos | smallint | YES |
| Servidor | nvarchar | NO |
| Puerto | int | NO |
| SeguridadIntegrada | bit | NO |
| Usuario | nvarchar | YES |
| Contraseña | nvarchar | YES |
| SSL | bit | NO |
| Local | bit | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Cuenta | nvarchar | YES |
| FkOAuth2User | int | YES |
