# View: vw_TallerAsesoresYSupervisoresCT_4_Detalle

## Usa los objetos:
- [[vw_TallerAsesoresYSupervisoresCT_2_Detalle]]
- [[vw_TallerAsesoresYSupervisoresCT_3_Detalle]]

```sql
CREATE VIEW [dbo].[vw_TallerAsesoresYSupervisoresCT_4_Detalle]
AS
SELECT        ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.Ano_Periodo, dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.Ano_Periodo) AS Ano_Periodo, 
                         ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.Mes_Periodo, dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.Mes_Periodo) AS Mes_Periodo, 
                         ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.CodigoEmpresa, dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.CodigoEmpresa) AS CodigoEmpresa, 
                         ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.CedulaAsesorServicioResponsable, dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.CedulaAsesorServicioResponsable) AS CedulaAsesorServicioResponsable, 
                         ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.NumeroFacturaTaller, dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.NumeroFacturaTaller) AS NumeroFacturaTaller, 
                         ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.NumOT, dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.NumOT) AS NumOT, ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.ValorVariable, 
                         dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.ValorVariable) AS ValorVariable, ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.ValorNeto_MAT, 0) AS ValorNeto_MAT, 
                         ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.ValorNeto_MO, 0) AS ValorNeto_MO, ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.ValorNeto_MAT, 0) 
                         + ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.ValorNeto_MO, 0) AS ValorNeto_TOTAL, ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.ValorNeto_MAT, 0) 
                         / ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.ValorVariable, dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.ValorVariable) AS ValorBase_MAT, 
                         ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.ValorNeto_MO, 0) / ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.ValorVariable, dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.ValorVariable) 
                         AS ValorBase_MO
FROM            dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle FULL OUTER JOIN
                         dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle ON dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.NumOT = dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.NumOT AND 
                         dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.ValorVariable = dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.ValorVariable AND 
                         dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.NumeroFacturaTaller = dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.NumeroFacturaTaller AND 
                         dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.CedulaAsesorServicioResponsable = dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.CedulaAsesorServicioResponsable AND 
                         dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.CodigoEmpresa = dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.CodigoEmpresa AND 
                         dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.Mes_Periodo = dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.Mes_Periodo AND 
                         dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle.Ano_Periodo = dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle.Ano_Periodo


```
