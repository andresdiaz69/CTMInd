# Table: IMSGarantias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoIMSGarantias | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkIMSGarantias | int | NO |
| PkIMSGarantiasNumDet_Iden | smallint | NO |
| FkIMSConcesionarios | smallint | NO |
| FkIMSCuentas | smallint | NO |
| FkIMSSucursales | smallint | NO |
| FkIMSTalleres | tinyint | NO |
| FkMarcas | smallint | NO |
| FkVehiculos | int | NO |
| FkGarantiaTipos | nvarchar | NO |
| Descripcion | nvarchar | YES |
| Observaciones | nvarchar | YES |
| AsesorResponsable | nvarchar | YES |
| NumeroOrden | nvarchar | YES |
| FechaAltaOrden | datetime | YES |
| FkIMSAutorizaciones | int | YES |
| FkTallerCampañas | nvarchar | YES |
| FkCampañaVariante | nvarchar | YES |
| FechaReclamacionConcesionario | datetime | YES |
| FechaResolucionConcesionario | datetime | YES |
| FkIMSEstadoGarantia_Concesionario | nvarchar | YES |
| FkIMSEstadoGarantia | nvarchar | YES |
| ImporteReclamadoConcesionario | decimal | YES |
| ImporteAceptadoConcesionario | decimal | YES |
| ImporteAceptadoFabricante | decimal | YES |
| FkImportadoras | int | YES |
| FkTipoClasificacionParametroGarantia_1 | int | YES |
| FkClasificacionGarantia_1 | nvarchar | YES |
| FkTipoClasificacionParametroGarantia_2 | int | YES |
| FkClasificacionGarantia_2 | nvarchar | YES |
| FkTipoClasificacionParametroGarantia_3 | int | YES |
| FkClasificacionGarantia_3 | nvarchar | YES |
| FkTipoClasificacionParametroGarantia_4 | int | YES |
| FkClasificacionGarantia_4 | nvarchar | YES |
| FkTipoClasificacionParametroGarantia_5 | int | YES |
| FkClasificacionGarantia_5 | nvarchar | YES |
| FkTipoClasificacionParametroGarantia_6 | int | YES |
| FkClasificacionGarantia_6 | nvarchar | YES |
| FkTipoClasificacionParametroGarantia_7 | int | YES |
| FkClasificacionGarantia_7 | nvarchar | YES |
| FkTipoClasificacionParametroGarantia_8 | int | YES |
| FkClasificacionGarantia_8 | nvarchar | YES |
| FkCentros | smallint | YES |
| FkAñoFactura | nvarchar | YES |
| FkSeries_Factura | nvarchar | YES |
| FkNumFactura | nvarchar | YES |
| FechaFacturacion | datetime | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FkIMSCodigoRechazo | nvarchar | YES |
| PorcentajeMO | decimal | YES |
| PorcentajeMAT | decimal | YES |
| PorcentajeSUB | decimal | YES |
| PorcentajeVAR | decimal | YES |
| PorcentajeMP | decimal | YES |
| FechaReclamacionFabricante | datetime | YES |
| FechaResolucionFabricante | datetime | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FactorCambioMoneda_Aceptada | decimal | YES |
| FkMonedas_Fabricante | smallint | YES |
| FactorCambioMoneda_ReclamadaFabricante | decimal | YES |
| FactorCambioMoneda_AceptadaFabricante | decimal | YES |
| FkAñoGarantia_Fabricante | nvarchar | YES |
| FkNumGarantia_Fabricante | int | YES |
| FkSerieGarantia_Fabricante | nvarchar | YES |
| NumeroReclamacionFabricante | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ImporteCalculado | decimal | YES |
| ImporteReclamadoFabricante | decimal | YES |
| FkAñoIMSAutorizaciones | nvarchar | YES |
| FkSeries_Autorizacion | nvarchar | YES |
| Kmts | int | YES |
| Comentarios | nvarchar | YES |
| FkTerceros_Fabricante | int | YES |
| FkSeries_Dictamen | nvarchar | YES |
| FkNumDictamen | int | YES |
| FkAñoDictamen | nvarchar | YES |
| ImpuestoPorc_Abono | decimal | YES |
| FkImpuestos_Abono | nvarchar | YES |
| FKAñoAsiento_Reclamada | nvarchar | YES |
| FkAñoAsiento_Rechazado | nvarchar | YES |
| FkAsientos_Reclamada | int | YES |
| FkAsientos_Rechazado | int | YES |
| ImpuestoPorc_Concesionario | decimal | YES |
| FkImpuestos_Concesionario | nvarchar | YES |
| NumGarantiaMarca | nvarchar | YES |
| Historico | bit | NO |
| FkSeriesFactura_Fabricante | nvarchar | YES |
| FkNumFactura_Fabricante | nvarchar | YES |
| FkAñoFactura_Fabricante | nvarchar | YES |
| FechaFacturaFabricante | datetime | YES |
| FkAsientos_Fabricante | int | YES |
| FkAñoAsiento_Fabricante | nvarchar | YES |
| FkImpuestos_AbonoFabricante | nvarchar | YES |
| ImpuestoPorcAbonoFabricante | decimal | YES |
| FechaCierreTrabajo | datetime | YES |
| DescripcionAux1 | nvarchar | YES |
| DescripcionAux2 | nvarchar | YES |
| DescripcionAux3 | nvarchar | YES |
| DescripcionAux4 | nvarchar | YES |
| HorasUso | int | YES |
| FkAsientos_Factura | int | YES |
| FkAñoAsiento_Factura | nvarchar | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| FactorCambioMonedaContravalor_Aceptada | decimal | YES |
| FactorCambioMonedaContravalor_AceptadaFabricante | decimal | YES |
| FactorCambioMonedaContravalor_ReclamacionFabricante | decimal | YES |