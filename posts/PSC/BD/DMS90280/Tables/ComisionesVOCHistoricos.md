# Table: ComisionesVOCHistoricos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoComisionVOC | nvarchar | NO |
| PkFkComisionesVOC | smallint | NO |
| PkFkComisionesVOCDetalles | smallint | NO |
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
| DescripcionAgrupacionesTercerosExclusiones | nvarchar | YES |
| DescripcionCompraInternaTipos | nvarchar | YES |
| DescripcionMarcas | nvarchar | YES |
| DescripcionClasificacionTipos | nvarchar | YES |
| ImportePropuesto | decimal | NO |
| ImporteAceptado | decimal | NO |
| Computado | decimal | YES |
| FechaEnvio | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkComisionImporteTipos | tinyint | NO |
| Unidades | decimal | YES |
