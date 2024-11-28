# View: vw_RepuestosVendedoresComisionesMM_4

## Usa los objetos:
- [[vw_RepuestosVendedoresComisionesMM_2]]
- [[vw_RepuestosVendedoresComisionesMM_3]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesMM_4]
AS
SELECT        ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_2.Ano_Periodo, dbo.vw_RepuestosVendedoresComisionesMM_3.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_2.Mes_Periodo, 
                         dbo.vw_RepuestosVendedoresComisionesMM_3.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_2.CodigoEmpresa, dbo.vw_RepuestosVendedoresComisionesMM_3.CodigoEmpresa) 
                         AS CodigoEmpresa, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_2.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresComisionesMM_3.CedulaVendedorRepuestos) AS CedulaVendedorRepuestos, 
                         ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_2.ValorVariable, dbo.vw_RepuestosVendedoresComisionesMM_3.ValorVariable) AS ValorVariable, 
                         ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_2.ValorBaseMostrador, 0) AS ValorBaseMostrador, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_2.ComisionMostrador, 0) AS ComisionMostrador, 
                         ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_3.ValorBaseTaller, 0) AS ValorBaseTaller, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_3.ComisionTaller, 0) AS ComisionTaller, 
                         ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_2.ComisionMostrador, 0) + ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_3.ComisionTaller, 0) AS Comision
FROM            dbo.vw_RepuestosVendedoresComisionesMM_2 FULL OUTER JOIN
                         dbo.vw_RepuestosVendedoresComisionesMM_3 ON dbo.vw_RepuestosVendedoresComisionesMM_2.Ano_Periodo = dbo.vw_RepuestosVendedoresComisionesMM_3.Ano_Periodo AND 
                         dbo.vw_RepuestosVendedoresComisionesMM_2.Mes_Periodo = dbo.vw_RepuestosVendedoresComisionesMM_3.Mes_Periodo AND 
                         dbo.vw_RepuestosVendedoresComisionesMM_2.CodigoEmpresa = dbo.vw_RepuestosVendedoresComisionesMM_3.CodigoEmpresa AND 
                         dbo.vw_RepuestosVendedoresComisionesMM_2.CedulaVendedorRepuestos = dbo.vw_RepuestosVendedoresComisionesMM_3.CedulaVendedorRepuestos



```
