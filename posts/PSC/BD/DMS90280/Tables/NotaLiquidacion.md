# Table: NotaLiquidacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkSeries_NotaLiquidacion | nvarchar | NO |
| PkAñoNotaLiquidacion | nvarchar | NO |
| PkNumNotaLiquidacion | int | NO |
| FechaNotaLiquidacion | datetime | NO |
| FkTerceros | int | NO |
| NifCif | nvarchar | YES |
| Direccion1 | nvarchar | YES |
| Direccion2 | nvarchar | YES |
| Direccion3 | nvarchar | YES |
| TextoConfigurable | nvarchar | YES |
| TotalBI | decimal | YES |
| TotalBE | decimal | YES |
| TotalIVA | decimal | YES |
| TotalFactura | decimal | YES |
| TotalImporteAnterior | decimal | YES |
| TotalImportePago | decimal | YES |
| TotalImporteRegularizado | decimal | YES |
| TotalImportePendiente | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Tercero | nvarchar | NO |
| TotalBNS | decimal | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FechaEnvioSAFT | datetime | YES |
| FkFacturaTipos | nvarchar | YES |
| TextoConfigurablePie | nvarchar | YES |
| FkTerceros_Titular | int | YES |
| DireccionTitular1 | nvarchar | YES |
| DireccionTitular2 | nvarchar | YES |
| DireccionTitular3 | nvarchar | YES |
| TerceroTitular | nvarchar | YES |
| FkMonedasImpresion | smallint | YES |
| TextoCheques | nvarchar | YES |
| FechaAlta | datetime | YES |
| TextoConfigurableRetencion | nvarchar | YES |
| FkTextoSistema_DA | int | YES |
| FkTextoSistema_CWS | int | YES |
