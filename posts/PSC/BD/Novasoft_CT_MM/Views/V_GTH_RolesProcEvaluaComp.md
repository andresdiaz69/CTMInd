# View: V_GTH_RolesProcEvaluaComp

## Usa los objetos:
- [[GTH_EvaDesemGrupoEval]]
- [[GTH_Rol]]

```sql
CREATE VIEW [dbo].[V_GTH_RolesProcEvaluaComp]
AS
SELECT	GE.cod_cia, GE.cod_eva_des, GE.cod_grup_val, R.cod_rol, R.desc_rol
FROM	GTH_Rol AS R
INNER	JOIN GTH_EvaDesemGrupoEval AS GE ON GE.tip_eva != 3
		AND GE.eva_sup = 1 AND R.cod_rol = 1
UNION	ALL
SELECT	GE.cod_cia, GE.cod_eva_des, GE.cod_grup_val, R.cod_rol, R.desc_rol
FROM	GTH_Rol AS R
INNER	JOIN GTH_EvaDesemGrupoEval AS GE ON GE.tip_eva != 3
		AND GE.eva_sub = 1 AND R.cod_rol = 2
UNION	ALL
SELECT	GE.cod_cia, GE.cod_eva_des, GE.cod_grup_val, R.cod_rol, R.desc_rol
FROM	GTH_Rol AS R
INNER	JOIN GTH_EvaDesemGrupoEval AS GE ON GE.tip_eva != 3
		AND GE.eva_par = 1 AND R.cod_rol = 3
UNION	ALL
SELECT	GE.cod_cia, GE.cod_eva_des, GE.cod_grup_val, R.cod_rol, R.desc_rol
FROM	GTH_Rol AS R
INNER	JOIN GTH_EvaDesemGrupoEval AS GE ON GE.tip_eva != 3
		AND GE.eva_auto = 1 AND R.cod_rol = 4
UNION	ALL
SELECT	GE.cod_cia, GE.cod_eva_des, GE.cod_grup_val, R.cod_rol, R.desc_rol
FROM	GTH_Rol AS R
INNER	JOIN GTH_EvaDesemGrupoEval AS GE ON GE.tip_eva != 3
		AND GE.eva_ext = 1 AND R.cod_rol = 5

```
