# Table: IMSSucursales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkIMSConcesionarios | smallint | NO |
| PkFkIMSCuentas | smallint | NO |
| PkIMSSucursales_Iden | smallint | NO |
| Nombre | nvarchar | NO |
| CodSucursal | nvarchar | NO |
| FkModulos | nvarchar | NO |
| FkEmpleados | smallint | YES |
| FkTerceros | int | NO |
| FkTerceroDirecciones | smallint | NO |
| FkTerceroEmails | smallint | YES |
| FkTerceroTelefonos | smallint | YES |
| PrecioMO | decimal | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
