# View: vw_ComercialVNPorPro_1_Pre_VOVN

## Usa los objetos:
- [[ComisionesSpigaNotasCredito]]
- [[ComisionesSpigaVO]]
- [[Liquidaciones_ComercialVNPorPro_Detalle]]
- [[VehiculosModelos]]
- [[VehiculosVIN]]

```sql





CREATE VIEW [dbo].[vw_ComercialVNPorPro_1_Pre_VOVN]
AS
SELECT        dbo.ComisionesSpigaVO.Ano_Periodo, dbo.ComisionesSpigaVO.Mes_Periodo, dbo.ComisionesSpigaVO.CodigoEmpresaSugerido AS Codigoempresa, dbo.ComisionesSpigaVO.CedulaVendedor, 
                         COUNT(dbo.ComisionesSpigaVO.NumerEntregas) AS NumerEntregasCount, SUM(ISNULL(CAST(VehiculoUtilitario AS int), 0)) AS NumerEntregasCount_VehUtil -- Si es True lo convierte en 1 para poderlo sumar
FROM            dbo.ComisionesSpigaVO LEFT OUTER JOIN
                         dbo.VehiculosModelos ON dbo.ComisionesSpigaVO.CodigoGama = dbo.VehiculosModelos.CodigoGama AND dbo.ComisionesSpigaVO.CodigoMArca = dbo.VehiculosModelos.CodigoMarca AND 
                         dbo.ComisionesSpigaVO.CodigoModelo = dbo.VehiculosModelos.CodigoModelo AND dbo.ComisionesSpigaVO.AñoModelo = dbo.VehiculosModelos.AnoModelo LEFT OUTER JOIN
                             (SELECT DISTINCT VIN
                               FROM            dbo.Liquidaciones_ComercialVNPorPro_Detalle
                               WHERE        (VIN IS NOT NULL)) AS VIN_PAGADOS ON dbo.ComisionesSpigaVO.VIN = VIN_PAGADOS.VIN LEFT OUTER JOIN
                         dbo.VehiculosVIN ON dbo.ComisionesSpigaVO.VIN = dbo.VehiculosVIN.VIN LEFT OUTER JOIN
                         dbo.ComisionesSpigaNotasCredito ON dbo.ComisionesSpigaVO.NumeroFactura = dbo.ComisionesSpigaNotasCredito.NumeroFactura AND 
                         dbo.ComisionesSpigaVO.CodigoCentro = dbo.ComisionesSpigaNotasCredito.CodigoCentro AND dbo.ComisionesSpigaVO.CodigoEmpresaSugerido = dbo.ComisionesSpigaNotasCredito.CodigoEmpresaSugerido AND 
                         dbo.ComisionesSpigaVO.VIN = dbo.ComisionesSpigaNotasCredito.VIN
WHERE        
(dbo.ComisionesSpigaVO.EntregaEfectiva = 1) 
AND (NOT (dbo.ComisionesSpigaVO.Centro LIKE N'VO%')) 
AND (dbo.ComisionesSpigaNotasCredito.NumeroNotaCredito IS NULL) 
AND (dbo.VehiculosVIN.ComisionProductividadBloqueada = 'False') 
AND (VIN_PAGADOS.VIN IS NULL) 
AND (dbo.ComisionesSpigaVO.Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638'))
AND dbo.ComisionesSpigaVO.Ano_Periodo >= 2022 -- JCS: 2022/11/09 - PERFORMANCE
GROUP BY dbo.ComisionesSpigaVO.Ano_Periodo, dbo.ComisionesSpigaVO.Mes_Periodo, dbo.ComisionesSpigaVO.CodigoEmpresaSugerido, dbo.ComisionesSpigaVO.CedulaVendedor

```
