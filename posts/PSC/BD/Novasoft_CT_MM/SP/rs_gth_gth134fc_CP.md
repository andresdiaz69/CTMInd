# Stored Procedure: rs_gth_gth134fc_CP

```sql






-- =============================================
-- Author:		Alexander Vargas
-- Create date: 14/12/2015
-- Description:	Estudios del Candidato. 


--Modify by: Alexander Vargas
--Modify date:	15/09/2020
--Description:	se agrega funcion QUOTENAME para 
--				evitar inyección SQL

--SRS2021-1153	Error intercalacion reporte HV Candidato
--Modify by:	Alexander Vargas
--Modify date:	01/09/2021
--Description:	Se agrega collate en los joins para
--				resolver problema de intercalación

--SPA2021 - 0259 Agregar campos consecutivo y modalidad. Dejar como el reporte GTH134FC
--Modify by:	Alexander Vargas
--Modify date:	21/12/2021
--Description:	Se agregan campos consecutivo y modalidad, se dejan los campos como
--los del reporte GTH134FC
-- =============================================

CREATE PROCEDURE [dbo].[rs_gth_gth134fc_CP] 
	@cod_emp	CHAR(12),
	@bd_portal sysname
--WITH ENCRYPTION	
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

		DECLARE @CADENA NVARCHAR(MAX)

	SET @CADENA=' SELECT ET.cons, E.cod_emp, NA.des_est AS Niv_Aca, TE.nom_est, IT.nom_ins, CE.des_est, ET.ano_est,
			ET.sem_apr, ET.nro_tar, ET.cur_act, ET.mod_est, ET.fec_ven, MEST.des_mod, ET.fec_gra, 
			CASE
				WHEN ET.gra_son = 1 THEN ''Sí''
				ELSE ''No''
			END AS gra_son,
						CONVERT(VARCHAR, (CASE
								WHEN ET.cur_act = 1 THEN ''Cursando Actualmente''
								WHEN ET.gra_son = 1 THEN ''Culminado''
								WHEN ET.ind_can = 1 THEN ''Cancelado/Aplazado''
								ELSE ''''
							  END)) AS estado
	FROM	' + QUOTENAME(@bd_portal) + '..GTH_RptEmplea AS E
	LEFT	JOIN rhh_tbclaest AS NA ON E.Niv_aca = NA.tip_est COLLATE DATABASE_DEFAULT 
	INNER	JOIN ' + QUOTENAME(@bd_portal) + '..GTH_RptEstudio AS ET ON E.cod_emp = ET.cod_emp COLLATE DATABASE_DEFAULT 
	LEFT    JOIN GTH_ModalidadEstudio AS MEST ON ET.mod_est = MEST.mod_est 
	INNER	JOIN rhh_tbestud AS TE ON ET.cod_est = TE.cod_est COLLATE DATABASE_DEFAULT 
	INNER	JOIN rhh_tbinsti AS IT ON ET.cod_ins = IT.cod_ins COLLATE DATABASE_DEFAULT 
	INNER	JOIN rhh_tbclaest AS CE ON ET.tip_est = CE.tip_est COLLATE DATABASE_DEFAULT 
	WHERE	E.cod_emp = ' + ''+ QUOTENAME(RTRIM(@cod_emp),CHAR(39)) + '';

	PRINT @CADENA
	EXEC(@CADENA);
END


```
