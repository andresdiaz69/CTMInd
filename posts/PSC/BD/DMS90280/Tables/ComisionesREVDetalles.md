# Table: ComisionesREVDetalles

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkComisionesREV | smallint | NO |
| PkComisionesREVDetalles_Iden | smallint | NO |
| FkComisionesCriterios | smallint | NO |
| ObjetivoDesde | decimal | YES |
| ObjetivoHasta | decimal | YES |
| ComisionImporte | decimal | YES |
| ComisionPorc | decimal | YES |
| FechaBaja | datetime | YES |
| OperacionesSaldadas | bit | NO |
| MaxDiasSaldado | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkComisionImporteTipos | tinyint | NO |