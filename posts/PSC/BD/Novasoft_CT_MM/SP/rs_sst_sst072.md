# Stored Procedure: rs_sst_sst072

## Usa los objetos:
- [[fn_GTH_HisLab_NumSec]]
- [[gen_compania]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[SST_EmpRolSGSST]]
- [[SST_ResponsabilidadRoles]]
- [[SST_Roles]]
- [[SST_VersionesResponsabilidades]]

```sql

-- =============================================
-- Author:		ANDREA VELEZ
-- Create date: MAYO / 2018
-- Description:	ROLES Y RESPONSABILIDADES
-- =============================================
CREATE PROCEDURE [dbo].[rs_sst_sst072]
	@cia	CHAR(3),
	@rol	CHAR(3),
	@emp	CHAR(12),
	@feci	DATETIME = '19000101',
	@fecf	DATETIME = '22000101'
--WITH ENCRYTPION 
AS

BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;
	SET DATEFORMAT YMD;

	IF @feci IS NULL
	BEGIN
		SET @feci = '19000101';
	END
	IF @fecf IS NULL OR @fecf = '19000101'
	BEGIN
		SET @fecf = '22000101';
	END

	SELECT	ER.cod_cia, R.cod_rol, ER.cod_emp, E.cod_car, RR.cod_resp, RR.des_resp, ER.fec_ini
	FROM SST_EmpRolSGSST AS ER 
	INNER JOIN SST_Roles AS R ON ER.cod_rol = R.cod_rol AND ER.cod_cia = R.cod_cia
	INNER JOIN rhh_emplea AS E ON ER.cod_emp = E.cod_emp
	INNER JOIN rhh_hislab AS HIS ON ER.cod_emp = HIS.cod_emp AND HIS.num_sec = dbo.fn_GTH_HisLab_NumSec(ER.cod_emp)
	INNER JOIN rhh_cargos AS CG ON HIS.cod_car = CG.cod_car
	INNER JOIN gen_compania AS C ON ER.cod_cia = C.cod_cia
	INNER JOIN SST_VersionesResponsabilidades AS VER ON VER.cod_cia = ER.cod_cia 
	       AND VER.cod_rol = ER.cod_rol 
		   AND VER.cons = ISNULL((SELECT MAX(cons) FROM SST_VersionesResponsabilidades WHERE cod_cia = ER.cod_cia AND cod_rol = ER.cod_rol), 0)
		   --AND ER.fec_ini BETWEEN VER.fec_vigi AND (CASE WHEN VER.fec_vigf IS NULL THEN CONVERT(DATETIME, '20500101') ELSE VER.fec_vigf END)
	LEFT  JOIN SST_ResponsabilidadRoles AS RR ON ER.cod_rol = RR.cod_rol
		   AND ER.cod_cia = RR.cod_cia AND RR.cons = VER.cons
	WHERE ER.cod_cia LIKE RTRIM(@cia) 
	  AND ER.cod_rol LIKE RTRIM(@rol)
	  AND ER.cod_emp LIKE RTRIM(@emp)
	  AND ER.fec_fin IS NULL
	  AND ER.fec_ini BETWEEN @feci AND @fecf
	  AND E.est_lab NOT IN ('00','99')
	ORDER BY ER.cod_cia, ER.cod_emp, ER.cod_rol, RR.cod_resp;
END

```
