# Table: comprasalvar

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkNumExpediente | int | NO |
| PkComprasNumDet_Iden | smallint | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FkVehiculos | int | NO |
| FkTerceros | int | NO |
| FkCompraTipos | nvarchar | NO |
| NumExpedientesCompraMultiple | smallint | NO |
| FkMarcas | smallint | NO |
| FkGamas | smallint | NO |
| FkCodModelo | nvarchar | NO |
| FkExtModelo | nvarchar | NO |
| FkAñoModelo | nvarchar | NO |
| FkVersiones | nvarchar | NO |
| FkTarifas | smallint | NO |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FechaAlta | datetime | NO |
| FkUsuarios_Anulacion | smallint | YES |
| FkEmpleados_Anulacion | smallint | YES |
| HostAnulacion | nvarchar | YES |
| FechaAnulacion | datetime | YES |
| FechaCampaAlta | datetime | YES |
| FechaRecepcion | datetime | YES |
| FechaFactura | datetime | YES |
| FechaAsiento | datetime | YES |
| FechaReserva | datetime | YES |
| ImportacionRealizada | bit | NO |
| ImportacionModificada | bit | NO |
| FechaImportacionRealizada | datetime | YES |
| FechaImportacionModificada | datetime | YES |
| PrecioBase | decimal | NO |
| PrecioPintura | decimal | YES |
| PrecioTransporte | decimal | YES |
| PrecioOpciones | decimal | YES |
| PrecioOtrosCargos | decimal | YES |
| BaseImponible | decimal | YES |
| BaseExenta | decimal | YES |
| SumaDescuentos | decimal | YES |
| FkEmpleados_Reserva | smallint | YES |
| FkTerceros_Agente | int | YES |
| FKTerceros_CedidoConcesionario | int | YES |
| NumFacturaMensual | smallint | YES |
| FkSecciones | int | NO |
| NumExpedicion | nvarchar | YES |
| Programa | nvarchar | YES |
| RealizarGastoAdicionalAutomatico | bit | NO |
| NoContabilizarDocumentacion | bit | NO |
| Observaciones | nvarchar | YES |
| FechaAbono | datetime | YES |
| FkComprasNumDet_Abonado | smallint | YES |
| FkCompraEstados | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| ImporteCompra | decimal | NO |
| FkAsientos_PolizaNoActivo | int | YES |
| FkAñoAsiento_PolizaNoActivo | nvarchar | YES |
| PrecioAnticipoGastos | decimal | YES |
| FechaMod | datetime | NO |
| PrecioLegalizacion | decimal | YES |
| PrecioISV | decimal | YES |
| PrecioEcoValor | decimal | YES |
| PermitirFacturarEnOtroCentro | bit | NO |
| FechaDespacho | datetime | YES |
| FkPaises_Origen | nvarchar | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| FkMonedas_Factura | smallint | YES |
| FechaEnvioMarca | datetime | YES |
| EstadoEnvioMarca | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkCompraUsos | nvarchar | YES |
| Homologacion | bit | YES |
| FechaRegistroRUNT | datetime | YES |
| CAMVCpn | nvarchar | YES |
| PrecioIUC | decimal | YES |
| FkCentros_AsignadoVenta | smallint | YES |
| FkSecciones_AsignadaVenta | int | YES |
| FkTerceros_Reserva | int | YES |
| FechaDeclaracion | datetime | YES |
| NumDeclaracion | nvarchar | YES |
| FechaLevante | datetime | YES |
| NumLevante | nvarchar | YES |
| FkTerceros_Intermediario | int | YES |
| FkTerceros_Aduana | int | YES |
| FkTerceros_CancelacionDerechos | int | YES |
| Manifiesto | nvarchar | YES |
| Aduana | nvarchar | YES |
| FkIncidenciaTipos | nvarchar | YES |
| FechaEnvioSICOP | datetime | YES |
| CodigoDUA | nvarchar | YES |
| NumProformaFabrica | nvarchar | YES |
| CodigoCRF | nvarchar | YES |
| CodigoBL | nvarchar | YES |
| NumDocumentoTransporte | nvarchar | YES |
| FechaDocumentoTransporte | datetime | YES |
| ImporteFOBDeclarado | decimal | YES |
| ImporteFletesDeclarado | decimal | YES |
| ImporteSegurosDeclarado | decimal | YES |
| ImporteOtrosGastosDeclarado | decimal | YES |
| FkMonedas_Intermedia | smallint | YES |
| FactorCambioMonedaAIntermedia | decimal | YES |
| FactorCambioMonedaDesdeIntermedia | decimal | YES |
| FkDeclaracionImportacionTipos | tinyint | YES |
| CodigoAduana | nvarchar | YES |
| NumDeclaracionCambio | nvarchar | YES |
| ImporteDeclaracionCambio | decimal | YES |
| CodigoAutoadhesivo | nvarchar | YES |
| ImporteIVADeclarado | decimal | YES |
| ImporteArancelesDeclarado | decimal | YES |
| ImporteAduana | decimal | YES |
| NumDeclaracionCambio2 | nvarchar | YES |
| ImporteDeclaracionCambio2 | decimal | YES |
| FkAsientos_Albaran | int | YES |
| FkAñoAsiento_Albaran | nvarchar | YES |
| FechaAlbaran | datetime | YES |
| FechaAsiento_Albaran | datetime | YES |
| SerieAlbaran | nvarchar | YES |
| NumAlbaran | nvarchar | YES |
| AñoAlbaran | nvarchar | YES |
| FkAsientos_AjusteFacturaAlbaran | int | YES |
| FkAñoAsiento_AjusteFacturaAlbaran | nvarchar | YES |
| PrecioBase_Albaran | decimal | YES |
| PrecioPintura_Albaran | decimal | YES |
| PrecioTransporte_Albaran | decimal | YES |
| PrecioOpciones_Albaran | decimal | YES |
| PrecioOtrosCargos_Albaran | decimal | YES |
| BaseImponible_Albaran | decimal | YES |
| BaseExenta_Albaran | decimal | YES |
| SumaDescuentos_Albaran | decimal | YES |
| ImporteCompra_Albaran | decimal | YES |
| PrecioAnticipoGastos_Albaran | decimal | YES |
| PrecioLegalizacion_Albaran | decimal | YES |
| PrecioISV_Albaran | decimal | YES |
| PrecioEcoValor_Albaran | decimal | YES |
| PrecioIUC_Albaran | decimal | YES |
| FactorCambioMoneda_Albaran | decimal | YES |
| FactorCambioMonedaAIntermedia_Albaran | decimal | YES |
| FactorCambioMonedaDesdeIntermedia_Albaran | decimal | YES |
| FactorCambioMonedaContravalor_Albaran | decimal | YES |
| FkBaterias | int | YES |
| BateriaCreada | bit | YES |