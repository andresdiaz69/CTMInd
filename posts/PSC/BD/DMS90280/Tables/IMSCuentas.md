# Table: IMSCuentas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkIMSConcesionarios | smallint | NO |
| PkIMSCuentas_Iden | smallint | NO |
| Nombre | nvarchar | NO |
| CodCuenta | nvarchar | NO |
| FkPagoFormas | nvarchar | NO |
| FkTerceros | int | NO |
| FkTerceroDirecciones | smallint | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
