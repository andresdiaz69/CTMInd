# Stored Procedure: rs_gth_gth102_a_PE

## Usa los objetos:
- [[GTH_Eval_Estado_Pers]]
- [[GTH_Evalua]]
- [[GTH_Evalua_Estado]]
- [[GTH_Evalua_Respuesta]]
- [[GTH_PregEvalua]]
- [[GTH_RefeTipo]]
- [[GTH_RequisicionEmp]]
- [[GTH_Rta]]
- [[GTH_TipoRta]]
- [[v_GTH_EmplCand]]
- [[v_GTH_SolCargos]]

```sql

-- =============================================
-- Author:          Grace Niño
-- Create date:		27/11/2018
-- Description:     REFERENCIAS - TEMPORAL
-- =============================================

CREATE PROCEDURE [dbo].[rs_gth_gth102_a_PE]
	 @cod_cli		CHAR(15),
	 @cod_conv      VARCHAR(15),
	 @cod_resp		CHAR(12),
	 @num_req       INT,
	 @candidato		CHAR(12),
	 @tip_ref		TINYINT,
	 @num_ref		INT
--WITH ENCRYPTION  	
AS

BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	SELECT	V.cod_cli, V.nom_cli, V.cod_conv, V.nom_conv, V.emp_resp, V.nom_resp, 
			RE.num_req, V.nom_car, RE.cod_emp, C.NOM_EMP, EEP.tip_ref, RF.des_tip, EEP.fec_ing,
			EEP.num_ref, EEP.cod_eva, E.Nom_eva, P.num_pre, P.Pregunta,CASE WHEN R.Txt_rta IS NULL THEN ER.txt_lib  
					ELSE  RTRIM(R.Txt_rta) + ISNULL(+ ': '+ RTRIM(ER.txt_lib) + '.', '.') END AS txt_lib
	FROM	GTH_RequisicionEmp AS RE
	INNER	JOIN GTH_Eval_Estado_Pers AS EEP ON RE.num_req = EEP.num_req
			AND RE.cod_emp = EEP.cod_rpt_respond
	INNER	JOIN GTH_Evalua_Estado AS EE ON EEP.consec_eva = EE.consec_eva
			AND EEP.cod_eva = EE.cod_eva
	INNER	JOIN GTH_Evalua AS E ON EE.cod_eva = E.cod_eva
			AND EE.cod_ori = E.cod_ori
	INNER	JOIN GTH_Evalua_Respuesta AS ER ON EEP.id = ER.id
			AND EEP.consec_eva = ER.consec_eva AND EEP.cod_eva = ER.cod_eva
	INNER	JOIN GTH_PregEvalua AS P ON ER.cod_eva = P.cod_eva
			AND ER.ide_pre = P.ide_pre
	INNER	JOIN GTH_TipoRta AS TR ON P.tip_rta = TR.tip_rta
	LEFT	JOIN GTH_Rta AS R ON ER.cod_rta = R.cod_rta
			AND TR.tip_rta = R.tip_rta
	INNER	JOIN v_GTH_SolCargos AS V ON RE.num_req = V.num_req
	INNER	JOIN v_GTH_EmplCand AS C ON RE.cod_emp = C.cod_emp
	INNER	JOIN GTH_RefeTipo AS RF ON EEP.tip_ref = RF.tip_ref
	WHERE	V.cod_cli LIKE RTRIM(@cod_cli) AND V.cod_conv LIKE RTRIM(@cod_conv)
			AND V.emp_resp LIKE RTRIM(@cod_resp) AND RE.num_req = @num_req
			AND RE.cod_emp = RTRIM(@candidato) AND EEP.tip_ref IS NOT NULL
			AND V.cod_cli IS NOT NULL AND EEP.tip_ref = @tip_ref AND EEP.num_ref = @num_ref;
END

```
