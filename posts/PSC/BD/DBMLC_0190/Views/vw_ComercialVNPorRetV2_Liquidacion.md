# View: vw_ComercialVNPorRetV2_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_ComercialVNPorRetV2_1]]
- [[vw_VariablesVersiones]]

```sql






CREATE VIEW [dbo].[vw_ComercialVNPorRetV2_Liquidacion] AS

SELECT        dbo.vw_ComercialVNPorRetV2_1.Ano AS Ano_Periodo, dbo.vw_ComercialVNPorRetV2_1.Mes AS Mes_Periodo, dbo.Empleados.CodigoEmpresa, dbo.vw_ComercialVNPorRetV2_1.CodigoEmpleado, ISNULL(dbo.Empleados.Nombres, 
                         N'') + N' ' + ISNULL(dbo.Empleados.Apellido1, N'') + N' ' + ISNULL(dbo.Empleados.Apellido2, N'') AS Empleado, dbo.Empleados.FechaRetiro, dbo.vw_ComercialVNPorRetV2_1.RetomasUsados, 
                         
						 VARCT.ValorVariable AS ValorVariableCT, 
						 CASE 
						 WHEN CodigoEmpresa = 6 and dbo.RangosMaestras.IdRangoMaestra <> 586 THEN [VARMM].ValorVariable 
						 WHEN CodigoEmpresa = 6 and dbo.RangosMaestras.IdRangoMaestra = 586 THEN [VARMM_BYD].ValorVariable 
						 ELSE 0
						 END AS ValorVariableMM, 

                         CASE 
						 WHEN CodigoEmpresa = 6 and dbo.RangosMaestras.IdRangoMaestra <> 586 THEN dbo.vw_ComercialVNPorRetV2_1.RetomasUsados * [VARMM].ValorVariable 
						 WHEN CodigoEmpresa = 6 and dbo.RangosMaestras.IdRangoMaestra = 586 THEN dbo.vw_ComercialVNPorRetV2_1.RetomasUsados * [VARMM_BYD].ValorVariable 
						 ELSE dbo.vw_ComercialVNPorRetV2_1.RetomasUsados * [VARCT].ValorVariable 
						 END AS ComisionRetoma, 

                         dbo.RangosMaestras.IdRangoMaestra, dbo.RangosMaestras.IdComisionModeloSub, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.RangosMaestras INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.RangosMaestras.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.vw_ComercialVNPorRetV2_1 ON dbo.Empleados.CodigoEmpleado = dbo.vw_ComercialVNPorRetV2_1.CodigoEmpleado CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_1
                               WHERE        (IdVariable = 44)) AS VARMM CROSS JOIN

							   (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_2
                               WHERE        (IdVariable = 46)) AS VARMM_BYD CROSS JOIN

                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 42)) AS VARCT
WHERE        (dbo.RangosMaestras.IdComisionModeloSub = 95) OR
                         (dbo.RangosMaestras.IdComisionModeloSub = 96)

						


```
