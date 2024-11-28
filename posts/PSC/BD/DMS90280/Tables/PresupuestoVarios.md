# Table: PresupuestoVarios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoPresupuesto | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumPresupuesto | int | NO |
| PkPresupuestoVarios_Iden | smallint | NO |
| FkVariosCodigos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| Precio | decimal | NO |
| PorcDescuento | decimal | NO |
| Unidades | decimal | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Automatico | bit | NO |
| FkVariosCodigosInternos | nvarchar | YES |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| IdentificacionAplicacionExterna | nvarchar | YES |
| FkMarcas_Kit | smallint | YES |
| TallerKits | nvarchar | YES |
