# Table: IMSAutorizacionMateriales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoIMSAutorizaciones | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkIMSAutorizaciones | int | NO |
| PkIMSAutorizacionMateriales_Iden | smallint | NO |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| Unidades | decimal | NO |
| Descripcion | nvarchar | YES |
| Precio | decimal | NO |
| PorcDescuento | decimal | NO |
| ImporteCalculado | decimal | YES |
| ImporteReclamado | decimal | YES |
| PorcentajeReclamacion | decimal | YES |
| CausaAveria | bit | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
