# Table: Liquidaciones_JefeDeRepuestosMazda

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
| FechaIngreso | datetime | YES |
| FechaRetiro | datetime | YES |
| CodigoCentro | smallint | NO |
| Centro | nvarchar | NO |
| ValorBase | decimal | YES |
| ComisionMostrador | decimal | YES |
| ValorNetoTaller | decimal | YES |
| ComisionTaller | decimal | YES |
| ValorVariable | decimal | YES |
| ComisionRepuestos | decimal | YES |
| IdRangoMaestra | smallint | NO |
| IdRangoVersionMax | int | YES |
| IdComisionModeloSub | smallint | NO |
| IdComisionModeloSubCriterio | smallint | NO |
