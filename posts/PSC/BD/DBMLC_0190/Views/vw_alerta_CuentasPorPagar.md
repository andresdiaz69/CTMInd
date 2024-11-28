# View: vw_alerta_CuentasPorPagar

## Usa los objetos:
- [[spiga_CuentasPorPagar]]
- [[spiga_Documentaciones]]

```sql

CREATE VIEW [dbo].[vw_alerta_CuentasPorPagar]
AS
SELECT        
IdSincronizacionSpiga, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, Indice, 

IdTerceros, 
IdTerceros_Pagador, 
IdTerceros_Pagador AS IDSpiga, 

NombreTercero,
NombreTercero AS Tercero,

Factura, 
FechaFactura, 

FechaVencimiento, 
(datediff(day,[FechaVencimiento],[FechaDeCorte])) AS FVtoDias,

IdPagoFormas, 
DescripcionPagoFormas, 

IdSituacionEfectos, DescripcionSituacionEfectos, Departamento, NombreDepartamento, TotalFactura, 
						 
ImportePendiente, 
ImportePendiente AS Valor,

DiaDesde, DiaHasta, NombreCentro, NumDet, AñoAsiento, IdAsientos, 
DescripcionTipoCalle, NombreCalle, Numero, Bloque, Piso, Puerta, 
Complemento, Complemento2, NifCif, IdPaises, ciudad, ReferenciaInterna, LimiteCredito, 
VIN, DescripcionSeccion, FechaSaldado, EstadoWF, PagoBloqueado, 
DescripcionDeudorTipos, IdDeudorTipos, IdContCtasTerceroPagador, 
FechaEntregaVO, FechaEntregaVN, Referencia, IdMonedaOrigen, FactorCambioMoneda, FactorCambioMonedaContravalor, DescripcionMoneda, 
DecimalesCalculoMoneda, Telefonos,

'CP' AS TipoCP

FROM            [PSCService_DB].dbo.spiga_CuentasPorPagar


UNION ALL


SELECT        
IdSincronizacionSpiga, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, 0 AS Indice, 

0 AS IdTerceros, 
IdCtaBancarias AS IdTerceros_Pagador, 
IdCtaBancarias AS IDSpiga, 

DescripcionBancoPoliza AS NombreTercero,
DescripcionBancoPoliza AS Tercero,

NumFactura AS Factura, 
FechaFactura, 

FechaVencimiento, 
(datediff(day,[FechaVencimiento],[FechaDeCorte])) AS FVtoDias,

'' AS IdPagoFormas, 
'' AS DescripcionPagoFormas, 

0 AS IdSituacionEfectos, '' AS DescripcionSituacionEfectos, '' AS Departamento, '' AS NombreDepartamento, 0 AS TotalFactura, 
						 
ImporteCompra AS ImportePendiente, 
ImporteCompra AS Valor,

0 AS DiaDesde, 0 AS DiaHasta, '' AS NombreCentro, 0 AS NumDet, '' AS AñoAsiento, 0 AS IdAsientos, 
'' AS DescripcionTipoCalle, '' AS NombreCalle, '' AS Numero, '' AS Bloque, '' AS Piso, '' AS Puerta, 
'' AS Complemento, '' AS Complemento2, '' AS NifCif, '' AS IdPaises, '' AS ciudad, '' AS ReferenciaInterna, NULL AS LimiteCredito, 
'' AS VIN, '' AS DescripcionSeccion, NULL AS FechaSaldado, '' AS EstadoWF, NULL AS PagoBloqueado, 
'' AS DescripcionDeudorTipos, '' AS IdDeudorTipos, '' AS IdContCtasTerceroPagador, 
NULL AS FechaEntregaVO, NULL AS FechaEntregaVN, '' AS Referencia, 0 AS IdMonedaOrigen, 0 AS FactorCambioMoneda, 0 AS FactorCambioMonedaContravalor, '' AS DescripcionMoneda, 
0 AS DecimalesCalculoMoneda, '' AS Telefonos,

'DO' AS TipoCP

FROM            [PSCService_DB].dbo.spiga_Documentaciones



```
