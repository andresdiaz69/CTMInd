# Table: IMSGarantiasMateriales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoIMSGarantias | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkIMSGarantias | int | NO |
| PkFkIMSGarantiasNumDet | smallint | NO |
| PkIMSGarantiasMateriales_Iden | smallint | NO |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| Unidades | decimal | NO |
| Descripcion | nvarchar | YES |
| Precio | decimal | NO |
| PorcDescuento | decimal | NO |
| ImporteReclamado | decimal | YES |
| ImporteAceptadoConcesionario | decimal | YES |
| ImporteAceptadoFabricante | decimal | YES |
| CausaAveria | bit | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ImporteCalculado | decimal | YES |
| ImporteReclamadoFabricante | decimal | YES |
| PorcentajeReclamacion | decimal | YES |
