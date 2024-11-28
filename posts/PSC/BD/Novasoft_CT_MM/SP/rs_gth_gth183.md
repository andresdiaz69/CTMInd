# Stored Procedure: rs_gth_gth183

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_sucursal]]
- [[GTH_Apertura_Desvin]]
- [[gth_areas]]
- [[GTH_ConsPazySalvo]]
- [[GTH_NotiDesvin]]
- [[GTH_PazySalvo]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_hislab]]

```sql


-- =============================================
-- Author:		Jorge Diaz
-- Create date: 2021.09.15
-- Description:	Paz y Salvo Desvinculacion 
-- =============================================
--
-- EXEC rs_gth_gth183
-- EXEC rs_gth_gth183 '01','%','%','%','%','%','%','%','%','%','%','20200101','20211231','1024506460'
-- EXEC rs_gth_gth183 '01','%','%','%','%','%','%','KWSER','%','%','%','20200101','20211231','%'
--
-- =============================================
CREATE PROCEDURE [dbo].[rs_gth_gth183] 
	@cod_cia	CHAR(3)		= '01', 
	@cod_suc	CHAR(3)		= '%',
	@cod_cco	CHAR(6)		= '%',
	@cod_cl1	CHAR(12)	= '%',
	@cod_cl2	CHAR(12)	= '%',
	@cod_cl3	CHAR(12)	= '%',
	@cod_cl4	CHAR(12)	= '%',
	@cod_cl5	CHAR(12)	= '%',
	@cod_cl6	CHAR(12)	= '%',
	@cod_cl7	CHAR(12)	= '%',
	@cod_area	VARCHAR(12) = '%',
	@fec_proi	DATETIME	= '20200101',
	@fec_prof	DATETIME	= '20211231',
	@cod_emp	CHAR(12)	= '%'

--WITH ENCRYPTION  	
AS
BEGIN

	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	-- valida @cod_cia
	IF @cod_cia='%' OR ISNULL(@cod_cia,'')=''
	BEGIN
		RETURN
	END


	SELECT emp.cod_cia, ape.cod_emp, emp.cod_cl1, emp.cod_cl2, emp.cod_cl3, 
		emp.cod_cl4, emp.cod_cl5, emp.cod_cl6, emp.cod_cl7, 
		emp.num_ide, RTRIM(emp.nom_emp)+' '+RTRIM(emp.ap1_emp)+' '+RTRIM(emp.ap2_emp) AS nom_empl, 
		emp.cod_car, car.nom_car, emp.cod_suc, suc.nom_suc, emp.cod_cco, cco.nom_cco, 
		are.cod_area, are.des_area, 
		ape.fec_proceso, emp.fec_ing, ape.cod_notiDesvin, nDes.des_notiDesvin,  
		CASE 
			WHEN pzs.dot=1 THEN '2-DOT' 
			WHEN pzs.epp=1 THEN '3-EPP' 
			WHEN pzs.et=1  THEN '4-TRA' 
			ELSE '1-GEN' END AS item, 
		pro.cod_pazysalvo, pzs.des_pazysalvo, 
		pro.cod_resp, RTRIM(emp2.nom_emp)+' '+RTRIM(emp2.ap1_emp)+' '+RTRIM(emp2.ap2_emp) AS nom_resp, 
		are2.cod_area AS cod_are_resp, are2.des_area AS nom_are_resp, pro.fec_valida, pro.detalle, 
		CASE pro.pazysalvo WHEN 1 THEN 'Si' ELSE 'No' END AS pazYsalvo 
	FROM GTH_Apertura_Desvin ape 
		INNER JOIN rhh_emplea emp ON emp.cod_emp = ape.cod_emp
		INNER JOIN rhh_cargos car ON car.cod_car = emp.cod_car 
		INNER JOIN gen_sucursal suc ON suc.cod_suc = emp.cod_suc 
		INNER JOIN gen_ccosto cco ON cco.cod_cco = emp.cod_cco 
		LEFT JOIN gth_areas are ON are.cod_cia=emp.cod_cia 
			AND are.cod_area = (SELECT TOP 1 cod_area FROM rhh_hislab WHERE cod_emp=emp.cod_emp ORDER BY fec_ini DESC) 
		INNER JOIN GTH_NotiDesvin nDes ON nDes.cod_notiDesvin = ape.cod_notiDesvin 
		INNER JOIN GTH_ConsPazySalvo pro ON emp.cod_emp=pro.cod_emp AND ape.fec_proceso=pro.fec_proc AND pro.cod_activ=3 -- Actividad Paz y salvo = 3 
		INNER JOIN GTH_PazySalvo pzs ON pro.cod_pazysalvo = pzs.cod_pazysalvo 
		INNER JOIN rhh_emplea emp2 ON emp2.cod_emp = pro.cod_resp 
		LEFT JOIN gth_areas are2 ON are2.cod_cia=emp2.cod_cia 
			AND are2.cod_area = (SELECT TOP 1 cod_area FROM rhh_hislab WHERE cod_emp=emp2.cod_emp AND fec_ini<=ape.fec_proceso ORDER BY fec_ini DESC) 
	WHERE 
		emp.cod_cia LIKE RTRIM(@cod_cia) 
		AND emp.cod_suc LIKE RTRIM(@cod_suc) 
		AND emp.cod_cco LIKE RTRIM(@cod_cco) 
		AND emp.cod_cl1 LIKE RTRIM(@cod_cl1) 
		AND emp.cod_cl2 LIKE RTRIM(@cod_cl2) 
		AND emp.cod_cl3 LIKE RTRIM(@cod_cl3) 
		AND emp.cod_cl4 LIKE RTRIM(@cod_cl4) 
		AND emp.cod_cl5 LIKE RTRIM(@cod_cl5) 
		AND emp.cod_cl6 LIKE RTRIM(@cod_cl6) 
		AND emp.cod_cl7 LIKE RTRIM(@cod_cl7) 
		AND are.cod_area LIKE RTRIM(@cod_area) 
		AND pro.fec_proc BETWEEN @fec_proi AND @fec_prof 
		AND ape.cod_emp LIKE RTRIM(@cod_emp) 
	
	ORDER BY emp.cod_cia, emp.cod_emp, item, pro.cod_pazysalvo 
	;
	
END

```
