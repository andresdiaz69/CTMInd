# View: vw_TallerSupervisoresColisionMM_4

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_TallerSupervisoresColisionMM_3]]

```sql
CREATE VIEW [dbo].[vw_TallerSupervisoresColisionMM_4]
AS
SELECT        dbo.vw_TallerSupervisoresColisionMM_3.Ano_Periodo, dbo.vw_TallerSupervisoresColisionMM_3.Mes_Periodo, dbo.vw_TallerSupervisoresColisionMM_3.CodigoEmpresa, 
                         dbo.vw_TallerSupervisoresColisionMM_3.CodigoCentro, dbo.vw_TallerSupervisoresColisionMM_3.Centro, SUPERVISORES.CodigoSupervisor, dbo.vw_TallerSupervisoresColisionMM_3.NumeroFacturaTaller, 
                         dbo.vw_TallerSupervisoresColisionMM_3.NumOT, dbo.vw_TallerSupervisoresColisionMM_3.FechaFactura, dbo.vw_TallerSupervisoresColisionMM_3.ValorTotalFactura, dbo.vw_TallerSupervisoresColisionMM_3.ImporteEfecto, 
                         dbo.vw_TallerSupervisoresColisionMM_3.PorcentajeRecaudo, dbo.vw_TallerSupervisoresColisionMM_3.ValorVariable, dbo.vw_TallerSupervisoresColisionMM_3.ValorNeto_MAT, 
                         dbo.vw_TallerSupervisoresColisionMM_3.ValorBase_MAT, dbo.vw_TallerSupervisoresColisionMM_3.ValorNeto_MO, dbo.vw_TallerSupervisoresColisionMM_3.ValorBase_MO, 
                         dbo.vw_TallerSupervisoresColisionMM_3.ValorBase_MAT_Recaudo, dbo.vw_TallerSupervisoresColisionMM_3.ValorBase_MO_Recaudo, dbo.vw_TallerSupervisoresColisionMM_3.ValorNeto_TOTAL
FROM            (SELECT        dbo.Empleados.CodigoEmpleado AS CodigoSupervisor
                          FROM            dbo.Empleados INNER JOIN
                                                    dbo.EmpleadosRangosMaestras ON dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                                                    dbo.RangosMaestras ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.RangosMaestras.IdRangoMaestra
                          WHERE        (dbo.RangosMaestras.IdComisionModeloSub = 20)) AS SUPERVISORES CROSS JOIN
                         dbo.vw_TallerSupervisoresColisionMM_3


```
