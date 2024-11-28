# Table: ClasificacionGarantia

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkFkTipoClasificacionParametroGarantia | int | NO |
| PkClasificacionGarantia | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PkFkImportadoras | int | NO |
| TipoExclusividad | nvarchar | YES |
