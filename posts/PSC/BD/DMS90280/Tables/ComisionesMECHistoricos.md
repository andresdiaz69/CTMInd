# Table: ComisionesMECHistoricos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkComisionesMEC | smallint | NO |
| PkFkComisionesMECDetalles | smallint | NO |
| PkFkEmpleados | smallint | NO |
| PkFkComisionesPeriodos | smallint | NO |
| PkAñoComision | nvarchar | NO |
| Descripcion | nvarchar | NO |
| ComisionDescripcion | nvarchar | NO |
| CodExterno | nvarchar | YES |
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
| HorasAsignadas | bit | YES |
| DescripcionCargoTipos | nvarchar | YES |
| DescripcionMarcas | nvarchar | YES |
| DescripcionImputacionTipos | nvarchar | YES |
| ImportePropuesto | decimal | YES |
| ImporteAceptado | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Computado | decimal | YES |
| FechaEnvio | datetime | YES |
| DescripcionPicajeTrabajoTipos | nvarchar | YES |
| DescripcionIncidenciaTipos | nvarchar | YES |
| DescripcionVariosCodigos | nvarchar | YES |
| FkComisionImporteTipos | tinyint | NO |
| Unidades | decimal | YES |
