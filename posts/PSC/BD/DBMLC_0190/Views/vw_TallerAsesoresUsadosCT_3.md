# View: vw_TallerAsesoresUsadosCT_3

## Usa los objetos:
- [[vw_TallerAsesoresUsadosCT_1]]
- [[vw_TallerAsesoresUsadosCT_2]]
- [[vw_VariablesVersiones]]

```sql



CREATE VIEW [dbo].[vw_TallerAsesoresUsadosCT_3]
AS
SELECT        ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.Ano_Periodo, dbo.vw_TallerAsesoresUsadosCT_2.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.Mes_Periodo, dbo.vw_TallerAsesoresUsadosCT_2.Mes_Periodo) 
                         AS Mes_Periodo, ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.CodigoEmpresa, dbo.vw_TallerAsesoresUsadosCT_2.CodigoEmpresa) AS CodigoEmpresa, ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.CedulaAsesorServicioResponsable, 
                         dbo.vw_TallerAsesoresUsadosCT_2.CedulaAsesorServicioResponsable) AS CedulaAsesorServicioResponsable, ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.NumeroFacturaTaller, dbo.vw_TallerAsesoresUsadosCT_2.NumeroFacturaTaller) 
                         AS NumeroFacturaTaller, ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.FechaFactura, dbo.vw_TallerAsesoresUsadosCT_2.FechaFactura) AS FechaFactura, ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.ValorTotalFactura, 
                         dbo.vw_TallerAsesoresUsadosCT_2.ValorTotalFactura) AS ValorTotalFactura, ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.ImporteEfecto, dbo.vw_TallerAsesoresUsadosCT_2.ImporteEfecto) AS ImporteEfecto, 
                         ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.PorcentajeRecaudo, dbo.vw_TallerAsesoresUsadosCT_2.PorcentajeRecaudo) AS PorcentajeRecaudo, ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.NumOT, dbo.vw_TallerAsesoresUsadosCT_2.NumOT) 
                         AS NumOT, [VAR].ValorVariable, ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.ValorNeto_MAT, 0) AS ValorNeto_MAT, ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.ValorBase_MAT, 0) AS ValorBase_MAT, 
                         ISNULL(dbo.vw_TallerAsesoresUsadosCT_2.ValorNeto_MO, 0) AS ValorNeto_MO, ISNULL(dbo.vw_TallerAsesoresUsadosCT_2.ValorBase_MO, 0) AS ValorBase_MO, ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.ValorBase_MAT, 0) 
                         * ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.PorcentajeRecaudo, dbo.vw_TallerAsesoresUsadosCT_2.PorcentajeRecaudo) / 100 AS ValorBase_MAT_Recaudo, ISNULL(dbo.vw_TallerAsesoresUsadosCT_2.ValorBase_MO, 0) 
                         * ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.PorcentajeRecaudo, dbo.vw_TallerAsesoresUsadosCT_2.PorcentajeRecaudo) / 100 AS ValorBase_MO_Recaudo, (ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.ValorBase_MAT, 0) 
                         * ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.PorcentajeRecaudo, dbo.vw_TallerAsesoresUsadosCT_2.PorcentajeRecaudo) / 100 + ISNULL(dbo.vw_TallerAsesoresUsadosCT_2.ValorBase_MO, 0) 
                         * ISNULL(dbo.vw_TallerAsesoresUsadosCT_1.PorcentajeRecaudo, dbo.vw_TallerAsesoresUsadosCT_2.PorcentajeRecaudo) / 100) * [VAR].ValorVariable AS ValorNeto_TOTAL
FROM            dbo.vw_TallerAsesoresUsadosCT_1 FULL OUTER JOIN
                         dbo.vw_TallerAsesoresUsadosCT_2 ON dbo.vw_TallerAsesoresUsadosCT_1.NumOT = dbo.vw_TallerAsesoresUsadosCT_2.NumOT AND dbo.vw_TallerAsesoresUsadosCT_1.Ano_Periodo = dbo.vw_TallerAsesoresUsadosCT_2.Ano_Periodo AND 
                         dbo.vw_TallerAsesoresUsadosCT_1.Mes_Periodo = dbo.vw_TallerAsesoresUsadosCT_2.Mes_Periodo AND dbo.vw_TallerAsesoresUsadosCT_1.CodigoEmpresa = dbo.vw_TallerAsesoresUsadosCT_2.CodigoEmpresa AND 
                         dbo.vw_TallerAsesoresUsadosCT_1.CedulaAsesorServicioResponsable = dbo.vw_TallerAsesoresUsadosCT_2.CedulaAsesorServicioResponsable AND 
                         dbo.vw_TallerAsesoresUsadosCT_1.NumeroFacturaTaller = dbo.vw_TallerAsesoresUsadosCT_2.NumeroFacturaTaller CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 19)) AS [VAR]






```