# View: vw_RepuestosV2_Bolsas_Administrativa_5

## Usa los objetos:
- [[vw_RepuestosV2_Bolsas_Administrativa_3]]
- [[vw_RepuestosV2_Bolsas_Administrativa_4]]

```sql





CREATE VIEW [dbo].[vw_RepuestosV2_Bolsas_Administrativa_5]
AS


SELECT *,

CASE 
WHEN ValorBolsaOtroCargo < TopeMaximoBolsa THEN ValorBolsaOtroCargo
ELSE TopeMaximoBolsa
END AS
Comision

 FROM
(


SELECT        dbo.vw_RepuestosV2_Bolsas_Administrativa_3.Ano_Periodo, dbo.vw_RepuestosV2_Bolsas_Administrativa_3.Mes_Periodo, dbo.vw_RepuestosV2_Bolsas_Administrativa_3.CodigoEmpleado, dbo.vw_RepuestosV2_Bolsas_Administrativa_3.CedulaVendedorRepuestos,
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_3.Empleado, dbo.vw_RepuestosV2_Bolsas_Administrativa_3.FechaRetiro, dbo.vw_RepuestosV2_Bolsas_Administrativa_3.CodigoEmpresa, dbo.vw_RepuestosV2_Bolsas_Administrativa_3.NombreEmpresa, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_3.CodigoCargo, dbo.vw_RepuestosV2_Bolsas_Administrativa_3.NombreCargo, dbo.vw_RepuestosV2_Bolsas_Administrativa_3.cod_marca, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_3.nombre_marca, dbo.vw_RepuestosV2_Bolsas_Administrativa_3.CodigoCentro, dbo.vw_RepuestosV2_Bolsas_Administrativa_3.NombreCentro, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_3.CantidadEmpleados, dbo.vw_RepuestosV2_Bolsas_Administrativa_3.TopeMaximoBolsa, dbo.vw_RepuestosV2_Bolsas_Administrativa_3.PesoAsignadoBolsa, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_3.PesoTotal, dbo.vw_RepuestosV2_Bolsas_Administrativa_4.PesoTotalConsolidado, 
                         CASE WHEN dbo.vw_RepuestosV2_Bolsas_Administrativa_4.PesoTotalConsolidado <> 0 THEN dbo.vw_RepuestosV2_Bolsas_Administrativa_3.PesoTotal / dbo.vw_RepuestosV2_Bolsas_Administrativa_4.PesoTotalConsolidado
                          ELSE 0 END AS Distribucion, ISNULL(dbo.vw_RepuestosV2_Bolsas_Administrativa_3.ValorBolsa, 0) AS ValorBolsa, ISNULL(dbo.vw_RepuestosV2_Bolsas_Administrativa_3.Faltantes, 0) AS Faltantes, 
                         ISNULL(dbo.vw_RepuestosV2_Bolsas_Administrativa_3.PesoBolsaOtroCargo, 0) AS PesoBolsaOtroCargo, (ISNULL(dbo.vw_RepuestosV2_Bolsas_Administrativa_3.ValorBolsa, 0) 
                         - ISNULL(dbo.vw_RepuestosV2_Bolsas_Administrativa_3.Faltantes / 2, 0)) * ISNULL(dbo.vw_RepuestosV2_Bolsas_Administrativa_3.PesoBolsaOtroCargo / 100, 0) 
                         * (CASE WHEN dbo.vw_RepuestosV2_Bolsas_Administrativa_4.PesoTotalConsolidado <> 0 THEN dbo.vw_RepuestosV2_Bolsas_Administrativa_3.PesoTotal / dbo.vw_RepuestosV2_Bolsas_Administrativa_4.PesoTotalConsolidado
                          ELSE 0 END) AS ValorBolsaOtroCargo
FROM            dbo.vw_RepuestosV2_Bolsas_Administrativa_3 LEFT OUTER JOIN
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_4 ON dbo.vw_RepuestosV2_Bolsas_Administrativa_3.CodigoCentro = dbo.vw_RepuestosV2_Bolsas_Administrativa_4.CodigoCentro AND 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_3.cod_marca = dbo.vw_RepuestosV2_Bolsas_Administrativa_4.cod_marca AND 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_3.CodigoEmpresa = dbo.vw_RepuestosV2_Bolsas_Administrativa_4.CodigoEmpresa AND 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_3.Mes_Periodo = dbo.vw_RepuestosV2_Bolsas_Administrativa_4.Mes_Periodo AND 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_3.Ano_Periodo = dbo.vw_RepuestosV2_Bolsas_Administrativa_4.Ano_Periodo

)
AS VALOR_BOLSA_VENDEDOR


```
