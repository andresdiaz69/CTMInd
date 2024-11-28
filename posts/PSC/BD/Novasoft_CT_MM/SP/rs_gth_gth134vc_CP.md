# Stored Procedure: rs_gth_gth134vc_CP

```sql




-- =============================================
-- Author:		Alexander Vargas
-- Create date: 14/12/2015
-- Description:	Vivienda del Candidato. 


--Modify by: Alexander Vargas
--Modify date:	15/09/2020
--Description:	se agrega funcion QUOTENAME para 
--				evitar inyección SQL 

--Ajustes version 5
--Modify by:	Alexander Vargas
--Modify date:	17/04/2023
--Description:	se cambia el nombre de la tabla
--GTH_RptVivienda por prt_CandidatoTempVivienda
-- =============================================

CREATE PROCEDURE [dbo].[rs_gth_gth134vc_CP] 
	@cod_emp	CHAR(12),
	@bd_portal sysname
--WITH ENCRYPTION	
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE @CADENA NVARCHAR(MAX)

	SET @CADENA= '	SELECT	E.cod_emp, V.dir_viv, D.nom_dep, C.nom_ciu, TV.des_tip,
			T.des_Ten, V.estrato
	FROM	' +  QUOTENAME(@bd_portal) + '.. GTH_RptEmplea AS E
	INNER	JOIN ' + QUOTENAME(@bd_portal) + '..prt_CandidatoTempVivienda AS V ON E.cod_emp = V.cod_emp
	INNER	JOIN gen_deptos AS D ON V.cod_pai = D.cod_pai COLLATE DATABASE_DEFAULT 
			AND V.cod_dep = D.cod_dep COLLATE DATABASE_DEFAULT 
	INNER	JOIN gen_ciudad AS C ON V.cod_pai = C.cod_pai COLLATE DATABASE_DEFAULT 
			AND V.cod_dep = C.cod_dep COLLATE DATABASE_DEFAULT AND V.cod_ciu = C.cod_ciu COLLATE DATABASE_DEFAULT 
	INNER	JOIN GTH_TipoViv AS TV ON V.tip_viv = TV.tip_viv 
	INNER	JOIN GTH_TenenciaViv AS T ON V.tip_ten = T.tip_ten 
	WHERE	E.cod_emp =' + ''+ QUOTENAME(@cod_emp,CHAR(39)) + '';

	--PRINT @CADENA
	EXEC(@CADENA);	
END


```
