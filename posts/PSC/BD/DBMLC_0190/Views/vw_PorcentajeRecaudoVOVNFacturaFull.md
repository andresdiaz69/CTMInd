# View: vw_PorcentajeRecaudoVOVNFacturaFull

## Usa los objetos:
- [[ComisionesSpigaNotasCredito]]
- [[ComisionesSpigaVO]]
- [[Liquidaciones_ComercialVNPorCom_Detalle]]
- [[VehiculosVIN]]
- [[vw_ComisionesSpigaVOFactura_Pre]]

```sql








CREATE VIEW [dbo].[vw_PorcentajeRecaudoVOVNFacturaFull]
AS
SELECT        RESULTADO.Ano_Periodo AS Ano_Recaudo, RESULTADO.Mes_Periodo AS Mes_Recaudo, RESULTADO.Dia_Periodo AS Dia_Recaudo, DATEFROMPARTS(RESULTADO.Ano_Periodo, RESULTADO.Mes_Periodo, 
                         RESULTADO.Dia_Periodo) AS FechaRecaudo, RESULTADO.CodigoEmpresaSugerido AS CodigoEmpresa, RESULTADO.EmpresaSugerida AS Empresa, RESULTADO.CodigoCentro, RESULTADO.Centro, RESULTADO.FechaFactura, RESULTADO.NumeroFactura, 
                         RESULTADO.TotalFactura, RESULTADO.CuotaReteFuente, RESULTADO.TotalFactura - RESULTADO.CuotaReteFuente AS TotalFacturaSinCuotaReteFuente, RESULTADO.ImporteEfecto, RESULTADO.PorcentajeRecaudo, 
                         RESULTADO.VIN, RESULTADO.Nitcliente, RESULTADO.NombreCliente,
                             (SELECT        MAX(FechaEntregaCliente) AS FechaEntregaCliente
                               FROM            dbo.ComisionesSpigaVO
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS FechaEntregaCliente,
                             (SELECT        MAX(CedulaVendedor) AS CedulaVendedor
                               FROM            dbo.ComisionesSpigaVO AS ComisionesSpigaVO_1
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS CedulaVendedor,
                             (SELECT        MAX(NombreVendedor) AS NombreVendedor
                               FROM            dbo.ComisionesSpigaVO AS ComisionesSpigaVO_2
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS NombreVendedor,
                             (SELECT        MAX(Gama) AS Gama
                               FROM            dbo.ComisionesSpigaVO AS ComisionesSpigaVO_3
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS Gama,
                             (SELECT        MAX(Modelo) AS Modelo
                               FROM            dbo.ComisionesSpigaVO AS ComisionesSpigaVO_4
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS Modelo, 
                         dbo.ComisionesSpigaNotasCredito.NumeroNotaCredito, dbo.VehiculosVIN.ComisionRecaudoBloqueada, dbo.VehiculosVIN.ComisionProductividadBloqueada, VIN_PAGADOS.VIN AS VIN_Pagado
FROM            

(
SELECT       
YEAR(MAX(DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1))) AS Ano_Periodo, 
MONTH(MAX(DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1))) AS Mes_Periodo, 
1 AS Dia_Periodo, 
MAX(CodigoEmpresaSugerido) AS CodigoEmpresaSugerido, 
MAX(EmpresaSugerida) AS EmpresaSugerida, 
MAX(CodigoCentro) AS CodigoCentro, 
MAX(Centro) AS Centro, 
MAX(FechaFactura) AS FechaFactura, 
MAX(NumeroFactura) AS NumeroFactura, 
MAX(TotalFactura) AS TotalFactura, 
ISNULL(MAX(CuotaReteFuente), 0) AS CuotaReteFuente, 
SUM(ImporteEfecto) AS ImporteEfecto, 
CASE 
WHEN (MAX(TotalFactura) - ISNULL(MAX(CuotaReteFuente), 0)) <> 0 
THEN SUM(ImporteEfecto) * 100 / (MAX(TotalFactura) - ISNULL(MAX(CuotaReteFuente), 0)) 
ELSE 0 
END AS PorcentajeRecaudo, 
MAX(VIN) AS VIN, 
MAX(Nitcliente) AS Nitcliente, 
MAX(NombreCliente) AS NombreCliente

                          --JCS:2024/03/08 - AHORA SE VALIDA LA COLUMNA FechaSaldado_Ajustado
						  --FROM            dbo.ComisionesSpigaVOFactura
						  FROM            dbo.vw_ComisionesSpigaVOFactura_Pre
                          GROUP BY CodigoEmpresaSugerido, EmpresaSugerida, CodigoCentro, FechaFactura, NumeroFactura, VIN) AS RESULTADO LEFT OUTER JOIN
                             (SELECT DISTINCT VIN
                               FROM            dbo.Liquidaciones_ComercialVNPorCom_Detalle
                               WHERE        (VIN IS NOT NULL)) AS VIN_PAGADOS ON RESULTADO.VIN = VIN_PAGADOS.VIN LEFT OUTER JOIN
                         dbo.VehiculosVIN ON RESULTADO.VIN = dbo.VehiculosVIN.VIN LEFT OUTER JOIN

                         dbo.ComisionesSpigaNotasCredito 
						 ON 
						 RESULTADO.CodigoEmpresaSugerido = dbo.ComisionesSpigaNotasCredito.CodigoEmpresaSugerido 
						 AND RESULTADO.CodigoCentro = dbo.ComisionesSpigaNotasCredito.CodigoCentro 
						 AND RESULTADO.NumeroFactura = dbo.ComisionesSpigaNotasCredito.NumeroFactura
						 AND RESULTADO.VIN = dbo.ComisionesSpigaNotasCredito.VIN

WHERE        

(NOT (RESULTADO.Centro LIKE N'VO%')) 

--JCS:20240213 - AHORA APLICA PARA TODOS LOS CENTROS
--AND 
--(RESULTADO.Centro LIKE N'DAI%' OR RESULTADO.Centro LIKE N'VW%' OR RESULTADO.Centro LIKE N'MIT%')



```
