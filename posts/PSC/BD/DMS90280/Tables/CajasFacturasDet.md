# Table: CajasFacturasDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkCajasDet | int | NO |
| PkCajasFacturasDet_Iden | smallint | NO |
| FkAñoAsiento | nvarchar | NO |
| FkAsientos | int | NO |
| FkEfectosNumDet | smallint | YES |
| FkAñoAsiento_Contabiliza | nvarchar | YES |
| FkAsientos_Contabiliza | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Importe | decimal | YES |
| FkPagoFormas | nvarchar | YES |
| ImporteRetencionManoObra | decimal | YES |
| FkImpuestos | nvarchar | YES |
| ImporteDiferenciaCambioSaldar | decimal | YES |
| FactorCambioContabiliza | decimal | YES |
| FechaEnvio | datetime | YES |
| FkAñoAsiento_Comprobante | nvarchar | YES |
| FkAsientos_Comprobante | int | YES |
| FkCajasDocumentos | smallint | YES |
| FkTpvs | smallint | YES |
| FkTarjetaTipos | nvarchar | YES |
| FkConceptosBancarios | nvarchar | YES |
| FkCentros_CajasDocumentos | smallint | YES |
| FkCajas_CajasDocumentos | smallint | YES |
| FkCajasDet_CajasDocumentos | int | YES |
| PagoTarjetaAplazados | bit | YES |
| NumCuotasAplazadas | nvarchar | YES |
| FkContCtas_ComisionTA | nvarchar | YES |
| FkContCtas_SaldadoTA | nvarchar | YES |
| ImporteComisionTA | decimal | YES |
| FkContCtas_Contabilizacion | nvarchar | YES |
| FechaCierre | datetime | YES |
| FkCajasAnuladosDet_Parcial | int | YES |
| FkAsientosDet_Contabiliza_Ajuste | int | YES |
| FkContCtas_TarjetaTransitoria | nvarchar | YES |
| FCNegociado | decimal | YES |
| FkContCtas_TarjetasApunteIntermedio | nvarchar | YES |
| FkContCtas_TarjetasApunteIntermedioCliente | nvarchar | YES |
| FkAñoAsiento_TarjetasApunteIntermedio | nvarchar | YES |
| FkAsientos_TarjetasApunteIntermedio | int | YES |
| FkAsientos_Ajuste | int | YES |
| FkAñoAsiento_Ajuste | nvarchar | YES |
| PagoTarjetaPasarela | bit | YES |
| ImporteComisionTP | decimal | YES |
| FkContCtas_ComisionTP | nvarchar | YES |
| FkContCtas_SaldadoTP | nvarchar | YES |
| FkAñoAsiento_TP | nvarchar | YES |
| FkAsientos_TP | int | YES |