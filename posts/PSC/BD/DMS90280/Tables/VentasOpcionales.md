# Table: VentasOpcionales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
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
| PkFkOpcionales | nvarchar | NO |
| PkFkOpcionalTipos | nvarchar | NO |
| PrecioVenta | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkImpuestos | nvarchar | YES |
| FkImpuestoTipos | nvarchar | YES |
| PorcImpuesto | decimal | YES |
| ImporteImpuesto | decimal | YES |
| DeConcesion | bit | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
