# Table: Liquidaciones_TallerAsesoresYSupervisoresCT

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| CodigoEmpresa | smallint | NO |
| CedulaAsesorServicioResponsable | bigint | YES |
| CodigoEmpleado | bigint | YES |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| ValorVariable | decimal | YES |
| ValorNeto_MAT | decimal | NO |
| ValorBase_MAT | decimal | NO |
| ValorNeto_MO | decimal | NO |
| ValorBase_MO | decimal | NO |
| ValorNeto_TOTAL | decimal | YES |
| ValorBase_TOTAL | decimal | YES |
| IdComisionModeloSub | smallint | YES |
| IdRangoMaestra | smallint | YES |
| IdRangoVersionMax | int | YES |
| IdRangoVersion | int | YES |
| ConsecutivoVersion | smallint | YES |
| IdRangoDetalle | int | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Valor | decimal | YES |
| Comision_MAT | decimal | YES |
| Comision_MO | decimal | YES |
| Comision_TOTAL | decimal | YES |
| CodigoMarcaGrupo | smallint | YES |
| MarcaGrupo | nvarchar | YES |
