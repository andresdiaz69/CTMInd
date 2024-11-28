# Stored Procedure: sp_gth_ListadoPlanEvaluacion

## Usa los objetos:
- [[gen_compania]]
- [[GTH_EvaDesem]]
- [[GTH_EvaDesemGrupoEvalPlanMejora]]
- [[GTH_TbTipAccion]]
- [[rhh_emplea]]

```sql


-- =============================================
-- Author:		Jorge Diaz
-- Create date: 2020.03.02
-- Description:	Listado Consolidado Planes de Acción Evaluación de Competencias
--
-- exec dbo.sp_gth_ListadoPlanEvaluacion '%','%','%','%'
--
-- =============================================

CREATE PROCEDURE [dbo].[sp_gth_ListadoPlanEvaluacion]
	@cod_cia		CHAR(3),
	@cod_eva_des	VARCHAR(6),
	@cod_emp		CHAR(12),
	@tip_acc		CHAR(4)	

--WITH ENCRYPTION   
AS
BEGIN

	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	SELECT cia.nom_cia AS [Compañía], edpa.cod_emp_evado AS [Codigo Empleado], RTRIM(ISNULL(emp.nom_emp,'')) +' '+ RTRIM(ISNULL(emp.ap1_emp,''))+' '+RTRIM(ISNULL(emp.ap2_emp,'')) AS [Nombres y Apellidos], eva.des_eva AS [Proceso de Valoración], tip.Des_TipAcc AS [Tipo de Acción], /*edpa.Fec_Seg AS [Fecha de Seguimiento],*/ edpa.emp_resp AS [Codigo Responsable], RTRIM(ISNULL(emp2.nom_emp,''))+' '+RTRIM(ISNULL(emp2.ap1_emp,''))+' '+RTRIM(ISNULL(emp2.ap2_emp,'')) AS [Empleado Responsable], edpa.det_acc AS [Detalle Acción], edpa.evi_imp AS [Evidencia Acción], CASE WHEN edpa.cod_est = 1 THEN 'Pendiente' WHEN edpa.cod_est = 2 THEN 'Cerrado' 		END AS [Estado]/*, RTRIM(edpa.Cod_Even)+' - '+eve.nom_even AS [Codigo del Evento], edpa.Nota_Plan AS [Nota Obtenida] */
	FROM GTH_EvaDesemGrupoEvalPlanMejora edpa 
		INNER JOIN gen_compania cia ON edpa.cod_cia = cia.cod_cia 
		LEFT JOIN rhh_emplea emp ON edpa.cod_emp_evado = emp.cod_emp 
		INNER JOIN GTH_EvaDesem eva ON edpa.Cod_Eva_Des = eva.cod_eva_des AND edpa.cod_cia=eva.cod_cia 
		INNER JOIN GTH_TbTipAccion tip ON edpa.Tip_Acc = tip.Tip_Acc 
		LEFT JOIN rhh_emplea emp2 ON edpa.emp_resp = emp2.cod_emp 
		--INNER JOIN v_GTH_EvenCapac eve ON edpa.Tip_Acc=eve.cod_even 
	WHERE edpa.cod_cia LIKE RTRIM(@cod_cia) 
		AND edpa.Cod_Eva_Des LIKE RTRIM(@cod_eva_des) 
		AND edpa.cod_emp_evado LIKE RTRIM(@cod_emp) 
		AND edpa.Tip_Acc LIKE RTRIM(@tip_acc) 
	ORDER BY edpa.cod_cia, edpa.cod_emp_evado, edpa.Cod_Eva_Des;

	
	IF @@ROWCOUNT = 0
	BEGIN
		SELECT 'La consulta no arroja resultados ...!' AS [Mensaje];
	END;

END;

```
