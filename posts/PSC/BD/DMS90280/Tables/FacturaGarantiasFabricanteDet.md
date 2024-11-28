# Table: FacturaGarantiasFabricanteDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeriesFactura | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFacturaGarantiasFabricanteDet_Iden | int | NO |
| FkSeries_Garantias | nvarchar | YES |
| FkIMSGarantias | int | YES |
| FkAñoIMSGarantias | nvarchar | YES |
| FkIMSGarantiasNumDet | smallint | YES |
| SerieDictamen | nvarchar | YES |
| NumDictamen | nvarchar | YES |
| AñoDictamen | nvarchar | YES |
| ImporteMO | decimal | YES |
| ImporteMat | decimal | YES |
| ImporteExternos | decimal | YES |
| ImportePint | decimal | YES |
| ImporteVarios | decimal | YES |
| FactorCambioMoneda | decimal | YES |
| FkMonedas | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ImporteAceptado | decimal | NO |
| ImporteOtrosCargos | decimal | NO |
| DescripcionOtrosCargos | nvarchar | YES |
