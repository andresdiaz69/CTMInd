# Table: CaetanoPayIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCaetanoPayIMP | bigint | NO |
| EmpresaEquivalencia | nvarchar | YES |
| CentroEquivalencia | nvarchar | YES |
| TerminalID | nvarchar | YES |
| FechaCierre | nvarchar | YES |
| NumAutorizacion | nvarchar | YES |
| ImporteCobro | decimal | YES |
| SentidoImporteCobro | nvarchar | YES |
| CodigoMoneda | nvarchar | YES |
| ImporteComision | decimal | YES |
| SentidoComision | nvarchar | YES |
| ImporteLiquido | decimal | YES |
| SentidoImporteLiquido | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| TipoRegistro | nvarchar | YES |
| TipoTransaccion | nvarchar | YES |
| NumTransaccion | nvarchar | YES |
