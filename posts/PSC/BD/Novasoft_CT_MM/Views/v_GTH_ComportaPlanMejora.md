# View: v_GTH_ComportaPlanMejora

## Usa los objetos:
- [[GTH_Comporta]]
- [[GTH_EvaDesemAsig]]
- [[GTH_EvaDesemGrupoEval]]
- [[GTH_EvaDesemGrupoEvalPlanMejora]]
- [[GTH_EvaDesemRespComp]]
- [[GTH_EvaDesemRespCompConc]]
- [[GTH_Eval_Estado_Pers]]
- [[GTH_Evalua_Comporta]]
- [[GTH_Evalua_Estado]]

```sql
CREATE VIEW [dbo].[v_GTH_ComportaPlanMejora]
AS
SELECT	GE.cod_cia, GE.cod_eva_des, GE.cod_grup_val, ED.cod_emp_evado, C.cod_comp, C.cod_comporta, CP.des_comporta
FROM	GTH_EvaDesemGrupoEval AS GE
INNER	JOIN GTH_EvaDesemAsig AS ED ON GE.cod_cia = ED.cod_cia
		AND GE.cod_eva_des = ED.cod_eva_des AND GE.cod_grup_val = ED.cod_grup_val
INNER	JOIN GTH_EvaDesemRespComp AS C ON ED.cod_cia = C.cod_cia
		AND ED.cod_eva_des = C.cod_eva_des AND ED.cod_grup_val = C.cod_grup_val
		AND ED.cod_emp_evado = C.cod_emp_evado
INNER	JOIN GTH_Comporta AS CP ON C.cod_comp = CP.cod_comp
		AND C.cod_comporta = CP.cod_comporta
WHERE	GE.tip_eva = '1' AND RTRIM(C.cod_comp)+' - '+RTRIM(C.cod_comporta) NOT IN (SELECT RTRIM(PM.cod_comp)+' - '+RTRIM(PM.cod_comporta) FROM GTH_EvaDesemGrupoEvalPlanMejora AS PM
				WHERE PM.cod_cia = ED.cod_cia AND PM.cod_eva_des = ED.cod_eva_des AND PM.cod_grup_val = ED.cod_grup_val 
				AND PM.cod_emp_evado = ED.cod_emp_evado)
GROUP	BY GE.cod_cia, GE.cod_eva_des, GE.cod_grup_val, ED.cod_emp_evado, C.cod_comp, C.cod_comporta, CP.des_comporta
UNION	ALL
SELECT	GE.cod_cia, GE.cod_eva_des, GE.cod_grup_val, ED.cod_emp_evado, C.cod_comp, C.cod_comporta, CP.des_comporta
FROM	GTH_EvaDesemGrupoEval AS GE
INNER	JOIN GTH_EvaDesemAsig AS ED ON GE.cod_cia = ED.cod_cia
		AND GE.cod_eva_des = ED.cod_eva_des AND GE.cod_grup_val = ED.cod_grup_val
INNER	JOIN GTH_Evalua_Estado AS EE ON ED.cod_cia = EE.cod_cia
		AND ED.cod_eva_des = EE.codigo AND ED.cod_grup_val = EE.cons
		AND ED.cod_eva = EE.cod_eva AND EE.cod_ori = '06'
INNER	JOIN GTH_Eval_Estado_Pers AS EP ON EE.consec_eva = EP.consec_eva
		AND EE.cod_eva = EP.cod_eva AND ED.cod_emp_evado = EP.cod_emp_evado
		AND EP.nota_eva IS NOT NULL
INNER	JOIN GTH_Evalua_Comporta AS C ON ED.cod_eva = C.cod_eva
		AND GE.cod_cia = C.cod_cia
INNER	JOIN GTH_Comporta AS CP ON C.cod_comp = CP.cod_comp
		AND C.cod_comporta = CP.cod_comporta
WHERE	GE.tip_eva = '2' AND RTRIM(C.cod_comp)+' - '+RTRIM(C.cod_comporta) NOT IN (SELECT RTRIM(PM.cod_comp)+' - '+RTRIM(PM.cod_comporta) FROM GTH_EvaDesemGrupoEvalPlanMejora AS PM
				WHERE PM.cod_cia = ED.cod_cia AND PM.cod_eva_des = ED.cod_eva_des AND PM.cod_grup_val = ED.cod_grup_val 
				AND PM.cod_emp_evado = ED.cod_emp_evado)
GROUP	BY GE.cod_cia, GE.cod_eva_des, GE.cod_grup_val, ED.cod_emp_evado, C.cod_comp, C.cod_comporta, CP.des_comporta
UNION	ALL
SELECT	GE.cod_cia, GE.cod_eva_des, GE.cod_grup_val, ED.cod_emp_evado, C.cod_comp, C.cod_comporta, CP.des_comporta
FROM	GTH_EvaDesemGrupoEval AS GE
INNER	JOIN GTH_EvaDesemAsig AS ED ON GE.cod_cia = ED.cod_cia
		AND GE.cod_eva_des = ED.cod_eva_des AND GE.cod_grup_val = ED.cod_grup_val
INNER	JOIN GTH_EvaDesemRespCompConc AS C ON ED.cod_cia = C.cod_cia
		AND ED.cod_eva_des = C.cod_eva_des AND ED.cod_grup_val = C.cod_grup_val
		AND ED.cod_emp_evado = C.cod_emp_evado
INNER	JOIN GTH_Comporta AS CP ON C.cod_comp = CP.cod_comp
		AND C.cod_comporta = CP.cod_comporta
WHERE	GE.tip_eva = '3' AND RTRIM(C.cod_comp)+' - '+RTRIM(C.cod_comporta) NOT IN (SELECT RTRIM(PM.cod_comp)+' - '+RTRIM(PM.cod_comporta) FROM GTH_EvaDesemGrupoEvalPlanMejora AS PM
				WHERE PM.cod_cia = ED.cod_cia AND PM.cod_eva_des = ED.cod_eva_des AND PM.cod_grup_val = ED.cod_grup_val 
				AND PM.cod_emp_evado = ED.cod_emp_evado)
GROUP	BY GE.cod_cia, GE.cod_eva_des, GE.cod_grup_val, ED.cod_emp_evado, C.cod_comp, C.cod_comporta, CP.des_comporta

```
