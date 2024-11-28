# Table: GastoTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkGastoTipos_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| FkContCtas | nvarchar | NO |
| FkImpuestos | nvarchar | NO |
| FkCentros | smallint | NO |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkMarcas | smallint | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
