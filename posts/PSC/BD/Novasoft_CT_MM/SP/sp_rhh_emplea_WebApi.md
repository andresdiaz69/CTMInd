# Stored Procedure: sp_rhh_emplea_WebApi

## Usa los objetos:
- [[gen_ciudad]]
- [[gen_paises]]
- [[GTH_EstCivil]]
- [[GTH_Genero]]
- [[rhh_emplea]]
- [[rhh_tbclaest]]

```sql
/*=============================================
	Author:			Alvaro Vega
	Create date:	21-12-2021
	Description:	Procedimiento Almacenado que consulta información del empleado
					para las integraciones
=============================================*/
CREATE PROCEDURE [dbo].[sp_rhh_emplea_WebApi]
	@codEmp		CHAR(12)
AS
BEGIN	
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

    SELECT	RTRIM(emp.cod_emp) AS codEmp,
			ISNULL(RTRIM(emp.nom_emp),'')+' '+ISNULL(RTRIM(emp.ap1_emp),'')+' '+ISNULL(RTRIM(emp.ap2_emp),'') AS nombreCompletoEmpleado,
			RTRIM(emp.nom_emp) AS nombreEmpleado,
			RTRIM(ISNULL(RTRIM(emp.nom_emp),'')+' '+ISNULL(RTRIM(emp.ap1_emp),'')) AS nombreApellido,
			ISNULL(sex.cod_gen_Extr,IIF(emp.sex_emp=1,'F','M')) AS sexEmp,
			ISNULL(estCiv.cod_est_Extr,estCiv.cod_est) AS estCiv,
			CAST(emp.fec_nac AS DATE) AS fecNac,
			RTRIM(ISNULL(ciu.cod_ciu_Extr,emp.cod_ciu)) AS codCiu,
			emp.nac_emp AS nacEmp,
			ISNULL(tipEst.tip_est_extr,tipEst.tip_est) AS tipEst,
			emp.num_ide AS numIde,
			emp.nro_psp AS nroPsp,
			ISNULL(pai.cod_pai_Extr,emp.cod_pai_emisor_psp) AS codPaiEmisorPsp,
			ISNULL(CAST(emp.fec_exp_psp AS DATE),'1900-01-01') AS fecExpPsp,
			ISNULL(CAST(emp.fec_venc_psp AS DATE),'1900-01-01') AS fecVencPsp,
			emp.cod_emp_Extr AS codEmpExtr
	FROM rhh_emplea AS emp
		LEFT JOIN GTH_Genero AS sex ON emp.sex_emp = sex.cod_gen
		LEFT JOIN rhh_tbclaest AS tipEst ON emp.Niv_aca=tipEst.tip_est
		LEFT JOIN GTH_EstCivil AS estCiv ON emp.est_civ=estCiv.cod_est
		LEFT JOIN gen_paises AS pai	ON emp.cod_pai_emisor_psp=pai.cod_pai
		LEFT JOIN gen_ciudad AS ciu ON emp.cod_ciu=ciu.cod_ciu AND emp.cod_pai=ciu.cod_pai AND emp.cod_dep=ciu.cod_dep
	WHERE cod_emp LIKE RTRIM(@codEmp);
END;

```
