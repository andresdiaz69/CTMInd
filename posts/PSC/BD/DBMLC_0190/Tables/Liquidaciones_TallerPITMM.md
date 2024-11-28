# Table: Liquidaciones_TallerPITMM

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| CodigoEmpresa | smallint | NO |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| CodigoSede | smallint | YES |
| NombreSede | nvarchar | YES |
| PITPorcentaje | decimal | YES |
| PITPuntos | decimal | YES |
| ValorNetoTaller | decimal | YES |
| ValorBasePIT | decimal | YES |
| Faltante | decimal | NO |
| ValorDelPuntoPIT | decimal | YES |
| DiasLaborados | smallint | NO |
| PuntosAsignadosEmpleado | decimal | NO |
| IdComisionModeloSub | smallint | YES |
| IdRangoMaestra | smallint | NO |
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
