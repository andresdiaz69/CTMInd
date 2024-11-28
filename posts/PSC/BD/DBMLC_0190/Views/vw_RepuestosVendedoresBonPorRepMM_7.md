# View: vw_RepuestosVendedoresBonPorRepMM_7

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_RepuestosVendedoresBonPorRepMM_5]]
- [[vw_RepuestosVendedoresBonPorRepMM_6]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_7]
AS
SELECT        VENDEDORES.Ano_Periodo, VENDEDORES.Mes_Periodo, VENDEDORES.CodigoEmpresa, VENDEDORES.CedulaVendedorRepuestos, VENDEDORES.CodigoSede, VENDEDORES.NombreSede, 
                         VENDEDORES.Presupuesto, VENDEDORES.Presupuesto_Sede, VENDEDORES.CumplimientoAl15_OT, VENDEDORES.CumplimientoAl15_OT_Sede, VENDEDORES.CumplimientoAl15_AL, 
                         VENDEDORES.CumplimientoAl15_AL_Sede, VENDEDORES.CumplimientoAl15, VENDEDORES.CumplimientoAl15_Sede, VENDEDORES.CumplimientoAl30_OT, VENDEDORES.CumplimientoAl30_OT_Sede, 
                         VENDEDORES.CumplimientoAl30_AL, VENDEDORES.CumplimientoAl30_AL_Sede, VENDEDORES.CumplimientoAl30, VENDEDORES.CumplimientoAl30_Sede, VENDEDORES.PorcentajeCumplimientoAl15, 
                         VENDEDORES.PorcentajeCumplimientoAl30, VENDEDORES.PorcentajeCumplimientoAl15_Sede, VENDEDORES.PorcentajeCumplimientoAl30_Sede
FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.RangosMaestras ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.RangosMaestras.IdRangoMaestra RIGHT OUTER JOIN
                             (SELECT        ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_6.Ano_Periodo) AS Ano_Periodo, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_6.Mes_Periodo) AS Mes_Periodo, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CodigoEmpresa, dbo.vw_RepuestosVendedoresBonPorRepMM_6.CodigoEmpresa) AS CodigoEmpresa, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresBonPorRepMM_6.CedulaVendedorRepuestos) AS CedulaVendedorRepuestos, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CodigoSede, dbo.vw_RepuestosVendedoresBonPorRepMM_6.CodigoSede) AS CodigoSede, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.NombreSede, dbo.vw_RepuestosVendedoresBonPorRepMM_6.NombreSede) AS NombreSede, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.Presupuesto, dbo.vw_RepuestosVendedoresBonPorRepMM_6.Presupuesto) AS Presupuesto, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.Presupuesto_Sede, dbo.vw_RepuestosVendedoresBonPorRepMM_6.Presupuesto_Sede) AS Presupuesto_Sede, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CumplimientoAl15_OT, 0) AS CumplimientoAl15_OT, ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CumplimientoAl15_OT_Sede, 
                                                         0) AS CumplimientoAl15_OT_Sede, ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6.CumplimientoAl15_AL, 0) AS CumplimientoAl15_AL, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6.CumplimientoAl15_AL_Sede, 0) AS CumplimientoAl15_AL_Sede, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CumplimientoAl15_OT, 0) + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6.CumplimientoAl15_AL, 0) AS CumplimientoAl15, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CumplimientoAl15_OT_Sede, 0) + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6.CumplimientoAl15_AL_Sede, 0) 
                                                         AS CumplimientoAl15_Sede, ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CumplimientoAl30_OT, 0) AS CumplimientoAl30_OT, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CumplimientoAl30_OT_Sede, 0) AS CumplimientoAl30_OT_Sede, 
                                                         ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6.CumplimientoAl30_AL, 0) AS CumplimientoAl30_AL, ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6.CumplimientoAl30_AL_Sede, 
                                                         0) AS CumplimientoAl30_AL_Sede, ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CumplimientoAl30_OT, 0) 
                                                         + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6.CumplimientoAl30_AL, 0) AS CumplimientoAl30, ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CumplimientoAl30_OT_Sede, 0) 
                                                         + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6.CumplimientoAl30_AL_Sede, 0) AS CumplimientoAl30_Sede, 
                                                         CASE WHEN ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.Presupuesto, dbo.vw_RepuestosVendedoresBonPorRepMM_6.Presupuesto) 
                                                         > 0 THEN (ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CumplimientoAl15_OT, 0) + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6.CumplimientoAl15_AL, 0)) 
                                                         * 100 / ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.Presupuesto, dbo.vw_RepuestosVendedoresBonPorRepMM_6.Presupuesto) ELSE 0 END AS PorcentajeCumplimientoAl15, 
                                                         CASE WHEN ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.Presupuesto, dbo.vw_RepuestosVendedoresBonPorRepMM_6.Presupuesto) 
                                                         > 0 THEN (ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CumplimientoAl30_OT, 0) + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6.CumplimientoAl30_AL, 0)) 
                                                         * 100 / ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.Presupuesto, dbo.vw_RepuestosVendedoresBonPorRepMM_6.Presupuesto) ELSE 0 END AS PorcentajeCumplimientoAl30, 
                                                         CASE WHEN ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.Presupuesto_Sede, dbo.vw_RepuestosVendedoresBonPorRepMM_6.Presupuesto_Sede) 
                                                         > 0 THEN (ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CumplimientoAl15_OT_Sede, 0) + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6.CumplimientoAl15_AL_Sede, 0)) 
                                                         * 100 / ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.Presupuesto_Sede, dbo.vw_RepuestosVendedoresBonPorRepMM_6.Presupuesto_Sede) 
                                                         ELSE 0 END AS PorcentajeCumplimientoAl15_Sede, CASE WHEN ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.Presupuesto_Sede, 
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_6.Presupuesto_Sede) > 0 THEN (ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.CumplimientoAl30_OT_Sede, 0) 
                                                         + ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_6.CumplimientoAl30_AL_Sede, 0)) * 100 / ISNULL(dbo.vw_RepuestosVendedoresBonPorRepMM_5.Presupuesto_Sede, 
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_6.Presupuesto_Sede) ELSE 0 END AS PorcentajeCumplimientoAl30_Sede
                               FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_6 FULL OUTER JOIN
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_5 ON dbo.vw_RepuestosVendedoresBonPorRepMM_6.CodigoEmpresa = dbo.vw_RepuestosVendedoresBonPorRepMM_5.CodigoEmpresa AND 
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_6.CodigoSede = dbo.vw_RepuestosVendedoresBonPorRepMM_5.CodigoSede AND 
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_6.CedulaVendedorRepuestos = dbo.vw_RepuestosVendedoresBonPorRepMM_5.CedulaVendedorRepuestos AND 
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_6.Ano_Periodo = dbo.vw_RepuestosVendedoresBonPorRepMM_5.Ano_Periodo AND 
                                                         dbo.vw_RepuestosVendedoresBonPorRepMM_6.Mes_Periodo = dbo.vw_RepuestosVendedoresBonPorRepMM_5.Mes_Periodo) AS VENDEDORES ON 
                         dbo.Empleados.CodigoEmpleado = VENDEDORES.CedulaVendedorRepuestos
WHERE        (dbo.RangosMaestras.IdComisionModeloSub = 8)

```
