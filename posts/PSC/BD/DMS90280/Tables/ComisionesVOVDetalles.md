# Table: ComisionesVOVDetalles

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkComisionesVOV | smallint | NO |
| PkComisionesVOVDetalles_Iden | smallint | NO |
| FkComisionesTipos | nvarchar | NO |
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
| FechaOrigenSaldado | tinyint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkComisionImporteTipos | tinyint | NO |
