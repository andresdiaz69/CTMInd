# View: vw_alerta_CuentasPorPagarByTercero_Pre

## Usa los objetos:
- [[vw_alerta_CuentasPorPagar]]

```sql





CREATE VIEW [dbo].[vw_alerta_CuentasPorPagarByTercero_Pre]
AS
SELECT        Ano_Periodo, Mes_Periodo, FechaDeCorte,  


CASE 
--- LUCHO PLAN MAYOR
WHEN IdEmpresas = 1 AND IdTerceros_Pagador = 265353 AND IdContCtasTerceroPagador = '2120051115' AND Departamento = 'VN' AND NombreCentro LIKE 'RN%' THEN 9999901 --FACTORING RCI - Plan Mayor Sofasa
WHEN IdEmpresas = 1 AND IdTerceros_Pagador = 19352 AND IdContCtasTerceroPagador = '2120051105' AND Departamento = 'VN' AND NombreCentro LIKE 'FR%' THEN 9999902 --FACTORING BANCOLOMBIA - Pagos Plan Mayor Ford
WHEN IdEmpresas = 1 AND IdTerceros_Pagador = 19352 AND IdContCtasTerceroPagador = '2205151105' AND Departamento = 'VN' AND NombreCentro LIKE 'FR%' THEN 9999902 --FACTORING BANCOLOMBIA - Pagos Plan Mayor Ford
WHEN IdEmpresas = 1 AND IdTerceros_Pagador = 17320 AND IdContCtasTerceroPagador = '2120051130' AND Departamento = 'VN' AND NombreCentro LIKE 'MZ%' THEN 9999903 --PLAN MAYOR FINANDINA - PLAN MAYOR FINANDINA - MAZDA
WHEN IdEmpresas = 1 AND IdTerceros_Pagador = 232753 AND IdContCtasTerceroPagador = '2120051125' AND Departamento = 'VN' AND NombreCentro LIKE 'VW%' THEN 9999904 --FACTORING BCO SANTANDER - VOLKSWAGEN - Plan Mayor Banco santander - VW
--WHEN IdEmpresas = 1 AND IdTerceros_Pagador = 232753 AND IdContCtasTerceroPagador = '2205151105' AND Departamento = 'VN' AND NombreCentro LIKE 'VW%' THEN 9999905 --PROVEEDORES VEHICULOS, CAMIONES Y MAQUINARIA - Plan Mayor Banco santander - VW
WHEN IdEmpresas = 1 AND IdTerceros_Pagador = 260342 AND IdContCtasTerceroPagador = '2120051125' AND Departamento = 'VN' AND NombreCentro LIKE 'VW%' THEN 9999904 --FACTORING BCO SANTANDER - VOLKSWAGEN - Plan Mayor Banco santander - VW
WHEN IdEmpresas = 1 AND IdTerceros_Pagador = 232753 AND IdContCtasTerceroPagador = '2120051140' AND Departamento = 'VN' AND NombreCentro LIKE 'FR%' THEN 9999907 --FACTORING BCO SANTANDER - FORD - PLAN MAYOR FORD BANCO SANTANDER
WHEN IdEmpresas = 1 AND IdTerceros_Pagador = 232753 AND IdContCtasTerceroPagador = '2120051145' AND Departamento = 'VN' AND NombreCentro LIKE 'MZ%' THEN 9999908 --FACTORING BCO SANTANDER - MAZDA - PLAN MAYOR MAZDA BANCO SANTANDER

WHEN IdEmpresas = 6 AND IdTerceros_Pagador = 19352 AND IdContCtasTerceroPagador = '2120051105' AND Departamento = 'VN' AND (NombreCentro LIKE 'DAI.C%' OR NombreCentro LIKE 'DAI.V%') THEN 9999909 --FACTORING BANCOLOMBIA
WHEN IdEmpresas = 6 AND IdTerceros_Pagador = 232753 AND IdContCtasTerceroPagador = '2120051125' AND Departamento = 'VN' AND (NombreCentro LIKE 'DAI.C%' OR NombreCentro LIKE 'DAI.V%') THEN 9999910 --FACTORING BCO SANTANDER - FACTORING BCO SANTANDER
WHEN IdEmpresas = 6 AND IdTerceros_Pagador = 17320 AND IdContCtasTerceroPagador = '2120051160' AND Departamento = 'VN' AND NombreCentro LIKE 'DAI.V%' THEN 9999911 --PLAN MAYOR FINANDINA MERCEDES BENZ - PLAN MAYOR FINANDINA MERCEDES
WHEN IdEmpresas = 6 AND IdTerceros_Pagador = 17241 AND IdContCtasTerceroPagador = '2120051165' AND Departamento = 'VN' AND NombreCentro LIKE 'DAI.V%' THEN 9999912 --PLAN MAYOR BANCO DE BOGOTA MERCEDES


-- CRISTIAN
WHEN IdTerceros_Pagador = 1 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 190376
WHEN IdTerceros_Pagador = 5 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN IdTerceros_Pagador = 6 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 7 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17241
WHEN IdTerceros_Pagador = 8 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17242
WHEN IdTerceros_Pagador = 9 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17287
WHEN IdTerceros_Pagador = 10 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17259
WHEN IdTerceros_Pagador = 11 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17260
WHEN IdTerceros_Pagador = 12 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17584
WHEN IdTerceros_Pagador = 13 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 14 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 15 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 16 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 17 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 18 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 19 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 20 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 21 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 248204
WHEN IdTerceros_Pagador = 22 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 203659
WHEN IdTerceros_Pagador = 24 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19374
WHEN IdTerceros_Pagador = 25 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 4
WHEN IdTerceros_Pagador = 26 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN IdTerceros_Pagador = 29 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 216189
WHEN IdTerceros_Pagador = 30 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 31 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN IdTerceros_Pagador = 32 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19331
WHEN IdTerceros_Pagador = 33 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17287
WHEN IdTerceros_Pagador = 34 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 203659
WHEN IdTerceros_Pagador = 35 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 265353
WHEN IdTerceros_Pagador = 36 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19377
WHEN IdTerceros_Pagador = 37 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN IdTerceros_Pagador = 38 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 248235
WHEN IdTerceros_Pagador = 39 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 41 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 42 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17260
WHEN IdTerceros_Pagador = 43 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17241
WHEN IdTerceros_Pagador = 44 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17259
WHEN IdTerceros_Pagador = 45 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 297626
WHEN IdTerceros_Pagador = 47 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN IdTerceros_Pagador = 48 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17242
WHEN IdTerceros_Pagador = 57 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17584
WHEN IdTerceros_Pagador = 58 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17607
WHEN IdTerceros_Pagador = 59 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 60 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 61 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 62 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 63 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 64 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 65 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 232753
WHEN IdTerceros_Pagador = 66 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 67 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 68 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 69 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 70 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 71 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 73 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN IdTerceros_Pagador = 74 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 2
WHEN IdTerceros_Pagador = 75 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 76 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 77 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17287
WHEN IdTerceros_Pagador = 79 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 80 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 81 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 82 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 83 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 84 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 85 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 86 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17242
WHEN IdTerceros_Pagador = 87 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 88 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 89 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 90 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN IdTerceros_Pagador = 91 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 92 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 93 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN IdTerceros_Pagador = 94 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN IdTerceros_Pagador = 95 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17241
WHEN IdTerceros_Pagador = 96 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN IdTerceros_Pagador = 97 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 232753
WHEN IdTerceros_Pagador = 112 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 232753


ELSE IdTerceros_Pagador
END AS IDSpiga,



Tercero, Valor, TipoCP, IdSincronizacionSpiga, IdConsecutivo, IdEmpresas, Indice, IdTerceros, IdTerceros_Pagador, NombreTercero, Factura, 
                         FechaFactura, FechaVencimiento, FVtoDias, IdPagoFormas, DescripcionPagoFormas, IdSituacionEfectos, DescripcionSituacionEfectos, Departamento, NombreDepartamento, TotalFactura, ImportePendiente, 
                         DiaDesde, DiaHasta, NombreCentro, NumDet, AñoAsiento, IdAsientos, DescripcionTipoCalle, NombreCalle, Numero, Bloque, Piso, Puerta, Complemento, Complemento2, NifCif, IdPaises, ciudad, 
                         ReferenciaInterna, LimiteCredito, VIN, DescripcionSeccion, FechaSaldado, EstadoWF, PagoBloqueado, DescripcionDeudorTipos, IdDeudorTipos, IdContCtasTerceroPagador, FechaEntregaVO, FechaEntregaVN, 
                         Referencia, IdMonedaOrigen, FactorCambioMoneda, FactorCambioMonedaContravalor, DescripcionMoneda, DecimalesCalculoMoneda, Telefonos
FROM            vw_alerta_CuentasPorPagar

-- SOLO SE TIENEN EN CUENTA LAS DOCUMENTACIONES DE MM
WHERE 
(vw_alerta_CuentasPorPagar.TipoCP = 'CP' 
OR
(vw_alerta_CuentasPorPagar.TipoCP = 'DO' AND vw_alerta_CuentasPorPagar.IdEmpresas = 29 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) <= '20220501'))
AND 
vw_alerta_CuentasPorPagar.IdTerceros_Pagador NOT IN (252485) -- JCS: 2022/09/21 POR SOLICITUD DE LUISA


```
