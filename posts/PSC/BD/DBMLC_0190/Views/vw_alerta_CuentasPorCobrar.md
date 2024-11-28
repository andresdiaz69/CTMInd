# View: vw_alerta_CuentasPorCobrar

## Usa los objetos:
- [[spiga_Cartera]]

```sql




CREATE VIEW [dbo].[vw_alerta_CuentasPorCobrar]
AS
SELECT        IdSincronizacionSpiga, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, Indice, IdTerceros, 

IdTerceros_Pagador, 
IdTerceros_Pagador AS IDSpiga, 

NombreTercero,
NombreTercero AS Tercero,

Factura, FechaFactura, 

FechaVencimiento, 
(datediff(day,[FechaVencimiento],[FechaDeCorte])) AS FVtoDias,

IdPagoFormas, 
DescripcionPagoFormas, 

IdSituacionEfectos, DescripcionSituacionEfectos, Departamento, NombreDepartamento, TotalFactura, 
						 
ImportePendiente, 
ImportePendiente AS Valor,
						 
						 DiaDesde, DiaHasta, NombreCentro, NumDet, AñoAsiento, IdAsientos, 
                         DescripcionTipoCalle, NombreCalle, Numero, Bloque, Piso, Puerta, Complemento, Complemento2, NifCif, IdPaises, ciudad, ReferenciaInterna, LimiteCredito, VIN, DescripcionSeccion, FechaSaldado, EstadoWF, PagoBloqueado, 
                         DescripcionDeudorTipos, IdDeudorTipos, IdContCtasTerceroPagador, FechaEntregaVO, FechaEntregaVN, Referencia, IdMonedaOrigen, FactorCambioMoneda, FactorCambioMonedaContravalor, DescripcionMoneda, 
                         DecimalesCalculoMoneda, Telefonos
FROM            [PSCService_DB].dbo.spiga_Cartera

--NO DEBE INCLUIR LOS REMESADOS
WHERE IdSituacionEfectos <> 4


```
