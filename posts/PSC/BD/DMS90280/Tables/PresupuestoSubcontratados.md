# Table: PresupuestoSubcontratados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoPresupuesto | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumPresupuesto | int | NO |
| PkPresupuestoSubcontratados_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| Precio | decimal | NO |
| PorcDescuento | decimal | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Unidades | decimal | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| IdentificacionAplicacionExterna | nvarchar | YES |
| PrecioCoste | decimal | YES |
