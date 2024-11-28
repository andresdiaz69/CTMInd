# Table: FacturaComunRecibidaDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFacturaComunRecibidaDet_Iden | int | NO |
| Codigo | nvarchar | YES |
| Codigo1 | nvarchar | YES |
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
