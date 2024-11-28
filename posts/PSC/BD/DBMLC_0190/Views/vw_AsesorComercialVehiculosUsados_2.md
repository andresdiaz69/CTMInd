# View: vw_AsesorComercialVehiculosUsados_2

## Usa los objetos:
- [[ComisionesSpigaNotasCreditoVO]]
- [[ComisionesSpigaVO]]

```sql


CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsados_2]
AS

SELECT Ano_Periodo, Mes_Periodo, CodigoEmpleado, CantidadEntregas, TotalFacturas, PromedioFacturas, Valor_IncentivoVolumenUnitario, CantidadEntregas * Valor_IncentivoVolumenUnitario AS Valor_IncentivoVolumen
FROM

(

SELECT *,

CASE 

WHEN (PromedioFacturas > 0 AND PromedioFacturas <= 25000000) AND (CantidadEntregas > 0 AND CantidadEntregas <= 4) THEN 25000
WHEN (PromedioFacturas > 0 AND PromedioFacturas <= 25000000) AND (CantidadEntregas > 4 AND CantidadEntregas <= 6) THEN 50000
WHEN (PromedioFacturas > 0 AND PromedioFacturas <= 25000000) AND (CantidadEntregas > 6 AND CantidadEntregas <= 8) THEN 62500
WHEN (PromedioFacturas > 0 AND PromedioFacturas <= 25000000) AND (CantidadEntregas > 8) THEN 87500

WHEN (PromedioFacturas > 25000000 AND PromedioFacturas <= 32000000) AND (CantidadEntregas > 0 AND CantidadEntregas <= 4) THEN 30000
WHEN (PromedioFacturas > 25000000 AND PromedioFacturas <= 32000000) AND (CantidadEntregas > 4 AND CantidadEntregas <= 6) THEN 60000
WHEN (PromedioFacturas > 25000000 AND PromedioFacturas <= 32000000) AND (CantidadEntregas > 6 AND CantidadEntregas <= 8) THEN 75000
WHEN (PromedioFacturas > 25000000 AND PromedioFacturas <= 32000000) AND (CantidadEntregas > 8) THEN 105000

WHEN (PromedioFacturas > 32000000 AND PromedioFacturas <= 42000000) AND (CantidadEntregas > 0 AND CantidadEntregas <= 4) THEN 37000
WHEN (PromedioFacturas > 32000000 AND PromedioFacturas <= 42000000) AND (CantidadEntregas > 4 AND CantidadEntregas <= 6) THEN 74000
WHEN (PromedioFacturas > 32000000 AND PromedioFacturas <= 42000000) AND (CantidadEntregas > 6 AND CantidadEntregas <= 8) THEN 92500
WHEN (PromedioFacturas > 32000000 AND PromedioFacturas <= 42000000) AND (CantidadEntregas > 8) THEN 129500

WHEN (PromedioFacturas > 42000000 AND PromedioFacturas <= 200000000) AND (CantidadEntregas > 0 AND CantidadEntregas <= 4) THEN 48000
WHEN (PromedioFacturas > 42000000 AND PromedioFacturas <= 200000000) AND (CantidadEntregas > 4 AND CantidadEntregas <= 6) THEN 96000
WHEN (PromedioFacturas > 42000000 AND PromedioFacturas <= 200000000) AND (CantidadEntregas > 6 AND CantidadEntregas <= 8) THEN 120000
WHEN (PromedioFacturas > 42000000 AND PromedioFacturas <= 200000000) AND (CantidadEntregas > 8) THEN 168000

ELSE 0
END AS Valor_IncentivoVolumenUnitario


 FROM
(

SELECT        ComisionesSpigaVO.Ano_Periodo, ComisionesSpigaVO.Mes_Periodo, ComisionesSpigaVO.CedulaVendedor AS CodigoEmpleado, COUNT(ComisionesSpigaVO.EntregaEfectiva) AS CantidadEntregas, 
                         SUM(ComisionesSpigaVO.TotalFactura - ComisionesSpigaVO.ImporteImpuestos) AS TotalFacturas, SUM(ComisionesSpigaVO.TotalFactura - ComisionesSpigaVO.ImporteImpuestos) / COUNT(ComisionesSpigaVO.EntregaEfectiva) 
                         AS PromedioFacturas
FROM            ComisionesSpigaVO LEFT OUTER JOIN
                         ComisionesSpigaNotasCreditoVO ON ComisionesSpigaVO.NumeroFactura = ComisionesSpigaNotasCreditoVO.NumeroFactura AND ComisionesSpigaVO.CodigoCentro = ComisionesSpigaNotasCreditoVO.CodigoCentro AND 
                         ComisionesSpigaVO.Codigoempresa = ComisionesSpigaNotasCreditoVO.CodigoEmpresa
WHERE        (ComisionesSpigaVO.EntregaEfectiva = 1) AND (ComisionesSpigaNotasCreditoVO.NumeroNotaCredito IS NULL)
GROUP BY ComisionesSpigaVO.Ano_Periodo, ComisionesSpigaVO.Mes_Periodo, ComisionesSpigaVO.CedulaVendedor

)
AS RESULTADO

) AS TOTALIZACION


```
