# Table: IMSVendedores

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkIMSConcesionarios | smallint | NO |
| PkIMSVendedores_Iden | smallint | NO |
| Nombre | nvarchar | NO |
| Apellido1 | nvarchar | NO |
| Apellido2 | nvarchar | YES |
| CodVendedor | nvarchar | NO |
| Email | nvarchar | YES |
| FkFunciones | nvarchar | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
