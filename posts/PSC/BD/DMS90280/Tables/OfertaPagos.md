# Table: OfertaPagos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkOfertaPagos_Iden | smallint | NO |
| FkPagoTipos | smallint | NO |
| Fecha | datetime | NO |
| FechaVencimiento | datetime | YES |
| Importe | decimal | NO |
| FkTerceros_Financiera | int | YES |
| FkRecibos | int | YES |
| Descripcion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| ComisionFinanciera | decimal | YES |
| FkRecibos_Anulado | int | YES |
| FkAñoFactura | nvarchar | YES |
| FkSeries_Factura | nvarchar | YES |
| FkNumFactura | nvarchar | YES |
| FkEmpleados_Gestor | smallint | YES |
| FechaAnulacion | datetime | YES |
| FechaAbono | datetime | YES |
| FkAñoFactura_Abonado | nvarchar | YES |
| FkSeries_Factura_Abonado | nvarchar | YES |
| FkNumFactura_Abonado | nvarchar | YES |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkOfertasFinanciacionesEstados | smallint | YES |
| FinanciacionManual | bit | NO |
| FkPagoFormaTipos | nvarchar | YES |
