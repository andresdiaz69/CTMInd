# View: vw_RepuestosVendedoresComisionesRenault_4

## Usa los objetos:
- [[vw_RepuestosVendedoresComisionesRenault_2]]
- [[vw_RepuestosVendedoresComisionesRenault_3]]

```sql



CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesRenault_4]
AS
SELECT        ISNULL(dbo.vw_RepuestosVendedoresComisionesRenault_2.Ano_Periodo, dbo.vw_RepuestosVendedoresComisionesRenault_3.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_RepuestosVendedoresComisionesRenault_2.Mes_Periodo, 
                         dbo.vw_RepuestosVendedoresComisionesRenault_3.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_RepuestosVendedoresComisionesRenault_2.CodigoEmpresa, dbo.vw_RepuestosVendedoresComisionesRenault_3.CodigoEmpresa) 
                         AS CodigoEmpresa, ISNULL(dbo.vw_RepuestosVendedoresComisionesRenault_2.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresComisionesRenault_3.CedulaVendedorRepuestos) AS CedulaVendedorRepuestos,
                         ISNULL(dbo.vw_RepuestosVendedoresComisionesRenault_2.ValorBaseMostrador, 0) AS ValorBaseMostrador,  
                         ISNULL(dbo.vw_RepuestosVendedoresComisionesRenault_3.ValorBaseTaller, 0) AS ValorBaseTaller
FROM            dbo.vw_RepuestosVendedoresComisionesRenault_2 FULL OUTER JOIN
                         dbo.vw_RepuestosVendedoresComisionesRenault_3 ON dbo.vw_RepuestosVendedoresComisionesRenault_2.Ano_Periodo = dbo.vw_RepuestosVendedoresComisionesRenault_3.Ano_Periodo AND 
                         dbo.vw_RepuestosVendedoresComisionesRenault_2.Mes_Periodo = dbo.vw_RepuestosVendedoresComisionesRenault_3.Mes_Periodo AND 
                         dbo.vw_RepuestosVendedoresComisionesRenault_2.CodigoEmpresa = dbo.vw_RepuestosVendedoresComisionesRenault_3.CodigoEmpresa AND 
                         dbo.vw_RepuestosVendedoresComisionesRenault_2.CedulaVendedorRepuestos = dbo.vw_RepuestosVendedoresComisionesRenault_3.CedulaVendedorRepuestos








```