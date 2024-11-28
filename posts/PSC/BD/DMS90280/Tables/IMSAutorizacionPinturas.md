# Table: IMSAutorizacionPinturas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoIMSAutorizaciones | nvarchar | NO |
| PKFKSeries | nvarchar | NO |
| PkFkIMSAutorizaciones | int | NO |
| PkIMSAutorizaciones_Iden | smallint | NO |
| FkImportadoras | int | YES |
| FkMarcas | smallint | YES |
| FkClasificacionGarantia_1 | nvarchar | YES |
| FkTipoClasificacionParametroGarantia_1 | int | YES |
| Unidades | decimal | NO |
| Descripcion | nvarchar | YES |
| Precio | decimal | NO |
| PorcDescuento | decimal | NO |
| ImporteReclamado | decimal | YES |
| ImporteCalculado | decimal | YES |
| CausaAveria | bit | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| PorcentajeReclamacion | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
