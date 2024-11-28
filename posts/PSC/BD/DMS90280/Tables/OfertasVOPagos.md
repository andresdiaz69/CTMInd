# Table: OfertasVOPagos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertasVO | smallint | NO |
| PkOfertasVOPagos_Iden | smallint | NO |
| FkPagoTipos | smallint | NO |
| Fecha | datetime | NO |
| FechaVencimiento | datetime | YES |
| Importe | decimal | NO |
| FkTerceros_Financiera | int | YES |
| FkRecibos | int | YES |
| Descripcion | nvarchar | YES |
| ComisionFinanciera | decimal | YES |
| FkRecibos_Anulado | int | YES |
| FkAñoFactura | nvarchar | YES |
| FkSeries_Factura | nvarchar | YES |
| FkNumFactura | nvarchar | YES |
| FkEmpleados_Gestor | smallint | YES |
| FechaAnulacion | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaAbono | datetime | YES |
| FkAñoFactura_Abonado | nvarchar | YES |
| FkSeries_Factura_Abonado | nvarchar | YES |
| FkNumFactura_Abonado | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FinanciacionManual | bit | NO |
| FkPagoFormaTipos | nvarchar | YES |
