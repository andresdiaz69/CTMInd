# Table: Efectos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| PkEfectosNumDet_Iden | smallint | NO |
| FkCtaBancarias | smallint | YES |
| FkSituacionEfectos | tinyint | NO |
| FkPagoFormas | nvarchar | NO |
| FechaVto | datetime | NO |
| ImporteEfecto | decimal | NO |
| FkAsientos_Saldar | int | YES |
| FkAñoAsiento_Saldar | nvarchar | YES |
| FkSeries_Saldar | nvarchar | YES |
| NumeroSaldar | nvarchar | YES |
| FKAsientos_Emision | int | YES |
| FkAñoAsiento_Emision | nvarchar | YES |
| FkSeries_Emision | nvarchar | YES |
| NumeroEmision | nvarchar | YES |
| FkContCtas_Emision | nvarchar | YES |
| FkCtaBancarias_Emision | smallint | YES |
| FkAsientos_Provision | int | YES |
| FkAñoAsiento_Provision | nvarchar | YES |
| FkAsientos_Remesa | int | YES |
| FkAñoAsiento_Remesa | nvarchar | YES |
| FkSeries_Remesa | nvarchar | YES |
| NumeroRemesa | nvarchar | YES |
| FkContCtas_Remesa | nvarchar | YES |
| FkCtaBancarias_Remesa | smallint | YES |
| NombreFicheroRemesa | nvarchar | YES |
| NombreFicheroEmision | nvarchar | YES |
| FechaFicheroRemesa | datetime | YES |
| FechaFicheroEmision | datetime | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkTerceros_Emision | int | YES |
| FkTerceros_Remesa | int | YES |
| FkSeries_Pagare | nvarchar | YES |
| NumPagare | nvarchar | YES |
| AñoPagare | nvarchar | YES |
| FkTerceros_Pagador | int | NO |
| FkCtaBancarias_Remesa_EnvioBanco | smallint | YES |
| FkEfectosNumDet_Padre | smallint | YES |
| TipoContabilizacion | nvarchar | YES |
| FechaMod | datetime | NO |
| FkSeries_NotaLiquidacion | nvarchar | YES |
| FkNumNotaLiquidacion | int | YES |
| FkAño_NotaLiquidacion | nvarchar | YES |
| NumTalon | nvarchar | YES |
| FkAsientoGestionEliminacion | nvarchar | YES |
| ImporteGasto | decimal | YES |
| FkContCtas_Incidencias | nvarchar | YES |
| FkTerceros_CtaIncidencia | int | YES |
| FkCtaBancarias_CtaIncidencia | smallint | YES |
| Retencion | bit | NO |
| FkUsuarios_Guardado | smallint | YES |
| FkContCtas_Saldado | nvarchar | YES |
| FkCtaBancarias_Saldado | smallint | YES |
| VIN | nvarchar | YES |
| Voucher | nvarchar | YES |
| NumLote | nvarchar | YES |
| NumComprobante | nvarchar | YES |
| FechaComprobante | datetime | YES |
| FkContCtas_TerceroPagador | nvarchar | YES |
| FkTalones | int | YES |
| FkTalonesDetalles | tinyint | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| FechaCobroPago | datetime | YES |
| Conciliado | bit | YES |
| FkCtaBancarias_Pagador | smallint | YES |
| FechaDepuracion | datetime | YES |
| FkAsientosDet_Ajuste | int | YES |
| FkAsientos_Ajuste | int | YES |
| FkAñoAsiento_Ajuste | nvarchar | YES |
| FechaAutorizacionComprobante | datetime | YES |
| FkEfectosNumDet_Comision | smallint | YES |
| ImporteRetencionMO | decimal | YES |
| FkCentros_Saldado | smallint | YES |
| FkImpuestosRetencionMO | nvarchar | YES |
| PorcInteresMora | decimal | YES |
| FkRecibos_DifGestionTP | int | YES |
| FkAñoAsiento_Traspaso | nvarchar | YES |
| FkAsientos_Traspaso | int | YES |