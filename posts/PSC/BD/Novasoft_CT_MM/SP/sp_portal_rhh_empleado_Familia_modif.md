# Stored Procedure: sp_portal_rhh_empleado_Familia_modif

## Usa los objetos:
- [[gen_usuarios]]
- [[prt_Portal_Historial_Familia]]
- [[rhh_familia]]
- [[rhh_portal_familia]]

```sql





-- =============================================
-- Author:		David Alarcon
-- Create date: 10-08-2011
-- Description:	Procedimiento para obtener los Familiares del empleado
-- Jessy Peralta -- SRS2019 - 0915 valida el cambio vs el dato original para insertarlo o eliminar el registro de la tabla de portal para que no se encuentre cambios pendientes.

--Modify by:	Alexander Vargas
--Modify date:	18/09/2020
--Description:	Ajuste para eliminar los datos de familiares cuando son 
--				iguales a los que hay autorizados en Enterprise.
--				La modificacion de datos continua funcionando.

--SRS2020-1358 En autorizacion de HV se queda pegado al consultar cambios
--Modify by:	Alexander Vargas
--Modify date:	22/12/2020
--Description:	Ajuste para guardar el salario como 0 cuando viene en nulo.

--SPA Estado autorizacion HV
-- Modificado: 14/04/2023
-- Modificado por: Alexander Vargas
-- Comentario: cuando no hay cambios borrar el registro y en el historial
--  lo deja con estado 4 (anulado)

--SPA agregar campos a HV Empleados y candidatos
--Modified by: Alexander Vargas
--Modified date:	04/05/2023
--Description: se agregan el campo ind_adulto_mayor a la consulta 
--de familiares

-- =============================================
CREATE PROCEDURE [dbo].[sp_portal_rhh_empleado_Familia_modif]
	@loginEmplea NVARCHAR(20),
	@ap1_fam CHAR(12), 
	@ap2_fam CHAR(15), 
	@nom_fam CHAR(30), 
	@tip_fam CHAR(2), 
	@gra_san INT, 
	@tip_ide CHAR(2), 
	@num_ced CHAR(12), 
	@fec_nac DATETIME, 
	@sex_fam INT, 
	@est_civ INT, 
	@niv_est CHAR(2), 
	@ind_comp BIT, 
	@ocu_fam INT, 
	@sal_bas MONEY, 
    @ind_sub BIT, 
    @ind_pro BIT, 
    @ind_conv BIT,
    @ind_adulto_mayor BIT
    
--WITH ENCRYPTION

AS
BEGIN
	DECLARE @cod_Emp CHAR(12)
	
	SELECT @cod_Emp=cod_emp FROM gen_usuarios WHERE RTRIM(log_usu) LIKE @loginEmplea
	
	SET @sal_bas=ISNULL(@sal_bas,0)


	IF NOT EXISTS(SELECT cod_emp FROM rhh_familia WHERE cod_emp=@cod_emp  AND ap1_fam=@ap1_fam  AND ap2_fam=@ap2_fam  AND nom_fam=@nom_fam  AND tip_fam=@tip_fam  AND gra_san=@gra_san  AND tip_ide=@tip_ide  AND						num_ced=@num_ced  AND fec_nac=@fec_nac  AND sex_fam=@sex_fam  AND est_civ=@est_civ  AND niv_est=@niv_est  AND ind_comp=@ind_comp  AND ocu_fam=@ocu_fam  AND sal_bas=@sal_bas  AND 
								ind_sub=@ind_sub  AND ind_pro=@ind_pro  AND ind_conv=@ind_conv)
             AND (NOT EXISTS(SELECT cod_emp FROM rhh_portal_familia WHERE cod_emp=@cod_Emp AND num_ced=@num_ced))
     BEGIN
		
		IF EXISTS(SELECT cod_emp FROM rhh_familia WHERE cod_emp=@cod_emp AND num_ced=@num_ced)
		BEGIN
			INSERT INTO rhh_portal_familia (cod_emp, ap1_fam, ap2_fam, nom_fam, tip_fam, gra_san, tip_ide, num_ced, fec_nac, sex_fam, est_civ, niv_est, ind_comp, ocu_fam, sal_bas, 
                  ind_sub, ind_pro, ind_conv,ind_adulto_mayor,cod_estado,tipo_cambio)
                  VALUES(@cod_emp, @ap1_fam, @ap2_fam, @nom_fam, @tip_fam, @gra_san, @tip_ide, @num_ced, @fec_nac, @sex_fam, @est_civ, @niv_est, @ind_comp, @ocu_fam, @sal_bas, 
                  @ind_sub, @ind_pro, @ind_conv,@ind_adulto_mayor,1,2)
		END
		ELSE
		BEGIN
		    INSERT INTO rhh_portal_familia (cod_emp, ap1_fam, ap2_fam, nom_fam, tip_fam, gra_san, tip_ide, num_ced, fec_nac, sex_fam, est_civ, niv_est, ind_comp, ocu_fam, sal_bas, 
				  ind_sub, ind_pro, ind_conv,ind_adulto_mayor,cod_estado,tipo_cambio)
				  VALUES(@cod_emp, @ap1_fam, @ap2_fam, @nom_fam, @tip_fam, @gra_san, @tip_ide, @num_ced, @fec_nac, @sex_fam, @est_civ, @niv_est, @ind_comp, @ocu_fam, @sal_bas, 
				  @ind_sub, @ind_pro, @ind_conv,@ind_adulto_mayor,1,1)
		END
     END

	 ELSE IF EXISTS(SELECT cod_emp FROM rhh_portal_familia WHERE cod_emp=@cod_Emp AND num_ced=@num_ced)
		BEGIN
			UPDATE rhh_portal_familia
			SET ap1_fam=@ap1_fam  , ap2_fam=@ap2_fam  , nom_fam=@nom_fam  , tip_fam=@tip_fam  , gra_san=@gra_san  , tip_ide=@tip_ide  , fec_nac=@fec_nac  , sex_fam=@sex_fam  , est_civ=@est_civ  , niv_est=@niv_est  , ind_comp=@ind_comp  , ocu_fam=@ocu_fam  , sal_bas=@sal_bas  , 
                      ind_sub=@ind_sub  , ind_pro=@ind_pro  , ind_conv=@ind_conv, ind_adulto_mayor=@ind_adulto_mayor,cod_estado=1 
            WHERE cod_emp=@cod_Emp AND num_ced=@num_ced
		END

	ELSE IF NOT EXISTS(SELECT cod_emp FROM rhh_portal_familia WHERE cod_emp=@cod_Emp AND num_ced=@num_ced) 
		AND EXISTS(SELECT cod_emp FROM rhh_familia WHERE cod_emp=@cod_Emp AND num_ced=@num_ced)
		BEGIN
			 INSERT INTO rhh_portal_familia (cod_emp, ap1_fam, ap2_fam, nom_fam, tip_fam, gra_san, tip_ide, num_ced, fec_nac, sex_fam, est_civ, niv_est, ind_comp, ocu_fam, sal_bas, 
			 ind_sub, ind_pro, ind_conv,ind_adulto_mayor)
			 VALUES(@cod_emp, @ap1_fam, @ap2_fam, @nom_fam, @tip_fam, @gra_san, @tip_ide, @num_ced, @fec_nac, @sex_fam, @est_civ, @niv_est, @ind_comp, @ocu_fam, @sal_bas, 
			 @ind_sub, @ind_pro, @ind_conv,@ind_adulto_mayor)
		END

	 --Si los registros son iguales entonces lo elimina de la tabla de portal para que
	 --no se muestre como un cambio pendiente
	 IF NOT EXISTS (SELECT cod_emp, ap1_fam, ap2_fam, nom_fam, tip_fam, gra_san, tip_ide, num_ced, fec_nac, sex_fam, est_civ, niv_est, ind_comp, ocu_fam, sal_bas, 
                  ind_sub, ind_pro, ind_conv,ind_adulto_mayor  
							FROM rhh_portal_familia 
							WHERE cod_emp=@cod_Emp AND num_ced=@num_ced --AND (ap1_fam <> @ap1_fam  OR ap2_fam<>@ap2_fam  OR nom_fam<>@nom_fam  OR tip_fam<>@tip_fam  OR gra_san<>@gra_san  OR tip_ide<>@tip_ide   OR  fec_nac<>@fec_nac  OR sex_fam<>@sex_fam  OR est_civ<>@est_civ  OR niv_est<>@niv_est  OR ind_comp<>@ind_comp  OR ocu_fam<>@ocu_fam  OR sal_bas<>@sal_bas  OR ind_sub<>@ind_sub  OR ind_pro<>@ind_pro  OR ind_conv<>@ind_conv
						 EXCEPT SELECT f.cod_emp, ap1_fam, ap2_fam, nom_fam, tip_fam, gra_san, tip_ide, num_ced, fec_nac, sex_fam, est_civ, niv_est, ind_comp, ocu_fam, ISNULL(sal_bas,0) AS sal_bas, 
                  ind_sub, ind_pro, ind_conv,ind_adulto_mayor FROM rhh_familia f WHERE cod_emp=@cod_Emp AND num_ced=@num_ced)
						
			BEGIN
				DELETE rhh_portal_familia WHERE cod_emp=@cod_Emp AND num_ced=@num_ced 

				IF EXISTS(SELECT * FROM prt_Portal_Historial_Familia 
				WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(num_ced) = RTRIM(@num_ced)  and cod_estado=1)
				BEGIN
				    UPDATE prt_Portal_Historial_Familia 
				    SET cod_estado=4, motivo='Anulado por el empleado',fec_proceso=GETDATE() 
				    WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(num_ced) = RTRIM(@num_ced)  and cod_estado=1
				END
			END	

END

```
