# Table: NotaLiquidacionDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkSeries_NotaLiquidacion | nvarchar | NO |
| PkFkAñoNotaLiquidacion | nvarchar | NO |
| PkFkNumNotaLiquidacion | int | NO |
| PkNotaLiquidacionDet_Iden | smallint | NO |
| FkFacturaTipos | nvarchar | NO |
| TipoFactura | nvarchar | NO |
| FechaFactura | datetime | NO |
| FkSeries_Factura | nvarchar | NO |
| FkNumFactura | nvarchar | NO |
| FkAñoFactura | nvarchar | NO |
| ImporteBI | decimal | YES |
| ImporteBE | decimal | YES |
| ImporteIVA | decimal | YES |
| ImporteTotal | decimal | YES |
| ImportePagadoAnterior | decimal | YES |
| ImportePago | decimal | YES |
| ImporteRegularizado | decimal | YES |
| ImportePendiente | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCentros | smallint | YES |
| NombreCentro | nvarchar | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| ImporteBNS | decimal | YES |
| FkPagoFormas | nvarchar | YES |
| PorcentajesIVAFactura | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FactorCambioMonedaFactura | decimal | YES |
| FactorCambioMonedaContravalorFactura | decimal | YES |
