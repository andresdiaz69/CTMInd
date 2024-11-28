# Table: IMSGarantiasManoObras

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoIMSGarantias | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkIMSGarantias | int | NO |
| PkFkIMSGarantiasNumDet | smallint | NO |
| PkIMSGarantiasManoObras_Iden | smallint | NO |
| FkMarcas | smallint | YES |
| FkMarcaTallerModelos | nvarchar | YES |
| FkManoObraCodigos | nvarchar | YES |
| FkVariante | nvarchar | YES |
| Descripcion | nvarchar | YES |
| UT | int | YES |
| PorcDescuento | decimal | YES |
| PrecioHora | decimal | YES |
| CausaAveria | bit | NO |
| ImporteReclamado | decimal | YES |
| ImporteAceptadoConcesionario | decimal | YES |
| ImporteAceptadoFabricante | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ImporteCalculado | decimal | YES |
| ImporteReclamadoFabricante | decimal | YES |
| PorcentajeReclamacion | decimal | YES |
