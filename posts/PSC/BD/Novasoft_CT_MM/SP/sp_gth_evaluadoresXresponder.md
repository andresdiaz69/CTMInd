# Stored Procedure: sp_gth_evaluadoresXresponder

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[gen_compania]]
- [[GTH_EvaDesem]]
- [[GTH_EvaDesemAsig]]
- [[GTH_EvaDesemGrupoEval]]
- [[GTH_EvaDesemRespComp]]
- [[GTH_EvaDesemRespCompConc]]
- [[GTH_Eval_Estado_Pers]]
- [[GTH_Evalua_Estado]]
- [[GTH_Rol]]

```sql

-- =============================================
-- Author:		Jorge Diaz
-- Create date: 2020.11.04
-- Description:	Informe Evaluadores Pendientes X Responder
-- =============================================

CREATE PROCEDURE [dbo].[sp_gth_evaluadoresXresponder] 
	@cod_cia 			CHAR(3),
	@cod_eva_des   		VARCHAR(6),
	@cod_grup_val		VARCHAR(2),
	@cod_emp_evado		CHAR(12),
	@cod_emp_respond	CHAR(12)
--WITH ENCRYPTION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	SELECT	cod_cia, nom_cia, cod_eva_des, des_eva, cod_grup_val, des_grup_val, cod_emp_respond, Evaluador, cod_emp_evado, Evaluado, Rol, fec_fin, MSG
	INTO	#tmpData 
	FROM 
	(
		SELECT	eva.cod_cia, cia.nom_cia, eva.cod_eva_des, eva.des_eva, asi.cod_grup_val, G.des_grup_val,
				per.cod_emp_respond, dbo.Fn_rhh_NombreCompleto(per.cod_emp_respond, 2) AS [Evaluador], 
				per.cod_emp_evado, dbo.Fn_rhh_NombreCompleto(per.cod_emp_evado, 2) AS [Evaluado], 
				CAST(asi.cod_rol AS VARCHAR(10))+' - '+rol.desc_rol AS Rol, 
				est.cod_rol, per.fec_fin, 
				CASE 
					WHEN per.nota_eva IS NOT NULL THEN 'El Evaluador no ha terminado el proceso' 
					ELSE 'El Evaluador no ha realizado la evaluación'
				END AS MSG
		FROM	GTH_Eval_Estado_Pers AS per 
		INNER	JOIN GTH_Evalua_Estado AS est ON per.consec_eva = est.consec_eva
				AND per.cod_eva = est.cod_eva
		INNER	JOIN GTH_EvaDesem AS eva ON eva.cod_eva_des = est.codigo
				AND eva.cod_cia = est.cod_cia 
		INNER	JOIN gen_compania AS cia ON cia.cod_cia = eva.cod_cia
		INNER	JOIN GTH_EvaDesemAsig AS asi ON asi.cod_eva_des = est.codigo
				AND asi.cod_cia = est.cod_cia AND asi.cod_emp_evado = per.cod_emp_evado
				AND asi.cod_emp_evador = per.cod_emp_respond AND asi.cod_grup_val = est.cons
		INNER	JOIN GTH_Rol AS rol ON rol.cod_rol = asi.cod_rol
		INNER	JOIN GTH_EvaDesemGrupoEval AS G ON asi.cod_cia = G.cod_cia
				AND asi.cod_eva_des = G.cod_eva_des AND asi.cod_grup_val = G.cod_grup_val
		WHERE	est.cod_ori = '06' -- Evaluacion por competencias
				AND est.cod_cia LIKE RTRIM(@cod_cia) 
				AND est.codigo LIKE RTRIM(@cod_eva_des)
				AND CONVERT(VARCHAR, est.cons) LIKE RTRIM(@cod_grup_val)
				AND PER.cod_emp_respond LIKE RTRIM(@cod_emp_respond) 
				AND per.cod_emp_evado LIKE RTRIM(@cod_emp_evado)
				AND per.fec_fin IS NULL

		UNION	ALL

		SELECT	eva.cod_cia, cia.nom_cia, eva.cod_eva_des, eva.des_eva, asi.cod_grup_val, G.des_grup_val,
				asi.cod_emp_evador, dbo.Fn_rhh_NombreCompleto(asi.cod_emp_evador, 2) AS [Evaluador], 
				asi.cod_emp_evado, dbo.Fn_rhh_NombreCompleto(asi.cod_emp_evado, 2) AS [Evaluado], 
				CAST(asi.cod_rol AS VARCHAR(10))+' - '+rol.desc_rol AS Rol, 
				RC.cod_rol, RC.fec_fin_proc, 
				CASE 
					WHEN asi.nota_eva IS NOT NULL THEN 'El Evaluador no ha terminado el proceso' 
					ELSE 'El Evaluador no ha realizado la evaluación'
				END AS MSG
		FROM	GTH_EvaDesem AS eva
		INNER	JOIN gen_compania AS cia ON cia.cod_cia = eva.cod_cia
		INNER	JOIN GTH_EvaDesemAsig AS asi ON asi.cod_eva_des = eva.cod_eva_des
				AND asi.cod_cia = eva.cod_cia
		INNER	JOIN GTH_Rol AS rol ON rol.cod_rol = asi.cod_rol
		INNER	JOIN GTH_EvaDesemGrupoEval AS G ON asi.cod_cia = G.cod_cia
				AND asi.cod_eva_des = G.cod_eva_des AND asi.cod_grup_val = G.cod_grup_val
		LEFT	JOIN GTH_EvaDesemRespComp AS RC ON asi.cod_eva_des = RC.cod_eva_des
				AND asi.cod_cia = RC.cod_cia AND asi.cod_emp_evado = RC.cod_emp_evado
				AND asi.cod_emp_evador = RC.cod_emp_evador AND asi.cod_grup_val = RC.cod_grup_val
				AND RC.cod_rol = asi.cod_rol
		WHERE	asi.cod_cia LIKE RTRIM(@cod_cia) 
				AND asi.cod_eva_des LIKE RTRIM(@cod_eva_des)
				AND CONVERT(VARCHAR, asi.cod_grup_val) LIKE RTRIM(@cod_grup_val)
				AND asi.cod_emp_evador LIKE RTRIM(@cod_emp_respond) 
				AND asi.cod_emp_evado LIKE RTRIM(@cod_emp_evado)
				AND G.tip_eva = 1
				AND RC.fec_fin_proc IS NULL 

		UNION	ALL

		SELECT	eva.cod_cia, cia.nom_cia, eva.cod_eva_des, eva.des_eva, asi.cod_grup_val, G.des_grup_val,
				asi.cod_emp_evador, dbo.Fn_rhh_NombreCompleto(asi.cod_emp_evador, 2) AS [Evaluador], 
				asi.cod_emp_evado, dbo.Fn_rhh_NombreCompleto(asi.cod_emp_evado, 2) AS [Evaluado], 
				CAST(asi.cod_rol AS VARCHAR(10))+' - '+rol.desc_rol AS Rol, 
				RC.cod_rol, RC.fec_fin_proc, 
				CASE 
					WHEN asi.nota_eva IS NOT NULL THEN 'El Evaluador no ha terminado el proceso' 
					ELSE 'El Evaluador no ha realizado la evaluación'
				END AS MSG
		FROM	GTH_EvaDesem AS eva
		INNER	JOIN gen_compania AS cia ON cia.cod_cia = eva.cod_cia
		INNER	JOIN GTH_EvaDesemAsig AS asi ON asi.cod_eva_des = eva.cod_eva_des
				AND asi.cod_cia = eva.cod_cia
		INNER	JOIN GTH_Rol AS rol ON rol.cod_rol = asi.cod_rol
		INNER	JOIN GTH_EvaDesemGrupoEval AS G ON asi.cod_cia = G.cod_cia
				AND asi.cod_eva_des = G.cod_eva_des AND asi.cod_grup_val = G.cod_grup_val
		LEFT	JOIN GTH_EvaDesemRespCompConc AS RC ON asi.cod_eva_des = RC.cod_eva_des
				AND asi.cod_cia = RC.cod_cia AND asi.cod_emp_evado = RC.cod_emp_evado
				AND asi.cod_emp_evador = RC.cod_emp_evador AND asi.cod_grup_val = RC.cod_grup_val
				AND RC.cod_rol = asi.cod_rol
		WHERE	asi.cod_cia LIKE RTRIM(@cod_cia) 
				AND asi.cod_eva_des LIKE RTRIM(@cod_eva_des)
				AND CONVERT(VARCHAR, asi.cod_grup_val) LIKE RTRIM(@cod_grup_val)
				AND asi.cod_emp_evador LIKE RTRIM(@cod_emp_respond) 
				AND asi.cod_emp_evado LIKE RTRIM(@cod_emp_evado)
				AND G.tip_eva = 3
				AND RC.fec_fin_proc IS NULL 
	) AS dts 
	GROUP	BY cod_cia, nom_cia, cod_eva_des, des_eva, cod_grup_val, des_grup_val, cod_emp_respond, [Evaluador], 
			cod_emp_evado, [Evaluado], Rol, fec_fin, MSG
	ORDER	BY cod_cia, cod_eva_des, cod_grup_val, cod_emp_respond, Rol, cod_emp_evado 
	
	IF (SELECT COUNT(*) FROM #tmpData) > 0
	BEGIN
		SELECT	cod_cia AS [Código Companía], nom_cia AS [Compañía],
				cod_eva_des AS [Código Proceso], des_eva AS [Proceso de Valoración],
				cod_grup_val AS [Código Grupo Evaluación], des_grup_val AS [Grupo de Evaluación],
				cod_emp_respond AS [Código Evaluador], [Evaluador],
				cod_emp_evado AS [Código evaluado], [Evaluado],
				Rol AS [Rol del Evaluador], fec_fin AS [Fecha Fin], MSG AS [Estado]
		FROM	#tmpData
		WHERE	fec_fin IS NULL
		ORDER	BY 1,3,4,5;
	END
	ELSE
	BEGIN
		SELECT 'SIN DATOS PARA ESTA CONSULTA.' AS mensaje;
	END
END;

```
