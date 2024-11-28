# Table: PresupuestosDetImpuestos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoPresupuesto | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumPresupuesto | int | NO |
| PkFkPresupuestosDet | int | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| FkImpuestos | nvarchar | NO |
| PorcImpuesto | decimal | YES |
| ImporteImpuesto | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| Dependiente | bit | NO |
| FkImpuestos_Origen | nvarchar | YES |
