# Table: Recibos_5024

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkRecibos_Iden | int | NO |
| FkTerceros | int | NO |
| Fecha | datetime | NO |
| Importe | decimal | NO |
| Concepto | nvarchar | NO |
| FkReciboEstados | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkRecibos_Anula | int | YES |
| Origen | nvarchar | YES |
| FkSeries_Factura | nvarchar | YES |
| FkAñoFactura | nvarchar | YES |
| FkModulos_Genera | nvarchar | YES |
| FkNumFactura | nvarchar | YES |
| FkEmpleados | smallint | YES |
| Abonado | bit | NO |
| FechaMod | datetime | NO |
| FactorCambioMonedaContravalor | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| NumLote | nvarchar | YES |
| FkTalones | int | YES |
| FkTalonesDetalles | tinyint | YES |
| Observaciones | nvarchar | YES |
| FkCentros | smallint | YES |
| FechaVto | datetime | YES |
| Voucher | nvarchar | YES |
