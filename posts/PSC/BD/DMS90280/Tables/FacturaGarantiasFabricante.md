# Table: FacturaGarantiasFabricante

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoFactura | nvarchar | NO |
| PkFkSeriesFactura | nvarchar | NO |
| PkNumFactura | nvarchar | NO |
| FkCentros | smallint | NO |
| FechaFactura | datetime | NO |
| FechaAsiento | datetime | YES |
| FkTerceros | int | NO |
| Nombre | nvarchar | NO |
| Apellido1 | nvarchar | YES |
| Apellido2 | nvarchar | YES |
| NifCif | nvarchar | YES |
| Direccion1 | nvarchar | YES |
| Direccion2 | nvarchar | YES |
| Direccion3 | nvarchar | YES |
| Direccion4 | nvarchar | YES |
| FkPagoFormas | nvarchar | NO |
| FkImpuestos | nvarchar | YES |
| FkImpuestoTipos | nvarchar | YES |
| ImporteImpuesto | decimal | YES |
| PorcImpuesto | decimal | YES |
| TotalFactura | decimal | YES |
| TotalMO | decimal | YES |
| TotalMat | decimal | YES |
| TotalExternos | decimal | YES |
| TotalBI | decimal | YES |
| PagoFormasDescripcion | nvarchar | YES |
| FkTextoSistema_LPD | int | YES |
| FkTextoSistema_IRM | int | YES |
| FkTextoSistema_CWS | int | YES |
| FkTextoSistema_DS | int | YES |
| FkTextoSistema_EI | int | YES |
| FkTerceroDirecciones | smallint | NO |
| Observaciones | nvarchar | YES |
| TotalVarios | decimal | YES |
| TotalPint | decimal | YES |
| Abono | bit | NO |
| FkAñoFactura_Abono | nvarchar | YES |
| FkSeriesFactura_Abono | nvarchar | YES |
| FkNumFactura_Abono | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FechaBaja | datetime | YES |
| Anulado | bit | NO |
| LPD | nvarchar | YES |
| DescripcionImpuesto | nvarchar | YES |
| IRM | nvarchar | YES |
| NumeroCuentaBancario | nvarchar | YES |
| NumDocumento | nvarchar | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FkAñoAsiento_Abono | nvarchar | YES |
| FkAsientos_Abono | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| TotalOtrosCargos | decimal | YES |
| DescripcionOtrosCargos | nvarchar | YES |
| TotalAceptado | decimal | YES |