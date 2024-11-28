# Table: Recibos_Posteriores

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | YES |
| PkRecibos_Iden | int | NO |
| FkTerceros | int | YES |
| Fecha | datetime | NO |
| Importe | numeric | NO |
| Concepto | nvarchar | NO |
| FkReciboEstados | nvarchar | NO |
| UserMod | int | NO |
| HostMod | varchar | NO |
| VersionFila | int | NO |
| FkRecibos_Anula | int | YES |
| Origen | nvarchar | YES |
| FkSeries_Factura | nvarchar | YES |
| FkAñoFactura | nvarchar | YES |
| FkModulos_Genera | nvarchar | YES |
| FkNumFactura | nvarchar | YES |
| FkEmpleados | smallint | YES |
| Abonado | bit | NO |
| FechaMod | datetime | NO |
| FactorCambioMonedaContravalor | numeric | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | numeric | YES |
| NumLote | nvarchar | YES |
| FkTalones | int | YES |
| FkTalonesDetalles | tinyint | YES |
| Observaciones | nvarchar | YES |
| FkCentros | smallint | YES |
| FechaVto | datetime | YES |
| Voucher | nvarchar | YES |
| FkContCtas_AnticipoImportado | nvarchar | YES |
