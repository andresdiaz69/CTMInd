# Table: Liquidaciones_AsesorComercialVehiculosUsados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| NombreEmpresa | nvarchar | YES |
| FechaIngreso | datetime | YES |
| FechaRetiro | datetime | YES |
| IdComisionModeloSub | smallint | YES |
| CantidadEntregas | int | YES |
| TotalFacturas | decimal | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Valor | decimal | YES |
| Valor_ComisionEntregas | decimal | NO |
| PromedioFacturas | decimal | YES |
| Valor_ComisionVolumen | int | NO |
| ValorVariableAccesorios | decimal | YES |
| ValorNetoMostrador | decimal | YES |
| BonificacionMostrador | decimal | YES |
| ValorNetoTaller | decimal | YES |
| BonificacionTaller | decimal | YES |
| Valor_ComisionAccesorios | decimal | NO |
| ComprasUsados | int | YES |
| ValorVariableCompra | decimal | YES |
| Valor_ComisionCompra | decimal | NO |
| RetomasUsados | int | YES |
| ValorVariableRetoma | decimal | YES |
| Valor_ComisionRetoma | decimal | NO |
| TotalVentaEquirent | decimal | NO |
| ValorVariableEquirent | decimal | NO |
| Valor_ComisionEquirent | decimal | NO |
| Valor_ComisionTotal | decimal | YES |
