# Table: ComisionesGEFDetalles

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkComisionesGEF | smallint | NO |
| PkComisionesGEFDetalles_Iden | smallint | NO |
| FkComisionesTipos | nvarchar | NO |
| FkComisionesCriterios | smallint | NO |
| ObjetivoDesde | decimal | YES |
| ObjetivoHasta | decimal | YES |
| ComisionImporte | decimal | YES |
| ComisionPorc | decimal | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| OperacionesSaldadas | bit | NO |
| MaxDiasSaldado | smallint | YES |
| FkComisionImporteTipos | tinyint | NO |
