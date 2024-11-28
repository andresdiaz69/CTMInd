# Table: compragastoadicionaleTramiteImport

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkCompraGastoAdicionales_Iden | int | NO |
| Descripcion | nvarchar | YES |
| FkTerceros_Proveedor | int | NO |
| FechaAlta | datetime | NO |
| FechaGasto | datetime | NO |
| FechaAnulacion | datetime | YES |
| FechaAbono | datetime | YES |
| FkCompraGastoAdicionales_Abonado | int | YES |
| FkAcondicionamientoTipos | smallint | YES |
| FechaFactura | datetime | YES |
| FechaAsiento | datetime | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| NumFacturaMensual | smallint | YES |
| FechaAlbaran | datetime | YES |
| SerieAlbaran | nvarchar | YES |
| NumAlbaran | nvarchar | YES |
| AñoAlbaran | nvarchar | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkUsuarios_Anulacion | smallint | YES |
| HostAnulacion | nvarchar | YES |
| FechaMod | datetime | NO |
| Provision | bit | NO |
| FactorCambioMonedaContravalor | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkAñoProcesosImportacion | nvarchar | YES |
| FkSeries_ProcesosImportacion | nvarchar | YES |
| FkProcesosImportacion | nvarchar | YES |
| FkProcesosImportacionSubprocesos | int | YES |
| FkMonedas_Intermedia | smallint | YES |
| FactorCambioMonedaAIntermedia | decimal | YES |
| FactorCambioMonedaDesdeIntermedia | decimal | YES |
| FactorCambioMonedaContravalor_Albaran | decimal | YES |
