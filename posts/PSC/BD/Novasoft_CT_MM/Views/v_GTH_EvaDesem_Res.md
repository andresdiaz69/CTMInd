# View: v_GTH_EvaDesem_Res

## Usa los objetos:
- [[gen_compania]]
- [[GTH_Competencias]]
- [[GTH_Comporta]]
- [[GTH_Comporta_Nivel]]
- [[GTH_EvaDesem]]
- [[GTH_EvaDesemAsig]]
- [[GTH_EvaDesemGrupoEval]]
- [[GTH_Eval_Estado_Pers]]
- [[GTH_Evalua]]
- [[GTH_Evalua_Comporta]]
- [[GTH_Evalua_Estado]]
- [[GTH_Evalua_Respuesta]]
- [[GTH_PregEvalua]]
- [[GTH_Rta]]
- [[rhh_emplea]]
- [[V_GTH_EVALDESEM]]

```sql
CREATE VIEW [dbo].[v_GTH_EvaDesem_Res]
AS
SELECT        ED.cod_cia, CIA.nom_cia, ED.cod_eva_des, PC.cod_comp, CP.nom_comp, C.niv_compor, CN.des_compor, PC.cod_comporta, C.des_comporta, ES.cod_emp_evado, RTRIM(EM.ap1_emp) + '  ' + RTRIM(EM.ap2_emp) 
                         + ' ' + RTRIM(EM.nom_emp) AS EMPLEADO, ES.cod_emp_respond, RTRIM(ERP.nom_emp_evador) AS EVALUADOR, ER.cod_eva, E.Nom_eva, P.num_pre, R.val_rta, P.peso_preg, R.val_rta * P.peso_preg / 100 AS NotaPregunta, 
                         SUM(R.val_rta * P.peso_preg / 100) OVER (PARTITION BY ED.cod_cia, ED.cod_eva_des, ES.cod_emp_evado, ER.cod_eva, ES.cod_emp_respond, PC.cod_comp, PC.cod_comporta) AS NotaCuestionario, EA.cod_rol, 
                         CASE EA.cod_rol WHEN 1 THEN EDG.peso_eva WHEN 2 THEN EDG.peso_eva_s WHEN 3 THEN EDG.peso_eva_p WHEN 4 THEN EDG.peso_eva_a WHEN 5 THEN EDG.peso_eva_e WHEN 6 THEN EDG.peso_eva_e END AS Peso_Evador,
                          R.val_rta * P.peso_preg / 100 * CASE EA.cod_rol WHEN 1 THEN EDG.peso_eva WHEN 2 THEN EDG.peso_eva_s WHEN 3 THEN EDG.peso_eva_p WHEN 4 THEN EDG.peso_eva_a WHEN 5 THEN EDG.peso_eva_e WHEN 6 THEN
                          EDG.peso_eva_e END / 100 AS defComportamiento_PregEvado, 
                         SUM(R.val_rta * P.peso_preg / 100 * CASE EA.cod_rol WHEN 1 THEN EDG.peso_eva WHEN 2 THEN EDG.peso_eva_s WHEN 3 THEN EDG.peso_eva_p WHEN 4 THEN EDG.peso_eva_a WHEN 5 THEN EDG.peso_eva_e WHEN 6
                          THEN EDG.peso_eva_e END / 100) OVER (PARTITION BY ED.cod_cia, ED.cod_eva_des, PC.cod_comp, PC.cod_comporta, ES.cod_emp_evado, EA.cod_rol) AS defComportamiento_Evado, C.peso AS PesoComportamiento, 
                         SUM(R.val_rta * P.peso_preg / 100 * CASE EA.cod_rol WHEN 1 THEN EDG.peso_eva WHEN 2 THEN EDG.peso_eva_s WHEN 3 THEN EDG.peso_eva_p WHEN 4 THEN EDG.peso_eva_a WHEN 5 THEN EDG.peso_eva_e WHEN 6
                          THEN EDG.peso_eva_e END / 100 * C.peso / 100) OVER (PARTITION BY ED.cod_cia, ED.cod_eva_des, PC.cod_comp, ES.cod_emp_evado, EA.cod_rol) AS defCompetencia_Evado, EDG.cod_grup_val
FROM            dbo.GTH_Evalua_Respuesta AS ER INNER JOIN
                         dbo.GTH_Evalua AS E ON E.cod_eva = ER.cod_eva /*AND E.cod_ori = '06'*/ INNER JOIN
                         dbo.GTH_Eval_Estado_Pers AS ES ON ES.cod_eva = ER.cod_eva AND ES.consec_eva = ER.consec_eva AND ES.id = ER.id INNER JOIN
                         dbo.GTH_Evalua_Estado AS EE ON EE.consec_eva = ES.consec_eva AND EE.cod_ori = E.cod_ori INNER JOIN
                         dbo.GTH_EvaDesem AS ED ON ED.cod_eva_des = EE.codigo AND ED.cod_cia = EE.cod_cia INNER JOIN
                         dbo.GTH_PregEvalua AS P ON P.cod_eva = ER.cod_eva AND P.ide_pre = ER.ide_pre INNER JOIN
                         dbo.GTH_Evalua_Comporta AS PC ON PC.cod_eva = P.cod_eva AND PC.ide_pre = P.ide_pre AND PC.cod_cia = ED.cod_cia INNER JOIN
                         dbo.GTH_Rta AS R ON R.cod_rta = ER.cod_rta AND R.tip_rta = P.tip_rta INNER JOIN
                         dbo.GTH_EvaDesemAsig AS EA ON EA.cod_eva = ER.cod_eva AND EA.cod_eva_des = ED.cod_eva_des AND EA.cod_emp_evado = ES.cod_emp_evado AND EA.cod_emp_evador = ES.cod_emp_respond INNER JOIN
                         GTH_EvaDesemGrupoEval AS EDG ON EA.COD_CIA = EDG.COD_CIA AND EA.cod_eva_des = EDG.cod_eva_des AND EA.cod_grup_val = EDG.cod_grup_val INNER JOIN
                         dbo.GTH_Comporta AS C ON C.cod_comp = PC.cod_comp AND C.cod_comporta = PC.cod_comporta INNER JOIN
                         dbo.GTH_Comporta_Nivel AS CN ON CN.niv_compor = C.niv_compor INNER JOIN
                         dbo.GTH_Competencias AS CP ON CP.cod_comp = C.cod_comp INNER JOIN
                         dbo.rhh_emplea AS EM ON EM.cod_emp = ES.cod_emp_evado INNER JOIN
                         dbo.gen_compania AS CIA ON ED.cod_cia = CIA.cod_cia INNER JOIN
                         dbo.V_GTH_EVALDESEM AS ERP ON ERP.cod_evador = ES.cod_emp_respond
WHERE        ES.nota_eva IS NOT NULL

```
