# Table: EmpresaCentroMarcas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMarcas | smallint | NO |
| FkImportadoras | int | YES |
| FkTerceros_ProveedorVN | int | NO |
| CodConcesionarioTA | nvarchar | YES |
| CodConcesionarioVN | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| ControlRelacionesOpcionales | bit | NO |
| CampañaConcesReclamarMarca | bit | NO |
| FkFacturaTipos_Garantia | nvarchar | NO |
| FkFacturaTipos_Campañas | nvarchar | NO |
| GarantiasSubcontratadas | bit | NO |
| VNFechaInicioGarantia | nvarchar | NO |
| VNComisionObligatoria | bit | NO |
| VNFacturarClienteEnVentaAgente | bit | NO |
| MesesGarantiaObligatoriaVN | smallint | YES |
| NoEliminarPrestamos | bit | NO |
| ModificarImporteReclamacion | bit | NO |
| MORequeridaGarantiaTA | bit | NO |
| FkTerceros_ProveedorTA | int | NO |
| PedidoVNPorDefecto | bit | YES |
| MesesGarantiaObligatoriaVN_Chapa | smallint | YES |
| MesesGarantiaObligatoriaVN_Pintura | smallint | YES |
| FkPedidoEventos_PorDefecto | nvarchar | YES |
| RangoImporteCampañaImportacion | decimal | YES |
| RangoImporteCompraDtoImportacion | decimal | YES |
| TAPermitirModificarNumGarantia | bit | NO |
| FactorConversionUT | int | NO |
| TACatalogoMaxKM | int | YES |
| TACatalogoMaxMeses | smallint | YES |
| TACatalogoTasa | bit | NO |
| FechaMod | datetime | NO |
| CodConcesionarioTA2 | nvarchar | YES |
| BloquearUTS | bit | NO |
| CodConcesionarioVN2 | nvarchar | YES |
| MesesClienteFijo | tinyint | YES |
| ClaveEstacion | nvarchar | YES |
| ModificarVinImportacion | bit | NO |
| ConfigXML | nvarchar | YES |
| PermitirAbonoPartidoCampañasVN | bit | YES |
| DiasValidezReservaConPagos | smallint | YES |
| DiasValidezReservaSinPagos | smallint | YES |
| ObligatorioFechaInicioGarantia | bit | NO |
| KmsObligatorioFechaInicioGarantia | int | YES |
| PorcIncrementoMaterialesGarantia | decimal | YES |
| CrearDeferenciaCI | bit | NO |
| PermitirDetallarOpcionalesFactura | bit | NO |
| PrivilegiosAutorizacion | bit | NO |
| DeferenciaPorLinea | bit | NO |
| FkMonedas_Trabajo | smallint | YES |
| TAPermitirMOSinHorasGarantia | bit | NO |
| ActualizarVencimientosCompra | bit | NO |
| DiasVencimientosCompra | tinyint | YES |
| NumeroPedidoAutomatico | bit | NO |
| DiasVencimientoSobreFactura | smallint | YES |
| FkTerceros_ProveedorVNCampañas | int | YES |
| PrecargarPreciosCompraEnOfertasVN | bit | YES |
| MesesGarantiaObligatoriaVN_Motor | smallint | YES |
| KilometrosGarantia | int | YES |
| FkVentaTipos_PorDefectoOfertasIMS | nvarchar | YES |
| FkVentaMarcaTipos_PorDefectoOfertasIMS | nvarchar | YES |
| FkPlantillasCalculo_PorDefectoOfertasIMS | nvarchar | YES |
| TADesglosarMOGarantia | bit | NO |
| PermitirDetallarOpcionalesConcesionFactura | bit | NO |
| PermitirDetallarCampañasFactura | bit | YES |
| FkMonedas_VN | smallint | YES |
| ReservaVNPorAntiguedad | bit | NO |
| FKFechaValidezGarantias | nvarchar | YES |
| FechaFabricacionObligatoria | bit | NO |
| CodConcesionarioCM | nvarchar | YES |
| ContabilizarAlbaranesCompraVN | bit | NO |
| IMSPropiosPrecioMedio | bit | NO |
| VNFacturaBateriaPorCargoAdicional | bit | NO |
| TAImprimirGarantiaImpReclamado | bit | NO |
| ComercializaVN | bit | NO |
| MostrarUTsEnImpresion | bit | NO |
| SerieFacturaCompra | nvarchar | YES |
| VNAnularCompraAbonar | bit | NO |
| SerieFacturaAbono | nvarchar | YES |
| FacturaGarantiaUnicoDet | bit | NO |
| PlafonGarantias | decimal | YES |
| PlafonGarantiasAmpliadas | decimal | YES |
| PorcCosteGarantia | decimal | YES |
| PorcCosteGarantiaAmpliada | decimal | YES |
| PorcBeneficioGarantia | decimal | YES |
| PorcBeneficioGarantiaAmpliada | decimal | YES |
| AsignarPrecioCompraNegociadoMarca | bit | NO |
