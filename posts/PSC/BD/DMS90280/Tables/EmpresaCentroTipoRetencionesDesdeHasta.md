# Table: EmpresaCentroTipoRetencionesDesdeHasta

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTipoRetenciones | smallint | NO |
| PkFkRetenciones | smallint | NO |
| PkRetencionesFechaDesde | datetime | NO |
| FechaHasta | datetime | YES |
| Porc | decimal | YES |
| ImporteMax | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Modificable | bit | NO |
| FkContCtas_Emitidas | nvarchar | YES |
| FkContCtas_Recibidas | nvarchar | YES |
| FechaBaja | datetime | YES |
| ImporteMaxVentas | decimal | YES |
| PorcVentas | decimal | YES |
| FkContCtas_Emitidas_AutoLiquidacion | nvarchar | YES |
| FkContCtas_Recibidas_AutoLiquidacion | nvarchar | YES |
