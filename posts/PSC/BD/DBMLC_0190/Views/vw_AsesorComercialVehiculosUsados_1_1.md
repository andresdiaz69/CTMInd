# View: vw_AsesorComercialVehiculosUsados_1_1

## Usa los objetos:
- [[ComisionesSpigaNotasCreditoVO]]
- [[ComisionesSpigaVO]]

```sql





CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsados_1_1]
AS

SELECT        ComisionesSpigaVO.Ano_Periodo, ComisionesSpigaVO.Mes_Periodo, ComisionesSpigaVO.CedulaVendedor AS CodigoEmpleado, COUNT(ComisionesSpigaVO.EntregaEfectiva) AS CantidadEntregas, 
                         SUM(ComisionesSpigaVO.TotalFactura - ComisionesSpigaVO.ImporteImpuestos) AS TotalFacturas
FROM            ComisionesSpigaVO LEFT OUTER JOIN
                         ComisionesSpigaNotasCreditoVO ON ComisionesSpigaVO.NumeroFactura = ComisionesSpigaNotasCreditoVO.NumeroFactura AND ComisionesSpigaVO.CodigoCentro = ComisionesSpigaNotasCreditoVO.CodigoCentro AND 
                         ComisionesSpigaVO.Codigoempresa = ComisionesSpigaNotasCreditoVO.CodigoEmpresa
WHERE        (ComisionesSpigaVO.EntregaEfectiva = 1) AND (ComisionesSpigaNotasCreditoVO.NumeroNotaCredito IS NULL)
GROUP BY ComisionesSpigaVO.Ano_Periodo, ComisionesSpigaVO.Mes_Periodo, ComisionesSpigaVO.CedulaVendedor


```
