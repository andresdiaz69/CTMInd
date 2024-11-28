# View: vw_CrucesOtrasEmpresas_TallerTecnicos_Liquidacion

## Usa los objetos:
- [[Empresas]]
- [[Liquidaciones_TallerTecnicos]]
- [[vw_TallerTecnicos_1_Detalle]]

```sql
CREATE VIEW [dbo].[vw_CrucesOtrasEmpresas_TallerTecnicos_Liquidacion]
AS
SELECT        CRUCES.Ano_Periodo, CRUCES.Mes_Periodo, CRUCES.CodigoEmpleado, CRUCES.Empleado, CRUCES.CodigoEmpresa, CRUCES.NombreEmpresa, CRUCES.CodigoEmpresaOT, CRUCES.NombreEmpresaOT, 
                         CRUCES.CodigoEmpresaEmpleado, CRUCES.NombreEmpresaEmpleado, CRUCES.UnidadesVendidas AS UnidadesVendidasOtrasEmpresas, dbo.Liquidaciones_TallerTecnicos.UnidadesVendidas, 
                         dbo.Liquidaciones_TallerTecnicos.HorasImproductivas, dbo.Liquidaciones_TallerTecnicos.UnidadesTotales, dbo.Liquidaciones_TallerTecnicos.Comision, 
                         dbo.Liquidaciones_TallerTecnicos.Comision / dbo.Liquidaciones_TallerTecnicos.UnidadesTotales * CRUCES.UnidadesVendidas AS ComisionOtrasEmpresas
FROM            (SELECT        dbo.vw_TallerTecnicos_1_Detalle.Ano_Periodo, dbo.vw_TallerTecnicos_1_Detalle.Mes_Periodo, dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpleado, dbo.vw_TallerTecnicos_1_Detalle.Empleado, 
                                                    dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpresa, Empresas_1.NombreEmpresa, dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpresaOT, Empresas_2.NombreEmpresa AS NombreEmpresaOT, 
                                                    dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpresaEmpleado, dbo.Empresas.NombreEmpresa AS NombreEmpresaEmpleado, SUM(dbo.vw_TallerTecnicos_1_Detalle.UnidadesVendidas) AS UnidadesVendidas
                          FROM            dbo.vw_TallerTecnicos_1_Detalle LEFT OUTER JOIN
                                                    dbo.Empresas ON dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpresaEmpleado = dbo.Empresas.CodigoEmpresa LEFT OUTER JOIN
                                                    dbo.Empresas AS Empresas_2 ON dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpresaOT = Empresas_2.CodigoEmpresa LEFT OUTER JOIN
                                                    dbo.Empresas AS Empresas_1 ON dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpresa = Empresas_1.CodigoEmpresa
                          WHERE        (dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpresaOT <> dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpresaEmpleado)
                          GROUP BY dbo.vw_TallerTecnicos_1_Detalle.Ano_Periodo, dbo.vw_TallerTecnicos_1_Detalle.Mes_Periodo, dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpresa, dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpresaOT, 
                                                    dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpresaEmpleado, dbo.vw_TallerTecnicos_1_Detalle.CodigoEmpleado, dbo.vw_TallerTecnicos_1_Detalle.Empleado, Empresas_1.NombreEmpresa, 
                                                    Empresas_2.NombreEmpresa, dbo.Empresas.NombreEmpresa) AS CRUCES LEFT OUTER JOIN
                         dbo.Liquidaciones_TallerTecnicos ON CRUCES.CodigoEmpresa = dbo.Liquidaciones_TallerTecnicos.CodigoEmpresa AND CRUCES.CodigoEmpleado = dbo.Liquidaciones_TallerTecnicos.CodigoEmpleado AND 
                         CRUCES.Ano_Periodo = dbo.Liquidaciones_TallerTecnicos.Ano_Periodo AND CRUCES.Mes_Periodo = dbo.Liquidaciones_TallerTecnicos.Mes_Periodo
WHERE        (dbo.Liquidaciones_TallerTecnicos.Comision IS NOT NULL)


```
