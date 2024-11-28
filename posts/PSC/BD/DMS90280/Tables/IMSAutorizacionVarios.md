# Table: IMSAutorizacionVarios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoIMSAutorizaciones | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkIMSAutorizaciones | int | NO |
| PkIMSAutorizacionesVarios_Iden | smallint | NO |
| FkCentros | smallint | YES |
| FkVariosCodigos | nvarchar | YES |
| Unidades | decimal | NO |
| Descripcion | nvarchar | YES |
| Precio | decimal | NO |
| PorcDescuento | decimal | NO |
| ImporteReclamado | decimal | YES |
| ImporteCalculado | decimal | YES |
| PorcentajeReclamacion | decimal | YES |
| CausaAveria | bit | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
