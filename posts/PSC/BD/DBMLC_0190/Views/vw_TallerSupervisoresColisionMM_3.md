# View: vw_TallerSupervisoresColisionMM_3

## Usa los objetos:
- [[vw_TallerSupervisoresColisionMM_1]]
- [[vw_TallerSupervisoresColisionMM_2]]
- [[vw_VariablesVersiones]]

```sql
CREATE VIEW [dbo].[vw_TallerSupervisoresColisionMM_3]
AS
SELECT        ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.Ano_Periodo, dbo.vw_TallerSupervisoresColisionMM_2.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.Mes_Periodo, 
                         dbo.vw_TallerSupervisoresColisionMM_2.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.CodigoEmpresa, dbo.vw_TallerSupervisoresColisionMM_2.CodigoEmpresa) AS CodigoEmpresa, 
                         ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.CodigoCentro, dbo.vw_TallerSupervisoresColisionMM_2.CodigoCentro) AS CodigoCentro, ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.Centro, 
                         dbo.vw_TallerSupervisoresColisionMM_2.Centro) AS Centro, ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.NumeroFacturaTaller, dbo.vw_TallerSupervisoresColisionMM_2.NumeroFacturaTaller) AS NumeroFacturaTaller, 
                         ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.NumOT, dbo.vw_TallerSupervisoresColisionMM_2.NumOT) AS NumOT, ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.FechaFactura, 
                         dbo.vw_TallerSupervisoresColisionMM_2.FechaFactura) AS FechaFactura, ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.ValorTotalFactura, dbo.vw_TallerSupervisoresColisionMM_2.ValorTotalFactura) AS ValorTotalFactura, 
                         ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.ImporteEfecto, dbo.vw_TallerSupervisoresColisionMM_2.ImporteEfecto) AS ImporteEfecto, ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.PorcentajeRecaudo, 
                         dbo.vw_TallerSupervisoresColisionMM_2.PorcentajeRecaudo) AS PorcentajeRecaudo, [VAR].ValorVariable, ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.ValorNeto_MAT, 0) AS ValorNeto_MAT, 
                         ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.ValorBase_MAT, 0) AS ValorBase_MAT, ISNULL(dbo.vw_TallerSupervisoresColisionMM_2.ValorNeto_MO, 0) AS ValorNeto_MO, 
                         ISNULL(dbo.vw_TallerSupervisoresColisionMM_2.ValorBase_MO, 0) AS ValorBase_MO, ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.ValorBase_MAT, 0) 
                         * ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.PorcentajeRecaudo, dbo.vw_TallerSupervisoresColisionMM_2.PorcentajeRecaudo) / 100 AS ValorBase_MAT_Recaudo, 
                         ISNULL(dbo.vw_TallerSupervisoresColisionMM_2.ValorBase_MO, 0) * ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.PorcentajeRecaudo, dbo.vw_TallerSupervisoresColisionMM_2.PorcentajeRecaudo) 
                         / 100 AS ValorBase_MO_Recaudo, (ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.ValorBase_MAT, 0) * ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.PorcentajeRecaudo, 
                         dbo.vw_TallerSupervisoresColisionMM_2.PorcentajeRecaudo) / 100 + ISNULL(dbo.vw_TallerSupervisoresColisionMM_2.ValorBase_MO, 0) * ISNULL(dbo.vw_TallerSupervisoresColisionMM_1.PorcentajeRecaudo, 
                         dbo.vw_TallerSupervisoresColisionMM_2.PorcentajeRecaudo) / 100) * [VAR].ValorVariable AS ValorNeto_TOTAL
FROM            dbo.vw_TallerSupervisoresColisionMM_1 FULL OUTER JOIN
                         dbo.vw_TallerSupervisoresColisionMM_2 ON dbo.vw_TallerSupervisoresColisionMM_1.NumOT = dbo.vw_TallerSupervisoresColisionMM_2.NumOT AND 
                         dbo.vw_TallerSupervisoresColisionMM_1.Centro = dbo.vw_TallerSupervisoresColisionMM_2.Centro AND dbo.vw_TallerSupervisoresColisionMM_1.Ano_Periodo = dbo.vw_TallerSupervisoresColisionMM_2.Ano_Periodo AND 
                         dbo.vw_TallerSupervisoresColisionMM_1.Mes_Periodo = dbo.vw_TallerSupervisoresColisionMM_2.Mes_Periodo AND 
                         dbo.vw_TallerSupervisoresColisionMM_1.CodigoEmpresa = dbo.vw_TallerSupervisoresColisionMM_2.CodigoEmpresa AND 
                         dbo.vw_TallerSupervisoresColisionMM_1.NumeroFacturaTaller = dbo.vw_TallerSupervisoresColisionMM_2.NumeroFacturaTaller CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 18)) AS [VAR]


```
