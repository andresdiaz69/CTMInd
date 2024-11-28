# Table: PresupuestoReferenciasImpuestos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoPresupuesto | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumPresupuesto | int | NO |
| PkFkPresupuestoReferencias | smallint | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| FkImpuestos | nvarchar | NO |
| ImpuestoPorc | decimal | YES |
| ImpuestoImporte | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
