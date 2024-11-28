# View: vw_RepuestosVendedoresBonPorRepMM_6_Full

## Usa los objetos:
- [[Centros]]
- [[ExogenasPresupuestos]]
- [[Sedes]]
- [[vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor]]
- [[vw_RepuestosVendedoresBonPorRepMM_2_Full]]
- [[vw_RepuestosVendedoresBonPorRepMM_4_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_6_Full]
AS
SELECT        dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.CodigoSede, dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.NombreSede, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.Presupuesto, PRESUPUESTO_SEDE.Presupuesto_Sede, dbo.vw_RepuestosVendedoresBonPorRepMM_4_Full.CumplimientoAl15_AL, 
                         CUMPLIMIENTO_SEDE.CumplimientoAl15_AL_Sede, dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.CumplimientoAl30_AL, dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.CumplimientoAl30_AL_Sede
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full LEFT OUTER JOIN
                             (SELECT        vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.Ano_Periodo, vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.Mes_Periodo, 
                                                         vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.CodigoEmpresa, 
                                                         SUM(vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.UnidadesVendidas * vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.ValorUnitarioReferencia - vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.UnidadesVendidas
                                                          * vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.ValorUnitarioReferencia * vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.PorcDescuento / 100) AS CumplimientoAl15_AL_Sede, 
                                                         Sedes_1.CodigoSede, Sedes_1.NombreSede
                               FROM            dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor AS vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1 INNER JOIN
                                                         dbo.Centros AS Centros_1 ON vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.CodigoCentro = Centros_1.CodigoCentro INNER JOIN
                                                         dbo.Sedes AS Sedes_1 ON Centros_1.CodigoSedeCumplimiento = Sedes_1.CodigoSede LEFT OUTER JOIN
                                                         dbo.ExogenasPresupuestos AS ExogenasPresupuestos_1 ON Sedes_1.CodigoSede = ExogenasPresupuestos_1.CodigoSede AND 
                                                         vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.CedulaVendedorRepuestos = ExogenasPresupuestos_1.CodigoEmpleado AND 
                                                         vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.Ano_Periodo = ExogenasPresupuestos_1.Ano AND 
                                                         vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.Mes_Periodo = ExogenasPresupuestos_1.Mes
                               WHERE        (DATEPART(DAY, vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.FechaFactura) <= 15)
                               GROUP BY vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.Ano_Periodo, vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.Mes_Periodo, Sedes_1.CodigoSede, Sedes_1.NombreSede, 
                                                         vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.CodigoEmpresa) AS CUMPLIMIENTO_SEDE ON 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.Ano_Periodo = CUMPLIMIENTO_SEDE.Ano_Periodo AND dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.Mes_Periodo = CUMPLIMIENTO_SEDE.Mes_Periodo AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.CodigoEmpresa = CUMPLIMIENTO_SEDE.CodigoEmpresa AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.CodigoSede = CUMPLIMIENTO_SEDE.CodigoSede LEFT OUTER JOIN
                             (SELECT        Ano, Mes, CodigoSede, SUM(Presupuesto) AS Presupuesto_Sede
                               FROM            dbo.ExogenasPresupuestos
                               GROUP BY Ano, Mes, CodigoSede) AS PRESUPUESTO_SEDE ON dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.CodigoSede = PRESUPUESTO_SEDE.CodigoSede AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.Mes_Periodo = PRESUPUESTO_SEDE.Mes AND dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.Ano_Periodo = PRESUPUESTO_SEDE.Ano LEFT OUTER JOIN
                         dbo.vw_RepuestosVendedoresBonPorRepMM_4_Full ON dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.CodigoEmpresa = dbo.vw_RepuestosVendedoresBonPorRepMM_4_Full.CodigoEmpresa AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.CedulaVendedorRepuestos = dbo.vw_RepuestosVendedoresBonPorRepMM_4_Full.CedulaVendedorRepuestos AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.Ano_Periodo = dbo.vw_RepuestosVendedoresBonPorRepMM_4_Full.Ano_Periodo AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.Mes_Periodo = dbo.vw_RepuestosVendedoresBonPorRepMM_4_Full.Mes_Periodo AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.CodigoSede = dbo.vw_RepuestosVendedoresBonPorRepMM_4_Full.CodigoSede AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.NombreSede = dbo.vw_RepuestosVendedoresBonPorRepMM_4_Full.NombreSede AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_2_Full.Presupuesto = dbo.vw_RepuestosVendedoresBonPorRepMM_4_Full.Presupuesto


```
