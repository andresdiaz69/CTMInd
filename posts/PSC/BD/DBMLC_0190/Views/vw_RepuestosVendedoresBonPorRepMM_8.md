# View: vw_RepuestosVendedoresBonPorRepMM_8

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasPresupuestos]]
- [[vw_RepuestosVendedoresBonPorRepMM_7]]
- [[vw_RepuestosVendedoresBonPorRepMM_7]]

```sql


CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_8]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoSede, NombreSede, Presupuesto, Presupuesto_Sede, CumplimientoAl15_OT, CumplimientoAl15_OT_Sede, CumplimientoAl15_AL, 
                         CumplimientoAl15_AL_Sede, CumplimientoAl15, CumplimientoAl15_Sede, CumplimientoAl30_OT, CumplimientoAl30_OT_Sede, CumplimientoAl30_AL, CumplimientoAl30_AL_Sede, CumplimientoAl30, CumplimientoAl30_Sede, 
                         PorcentajeCumplimientoAl15, PorcentajeCumplimientoAl30, PorcentajeCumplimientoAl15_Sede, PorcentajeCumplimientoAl30_Sede
FROM            (SELECT        SEDES.Ano_Periodo, SEDES.Mes_Periodo, SEDES.CodigoEmpresa, JEFES.CodigoEmpleado AS CedulaVendedorRepuestos, SEDES.CodigoSede, SEDES.NombreSede, SEDES.Presupuesto, 
                                                    SEDES.Presupuesto_Sede, SEDES.CumplimientoAl15_OT, SEDES.CumplimientoAl15_OT_Sede, SEDES.CumplimientoAl15_AL, SEDES.CumplimientoAl15_AL_Sede, SEDES.CumplimientoAl15, 
                                                    SEDES.CumplimientoAl15_Sede, SEDES.CumplimientoAl30_OT, SEDES.CumplimientoAl30_OT_Sede, SEDES.CumplimientoAl30_AL, SEDES.CumplimientoAl30_AL_Sede, SEDES.CumplimientoAl30, 
                                                    SEDES.CumplimientoAl30_Sede, SEDES.PorcentajeCumplimientoAl15, SEDES.PorcentajeCumplimientoAl30, SEDES.PorcentajeCumplimientoAl15_Sede, SEDES.PorcentajeCumplimientoAl30_Sede
                          FROM            (SELECT        dbo.ExogenasPresupuestos.CodigoEmpleado, dbo.ExogenasPresupuestos.Ano, dbo.ExogenasPresupuestos.Mes, dbo.ExogenasPresupuestos.CodigoSede
                                                    FROM            dbo.ExogenasPresupuestos INNER JOIN
                                                                              dbo.Empleados ON dbo.ExogenasPresupuestos.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                                              dbo.EmpleadosRangosMaestras ON dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado
                                                    WHERE        (dbo.EmpleadosRangosMaestras.IdRangoMaestra = 34)) AS JEFES INNER JOIN
                                                        
														
														(SELECT        
														
														MAX(Ano_Periodo) AS Ano_Periodo, 														
														MAX(Mes_Periodo) AS Mes_Periodo, 
														MAX(CodigoEmpresa) AS CodigoEmpresa, 
														MAX(CodigoSede) AS CodigoSede, 
														MAX(NombreSede) AS NombreSede, 
                                                        MAX(Presupuesto_Sede) AS Presupuesto, 
														MAX(Presupuesto_Sede) AS Presupuesto_Sede, 
														MAX(CumplimientoAl15_OT_Sede) AS CumplimientoAl15_OT, 
														MAX(CumplimientoAl15_OT_Sede) AS CumplimientoAl15_OT_Sede, 
														MAX(CumplimientoAl15_AL_Sede) AS CumplimientoAl15_AL, 
														MAX(CumplimientoAl15_AL_Sede) AS CumplimientoAl15_AL_Sede, 
														MAX(CumplimientoAl15_Sede) AS CumplimientoAl15, 
														MAX(CumplimientoAl15_Sede) AS CumplimientoAl15_Sede, 
														MAX(CumplimientoAl30_OT_Sede) AS CumplimientoAl30_OT, 
														MAX(CumplimientoAl30_OT_Sede) AS CumplimientoAl30_OT_Sede, 
														MAX(CumplimientoAl30_AL_Sede) AS CumplimientoAl30_AL, 
														MAX(CumplimientoAl30_AL_Sede) AS CumplimientoAl30_AL_Sede, 
														MAX(CumplimientoAl30_Sede) AS CumplimientoAl30, 
														MAX(CumplimientoAl30_Sede) AS CumplimientoAl30_Sede, 
														MAX(PorcentajeCumplimientoAl15_Sede) AS PorcentajeCumplimientoAl15, 
														MAX(PorcentajeCumplimientoAl30_Sede) AS PorcentajeCumplimientoAl30, 
														MAX(PorcentajeCumplimientoAl15_Sede) AS PorcentajeCumplimientoAl15_Sede, 
														MAX(PorcentajeCumplimientoAl30_Sede) AS PorcentajeCumplimientoAl30_Sede

                                                          FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_7
                                                          GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoSede, NombreSede, Presupuesto_Sede, CumplimientoAl15_OT_Sede, CumplimientoAl15_AL_Sede, CumplimientoAl15_Sede, 
                                                                                    CumplimientoAl30_OT_Sede, CumplimientoAl30_AL_Sede, CumplimientoAl30_Sede, PorcentajeCumplimientoAl15_Sede, PorcentajeCumplimientoAl30_Sede) AS SEDES ON 
                                                    JEFES.Ano = SEDES.Ano_Periodo AND JEFES.Mes = SEDES.Mes_Periodo AND JEFES.CodigoSede = SEDES.CodigoSede) AS JEFES_SEDES


													UNION ALL

													SELECT * FROM vw_RepuestosVendedoresBonPorRepMM_7





```
