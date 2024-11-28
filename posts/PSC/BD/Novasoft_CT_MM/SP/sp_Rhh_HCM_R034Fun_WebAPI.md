# Stored Procedure: sp_Rhh_HCM_R034Fun_WebAPI

## Usa los objetos:
- [[gen_barrios]]
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_compania]]
- [[gen_deptos]]
- [[gen_paises]]
- [[gen_sucursal]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[Rhh_HCM_R034Fun]]
- [[rhh_tbclaest]]

```sql
/*=============================================
	Author:			Alvaro Vega
	Create date:	2021-12-29
	Description:	Procedimiento almacenado para API de consulta 
					Ficha Básica Colaborador Senior
=============================================*/
CREATE PROCEDURE [dbo].[sp_Rhh_HCM_R034Fun_WebAPI]
	@cod_emp		CHAR(12),
	@cod_car		CHAR(8),
	@fec_ini		DATETIME,
	@cod_cont		BIGINT
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
	SET NOCOUNT ON;
    
	SELECT	RTRIM(cto.cod_emp) AS cod_emp,
			RTRIM(cto.cod_car) AS cod_car,
			cto.fec_ini,
			cto.cod_cont,
			cto.consecutivo,
			RTRIM(ISNULL(cia.cod_cia_Extr,emp.cod_cia)) AS codCia,
			cto.DataDm,
			RTRIM(ISNULL(car.cod_car_Extr,emp.cod_car)) AS CodCar,
			RTRIM(ISNULL(suc.cod_suc_Extr,emp.cod_suc)) AS CodSuc,
			cto.TabOrg AS CodOrganigrama,
			cto.NumLoc AS CodArea,
			RTRIM(ISNULL(cco.cod_cco_Extr,emp.cod_cco)) AS CodCco,
			cto.TipCon,
			CASE WHEN emp.sex_emp=1 THEN 'F' ELSE 'M' END AS TipSex,
			emp.est_civ AS EstCiv,
			RTRIM(ISNULL(tipEst.tip_est_Extr,emp.niv_aca)) AS TipEst,
			emp.fec_nac AS FecNac,
			emp.nac_emp AS CodNac,
			RTRIM(cto.cod_emp) AS codEmp,
			RTRIM(emp.nom_emp) AS nomEmp,
			RTRIM(emp. nom_emp)+' '+RTRIM(emp.ap1_emp)+' '+RTRIM(emp.ap2_emp) AS nombreCompleto,
			cia.cod_estrucCargo AS codEstrucCargo,
			emp.cod_emp_Extr AS codEmpExtr,
			RTRIM(ISNULL(paiRes.cod_pai_Extr,emp.pai_res)) AS PaiRes,
			RTRIM(ISNULL(dptRes.cod_dep_Extr,emp.dpt_res)) AS DptRes,
			RTRIM(ISNULL(ciuRes.cod_ciu_Extr,emp.ciu_res)) AS CiuRes,
			RTRIM(barr.cod_postal) AS codPostal,
			emp.dir_res AS dirRes,
			emp.tel_cel AS TelCel,
			emp.tel_res AS TelRes,
			emp.e_mail_alt AS EmailAlt,
			emp.e_mail AS Email,
			RTRIM(ISNULL(pai.cod_pai_Extr,emp.cod_pai)) AS CodPai,
			RTRIM(ISNULL(dpt.cod_dep_Extr,emp.cod_dep)) AS CodDep,
			RTRIM(ISNULL(ciu.cod_ciu_Extr,emp.cod_ciu)) AS CodCiu,
			cto.NumCad
	FROM Rhh_HCM_R034Fun AS cto
		INNER JOIN rhh_emplea AS emp ON cto.cod_emp=emp.cod_emp
		LEFT JOIN gen_compania AS cia ON emp.cod_cia = cia.cod_cia
		LEFT JOIN gen_barrios AS barr ON emp.pai_res=barr.cod_pai AND emp.dpt_res=barr.cod_dep AND emp.cod_ciu=barr.cod_ciu 
											AND emp.cod_localidad=barr.cod_localidad AND emp.cod_barrio=barr.cod_barrio
		LEFT JOIN gen_ccosto AS cco ON emp.cod_cco=cco.cod_cco
		LEFT JOIN gen_sucursal AS suc ON emp.cod_suc=suc.cod_suc
		LEFT JOIN rhh_cargos AS car ON emp.cod_car=car.cod_car
		LEFT JOIN gen_paises AS paiRes ON emp.pai_res=paiRes.cod_pai
		LEFT JOIN gen_deptos AS dptRes ON emp.pai_res=dptRes.cod_pai AND emp.dpt_res=dptRes.cod_dep
		LEFT JOIN gen_ciudad AS ciuRes ON emp.pai_res=ciuRes.cod_pai AND emp.dpt_res=ciuRes.cod_dep AND emp.ciu_res=ciuRes.cod_ciu
		LEFT JOIN gen_paises AS pai ON emp.cod_pai=pai.cod_pai
		LEFT JOIN gen_deptos AS dpt ON emp.cod_pai=dpt.cod_pai AND emp.cod_dep=dpt.cod_dep
		LEFT JOIN gen_ciudad AS ciu ON emp.cod_pai=ciu.cod_pai AND emp.cod_dep=ciu.cod_dep AND emp.cod_ciu=ciu.cod_ciu
		LEFT JOIN rhh_tbclaest AS tipEst ON emp.Niv_aca=tipEst.tip_est
	WHERE	cto.cod_emp=@cod_emp AND
			cto.cod_car=@cod_car AND
			cto.fec_ini=@fec_ini AND
			cto.cod_cont=@cod_cont		
END

```
