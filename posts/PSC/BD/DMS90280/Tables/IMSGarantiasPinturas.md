# Table: IMSGarantiasPinturas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoIMSGarantias | nvarchar | NO |
| PKFKSeries | nvarchar | NO |
| PkFkIMSGarantias | int | NO |
| PkFkIMSGarantiasNumDet | smallint | NO |
| PkIMSGarantiasPinturas_Iden | smallint | NO |
| FkImportadoras | int | YES |
| FkMarcas | smallint | YES |
| FkClasificacionGarantia_1 | nvarchar | YES |
| FkTipoClasificacionParametroGarantia_1 | int | YES |
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
