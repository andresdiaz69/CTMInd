# View: vw_RepuestosVendedoresBonPorRepMM_5

## Usa los objetos:
- [[Centros]]
- [[ExogenasPresupuestos]]
- [[Sedes]]
- [[vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor]]
- [[vw_RepuestosVendedoresBonPorRepMM_1]]
- [[vw_RepuestosVendedoresBonPorRepMM_3]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_5]
AS
SELECT        dbo.vw_RepuestosVendedoresBonPorRepMM_1.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_1.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_1.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_1.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresBonPorRepMM_1.CodigoSede, dbo.vw_RepuestosVendedoresBonPorRepMM_1.NombreSede, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_1.Presupuesto, PRESUPUESTO_SEDE.Presupuesto_Sede, dbo.vw_RepuestosVendedoresBonPorRepMM_3.CumplimientoAl15_OT, 
                         CUMPLIMIENTO_SEDE.CumplimientoAl15_OT_Sede, dbo.vw_RepuestosVendedoresBonPorRepMM_1.CumplimientoAl30_OT, dbo.vw_RepuestosVendedoresBonPorRepMM_1.CumplimientoAl30_OT_Sede
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_1 LEFT OUTER JOIN
                             (SELECT        vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.Ano_Periodo, vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.Mes_Periodo, 
                                                         vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.CodigoEmpresa, 
                                                         SUM(vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.UnidadesVendidas * vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.ValorUnitario - vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.UnidadesVendidas
                                                          * vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.ValorUnitario * vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.PorcentajeDescuento / 100) AS CumplimientoAl15_OT_Sede, 
                                                         Sedes_1.CodigoSede, Sedes_1.NombreSede
                               FROM            dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor AS vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1 INNER JOIN
                                                         dbo.Centros AS Centros_1 ON vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.CodigoCentro = Centros_1.CodigoCentro INNER JOIN
                                                         dbo.Sedes AS Sedes_1 ON Centros_1.CodigoSedeCumplimiento = Sedes_1.CodigoSede LEFT OUTER JOIN
                                                         dbo.ExogenasPresupuestos AS ExogenasPresupuestos_1 ON Sedes_1.CodigoSede = ExogenasPresupuestos_1.CodigoSede AND 
                                                         vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.CedulaVendedorRepuestos = ExogenasPresupuestos_1.CodigoEmpleado AND 
                                                         vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.Ano_Periodo = ExogenasPresupuestos_1.Ano AND 
                                                         vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.Mes_Periodo = ExogenasPresupuestos_1.Mes
                               WHERE        (vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.TipoOperacion = 'MAT') AND (DATEPART(DAY, vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.FechaFactura) <= 15)
                               GROUP BY vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.Ano_Periodo, vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.Mes_Periodo, Sedes_1.CodigoSede, Sedes_1.NombreSede, 
                                                         vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.CodigoEmpresa) AS CUMPLIMIENTO_SEDE ON dbo.vw_RepuestosVendedoresBonPorRepMM_1.CodigoSede = CUMPLIMIENTO_SEDE.CodigoSede AND
                          dbo.vw_RepuestosVendedoresBonPorRepMM_1.CodigoEmpresa = CUMPLIMIENTO_SEDE.CodigoEmpresa AND dbo.vw_RepuestosVendedoresBonPorRepMM_1.Mes_Periodo = CUMPLIMIENTO_SEDE.Mes_Periodo AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_1.Ano_Periodo = CUMPLIMIENTO_SEDE.Ano_Periodo LEFT OUTER JOIN
                             (SELECT        Ano, Mes, CodigoSede, SUM(Presupuesto) AS Presupuesto_Sede
                               FROM            dbo.ExogenasPresupuestos
                               GROUP BY Ano, Mes, CodigoSede) AS PRESUPUESTO_SEDE ON dbo.vw_RepuestosVendedoresBonPorRepMM_1.CodigoSede = PRESUPUESTO_SEDE.CodigoSede AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_1.Mes_Periodo = PRESUPUESTO_SEDE.Mes AND dbo.vw_RepuestosVendedoresBonPorRepMM_1.Ano_Periodo = PRESUPUESTO_SEDE.Ano LEFT OUTER JOIN
                         dbo.vw_RepuestosVendedoresBonPorRepMM_3 ON dbo.vw_RepuestosVendedoresBonPorRepMM_1.CodigoEmpresa = dbo.vw_RepuestosVendedoresBonPorRepMM_3.CodigoEmpresa AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_1.CedulaVendedorRepuestos = dbo.vw_RepuestosVendedoresBonPorRepMM_3.CedulaVendedorRepuestos AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_1.Ano_Periodo = dbo.vw_RepuestosVendedoresBonPorRepMM_3.Ano_Periodo AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_1.Mes_Periodo = dbo.vw_RepuestosVendedoresBonPorRepMM_3.Mes_Periodo AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_1.CodigoSede = dbo.vw_RepuestosVendedoresBonPorRepMM_3.CodigoSede AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_1.NombreSede = dbo.vw_RepuestosVendedoresBonPorRepMM_3.NombreSede AND 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_1.Presupuesto = dbo.vw_RepuestosVendedoresBonPorRepMM_3.Presupuesto


```
