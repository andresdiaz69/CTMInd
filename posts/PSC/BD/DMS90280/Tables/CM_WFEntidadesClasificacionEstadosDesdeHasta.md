# Table: CM_WFEntidadesClasificacionEstadosDesdeHasta

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkWFClasificaciones | nvarchar | NO |
| PkFkWFEntidades | smallint | NO |
| PkFkWFEstados_Desde | smallint | NO |
| PkFkWFEstados_Hasta | smallint | NO |
| PkWFEntidadesClasificacionEstadosDesdeHasta_Iden | tinyint | NO |
| ImporteDesde | decimal | YES |
| ImporteHasta | decimal | YES |
| TodosDebenAutorizar | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
