# Table: Liquidaciones_TallerTecnicos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| CodigoEmpresa | smallint | NO |
| CedulaOperario | bigint | YES |
| CodigoEmpleado | bigint | YES |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| UnidadesVendidas | decimal | NO |
| HorasImproductivas | decimal | NO |
| UnidadesTotales | decimal | YES |
| IdComisionModeloSub | smallint | YES |
| IdRangoMaestra | smallint | YES |
| IdRangoVersionMax | int | YES |
| IdRangoVersion | int | YES |
| ConsecutivoVersion | smallint | YES |
| IdRangoDetalle | int | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Valor | decimal | YES |
| Comision | decimal | YES |
| CodigoMarcaGrupo | smallint | YES |
| MarcaGrupo | nvarchar | YES |
