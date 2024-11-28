# Table: ComisionesREVHistoricos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkComisionesREV | smallint | NO |
| PkFkComisionesREVDetalles | smallint | NO |
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
| DescripcionSecciones | nvarchar | YES |
| DescripcionMovimientoTipos | nvarchar | YES |
| DescripcionClasificacion1 | nvarchar | YES |
| DescripcionCargoTipos | nvarchar | YES |
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
