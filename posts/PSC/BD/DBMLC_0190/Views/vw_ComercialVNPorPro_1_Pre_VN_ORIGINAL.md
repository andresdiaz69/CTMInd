# View: vw_ComercialVNPorPro_1_Pre_VN_ORIGINAL

## Usa los objetos:
- [[ComisionesSpigaNotasCredito]]
- [[ComisionesSpigaVN]]
- [[Liquidaciones_ComercialVNPorPro_Detalle]]
- [[VehiculosVIN]]

```sql




CREATE VIEW [dbo].[vw_ComercialVNPorPro_1_Pre_VN_ORIGINAL]
AS
SELECT        dbo.ComisionesSpigaVN.Ano_Periodo, dbo.ComisionesSpigaVN.Mes_Periodo, dbo.ComisionesSpigaVN.CodigoEmpresaSugerido AS CodigoEmpresa, dbo.ComisionesSpigaVN.CedulaVendedor, COUNT(dbo.ComisionesSpigaVN.NumerEntregas) 
                         AS NumerEntregasCount
FROM            dbo.ComisionesSpigaVN LEFT OUTER JOIN
                             (SELECT DISTINCT VIN
                               FROM            dbo.Liquidaciones_ComercialVNPorPro_Detalle
                               WHERE        (VIN IS NOT NULL)) AS VIN_PAGADOS ON dbo.ComisionesSpigaVN.VIN = VIN_PAGADOS.VIN LEFT OUTER JOIN
                         dbo.VehiculosVIN ON dbo.ComisionesSpigaVN.VIN = dbo.VehiculosVIN.VIN LEFT OUTER JOIN
                         
						 dbo.ComisionesSpigaNotasCredito 
						 ON 
						 dbo.ComisionesSpigaVN.NumeroFactura = dbo.ComisionesSpigaNotasCredito.NumeroFactura 
						 AND dbo.ComisionesSpigaVN.CodigoCentro = dbo.ComisionesSpigaNotasCredito.CodigoCentro 
						 AND dbo.ComisionesSpigaVN.CodigoEmpresaSugerido = dbo.ComisionesSpigaNotasCredito.CodigoEmpresaSugerido
						 AND dbo.ComisionesSpigaVN.VIN = dbo.ComisionesSpigaNotasCredito.VIN
WHERE        
(dbo.ComisionesSpigaVN.EntregaEfectiva = 1) 
AND (dbo.ComisionesSpigaNotasCredito.NumeroNotaCredito IS NULL) 
AND (dbo.VehiculosVIN.ComisionProductividadBloqueada = 'False') 
AND (VIN_PAGADOS.VIN IS NULL)
AND dbo.ComisionesSpigaVN.Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')
GROUP BY dbo.ComisionesSpigaVN.Ano_Periodo, dbo.ComisionesSpigaVN.Mes_Periodo, dbo.ComisionesSpigaVN.CodigoEmpresaSugerido, dbo.ComisionesSpigaVN.CedulaVendedor




```
