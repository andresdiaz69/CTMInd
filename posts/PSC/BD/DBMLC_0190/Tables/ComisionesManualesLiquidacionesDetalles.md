# Table: ComisionesManualesLiquidacionesDetalles

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdRegistro | int | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | smallint | NO |
| Mes_Periodo | smallint | NO |
| CodigoEmpleado | bigint | NO |
| NombreEmpleado | nvarchar | NO |
| CodigoCargo | nvarchar | NO |
| NombreCargo | nvarchar | NO |
| IdEsquema | smallint | NO |
| NombreEsquema | nvarchar | NO |
| IdComisionModelo | smallint | NO |
| NombreModelo | nvarchar | NO |
| IdUnidadNegocio | smallint | NO |
| NombreUnidadNegocio | nvarchar | NO |
| DiaCorte | smallint | NO |
| IdCriterio | smallint | NO |
| NombreCriterio | nvarchar | NO |
| IdMaestra | smallint | NO |
| NombreMaestra | nvarchar | NO |
| CodigoConcepto | int | NO |
| IdRangoVersion | int | NO |
| ConsecutivoVersion | smallint | NO |
| IdRangoDetalle | int | NO |
| ValorNovedad | decimal | NO |
| Desde | decimal | NO |
| Hasta | decimal | NO |
| Comision | decimal | NO |
| IdCriterio2 | smallint | YES |
| NombreCriterio2 | nvarchar | YES |
| ValorNovedadCriterio2 | decimal | YES |
| DesdeCriterio2 | decimal | YES |
| HastaCriterio2 | decimal | YES |
| Anulada | bit | YES |
