# Table: EspecificacionesTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkEspecificacionesTipos_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| UnidadMedida | nvarchar | YES |
| Precarga | bit | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEspecificacionesTiposInternos | smallint | YES |
