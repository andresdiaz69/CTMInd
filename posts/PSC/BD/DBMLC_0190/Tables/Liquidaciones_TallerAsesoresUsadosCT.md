# Table: Liquidaciones_TallerAsesoresUsadosCT

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CodigoEmpresa | smallint | YES |
| CedulaAsesorServicioResponsable | bigint | YES |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| ValorVariable | decimal | NO |
| ValorBase_MAT | decimal | YES |
| ValorBase_MO | decimal | YES |
| ValorBase_TOTAL | decimal | YES |
| ValorNeto_TOTAL | decimal | YES |
| IdComisionModeloSub | smallint | YES |
| IdRangoMaestra | smallint | YES |
| IdRangoVersionMax | int | YES |
| IdRangoVersion | int | YES |
| ConsecutivoVersion | smallint | YES |
| IdRangoDetalle | int | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Valor | decimal | YES |
| PorcentajeSatisfaccion | decimal | YES |
| BonificacionSatisfaccion | decimal | YES |
| Comision_MAT | decimal | YES |
| Comision_MO | decimal | YES |
| Comision_TOTAL | decimal | YES |
| CodigoMarcaGrupo | smallint | YES |
| MarcaGrupo | nvarchar | YES |
