# View: vw_LiquidacionesProvisiones

## Usa los objetos:
- [[vw_AccesoriosVendedoresBonCT_Liquidacion]]
- [[vw_AccesoriosVendedoresBonDAI_Liquidacion]]
- [[vw_AccesoriosVendedoresBonMM_Liquidacion]]
- [[vw_ComercialVNBonoObjetivosJefePtaAranda_Liquidacion]]
- [[vw_ComercialVNJefesBonoPorObjetivos_Liquidacion]]
- [[vw_ComercialVNPorCom_Liquidacion]]
- [[vw_ComercialVOComisionesDeVentasMM_Liquidacion]]
- [[vw_DirectoresOperacionesMM_Liquidacion]]
- [[vw_JefeNacionalDeServicioCT_Liquidacion]]
- [[vw_JefesDeColisionCT_Liquidacion]]
- [[vw_JefesDePostVentaRenault_Liquidacion]]
- [[vw_JefesDeTallerCT_Liquidacion]]
- [[vw_JefesDeTallerRenault_Liquidacion]]
- [[vw_JefesTallerMM_Liquidacion]]
- [[vw_RepuestosBolsaCT_Liquidacion]]
- [[vw_RepuestosBolsaDAI_Liquidacion]]
- [[vw_RepuestosPIRMM_Liquidacion]]
- [[vw_RepuestosVendedoresBonPorAccMM_Liquidacion]]
- [[vw_RepuestosVendedoresBonPorExcMM_Liquidacion]]
- [[vw_RepuestosVendedoresBonPorRepMM_Liquidacion]]
- [[vw_RepuestosVendedoresComisionesCT_Liquidacion]]
- [[vw_RepuestosVendedoresComisionesDAI_Liquidacion]]
- [[vw_RepuestosVendedoresComisionesExternosDAI_Liquidacion]]
- [[vw_RepuestosVendedoresComisionesMM_Liquidacion]]
- [[vw_RepuestosVendedoresComisionesRenault_Liquidacion]]
- [[vw_TallerAsesoresColisionMM_Liquidacion]]
- [[vw_TallerAsesoresMM_Liquidacion]]
- [[vw_TallerAsesoresUsadosCT_Liquidacion]]
- [[vw_TallerAsesoresYSupervisoresCT_Liquidacion]]
- [[vw_TallerPITMM_Liquidacion]]
- [[vw_TallerSupervisoresColisionMM_Liquidacion]]
- [[vw_TallerTecnicos_Liquidacion]]

```sql


CREATE VIEW [dbo].[vw_LiquidacionesProvisiones]
AS

--SUB 1 / SUB 2
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_TallerTecnicos_Liquidacion

UNION ALL

--SUB 3
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
FROM            dbo.vw_TallerAsesoresYSupervisoresCT_Liquidacion

UNION ALL

--SUB 4
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
FROM            dbo.vw_TallerAsesoresMM_Liquidacion

UNION ALL


--SUB 5
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_RepuestosVendedoresComisionesMM_Liquidacion

UNION ALL

--SUB 6
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_RepuestosVendedoresBonPorAccMM_Liquidacion

UNION ALL


--SUB 7
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_RepuestosVendedoresBonPorExcMM_Liquidacion

UNION ALL


--SUB 8
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_Liquidacion

UNION ALL


--SUB 9
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_AccesoriosVendedoresBonMM_Liquidacion

UNION ALL


--SUB 10
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_RepuestosPIRMM_Liquidacion

UNION ALL


--SUB 11
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_RepuestosVendedoresComisionesCT_Liquidacion

UNION ALL


--SUB 12 / SUB 13
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, ComisionRecaudo
FROM            dbo.vw_ComercialVNPorCom_Liquidacion

UNION ALL


--SUB 14
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_RepuestosVendedoresComisionesDAI_Liquidacion

UNION ALL


--SUB 15
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_AccesoriosVendedoresBonDAI_Liquidacion

UNION ALL


--SUB 16
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_RepuestosBolsaDAI_Liquidacion

UNION ALL


--SUB 17
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_RepuestosBolsaCT_Liquidacion

UNION ALL


--SUB 18
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_AccesoriosVendedoresBonCT_Liquidacion

UNION ALL


--SUB 19
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_TallerPITMM_Liquidacion

UNION ALL


--SUB 20
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
FROM            dbo.vw_TallerSupervisoresColisionMM_Liquidacion


UNION ALL

--SUB 21
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
FROM            dbo.vw_TallerAsesoresColisionMM_Liquidacion


UNION ALL

--SUB 22
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_Liquidacion


UNION ALL

--SUB 23
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
FROM            dbo.vw_TallerAsesoresUsadosCT_Liquidacion

UNION ALL

--SUB 24
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
FROM            dbo.vw_DirectoresOperacionesMM_Liquidacion


UNION ALL

--SUB 25
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
FROM            dbo.vw_JefesTallerMM_Liquidacion


UNION ALL

--SUB 26
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_RepuestosVendedoresComisionesExternosDAI_Liquidacion



UNION ALL

--SUB 27
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_RepuestosVendedoresComisionesRenault_Liquidacion


UNION ALL

--SUB 28
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
FROM            dbo.vw_JefesDeTallerCT_Liquidacion




--UNION ALL

----SUB 29
--SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
--FROM            dbo.vw_JefesDeVentas_Liquidacion


UNION ALL

--SUB 30
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision
FROM            dbo.vw_ComercialVNJefesBonoPorObjetivos_Liquidacion


--UNION ALL

----SUB 31
--SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
--FROM            dbo.vw_JefesDeVentasUsadosCT_Liquidacion


UNION ALL

--SUB 32
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
FROM            dbo.vw_JefesDeColisionCT_Liquidacion


UNION ALL

--SUB 33
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
FROM   dbo.vw_JefeNacionalDeServicioCT_Liquidacion


UNION ALL

--SUB 34
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, ComisionRecaudo
FROM   dbo.vw_ComercialVOComisionesDeVentasMM_Liquidacion


UNION ALL

--SUB 35
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
FROM   dbo.vw_JefesDeTallerRenault_Liquidacion


UNION ALL

--SUB 36
SELECT        IdComisionModeloSub, Ano_Periodo, Mes_Periodo, CodigoEmpleado, Comision_TOTAL
FROM   dbo.vw_JefesDePostVentaRenault_Liquidacion







```
