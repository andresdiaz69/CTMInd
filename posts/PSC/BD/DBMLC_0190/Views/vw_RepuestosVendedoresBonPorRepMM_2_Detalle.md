# View: vw_RepuestosVendedoresBonPorRepMM_2_Detalle

## Usa los objetos:
- [[Centros]]
- [[ExogenasPresupuestos]]
- [[Sedes]]
- [[vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor]]

```sql







CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_2_Detalle]
AS
SELECT        INDIVIDUAL.Ano_Periodo, INDIVIDUAL.Mes_Periodo, INDIVIDUAL.CodigoEmpresa, INDIVIDUAL.CedulaVendedorRepuestos, INDIVIDUAL.NumeroFactura, INDIVIDUAL.CumplimientoAl30_AL, 
                         INDIVIDUAL.CodigoSede, INDIVIDUAL.NombreSede, INDIVIDUAL.Presupuesto, SEDE.CumplimientoAl30_AL_Sede
FROM            (SELECT        dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.Ano_Periodo, dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.Mes_Periodo, 
                                                    dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.CodigoEmpresa, dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.CedulaVendedorRepuestos, 
                                                    dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.NumeroFactura, 
                                                    SUM(dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.ValorUnitarioReferencia - dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.UnidadesVendidas
                                                     * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.ValorUnitarioReferencia * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.PorcDescuento / 100) 
                                                    AS CumplimientoAl30_AL, dbo.Sedes.CodigoSede, dbo.Sedes.NombreSede, dbo.ExogenasPresupuestos.Presupuesto
                          FROM            dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor INNER JOIN
                                                    dbo.Centros ON dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.CodigoCentro = dbo.Centros.CodigoCentro INNER JOIN
                                                    dbo.Sedes ON dbo.Centros.CodigoSedeCumplimiento = dbo.Sedes.CodigoSede INNER JOIN
                                                    dbo.ExogenasPresupuestos ON dbo.Sedes.CodigoSede = dbo.ExogenasPresupuestos.CodigoSede AND 
                                                    dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.CedulaVendedorRepuestos = dbo.ExogenasPresupuestos.CodigoEmpleado AND 
                                                    dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.Ano_Periodo = dbo.ExogenasPresupuestos.Ano AND 
                                                    dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.Mes_Periodo = dbo.ExogenasPresupuestos.Mes
                          
						WHERE        
						--(dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.FechaFactura <= '20191031' OR dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.CedulaVendedorRepuestos IN (52072959, 1110486801, 1121846131))
						(dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.FechaFactura <= '20191031') AND dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.CedulaVendedorRepuestos NOT IN (52072959, 1110486801, 1121846131)
						  
						  GROUP BY dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.CedulaVendedorRepuestos, dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.NumeroFactura, 
                                                    dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.Ano_Periodo, dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.Mes_Periodo, dbo.Sedes.CodigoSede, 
                                                    dbo.Sedes.NombreSede, dbo.ExogenasPresupuestos.Presupuesto, dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.CodigoEmpresa) AS INDIVIDUAL RIGHT OUTER JOIN
                             (SELECT        vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.Ano_Periodo, vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.Mes_Periodo, 
                                                         vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.CodigoEmpresa, 
                                                         SUM(vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.UnidadesVendidas * vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.ValorUnitarioReferencia - vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.UnidadesVendidas
                                                          * vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.ValorUnitarioReferencia * vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.PorcDescuento / 100) 
                                                         AS CumplimientoAl30_AL_Sede, Sedes_1.CodigoSede, Sedes_1.NombreSede
                               FROM            dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor AS vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1 INNER JOIN
                                                         dbo.Centros AS Centros_1 ON vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.CodigoCentro = Centros_1.CodigoCentro INNER JOIN
                                                         dbo.Sedes AS Sedes_1 ON Centros_1.CodigoSedeCumplimiento = Sedes_1.CodigoSede LEFT OUTER JOIN
                                                         dbo.ExogenasPresupuestos AS ExogenasPresupuestos_1 ON Sedes_1.CodigoSede = ExogenasPresupuestos_1.CodigoSede AND 
                                                         vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.CedulaVendedorRepuestos = ExogenasPresupuestos_1.CodigoEmpleado AND 
                                                         vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.Ano_Periodo = ExogenasPresupuestos_1.Ano AND 
                                                         vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.Mes_Periodo = ExogenasPresupuestos_1.Mes
                              
							WHERE        
							--(vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.FechaFactura <= '20191031' OR vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.CedulaVendedorRepuestos IN (52072959, 1110486801, 1121846131))
							(vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.FechaFactura <= '20191031') AND vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.CedulaVendedorRepuestos NOT IN (52072959, 1110486801, 1121846131)

							   GROUP BY vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.Ano_Periodo, vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.Mes_Periodo, Sedes_1.CodigoSede, 
                                                         Sedes_1.NombreSede, vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor_1.CodigoEmpresa) AS SEDE ON INDIVIDUAL.Ano_Periodo = SEDE.Ano_Periodo AND 
                         INDIVIDUAL.Mes_Periodo = SEDE.Mes_Periodo AND INDIVIDUAL.CodigoEmpresa = SEDE.CodigoEmpresa AND INDIVIDUAL.CodigoSede = SEDE.CodigoSede AND INDIVIDUAL.NombreSede = SEDE.NombreSede

```
