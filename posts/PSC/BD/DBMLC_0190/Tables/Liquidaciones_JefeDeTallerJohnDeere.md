# Table: Liquidaciones_JefeDeTallerJohnDeere

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | int | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| CodigoEmpresa | smallint | NO |
| Empresa | nvarchar | NO |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| CodigoCentro | smallint | NO |
| Centro | nvarchar | NO |
| ValorNeto | decimal | YES |
| ValorVariable | decimal | NO |
| Comision | decimal | YES |
| IdRangoMaestra | smallint | NO |
| IdRangoVersionMax | int | YES |
| IdComisionModeloSub | smallint | NO |
| IdComisionModeloSubCriterio | smallint | NO |
