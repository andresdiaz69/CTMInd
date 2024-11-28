# View: vw_AsesorComercialVehiculosUsados_6

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_AsesorComercialVehiculosUsados_6_1]]
- [[vw_VariablesVersiones]]

```sql



CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsados_6]
AS
SELECT        dbo.vw_AsesorComercialVehiculosUsados_6_1.Ano AS Ano_Periodo, dbo.vw_AsesorComercialVehiculosUsados_6_1.Mes AS Mes_Periodo, dbo.Empleados.CodigoEmpresa, dbo.vw_AsesorComercialVehiculosUsados_6_1.CodigoEmpleado, ISNULL(dbo.Empleados.Nombres, 
                         N'') + N' ' + ISNULL(dbo.Empleados.Apellido1, N'') + N' ' + ISNULL(dbo.Empleados.Apellido2, N'') AS Empleado, dbo.Empleados.FechaRetiro, dbo.vw_AsesorComercialVehiculosUsados_6_1.TotalVentaEquirent, 
                         
						 -- JCS: 2023/04/05 - A LOS DE MEDIO TIEMPO SE LES PAGA POR OTRA VARIABLE
						 CASE 
						 WHEN dbo.RangosMaestras.IdRangoMaestra = 185
						 THEN [VAR].ValorVariable
						 ELSE [VAR_MEDIO_TIEMPO].ValorVariable
						 END AS ValorVariable,

						 -- JCS: 2023/04/05 - A LOS DE MEDIO TIEMPO SE LES PAGA POR OTRA VARIABLE
						 CASE 
						 WHEN dbo.RangosMaestras.IdRangoMaestra = 185
						 THEN dbo.vw_AsesorComercialVehiculosUsados_6_1.TotalVentaEquirent * [VAR].ValorVariable
						 ELSE  dbo.vw_AsesorComercialVehiculosUsados_6_1.TotalVentaEquirent * [VAR_MEDIO_TIEMPO].ValorVariable
						 END AS ComisionEquirent, 

                         dbo.RangosMaestras.IdRangoMaestra, dbo.RangosMaestras.IdComisionModeloSub, dbo.RangosMaestras.CodigoConcepto, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.RangosMaestras INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.RangosMaestras.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.vw_AsesorComercialVehiculosUsados_6_1 ON dbo.Empleados.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsados_6_1.CodigoEmpleado CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            vw_VariablesVersiones AS vw_VariablesVersiones_1
                               WHERE        (IdVariable = 28)) AS [VAR] CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            vw_VariablesVersiones AS vw_VariablesVersiones_2
                               WHERE        (IdVariable = 41)) AS [VAR_MEDIO_TIEMPO]
WHERE        (dbo.RangosMaestras.IdComisionModeloSub = 39) and (dbo.RangosMaestras.IdComisionModeloSubCriterio = 72)



```
