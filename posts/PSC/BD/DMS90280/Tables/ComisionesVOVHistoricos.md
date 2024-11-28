# Table: ComisionesVOVHistoricos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoComisionVOV | nvarchar | NO |
| PkFkComisionesVOV | smallint | NO |
| PkFkComisionesVOVDetalles | smallint | NO |
| PkFkEmpleados | smallint | NO |
| PkFkComisionesPeriodos | smallint | NO |
| Descripcion | nvarchar | NO |
| ComisionDescripcion | nvarchar | NO |
| CodExterno | nvarchar | YES |
| ComisionesTiposDetalles | smallint | YES |
| FkComisionesTipos | nvarchar | NO |
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
| FechaOrigenSaldado | tinyint | YES |
| FkComisionesAgrupacionesConceptosVentas | nvarchar | YES |
| MargenVentaMinimo | decimal | YES |
| DescripcionAgrupacionesTercerosExclusiones | nvarchar | YES |
| DescripcionVentaInternaTipos | nvarchar | YES |
| DescripcionMarcas | nvarchar | YES |
| DescripcionClasificacionTipos | nvarchar | YES |
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
| FkComisionImporteTipos | tinyint | NO |
| Unidades | decimal | YES |
