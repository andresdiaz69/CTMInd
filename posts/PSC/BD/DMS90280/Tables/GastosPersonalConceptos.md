# Table: GastosPersonalConceptos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkGastosPersonalConceptos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| RequiereFactura | bit | NO |
| FkCentros | smallint | YES |
| FkPlantillas | nvarchar | YES |
| FkContCtas | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
