# Table: ComisionesVNVHistoricos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkComisionesVNV | smallint | NO |
| PkFkComisionesVNVDetalles | smallint | NO |
| PkFkEmpleados | smallint | NO |
| PkFkComisionesPeriodos | smallint | NO |
| PkAñoComision | nvarchar | NO |
| Descripcion | nvarchar | NO |
| ComisionDescripcion | nvarchar | NO |
| CodExterno | nvarchar | YES |
| ComisionesTiposDetalles | smallint | YES |
| FkComisionesCriterios | smallint | NO |
| ObjetivoDesde | decimal | YES |
| ObjetivoHasta | decimal | YES |
| ComisionImporte | decimal | YES |
| ComisionPorc | decimal | YES |
| DiaDesde | tinyint | NO |
| MesDesde | tinyint | NO |
| DiaHasta | tinyint | NO |
| MesHasta | tinyint | NO |
| FechaDesde | datetime | NO |
| FechaHasta | datetime | NO |
| OperacionesSaldadas | bit | YES |
| MaxDiasSaldado | smallint | YES |
| FkComisionesAgrupacionesConceptosVentas | nvarchar | YES |
| MargenVentaMinimo | decimal | YES |
| DescripcionAgrupacionesTercerosExclusiones | nvarchar | YES |
| DescripcionVentaInternaTipos | nvarchar | YES |
| DescripcionGruposModelos | nvarchar | YES |
| ImportePropuesto | decimal | NO |
| ImporteAceptado | decimal | NO |
| Computado | decimal | YES |
| FechaEnvio | datetime | YES |
| DescripcionFacturaCargoAdicionalTipos | nvarchar | YES |
| DescripcionAgrupacionesTerceros | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaOrigenSaldado | tinyint | YES |
| FkComisionImporteTipos | tinyint | NO |
| Unidades | decimal | YES |
