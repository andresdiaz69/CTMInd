# Table: Liquidaciones_RepuestosV2_Bolsas_Vendedores

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| CodigoEmpresa | smallint | NO |
| CedulaVendedorRepuestos | bigint | NO |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| ValorBaseComision | decimal | YES |
| ValorBaseTotal | decimal | YES |
| CodigoCentro | smallint | YES |
| NombreCentro | nvarchar | YES |
| cod_marca | nvarchar | YES |
| nombre_marca | nvarchar | YES |
| CodigoCargo | nvarchar | YES |
| NombreCargo | nvarchar | YES |
| Participacion | decimal | YES |
| ValorBolsa | decimal | YES |
| Faltantes | decimal | YES |
| PesoBolsaVendedor | decimal | YES |
| TopeMaximoBolsa | decimal | YES |
| ValorBolsaVendedor | decimal | YES |
| Comision | decimal | YES |
| IdRangoMaestra | smallint | YES |
| IdRangoVersionMax | int | YES |
| IdComisionModeloSub | smallint | YES |
| IdComisionModeloSubCriterio | smallint | YES |
| CodigoConcepto | int | YES |
| CodigoConceptoAux | int | YES |
