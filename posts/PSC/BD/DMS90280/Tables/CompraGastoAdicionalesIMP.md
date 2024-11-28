# Table: CompraGastoAdicionalesIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCompraGastoAdicionalesIMP | bigint | NO |
| FkProcesos | int | YES |
| FechaImportacion | datetime | YES |
| IdGasto | nvarchar | YES |
| IdInstalacion | nvarchar | YES |
| IdEmpresas | smallint | YES |
| IdCentros | smallint | YES |
| NifCif | nvarchar | YES |
| IdTerceros | int | YES |
| FechaProceso | datetime | YES |
| Descripcion | nvarchar | YES |
| IdDocumentoEmitidoTipos | smallint | YES |
| FechaDocumento | datetime | YES |
| SerieDocumento | nvarchar | YES |
| NumDocumento | nvarchar | YES |
| AñoDocumento | nvarchar | YES |
| BI | decimal | YES |
| BE | decimal | YES |
| BNS | decimal | YES |
| ImpuestoImporte | decimal | YES |
| ImpuestoPorcentaje | decimal | YES |
| ImporteTotal | decimal | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
