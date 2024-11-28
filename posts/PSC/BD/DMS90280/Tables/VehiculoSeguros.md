# Table: VehiculoSeguros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkVehiculoSeguros_Iden | smallint | NO |
| FkSeguroTipos | nvarchar | NO |
| FechaAlta | datetime | NO |
| FkTerceros | int | NO |
| FechaVencimiento | datetime | YES |
| Importe | decimal | YES |
| ImporteFranquicia | decimal | YES |
| FechaBaja | datetime | YES |
| FkEmpresas_VO | smallint | YES |
| FkCentros_VO | smallint | YES |
| FkAñoExpediente_VO | nvarchar | YES |
| FkSeries_Expediente_VO | nvarchar | YES |
| FkNumExpediente_VO | int | YES |
| FkVentas_Iden_VO | smallint | YES |
| FkEmpresas_VN | smallint | YES |
| FkCentros_VN | smallint | YES |
| FkAñoExpediente_VN | nvarchar | YES |
| FkSeries_Expediente_VN | nvarchar | YES |
| FkNumExpediente_VN | int | YES |
| FkVentas_Iden_VN | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkVehiculoSeguros_Iden_Abonado | smallint | YES |
| NumeroPoliza | nvarchar | YES |
| FkPaises | nvarchar | YES |
| FkCodigosPostales | nvarchar | YES |
| FkEmpleados | smallint | YES |
| FechaMod | datetime | NO |
| Tomador | nvarchar | YES |
| Observaciones | nvarchar | YES |
| ImporteComisionVenta | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
