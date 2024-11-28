# Table: Liquidaciones_ExpertoDeProductoDaimlerPC

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | int | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CedulaVendedor | bigint | YES |
| NombreVendedor | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| FechaRetiro | datetime | YES |
| VehiculosRecaudados | int | YES |
| ComisionPersonales | decimal | YES |
| VehiculosEntregados | int | YES |
| ComisionGerencia | decimal | YES |
| Satisfaccion_CSI | decimal | YES |
| ComisionSatisfaccion | decimal | YES |
| Desde_Satisfaccion | decimal | YES |
| Hasta_Satisfaccion | decimal | YES |
| ComisionTotal | decimal | YES |
| FechaLiquidacion | datetime | YES |
