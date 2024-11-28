# Table: CompraGastoAdicionalDetallesIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCompraGastoAdicionalDetallesIMP | bigint | NO |
| FkCompraGastoAdicionalesIMP | bigint | YES |
| FkProcesos | int | YES |
| IdGasto | nvarchar | YES |
| IdDetalle | nvarchar | YES |
| Descripcion | nvarchar | YES |
| BI | decimal | YES |
| BE | decimal | YES |
| BNS | decimal | YES |
| ImpuestoPorcentaje | decimal | YES |
| IdPedidosEntidadesExternasExportacion | int | YES |
| IdPedidosEntidadesExternasImportacion | int | YES |
| IdPedidosEntidadesExternasEstados | smallint | YES |
| IdEntidades | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
