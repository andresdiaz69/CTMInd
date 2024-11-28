# Table: ClasificacionesIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkClasificacionesIMP | bigint | NO |
| FkProcesos | int | NO |
| FkMR | nvarchar | YES |
| Clasificacion | nvarchar | YES |
| Clasificacion_Padre | nvarchar | YES |
| Descripcion | nvarchar | YES |
| TipoClasificacion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
