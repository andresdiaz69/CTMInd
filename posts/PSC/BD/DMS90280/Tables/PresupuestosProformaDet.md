# Table: PresupuestosProformaDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoProforma | nvarchar | NO |
| PkFkSeries_Proforma | nvarchar | NO |
| PkFkNumPresupuestosProforma | int | NO |
| PkPresupuestosProformaDet | int | NO |
| FechaAltaPresupuesto | datetime | NO |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| Unidades | decimal | NO |
| Precio | decimal | NO |
| PorcDto | decimal | NO |
| GastosAdicionales | decimal | NO |
| FkTarifas | tinyint | NO |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| DescripcionReferencia | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| Sobretasa | decimal | YES |
