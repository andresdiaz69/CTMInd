# Table: ComisionesGEFHistoricos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoComisionGEF | nvarchar | NO |
| PkFkComisionesGEF | smallint | NO |
| PkFkComisionesGEFDetalles | smallint | NO |
| PkFkEmpleados | smallint | NO |
| PkFkComisionesPeriodos | smallint | NO |
| Descripcion | nvarchar | NO |
| ComisionDescripcion | nvarchar | NO |
| CodExterno | nvarchar | YES |
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
| DescripcionMarcas | nvarchar | YES |
| DescripcionVNVentaInternaTipos | nvarchar | YES |
| DescripcionVOVentaInternaTipos | nvarchar | YES |
| DescripcionAgrupacionesTerceros | nvarchar | YES |
| ImportePropuesto | decimal | NO |
| ImporteAceptado | decimal | NO |
| Computado | decimal | YES |
| FechaEnvio | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| OperacionesSaldadas | bit | YES |
| MaxDiasSaldado | smallint | YES |
| FkComisionImporteTipos | tinyint | NO |
| Unidades | decimal | YES |
