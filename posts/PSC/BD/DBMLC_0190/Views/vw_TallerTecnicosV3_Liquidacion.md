# View: vw_TallerTecnicosV3_Liquidacion

## Usa los objetos:
- [[vw_TallerTecnicosV3_0]]
- [[vw_TallerTecnicosV3_1_Final]]
- [[vw_TallerTecnicosV3_2_Final]]
- [[vw_TallerTecnicosV3_3_Final]]

```sql


CREATE VIEW [dbo].[vw_TallerTecnicosV3_Liquidacion]
AS
SELECT        dbo.vw_TallerTecnicosV3_0.Ano_Periodo, dbo.vw_TallerTecnicosV3_0.Mes_Periodo, dbo.vw_TallerTecnicosV3_0.CodigoEmpresa, dbo.vw_TallerTecnicosV3_0.CodigoEmpleado, dbo.vw_TallerTecnicosV3_0.CedulaOperario, 
                         dbo.vw_TallerTecnicosV3_0.Empleado, dbo.vw_TallerTecnicosV3_0.FechaRetiro, 
						 
						 dbo.vw_TallerTecnicosV3_0.UnidadesVendidas_Total, 
						 
						 ISNULL(dbo.vw_TallerTecnicosV3_1_Final.UnidadesVendidas_Normal, 0) AS UnidadesVendidas_Normal,                          
						 dbo.vw_TallerTecnicosV3_1_Final.IdRangoMaestra AS IdRangoMaestra_Normal, 
						 dbo.vw_TallerTecnicosV3_1_Final.IdRangoVersionMax AS IdRangoVersionMax_Normal, 
						 dbo.vw_TallerTecnicosV3_1_Final.Desde_Normal,                          
						 dbo.vw_TallerTecnicosV3_1_Final.Hasta_Normal, 
						 dbo.vw_TallerTecnicosV3_1_Final.Valor_Normal, 
						 ISNULL(dbo.vw_TallerTecnicosV3_1_Final.Comision_Normal, 0) AS Comision_Normal, 
						 
						 ISNULL(dbo.vw_TallerTecnicosV3_2_Final.UnidadesVendidas_Elevado, 0) AS UnidadesVendidas_Elevado, 
                         dbo.vw_TallerTecnicosV3_2_Final.IdRangoMaestra AS IdRangoMaestra_Elevado, 
						 dbo.vw_TallerTecnicosV3_2_Final.IdRangoVersionMax AS IdRangoVersionMax_Elevado, 
						 dbo.vw_TallerTecnicosV3_2_Final.Desde_Elevado, 
                         dbo.vw_TallerTecnicosV3_2_Final.Hasta_Elevado, 
						 dbo.vw_TallerTecnicosV3_2_Final.Valor_Elevado, 
						 ISNULL(dbo.vw_TallerTecnicosV3_2_Final.Comision_Elevado, 0) AS Comision_Elevado, 
						 
						 ISNULL(dbo.vw_TallerTecnicosV3_3_Final.UnidadesVendidas_MuyElevado, 0) AS UnidadesVendidas_MuyElevado, 
                         dbo.vw_TallerTecnicosV3_3_Final.IdRangoMaestra AS IdRangoMaestra_MuyElevado, 
						 dbo.vw_TallerTecnicosV3_3_Final.IdRangoVersionMax AS IdRangoVersionMax_MuyElevado, 
						 dbo.vw_TallerTecnicosV3_3_Final.Desde_MuyElevado, 
                         dbo.vw_TallerTecnicosV3_3_Final.Hasta_MuyElevado, 
						 dbo.vw_TallerTecnicosV3_3_Final.Valor_MuyElevado, 
						 ISNULL(dbo.vw_TallerTecnicosV3_3_Final.Comision_MuyElevado, 0) AS Comision_MuyElevado,

                         ISNULL(dbo.vw_TallerTecnicosV3_1_Final.Comision_Normal, 0) + ISNULL(dbo.vw_TallerTecnicosV3_2_Final.Comision_Elevado, 0) + ISNULL(dbo.vw_TallerTecnicosV3_3_Final.Comision_MuyElevado, 0) AS Comision_Total

FROM            dbo.vw_TallerTecnicosV3_0 LEFT OUTER JOIN
                         dbo.vw_TallerTecnicosV3_3_Final ON dbo.vw_TallerTecnicosV3_0.Ano_Periodo = dbo.vw_TallerTecnicosV3_3_Final.Ano_Periodo AND 
                         dbo.vw_TallerTecnicosV3_0.Mes_Periodo = dbo.vw_TallerTecnicosV3_3_Final.Mes_Periodo AND dbo.vw_TallerTecnicosV3_0.CodigoEmpresa = dbo.vw_TallerTecnicosV3_3_Final.CodigoEmpresa AND 
                         dbo.vw_TallerTecnicosV3_0.CodigoEmpleado = dbo.vw_TallerTecnicosV3_3_Final.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_TallerTecnicosV3_2_Final ON dbo.vw_TallerTecnicosV3_0.Ano_Periodo = dbo.vw_TallerTecnicosV3_2_Final.Ano_Periodo AND 
                         dbo.vw_TallerTecnicosV3_0.Mes_Periodo = dbo.vw_TallerTecnicosV3_2_Final.Mes_Periodo AND dbo.vw_TallerTecnicosV3_0.CodigoEmpresa = dbo.vw_TallerTecnicosV3_2_Final.CodigoEmpresa AND 
                         dbo.vw_TallerTecnicosV3_0.CodigoEmpleado = dbo.vw_TallerTecnicosV3_2_Final.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_TallerTecnicosV3_1_Final ON dbo.vw_TallerTecnicosV3_0.Ano_Periodo = dbo.vw_TallerTecnicosV3_1_Final.Ano_Periodo AND 
                         dbo.vw_TallerTecnicosV3_0.Mes_Periodo = dbo.vw_TallerTecnicosV3_1_Final.Mes_Periodo AND dbo.vw_TallerTecnicosV3_0.CodigoEmpresa = dbo.vw_TallerTecnicosV3_1_Final.CodigoEmpresa AND 
                         dbo.vw_TallerTecnicosV3_0.CodigoEmpleado = dbo.vw_TallerTecnicosV3_1_Final.CodigoEmpleado

```
