# Table: VentasOpcionalesRelaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkVentas | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkFkGamas | smallint | NO |
| PkFkCodModelo | nvarchar | NO |
| PkFkExtModelo | nvarchar | NO |
| PkFkAñoModelo | nvarchar | NO |
| PkFkVersiones | nvarchar | NO |
| PkFkTarifas | smallint | NO |
| PkFkOpcionales_Origen | nvarchar | NO |
| PkFkOpcionalTipos_Origen | nvarchar | NO |
| PkFkOpcionales_Destino | nvarchar | NO |
| PkFkOpcionalTipos_Destino | nvarchar | NO |
| FkOpcionalRelacionTipos | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Referencia | nvarchar | YES |
| CodigoMarca | nvarchar | YES |
| PrecioVenta | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| PrecioUnitario | decimal | YES |
| Unidades | smallint | YES |
