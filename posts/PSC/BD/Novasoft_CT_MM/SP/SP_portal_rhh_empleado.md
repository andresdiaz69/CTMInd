# Stored Procedure: SP_portal_rhh_empleado

## Usa los objetos:
- [[gen_ciudad]]
- [[gen_usuarios]]
- [[rhh_emplea]]
- [[rhh_portal_emplea]]

```sql

-- =============================================
-- Author:		David Alarcon Betancur
-- Create date: 08/08/2011
-- Description:	Obtienen los datos necesarios para mostrar el empleado

--SPA agregar campos a HV Empleados - Datos básicos
--Modified by: Alexander Vargas
--Modified date:	24/02/2023
--Description: se agregan campos a la consulta 
--de datos básicos

--SPA agregar campos a HV Empleados y candidatos
--Modified by: Alexander Vargas
--Modified date:	04/05/2023
--Description: se agregan los campos ind_prepens,ind_cab_fam e ind_mascota a la consulta 
--de datos básicos

--Modified by: Alexander Vargas
--Modified date:	06/07/2023
--Description: se agrega ISNULL en los campos ind_prepens,ind_cab_fam e ind_mascota 
--de datos básicos ya que vienen en nulo de Enterprise
-- =============================================
CREATE PROCEDURE [dbo].[SP_portal_rhh_empleado] @loginEmplea NVARCHAR(20)	
--WITH ENCRYPTION
AS
    BEGIN
        DECLARE @cod_Emp CHAR(12);
        SELECT @cod_Emp = cod_emp
        FROM gen_usuarios
        WHERE RTRIM(log_usu) LIKE @loginEmplea;
        IF(EXISTS
        (
            SELECT cod_emp
            FROM rhh_portal_emplea
            WHERE cod_emp LIKE @cod_Emp
        ))
            BEGIN
                SELECT RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS apt_emp, 
                       B.nom_emp, 
                       A.cod_emp, 
                       A.est_civ, 
                       A.dir_res, 
                       A.tel_res, 
                       A.pai_res, 
                       A.dpt_res, 
                       A.ciu_res, 
                       A.per_car, 
                       A.e_mail, 
                       A.tel_cel, 
                       A.barrio, 
                       fec_nac, 
                       fec_ing, 
                       B.fto_emp, 
                       A.ind_DecRenta, 
                       A.avi_emp, 
                       CIU.nom_ciu, 
                       A.fec_expdoc, 
                       A.cla_lib, 
                       A.num_lib, 
                       A.dim_lib, 
                       A.gru_san, 
                       A.nac_emp, 
                       A.e_mail_alt, 
                       A.tam_emp, 
                       A.pes_emp, 
                       ISNULL(A.sex_emp, 0) AS sex_emp, 
                       A.pto_gas, 
                       ISNULL(A.deudas, 0) AS deudas, 
                       A.Cpto_deudas, 
                       A.fac_rhh,
				   A.ind_prepens,
				   A.ind_cab_fam,
				   A.ind_mascota 
                FROM rhh_portal_emplea A
                     INNER JOIN rhh_emplea B ON A.cod_emp = B.cod_emp
                     INNER JOIN gen_ciudad CIU ON B.cod_ciu = CIU.cod_ciu
                                                  AND B.cod_pai = CIU.cod_pai
                WHERE A.cod_emp LIKE @cod_Emp;
            END;
            ELSE
            BEGIN
                SELECT RTRIM(ap1_emp) + ' ' + RTRIM(ap2_emp) AS apt_emp, 
                       nom_emp, 
                       cod_emp, 
                       est_civ, 
                       dir_res, 
                       tel_res, 
                       pai_res, 
                       dpt_res, 
                       ciu_res, 
                       per_car, 
                       e_mail, 
                       tel_cel, 
                       barrio, 
                       fec_nac, 
                       fec_ing, 
                       fto_emp, 
                       ind_DecRenta, 
                       avi_emp, 
                       CIU.nom_ciu, 
                       EMP.fec_expdoc, 
                       EMP.cla_lib, 
                       EMP.num_lib, 
                       EMP.dim_lib, 
                       EMP.gru_san, 
                       EMP.nac_emp, 
                       EMP.e_mail_alt, 
                       EMP.tam_emp, 
                       EMP.pes_emp, 
                       ISNULL(EMP.sex_emp, 0) AS sex_emp, 
                       EMP.pto_gas, 
                       ISNULL(EMP.deudas, 0) AS deudas, 
                       EMP.Cpto_deudas, 
                       EMP.fac_rhh,
				   ISNULL(EMP.ind_prepens,0) as ind_prepens,
				   ISNULL(EMP.ind_cab_fam,0) AS ind_cab_fam,
				   ISNULL(EMP.ind_mascota,0) AS ind_mascota 
                FROM rhh_emplea EMP
                     INNER JOIN gen_ciudad CIU ON EMP.cod_ciu = CIU.cod_ciu
                                                  AND EMP.cod_pai = CIU.cod_pai
                WHERE cod_emp LIKE @cod_Emp;
            END;
    END;

```
