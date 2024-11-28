# Stored Procedure: SP_portal_rhh_empleado_Enterp

## Usa los objetos:
- [[gen_usuarios]]
- [[rhh_emplea]]

```sql

-- =============================================
-- Author:		David Alarcon Betancur
-- Create date: 08/08/2011
-- Description:	Obtienen los datos registrados en la hoja de vida del empleado
--				tabla rhh_emplea

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
CREATE PROCEDURE [dbo].[SP_portal_rhh_empleado_Enterp] @loginEmplea NVARCHAR(20)	
--WITH ENCRYPTION
AS
    BEGIN
        DECLARE @cod_Emp CHAR(12);
        SELECT @cod_Emp = cod_emp
        FROM gen_usuarios
        WHERE RTRIM(log_usu) LIKE @loginEmplea;
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
               fec_expdoc, 
               cla_lib, 
               num_lib, 
               dim_lib, 
               gru_san, 
               nac_emp, 
               e_mail_alt, 
               tam_emp, 
               pes_emp, 
               ISNULL(sex_emp, 0) AS sex_emp, 
               pto_gas, 
               ISNULL(deudas, 0) AS deudas, 
               Cpto_deudas, 
               fac_rhh, 
			ISNULL(ind_prepens,0) as ind_prepens,
			ISNULL(ind_cab_fam,0) AS ind_cab_fam,
			ISNULL(ind_mascota,0) AS ind_mascota 
        FROM rhh_emplea
        WHERE cod_emp LIKE @cod_Emp;
    END;

```
