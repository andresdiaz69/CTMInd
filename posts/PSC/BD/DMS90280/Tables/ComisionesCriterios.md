# Table: ComisionesCriterios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkComisionesTipos | nvarchar | NO |
| PkComisionesCriterios | smallint | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Porcentaje | bit | NO |
| FkComisionesTiposDetalles | smallint | YES |
