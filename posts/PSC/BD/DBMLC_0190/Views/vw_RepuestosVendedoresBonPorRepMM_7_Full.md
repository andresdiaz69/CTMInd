# View: vw_RepuestosVendedoresBonPorRepMM_7_Full

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_RepuestosVendedoresBonPorRepMM_5_Full]]
- [[vw_RepuestosVendedoresBonPorRepMM_6_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_7_Full]
AS
SELECT        VENDEDORES.Ano_Periodo, VENDEDORES.Mes_Periodo, VENDEDORES.CodigoEmpresa, VENDEDORES.CedulaVendedorRepuestos, VENDEDORES.CodigoSede, VENDEDORES.NombreSede, 
                         VENDEDORES.Presupuesto, VENDEDORES.Presupuesto_Sede, VENDEDORES.CumplimientoAl15_OT, VENDEDORES.CumplimientoAl15_OT_Sede, VENDEDORES.CumplimientoAl15_AL, 
                         VENDEDORES.CumplimientoAl15_AL_Sede, VENDEDORES.CumplimientoAl15, VENDEDORES.CumplimientoAl15_Sede, VENDEDORES.CumplimientoAl30_OT, VENDEDORES.CumplimientoAl30_OT_Sede, 
                         VENDEDORES.CumplimientoAl30_AL, VENDEDORES.CumplimientoAl30_AL_Sede, VENDEDORES.CumplimientoAl30, VENDEDORES.CumplimientoAl30_Sede, VENDEDORES.PorcentajeCumplimientoAl15, 
                         VENDEDORES.PorcentajeCumplimientoAl30, VENDEDORES.PorcentajeCumplimientoAl15_Sede, VENDEDORES.PorcentajeCumplimientoAl30_Sede
FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.RangosMaestras ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.RangosMaestras.IdRangoMaestra RIGHT OUTER JOIN
                             (SELECT        ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Ano_Periodo) AS Ano_Periodo, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Mes_Periodo) AS Mes_Periodo, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CodigoEmpresa, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CodigoEmpresa) AS CodigoEmpresa, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CedulaVendedorRepuestos) AS CedulaVendedorRepuestos, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CodigoSede, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CodigoSede) AS CodigoSede, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.NombreSede, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.NombreSede) AS NombreSede, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Presupuesto, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Presupuesto) AS Presupuesto, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Presupuesto_Sede, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Presupuesto_Sede) AS Presupuesto_Sede, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CumplimientoAl15_OT, 0) AS CumplimientoAl15_OT, ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CumplimientoAl15_OT_Sede, 
                                                         0) AS CumplimientoAl15_OT_Sede, ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CumplimientoAl15_AL, 0) AS CumplimientoAl15_AL, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CumplimientoAl15_AL_Sede, 0) AS CumplimientoAl15_AL_Sede, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CumplimientoAl15_OT, 0) + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CumplimientoAl15_AL, 0) AS CumplimientoAl15, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CumplimientoAl15_OT_Sede, 0) + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CumplimientoAl15_AL_Sede, 0) 
                                                         AS CumplimientoAl15_Sede, ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CumplimientoAl30_OT, 0) AS CumplimientoAl30_OT, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CumplimientoAl30_OT_Sede, 0) AS CumplimientoAl30_OT_Sede, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CumplimientoAl30_AL, 0) AS CumplimientoAl30_AL, ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CumplimientoAl30_AL_Sede, 
                                                         0) AS CumplimientoAl30_AL_Sede, ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CumplimientoAl30_OT, 0) 
                                                         + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CumplimientoAl30_AL, 0) AS CumplimientoAl30, ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CumplimientoAl30_OT_Sede, 0) 
                                                         + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CumplimientoAl30_AL_Sede, 0) AS CumplimientoAl30_Sede, 
                                                         CASE WHEN ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Presupuesto, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Presupuesto) 
                                                         > 0 THEN (ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CumplimientoAl15_OT, 0) + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CumplimientoAl15_AL, 0)) 
                                                         * 100 / ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Presupuesto, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Presupuesto) ELSE 0 END AS PorcentajeCumplimientoAl15, 
                                                         CASE WHEN ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Presupuesto, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Presupuesto) 
                                                         > 0 THEN (ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CumplimientoAl30_OT, 0) + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CumplimientoAl30_AL, 0)) 
                                                         * 100 / ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Presupuesto, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Presupuesto) ELSE 0 END AS PorcentajeCumplimientoAl30, 
                                                         CASE WHEN ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Presupuesto_Sede, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Presupuesto_Sede) 
                                                         > 0 THEN (ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CumplimientoAl15_OT_Sede, 0) + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CumplimientoAl15_AL_Sede, 0)) 
                                                         * 100 / ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Presupuesto_Sede, dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Presupuesto_Sede) 
                                                         ELSE 0 END AS PorcentajeCumplimientoAl15_Sede, CASE WHEN ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Presupuesto_Sede, 
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Presupuesto_Sede) > 0 THEN (ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CumplimientoAl30_OT_Sede, 0) 
                                                         + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CumplimientoAl30_AL_Sede, 0)) * 100 / ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Presupuesto_Sede, 
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Presupuesto_Sede) ELSE 0 END AS PorcentajeCumplimientoAl30_Sede
                               FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full FULL OUTER JOIN
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full ON dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CodigoEmpresa = dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CodigoEmpresa AND 
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CodigoSede = dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CodigoSede AND 
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.CedulaVendedorRepuestos = dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.CedulaVendedorRepuestos AND 
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Ano_Periodo = dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Ano_Periodo AND 
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_6_Full.Mes_Periodo = dbo.vw_RepuestosVendedoresBonPorRepMM_5_Full.Mes_Periodo) AS VENDEDORES ON 
                         dbo.Empleados.CodigoEmpleado = VENDEDORES.CedulaVendedorRepuestos
WHERE        (dbo.RangosMaestras.IdComisionModeloSub = 8)

```
