# Table: IMSAlmacenes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkIMSConcesionarios | smallint | NO |
| PkIMSAlmacenes_Iden | tinyint | NO |
| Descripcion | nvarchar | NO |
| CodAlmacen | nvarchar | NO |
| FkTerceros | int | YES |
| FkTerceroDirecciones | smallint | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
