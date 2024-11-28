# Table: Liquidaciones_RepuestosV2_Bolsas_Administrativa

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | smallint | NO |
| Mes_Periodo | smallint | NO |
| CodigoEmpleado | bigint | NO |
| CedulaVendedorRepuestos | bigint | NO |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| CodigoEmpresa | smallint | YES |
| NombreEmpresa | nvarchar | YES |
| CodigoCargo | nvarchar | YES |
| NombreCargo | nvarchar | YES |
| cod_marca | nvarchar | YES |
| nombre_marca | nvarchar | YES |
| CodigoCentro | smallint | YES |
| NombreCentro | nvarchar | YES |
| CantidadEmpleados | int | YES |
| TopeMaximoBolsa | decimal | YES |
| PesoAsignadoBolsa | decimal | YES |
| PesoTotal | decimal | YES |
| PesoTotalConsolidado | decimal | YES |
| Distribucion | decimal | YES |
| ValorBolsa | decimal | YES |
| Faltantes | decimal | YES |
| PesoBolsaOtroCargo | decimal | YES |
| ValorBolsaOtroCargo | decimal | YES |
| Comision | decimal | YES |
| IdRangoMaestra | smallint | YES |
| IdRangoVersionMax | int | YES |
| IdComisionModeloSub | smallint | YES |
| IdComisionModeloSubCriterio | smallint | YES |
| CodigoConcepto | int | YES |
| CodigoConceptoAux | int | YES |
