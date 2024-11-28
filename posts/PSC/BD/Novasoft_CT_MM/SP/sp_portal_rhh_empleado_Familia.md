# Stored Procedure: sp_portal_rhh_empleado_Familia

## Usa los objetos:
- [[gen_usuarios]]
- [[rhh_familia]]
- [[rhh_portal_familia]]

```sql

-- =============================================
-- Author:		David Alarcon
-- Create date: 10-08-2011
-- Description:	Procedimiento para obtener los Familiares del empleado
--SRS2021-0269 No muestra ventana autorizacion familiar
--Modify by:	Alexander Vargas
--Modify date:	07/04/2021
--Description:	se realiza validacion de nulos para
--				ocu_fam y niv_est	

--SPA2022 – 0045  Eliminar registro HV 
--Modify by:	Alexander Vargas
--Modify date:	08/06/2022
--Description:	se agrega campo para identificar cuales son los familiares nuevos, para
--				poderlos borrar si se necesita

--SPA agregar campos a HV Empleados y candidatos
--Modified by: Alexander Vargas
--Modified date:	04/05/2023
--Description: se agrega el campo ind_adulto_mayor 
--en familiares
-- =============================================
CREATE PROCEDURE [dbo].[sp_portal_rhh_empleado_Familia] @loginEmplea NVARCHAR(20)

--WITH ENCRYPTION

AS
    BEGIN
        DECLARE @cod_Emp CHAR(12);
        SELECT @cod_Emp = cod_emp
        FROM gen_usuarios
        WHERE RTRIM(log_usu) LIKE @loginEmplea;
        SELECT f.cod_emp, 
               f.ap1_fam, 
               f.ap2_fam, 
               f.nom_fam, 
               f.tip_fam, 
               f.gra_san, 
               f.tip_ide, 
               f.num_ced, 
               f.fec_nac, 
               f.sex_fam, 
               f.est_civ, 
               RTRIM(ISNULL(f.niv_est, 0)) AS niv_est, 
               f.ind_comp, 
               ISNULL(f.ocu_fam, 7) AS ocu_fam, 
               f.sal_bas, 
               f.ind_sub, 
               f.ind_pro, 
               f.ind_conv, 
               'Aprobado' AS estado, 
               f.ind_adulto_mayor
        FROM rhh_familia f
        WHERE f.cod_emp = @cod_Emp
              AND f.cod_emp NOT IN
        (
            SELECT fp.cod_emp
            FROM rhh_portal_familia fp
            WHERE f.cod_emp = fp.cod_emp
                  AND f.num_ced = fp.num_ced
        )
        UNION ALL
        SELECT cod_emp, 
               ap1_fam, 
               ap2_fam, 
               nom_fam, 
               tip_fam, 
               gra_san, 
               tip_ide, 
               num_ced, 
               fec_nac, 
               sex_fam, 
               est_civ, 
               RTRIM(ISNULL(niv_est, 0)) AS niv_est, 
               ind_comp, 
               ISNULL(ocu_fam, 7) AS ocu_fam, 
               sal_bas, 
               ind_sub, 
               ind_pro, 
               ind_conv, 
               IIF(EXISTS
        (
            SELECT cod_emp
            FROM rhh_familia
            WHERE cod_emp = @cod_Emp
                  AND num_ced = rhh_portal_familia.num_ced
        ), 'Pendiente', 'Nuevo') AS estado, 
               ind_adulto_mayor
        FROM rhh_portal_familia
        WHERE cod_emp = @cod_Emp;
    END;

```
