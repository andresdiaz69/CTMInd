# Table: Liquidaciones_SecretariaComercialRenault

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| NombreEmpresa | nvarchar | YES |
| CodigoCentro | smallint | YES |
| Centro | nvarchar | YES |
| FechaRetiro | datetime | YES |
| EntregaEfectiva | int | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Comision | decimal | YES |
| IdComisionModeloSub | smallint | NO |
| IdComisionModeloSubCriterio | smallint | NO |
