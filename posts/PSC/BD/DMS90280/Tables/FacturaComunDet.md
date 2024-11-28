# Table: FacturaComunDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFacturaComunDet_Iden | int | NO |
| Codigo | nvarchar | YES |
| Descripcion | nvarchar | YES |
| Unidades | decimal | NO |
| Precio | decimal | NO |
| PorcDto | decimal | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Codigo1 | nvarchar | YES |
| FkCodigosProducto | nvarchar | YES |
| FkModulos_CodigosProducto | nvarchar | YES |
