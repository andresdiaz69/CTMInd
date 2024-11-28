# Table: Liquidaciones_JefeDeTallerYServicio_HorasFacturadas

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
| CodigoSeccion | smallint | YES |
| Seccion | nvarchar | YES |
| CodigoCentro | smallint | YES |
| Centro | nvarchar | YES |
| FechaRetiro | datetime | YES |
| UnidadesVendidas | decimal | YES |
| ValorComision | decimal | YES |
| IdComisionModeloSub | smallint | NO |
| IdComisionModeloSubCriterio | smallint | NO |
| Valor | decimal | YES |
