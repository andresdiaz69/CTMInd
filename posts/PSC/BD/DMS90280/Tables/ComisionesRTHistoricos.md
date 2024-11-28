# Table: ComisionesRTHistoricos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkComisionesRT | smallint | NO |
| PkFkComisionesRTDetalles | smallint | NO |
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
| DescripcionCargoTipos | nvarchar | YES |
| DescripcionMarcas | nvarchar | YES |
| DescripcionImputacionTipos | nvarchar | YES |
| ImportePropuesto | decimal | NO |
| ImporteAceptado | decimal | NO |
| Computado | decimal | YES |
| FechaEnvio | datetime | YES |
| DescripcionVariosCodigos | nvarchar | YES |
| DescripcionArticulosTipos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| DescripcionSecciones | nvarchar | YES |
| FkComisionImporteTipos | tinyint | NO |
| Unidades | decimal | YES |
