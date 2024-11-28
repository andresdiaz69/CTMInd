# Table: Liquidaciones_ComercialVOComisionesDeVentasMM

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CodigoEmpresa | smallint | YES |
| Empresa | nvarchar | YES |
| CedulaVendedor | bigint | YES |
| CodigoEmpleado | bigint | NO |
| NombreVendedor | nvarchar | YES |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| VehiculosRecaudados | int | YES |
| ValorPorcentaje | decimal | YES |
| ComisionRecaudo | decimal | YES |
| IdRangoMaestra | smallint | NO |
| IdComisionModeloSub | smallint | NO |
