# View: vw_ComercialVNPorPro_1_Pre_VOVN_ORIGINAL

## Usa los objetos:
- [[ComisionesSpigaNotasCredito]]
- [[ComisionesSpigaVO]]
- [[Liquidaciones_ComercialVNPorPro_Detalle]]
- [[VehiculosVIN]]

```sql





CREATE VIEW [dbo].[vw_ComercialVNPorPro_1_Pre_VOVN_ORIGINAL]
AS
SELECT        dbo.ComisionesSpigaVO.Ano_Periodo, dbo.ComisionesSpigaVO.Mes_Periodo, dbo.ComisionesSpigaVO.CodigoEmpresaSugerido AS Codigoempresa, dbo.ComisionesSpigaVO.CedulaVendedor, COUNT(dbo.ComisionesSpigaVO.NumerEntregas) 
                         AS NumerEntregasCount
FROM            dbo.ComisionesSpigaVO LEFT OUTER JOIN
                             (SELECT DISTINCT VIN
                               FROM            dbo.Liquidaciones_ComercialVNPorPro_Detalle
                               WHERE        (VIN IS NOT NULL)) AS VIN_PAGADOS ON dbo.ComisionesSpigaVO.VIN = VIN_PAGADOS.VIN LEFT OUTER JOIN
                         dbo.VehiculosVIN ON dbo.ComisionesSpigaVO.VIN = dbo.VehiculosVIN.VIN LEFT OUTER JOIN
                         
						 dbo.ComisionesSpigaNotasCredito 
						 ON dbo.ComisionesSpigaVO.NumeroFactura = dbo.ComisionesSpigaNotasCredito.NumeroFactura 
						 AND dbo.ComisionesSpigaVO.CodigoCentro = dbo.ComisionesSpigaNotasCredito.CodigoCentro 
						 AND dbo.ComisionesSpigaVO.CodigoEmpresaSugerido = dbo.ComisionesSpigaNotasCredito.CodigoEmpresaSugerido
						 AND dbo.ComisionesSpigaVO.VIN = dbo.ComisionesSpigaNotasCredito.VIN

WHERE        
(dbo.ComisionesSpigaVO.EntregaEfectiva = 1) 
AND NOT (Centro LIKE N'VO%')
AND (dbo.ComisionesSpigaNotasCredito.NumeroNotaCredito IS NULL) 
AND (dbo.VehiculosVIN.ComisionProductividadBloqueada = 'False') 
AND (VIN_PAGADOS.VIN IS NULL)
AND dbo.ComisionesSpigaVO.Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')
GROUP BY dbo.ComisionesSpigaVO.Ano_Periodo, dbo.ComisionesSpigaVO.Mes_Periodo, dbo.ComisionesSpigaVO.CodigoEmpresaSugerido, dbo.ComisionesSpigaVO.CedulaVendedor





```
