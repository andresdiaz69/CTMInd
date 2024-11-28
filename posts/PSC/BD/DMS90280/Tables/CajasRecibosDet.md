# Table: CajasRecibosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkCajasDet | int | NO |
| PkFkRecibos | int | NO |
| FkPagoFormas | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PkFkRecibosAsientos | tinyint | NO |
| FkCajasDocumentos | smallint | YES |
| FkTpvs | smallint | YES |
| FkTarjetaTipos | nvarchar | YES |
| FkConceptosBancarios | nvarchar | YES |
| FkCentros_CajasDocumentos | smallint | YES |
| FkCajas_CajasDocumentos | smallint | YES |
| FkCajasDet_CajasDocumentos | int | YES |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| PagoTarjetaAplazados | bit | YES |
| NumCuotasAplazadas | nvarchar | YES |
| FkRecibos_Padre | int | YES |
| FkAsientos_SaldadoTA | int | YES |
| FkAñoAsiento_SaldadoTA | nvarchar | YES |
| FkContCtas_ComisionTA | nvarchar | YES |
| FkContCtas_SaldadoTA | nvarchar | YES |
| ImporteComisionTA | decimal | YES |
| ReciboTASaldado | bit | YES |
| FkContCtas_Contabilizacion | nvarchar | YES |
| FechaCierre | datetime | YES |
| FkCajasAnuladosDet_Parcial | int | YES |
| FkContCtas_TarjetaTransitoria | nvarchar | YES |
| PagoTarjetaPasarela | bit | YES |
| FkContCtas_TarjetaPasarela | nvarchar | YES |
| FkAñoAsiento_SaldadoTP | nvarchar | YES |
| FkAsientos_SaldadoTP | int | YES |
| ReciboTPSaldado | bit | YES |
| ImporteComisionTP | decimal | YES |
| FkContCtas_ComisionTP | nvarchar | YES |
