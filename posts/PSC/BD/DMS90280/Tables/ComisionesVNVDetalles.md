# Table: ComisionesVNVDetalles

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkComisionesVNV | smallint | NO |
| PkComisionesVNVDetalles_Iden | smallint | NO |
| FkComisionesCriterios | smallint | NO |
| ObjetivoDesde | decimal | YES |
| ObjetivoHasta | decimal | YES |
| ComisionImporte | decimal | YES |
| ComisionPorc | decimal | YES |
| FechaBaja | datetime | YES |
| OperacionesSaldadas | bit | NO |
| MaxDiasSaldado | smallint | YES |
| FkComisionesAgrupacionesConceptosVentas | nvarchar | YES |
| MargenVentaMinimo | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaOrigenSaldado | tinyint | YES |
| FkComisionImporteTipos | tinyint | NO |
