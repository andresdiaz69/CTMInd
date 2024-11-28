# Table: Liquidaciones_ComercialVNPorRet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | smallint | NO |
| Mes_Periodo | smallint | NO |
| CodigoEmpresa | smallint | NO |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | NO |
| FechaRetiro | datetime | YES |
| RetomasUsados | smallint | NO |
| ValorVariableCT | decimal | NO |
| ValorVariableMM | decimal | NO |
| ComisionRetoma | decimal | YES |
| IdRangoMaestra | smallint | NO |
| IdComisionModeloSub | smallint | NO |
