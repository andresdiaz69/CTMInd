# Table: spiga_Cartera

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | NO |
| Indice | bigint | YES |
| IdTerceros | int | YES |
| IdTerceros_Pagador | int | YES |
| NombreTercero | nvarchar | YES |
| Factura | nvarchar | YES |
| FechaFactura | datetime | YES |
| FechaVencimiento | datetime | YES |
| IdPagoFormas | nvarchar | YES |
| DescripcionPagoFormas | nvarchar | YES |
| IdSituacionEfectos | smallint | NO |
| DescripcionSituacionEfectos | nvarchar | YES |
| Departamento | nvarchar | YES |
| NombreDepartamento | nvarchar | YES |
| TotalFactura | decimal | YES |
| ImporteEfecto | decimal | YES |
| ImportePendiente | decimal | YES |
| DiaDesde | smallint | YES |
| DiaHasta | smallint | YES |
| NombreCentro | nvarchar | YES |
| NumDet | smallint | YES |
| AñoAsiento | nvarchar | YES |
| IdAsientos | int | YES |
| DescripcionTipoCalle | nvarchar | YES |
| NombreCalle | nvarchar | YES |
| Numero | nvarchar | YES |
| Bloque | nvarchar | YES |
| Piso | nvarchar | YES |
| Puerta | nvarchar | YES |
| Complemento | nvarchar | YES |
| Complemento2 | nvarchar | YES |
| NifCif | nvarchar | YES |
| IdPaises | nvarchar | YES |
| ciudad | nvarchar | YES |
| ReferenciaInterna | nvarchar | YES |
| LimiteCredito | decimal | YES |
| VIN | nvarchar | YES |
| DescripcionSeccion | nvarchar | YES |
| FechaSaldado | datetime | YES |
| EstadoWF | nvarchar | YES |
| PagoBloqueado | bit | YES |
| DescripcionDeudorTipos | nvarchar | YES |
| IdDeudorTipos | nvarchar | YES |
| IdContCtasTerceroPagador | nvarchar | YES |
| FechaEntregaVO | datetime | YES |
| FechaEntregaVN | datetime | YES |
| Referencia | nvarchar | YES |
| IdMonedaOrigen | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| DescripcionMoneda | nvarchar | YES |
| DecimalesCalculoMoneda | int | YES |
| Telefonos | nvarchar | YES |