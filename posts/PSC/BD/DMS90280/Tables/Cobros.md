# Table: Cobros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCobros_Iden | int | NO |
| FkAplicaciones | nvarchar | YES |
| IdExterno | nvarchar | YES |
| FechaAlta | datetime | NO |
| FechaCobro | datetime | YES |
| Importe | decimal | YES |
| FkEmpresas | smallint | YES |
| FkTerceros | int | YES |
| FkLeads | int | YES |
| FkAñoFactura_Anticipo | nvarchar | YES |
| FkSeriesFactura_Anticipo | nvarchar | YES |
| FkNumFactura_Anticipo | nvarchar | YES |
| FkCentros | smallint | YES |
| FkVehiculos | int | YES |
| FkPrestamos | int | YES |
| FkAñoFactura_Alquiler | nvarchar | YES |
| FkSeriesFactura_Alquiler | nvarchar | YES |
| FkNumFactura_Alquiler | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| TipoExterno | nvarchar | YES |
| EstatusExterno | nvarchar | YES |
| Numero | nvarchar | YES |
| Producto | nvarchar | YES |
| Planes | nvarchar | YES |
| Suscripcion | nvarchar | YES |
| Observaciones | nvarchar | YES |
| FechaDocumento | datetime | YES |
| FechaProceso | datetime | YES |
| FechaDesde | datetime | YES |
| FechaHasta | datetime | YES |
| FacturaSaldada | bit | YES |
