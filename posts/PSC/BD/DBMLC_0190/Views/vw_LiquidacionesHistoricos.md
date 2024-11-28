# View: vw_LiquidacionesHistoricos

## Usa los objetos:
- [[Liquidaciones_AccesoriosVendedoresBonCT]]
- [[Liquidaciones_AccesoriosVendedoresBonDAI]]
- [[Liquidaciones_AccesoriosVendedoresBonMM]]
- [[Liquidaciones_ComercialVNPorAcc]]
- [[Liquidaciones_ComercialVNPorCom]]
- [[Liquidaciones_ComercialVNPorPro]]
- [[Liquidaciones_ComercialVNPorRet]]
- [[Liquidaciones_RepuestosBolsaCT]]
- [[Liquidaciones_RepuestosBolsaDAI]]
- [[Liquidaciones_RepuestosPIRMM]]
- [[Liquidaciones_RepuestosVendedoresBonPorAccMM]]
- [[Liquidaciones_RepuestosVendedoresBonPorExcMM]]
- [[Liquidaciones_RepuestosVendedoresBonPorRepMM]]
- [[Liquidaciones_RepuestosVendedoresComisionesCT]]
- [[Liquidaciones_RepuestosVendedoresComisionesDAI]]
- [[Liquidaciones_RepuestosVendedoresComisionesMM]]
- [[Liquidaciones_TallerAsesoresColisionMM]]
- [[Liquidaciones_TallerAsesoresMM]]
- [[Liquidaciones_TallerAsesoresYSupervisoresCT]]
- [[Liquidaciones_TallerPITMM]]
- [[Liquidaciones_TallerSupervisoresColisionMM]]
- [[Liquidaciones_TallerTecnicos]]

```sql
CREATE VIEW [dbo].[vw_LiquidacionesHistoricos]
AS

--SUB 1 / SUB 2
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_TallerTecnicos

UNION ALL

--SUB 3
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision_TOTAL
FROM            dbo.Liquidaciones_TallerAsesoresYSupervisoresCT

UNION ALL

--SUB 4
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision_TOTAL
FROM            dbo.Liquidaciones_TallerAsesoresMM

UNION ALL


--SUB 5
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_RepuestosVendedoresComisionesMM

UNION ALL

--SUB 6
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_RepuestosVendedoresBonPorAccMM

UNION ALL


--SUB 7
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_RepuestosVendedoresBonPorExcMM

UNION ALL


--SUB 8
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_RepuestosVendedoresBonPorRepMM

UNION ALL


--SUB 9
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_AccesoriosVendedoresBonMM

UNION ALL


--SUB 10
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_RepuestosPIRMM

UNION ALL


--SUB 11
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_RepuestosVendedoresComisionesCT

UNION ALL


--SUB 12 / SUB 13
SELECT        IdComisionModeloSub, 'Recaudo' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, ComisionRecaudo
FROM            dbo.Liquidaciones_ComercialVNPorCom

UNION ALL

SELECT        IdComisionModeloSub, 'Productividad' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, ComisionProductividad
FROM            dbo.Liquidaciones_ComercialVNPorPro

UNION ALL

SELECT        IdComisionModeloSub, 'Retoma' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, ComisionRetoma
FROM            dbo.Liquidaciones_ComercialVNPorRet

UNION ALL

SELECT        IdComisionModeloSub, 'Accesorios' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, BonificacionTotal
FROM            dbo.Liquidaciones_ComercialVNPorAcc

UNION ALL


--SUB 14
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_RepuestosVendedoresComisionesDAI

UNION ALL


--SUB 15
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_AccesoriosVendedoresBonDAI

UNION ALL


--SUB 16
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_RepuestosBolsaDAI

UNION ALL


--SUB 17
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_RepuestosBolsaCT

UNION ALL


--SUB 18
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_AccesoriosVendedoresBonCT

UNION ALL


--SUB 19
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision
FROM            dbo.Liquidaciones_TallerPITMM

UNION ALL


--SUB 20
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision_TOTAL
FROM            dbo.Liquidaciones_TallerSupervisoresColisionMM


UNION ALL

--SUB 21
SELECT        IdComisionModeloSub, 'Principal' AS [Tipo], Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, Comision_TOTAL
FROM            dbo.Liquidaciones_TallerAsesoresColisionMM









```
