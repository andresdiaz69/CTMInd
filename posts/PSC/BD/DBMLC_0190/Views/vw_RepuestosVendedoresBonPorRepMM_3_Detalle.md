# View: vw_RepuestosVendedoresBonPorRepMM_3_Detalle

## Usa los objetos:
- [[Centros]]
- [[ExogenasPresupuestos]]
- [[Sedes]]
- [[vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor]]

```sql







CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_3_Detalle]
AS
SELECT        INDIVIDUAL.Ano_Periodo, INDIVIDUAL.Mes_Periodo, INDIVIDUAL.CodigoEmpresa, INDIVIDUAL.CedulaVendedorRepuestos, INDIVIDUAL.NumeroFacturaTaller, INDIVIDUAL.CumplimientoAl15_OT, 
                         INDIVIDUAL.CodigoSede, INDIVIDUAL.NombreSede, INDIVIDUAL.Presupuesto, SEDE.CumplimientoAl15_OT_Sede
FROM            (SELECT        dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.Ano_Periodo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.Mes_Periodo, 
                                                    dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CodigoEmpresa, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CedulaVendedorRepuestos, 
                                                    dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.NumeroFacturaTaller, 
                                                    SUM(dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.UnidadesVendidas * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.ValorUnitario - dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.UnidadesVendidas
                                                     * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.ValorUnitario * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.PorcentajeDescuento / 100) AS CumplimientoAl15_OT, 
                                                    dbo.Sedes.CodigoSede, dbo.Sedes.NombreSede, dbo.ExogenasPresupuestos.Presupuesto
                          FROM            dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor INNER JOIN
                                                    dbo.Centros ON dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CodigoCentro = dbo.Centros.CodigoCentro INNER JOIN
                                                    dbo.Sedes ON dbo.Centros.CodigoSedeCumplimiento = dbo.Sedes.CodigoSede INNER JOIN
                                                    dbo.ExogenasPresupuestos ON dbo.Sedes.CodigoSede = dbo.ExogenasPresupuestos.CodigoSede AND 
                                                    dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CedulaVendedorRepuestos = dbo.ExogenasPresupuestos.CodigoEmpleado AND 
                                                    dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.Ano_Periodo = dbo.ExogenasPresupuestos.Ano AND 
                                                    dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.Mes_Periodo = dbo.ExogenasPresupuestos.Mes
                          WHERE        
						  (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.TipoOperacion = 'MAT') 
						  AND (DATEPART(DAY, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.FechaFactura) <= 15)
						  --AND (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.FechaFactura <= '20191031' OR dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CedulaVendedorRepuestos IN (52072959, 1110486801, 1121846131))
						  AND (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.FechaFactura <= '20191031') AND dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CedulaVendedorRepuestos NOT IN (52072959, 1110486801, 1121846131)

                          GROUP BY dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CedulaVendedorRepuestos, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.NumeroFacturaTaller, 
                                                    dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.Ano_Periodo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.Mes_Periodo, dbo.Sedes.CodigoSede, 
                                                    dbo.Sedes.NombreSede, dbo.ExogenasPresupuestos.Presupuesto, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CodigoEmpresa) AS INDIVIDUAL RIGHT OUTER JOIN
                             (SELECT        vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.Ano_Periodo, vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.Mes_Periodo, 
                                                         vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.CodigoEmpresa, 
                                                         SUM(vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.UnidadesVendidas * vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.ValorUnitario - vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.UnidadesVendidas
                                                          * vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.ValorUnitario * vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.PorcentajeDescuento / 100) 
                                                         AS CumplimientoAl15_OT_Sede, Sedes_1.CodigoSede, Sedes_1.NombreSede
                               FROM            dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor AS vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1 INNER JOIN
                                                         dbo.Centros AS Centros_1 ON vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.CodigoCentro = Centros_1.CodigoCentro INNER JOIN
                                                         dbo.Sedes AS Sedes_1 ON Centros_1.CodigoSedeCumplimiento = Sedes_1.CodigoSede LEFT OUTER JOIN
                                                         dbo.ExogenasPresupuestos AS ExogenasPresupuestos_1 ON Sedes_1.CodigoSede = ExogenasPresupuestos_1.CodigoSede AND 
                                                         vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.CedulaVendedorRepuestos = ExogenasPresupuestos_1.CodigoEmpleado AND 
                                                         vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.Ano_Periodo = ExogenasPresupuestos_1.Ano AND 
                                                         vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.Mes_Periodo = ExogenasPresupuestos_1.Mes
                               WHERE        
							   (vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.TipoOperacion = 'MAT') 
							   AND (DATEPART(DAY, vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.FechaFactura) <= 15)
							   --AND (vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.FechaFactura <= '20191031' OR vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.CedulaVendedorRepuestos IN (52072959, 1110486801, 1121846131))
							   AND (vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.FechaFactura <= '20191031') AND vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.CedulaVendedorRepuestos NOT IN (52072959, 1110486801, 1121846131)

                               GROUP BY vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.Ano_Periodo, vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.Mes_Periodo, Sedes_1.CodigoSede, Sedes_1.NombreSede, 
                                                         vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor_1.CodigoEmpresa) AS SEDE ON INDIVIDUAL.Ano_Periodo = SEDE.Ano_Periodo AND INDIVIDUAL.Mes_Periodo = SEDE.Mes_Periodo AND 
                         INDIVIDUAL.CodigoEmpresa = SEDE.CodigoEmpresa AND INDIVIDUAL.CodigoSede = SEDE.CodigoSede AND INDIVIDUAL.NombreSede = SEDE.NombreSede

```
