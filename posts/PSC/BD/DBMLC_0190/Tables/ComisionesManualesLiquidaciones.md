# Table: ComisionesManualesLiquidaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdLiquidacion | int | NO |
| IdComisionModelo | smallint | NO |
| Ano_Periodo | smallint | NO |
| Mes_Periodo | smallint | NO |
| DiaCorte | smallint | NO |
| UserIdLiquido | nvarchar | NO |
| FechaLiquidacion | datetime | NO |
| Archivo | nvarchar | NO |
| FechaPago | date | YES |
| Anulada | bit | YES |
| UserIdAnulo | nvarchar | YES |
| FechaAnulacion | datetime | YES |
| NotaAnulacion | nvarchar | YES |
