# View: vw_GerenteRegionalVillavicencio_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_GerenteRegionalVillavicencio_1]]
- [[vw_GerenteRegionalVillavicencio_2]]

```sql
CREATE VIEW [dbo].[vw_GerenteRegionalVillavicencio_Liquidacion]
AS
SELECT        dbo.vw_GerenteRegionalVillavicencio_1.Ano_Periodo, dbo.vw_GerenteRegionalVillavicencio_1.Mes_Periodo, dbo.vw_GerenteRegionalVillavicencio_1.CodigoEmpleado, dbo.vw_EmpleadosDetalle.Empleado, 
                         dbo.vw_EmpleadosDetalle.CodigoEmpresa, dbo.vw_EmpleadosDetalle.NombreEmpresa, dbo.vw_EmpleadosDetalle.FechaIngreso, dbo.vw_EmpleadosDetalle.FechaRetiro, 
                         dbo.vw_GerenteRegionalVillavicencio_1.IdComisionModeloSub, dbo.vw_GerenteRegionalVillavicencio_1.EntregasEfectivas, dbo.vw_GerenteRegionalVillavicencio_1.VentasNacionales, 
                         ISNULL(dbo.vw_GerenteRegionalVillavicencio_1.PesoComercial, 0) AS PesoComercial, ISNULL(dbo.vw_GerenteRegionalVillavicencio_1.Comision_PesoComercial, 0) AS Comision_PesoComercial, 
                         ISNULL(dbo.vw_GerenteRegionalVillavicencio_2.EficienciaAdministrativa, 0) AS EficienciaAdministrativa, ISNULL(dbo.vw_GerenteRegionalVillavicencio_2.Comision_EficienciaAdministrativa, 0) 
                         AS Comision_EficienciaAdministrativa, ISNULL(dbo.vw_GerenteRegionalVillavicencio_1.Comision_PesoComercial, 0) + ISNULL(dbo.vw_GerenteRegionalVillavicencio_2.Comision_EficienciaAdministrativa, 0) 
                         AS Comision_TOTAL, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_GerenteRegionalVillavicencio_1 LEFT OUTER JOIN
                         dbo.vw_GerenteRegionalVillavicencio_2 ON dbo.vw_GerenteRegionalVillavicencio_1.CodigoEmpleado = dbo.vw_GerenteRegionalVillavicencio_2.CodigoEmpleado AND 
                         dbo.vw_GerenteRegionalVillavicencio_1.Ano_Periodo = dbo.vw_GerenteRegionalVillavicencio_2.Ano_Periodo AND 
                         dbo.vw_GerenteRegionalVillavicencio_1.Mes_Periodo = dbo.vw_GerenteRegionalVillavicencio_2.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_EmpleadosDetalle ON dbo.vw_GerenteRegionalVillavicencio_1.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
