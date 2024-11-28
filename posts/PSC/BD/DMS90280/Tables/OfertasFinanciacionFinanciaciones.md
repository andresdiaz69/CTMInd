# Table: OfertasFinanciacionFinanciaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PKFKAñoOfertasFinanciacion | nvarchar | NO |
| PkFKSeries_OfertasFinanciacion | nvarchar | NO |
| PkFKNumOfertasFinanciacion | int | NO |
| PKOfertasFinanciacionFinanciaciones_Iden | smallint | NO |
| ImporteTotal | decimal | YES |
| ImporteEntrada | decimal | YES |
| ImporteFinanciar | decimal | YES |
| PorcSobreImporteTotal | decimal | YES |
| CapitalPreconcedido | decimal | YES |
| FKTerceros_Financiera | int | YES |
| PorcIntereses | decimal | YES |
| Meses | tinyint | YES |
| PorcComisionApertura | decimal | YES |
| ImporteComisionApertura | decimal | YES |
| PorcComisionCancelacion | decimal | YES |
| ImporteComisionCancelacion | decimal | YES |
| PorcRiesgoOperacion | decimal | YES |
| ImporteRiesgoOperacion | decimal | YES |
| CuotaMensual | decimal | YES |
| ObligaAval | bit | NO |
| Aval | nvarchar | YES |
| FechaInicio | datetime | YES |
| FechaFin | datetime | YES |
| Observaciones | nvarchar | YES |
| PorcComisionObtencionFinanciacion | decimal | YES |
| ImporteComisionObtencionFinanciacion | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ObservacionesCondiciones | nvarchar | YES |
| ObservacionesDenegacion | nvarchar | YES |
| FkOfertasFinanciacionEstados | tinyint | YES |
