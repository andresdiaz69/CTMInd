# Table: IMSAutorizacionManoObras

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoIMSAutorizaciones | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkIMSAutorizaciones | int | NO |
| PkIMSAutorizacionManoObrasNumDet_Iden | smallint | NO |
| FkMarcas | smallint | YES |
| FkMarcaTallerModelos | nvarchar | YES |
| FkManoObraCodigos | nvarchar | YES |
| FkVariante | nvarchar | YES |
| Descripcion | nvarchar | YES |
| UT | int | YES |
| PorcDescuento | decimal | YES |
| PrecioHora | decimal | YES |
| CausaAveria | bit | NO |
| PorcentajeReclamacion | decimal | YES |
| ImporteReclamado | decimal | YES |
| ImporteCalculado | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
