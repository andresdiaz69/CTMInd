# Table: EspecificacionesTiposValores

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEspecificacionesTipos | smallint | NO |
| PkEspecificacionesTiposValores_Iden | smallint | NO |
| FkMarcas | smallint | YES |
| FkImportadoras | int | YES |
| Descripcion | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
