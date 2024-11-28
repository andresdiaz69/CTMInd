# Table: Liquidaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdLiquidacion | int | NO |
| IdLiquidacionProceso | smallint | NO |
| CodigoEmpresa | smallint | NO |
| IdLiquidacionTipo | smallint | NO |
| IdComisionModeloSub | smallint | NO |
| Ano | smallint | NO |
| Mes | smallint | NO |
| DiaCorte | smallint | NO |
| UserIdLiquido | nvarchar | NO |
| FechaLiquidacion | datetime | NO |
| Archivo | nvarchar | NO |
| FechaPago | date | YES |
| Anulada | bit | YES |
| UserIdAnulo | nvarchar | YES |
| FechaAnulacion | datetime | YES |
| NotaAnulacion | nvarchar | YES |
