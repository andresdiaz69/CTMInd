# View: vw_alerta_ContabilidadCuentasPorPagar_Pre

## Usa los objetos:
- [[vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose]]

```sql






CREATE VIEW [dbo].[vw_alerta_ContabilidadCuentasPorPagar_Pre]
AS
SELECT        IdSincronizacionSpiga, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, IdContCtas, 

CASE 
--- LUCHO PLAN MAYOR
WHEN IdEmpresas = 1 AND TerceroBanco = 35 AND IdContCtas = '2120051115' THEN 9999901 --FACTORING RCI - Plan Mayor Sofasa
WHEN IdEmpresas = 1 AND TerceroBanco = 37 AND IdContCtas = '2120051105' THEN 9999902 --FACTORING BANCOLOMBIA - Pagos Plan Mayor Ford
WHEN IdEmpresas = 1 AND TerceroBanco = 96 AND IdContCtas = '2120051130' THEN 9999903 --PLAN MAYOR FINANDINA - PLAN MAYOR FINANDINA - MAZDA
WHEN IdEmpresas = 1 AND TerceroBanco = 97 AND IdContCtas = '2120051125' THEN 9999904 --FACTORING BCO SANTANDER - VOLKSWAGEN - Plan Mayor Banco santander - VW
--WHEN IdEmpresas = 1 AND TerceroBanco = 97 AND IdContCtas = '2205151105' THEN 9999905 --PROVEEDORES VEHICULOS, CAMIONES Y MAQUINARIA - Plan Mayor Banco santander - VW
WHEN IdEmpresas = 1 AND TerceroBanco = 107 AND IdContCtas = '2120051125' THEN 9999904 --FACTORING BCO SANTANDER - VOLKSWAGEN - Plan Mayor Banco santander - VW
WHEN IdEmpresas = 1 AND TerceroBanco = 112 AND IdContCtas = '2120051140' THEN 9999907 --FACTORING BCO SANTANDER - FORD - PLAN MAYOR FORD BANCO SANTANDER
WHEN IdEmpresas = 1 AND TerceroBanco = 116 AND IdContCtas = '2120051145' THEN 9999908 --FACTORING BCO SANTANDER - MAZDA - PLAN MAYOR MAZDA BANCO SANTANDER

WHEN IdEmpresas = 6 AND TerceroBanco = 73 AND IdContCtas = '2120051105' THEN 9999909 --FACTORING BANCOLOMBIA
WHEN IdEmpresas = 6 AND TerceroBanco = 65 AND IdContCtas = '2120051125' THEN 9999910 --FACTORING BCO SANTANDER - FACTORING BCO SANTANDER
WHEN IdEmpresas = 6 AND TerceroBanco = 76 AND IdContCtas = '2120051160' THEN 9999911 --PLAN MAYOR FINANDINA MERCEDES BENZ - PLAN MAYOR FINANDINA MERCEDES
WHEN IdEmpresas = 6 AND TerceroBanco = 77 AND IdContCtas = '2120051165' THEN 9999912 --PLAN MAYOR BANCO DE BOGOTA MERCEDES


-- CRISTIAN
WHEN TerceroBanco = 1 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 190376
WHEN TerceroBanco = 5 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN TerceroBanco = 6 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 7 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17241
WHEN TerceroBanco = 8 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17242
WHEN TerceroBanco = 9 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17287
WHEN TerceroBanco = 10 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17259
WHEN TerceroBanco = 11 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17260
WHEN TerceroBanco = 12 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17584
WHEN TerceroBanco = 13 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 14 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 15 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 16 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 17 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 18 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 19 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 20 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 21 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 248204
WHEN TerceroBanco = 22 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 203659
WHEN TerceroBanco = 24 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19374
WHEN TerceroBanco = 25 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 4
WHEN TerceroBanco = 26 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN TerceroBanco = 29 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 216189
WHEN TerceroBanco = 30 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 31 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN TerceroBanco = 32 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19331
WHEN TerceroBanco = 33 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17287
WHEN TerceroBanco = 34 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 203659
WHEN TerceroBanco = 35 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 265353
WHEN TerceroBanco = 36 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19377
WHEN TerceroBanco = 37 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN TerceroBanco = 38 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 248235
WHEN TerceroBanco = 39 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 41 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 42 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17260
WHEN TerceroBanco = 43 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17241
WHEN TerceroBanco = 44 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17259
WHEN TerceroBanco = 45 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 297626
WHEN TerceroBanco = 47 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN TerceroBanco = 48 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17242
WHEN TerceroBanco = 57 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17584
WHEN TerceroBanco = 58 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17607
WHEN TerceroBanco = 59 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 60 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 61 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 62 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 63 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 64 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 65 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 232753
WHEN TerceroBanco = 66 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 67 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 68 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 69 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 70 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 71 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 73 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN TerceroBanco = 74 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 2
WHEN TerceroBanco = 75 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 76 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 77 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17287
WHEN TerceroBanco = 79 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 80 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 81 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 82 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 83 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 84 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 85 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 86 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17242
WHEN TerceroBanco = 87 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 88 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 89 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 90 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN TerceroBanco = 91 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 92 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 93 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19352
WHEN TerceroBanco = 94 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 19348
WHEN TerceroBanco = 95 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17241
WHEN TerceroBanco = 96 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 17320
WHEN TerceroBanco = 97 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 232753
WHEN TerceroBanco = 112 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) >= '20201001' THEN 232753


ELSE TerceroBanco
END AS IDSpiga,

NombreTerceroBanco, NifCifTerceroBanco, NombreCuenta, TipoCalculo, ImporteDebeApertura, ImporteHaberApertura, ImporteDebeUltimoMes,
ImporteHaberUltimoMes, TotalDebePeriodo, TotalHaberPeriodo, ImporteDebeAperturaContravalor, ImporteHaberAperturaContravalor, ImporteDebeUltimoMesContravalor,
ImporteHaberUltimoMesContravalor, TotalDebePeriodoContravalor, TotalHaberPeriodoContravalor, FkContNiveles, Cuenta, Saldo

FROM            vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose




```
