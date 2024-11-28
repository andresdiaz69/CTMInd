# Table: FacturaGarantiasDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeries_Factura | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFacturaGarantiasDet_Iden | int | NO |
| FkAñoOT | nvarchar | YES |
| FkSeries_OT | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| FkSeries_Garantias | nvarchar | YES |
| FkNumGarantias | int | YES |
| FkAñoGarantias | nvarchar | YES |
| SerieDictamen | nvarchar | YES |
| NumDictamen | nvarchar | YES |
| AñoDictamen | nvarchar | YES |
| ImporteMO | decimal | YES |
| ImporteMat | decimal | YES |
| ImporteSub | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| NumGarantiaMarca | nvarchar | YES |
| FechaMod | datetime | NO |
| FkGarantiasAgentesPiezas | int | YES |
| ImporteVarios | decimal | YES |
| ImportePint | decimal | YES |
| FactorCambioMoneda | decimal | YES |
| FkGarantiaTipos | nvarchar | YES |
| FechaAceptacionMarca | datetime | YES |
