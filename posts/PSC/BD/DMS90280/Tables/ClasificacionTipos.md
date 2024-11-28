# Table: ClasificacionTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkClasificacionTipos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| EsComercial | bit | NO |
| Precarga | bit | NO |
| FechaMod | datetime | NO |
| Fechabaja | datetime | YES |
| FkCodigosProducto | nvarchar | YES |
| FkModulos | nvarchar | YES |
