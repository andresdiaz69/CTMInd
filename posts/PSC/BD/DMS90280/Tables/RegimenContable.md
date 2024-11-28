# Table: RegimenContable

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkRegimenContable | nvarchar | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| DecimalesCalculo | int | NO |
| DecimalesResultado | int | NO |
| FechaMod | datetime | NO |
| DesglosarImpuesto | bit | NO |
| CodigoRegimenFiscal | nvarchar | YES |
| RequiereCtaEmitidaAbono | bit | NO |
| RequiereCtaRecibidaAbono | bit | NO |
| UnidadesNegativasImpresionesAbonos | bit | NO |
| OpcionFraquiciaSinImpuestos | bit | NO |
| EquivalenciaPlanContable | bit | NO |
| PermiteEliminacionParcial | bit | NO |
| ExencionImpuestosPorModulo | bit | NO |
| RequiereTextosExencionImpuestos | bit | NO |
| TieneImpuestos | bit | NO |
| PermitirFacturaResumida | bit | NO |
| ContabilizarRetencionesAsientoSaldado | bit | NO |
| AtipicasNegativasAbono | tinyint | NO |
| ObligaDocumentacionTipos | bit | NO |
| VentasInternasTotalFactura | bit | NO |
| FacturasTallerAbono | bit | NO |
| UtilizaGuiasTransporte | tinyint | NO |
| BloquearCambioTercero | bit | NO |
| ConfNotasDebito | tinyint | NO |
| PrecioMedioPorEmpresa | bit | NO |
| CPNObligatorioFacturarVenta | bit | NO |
| PedidoServicioAfectaIVA | bit | NO |
| PorcSobreBIRebuMenorUnAño | decimal | YES |
| PorcSobreBIRebuMayorUnAño | decimal | YES |
| PermiteREBU | bit | NO |
| PermiteRG | bit | NO |
| EditarPresupuesto | bit | NO |
| ObligaPresupuestoFacturaResumida | bit | NO |
| PermiteFacturarCero | bit | NO |
| VincularFacturasAnticiposCartera | bit | NO |
| ContabilizarRegularizacionesPendientesConfirmar | bit | NO |
| PermiteSuplidos | bit | NO |
| GeneraInmovilizadoHistorico | bit | YES |
| PermiteFacturarCeroCompras | bit | NO |
