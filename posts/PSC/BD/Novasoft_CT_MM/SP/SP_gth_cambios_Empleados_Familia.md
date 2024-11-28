# Stored Procedure: SP_gth_cambios_Empleados_Familia

## Usa los objetos:
- [[gen_parentesco]]
- [[gen_tipide]]
- [[gth_estcivil]]
- [[GTH_Ocupacion]]
- [[gth_portal_hdvempleado_rechazos]]
- [[prt_portal_Historial_Familia]]
- [[rhh_emplea]]
- [[rhh_familia]]
- [[rhh_portal_familia]]
- [[rhh_tbclaest]]

```sql



-- =============================================
-- Author:		David Alarcon Betancur
-- Create date: 26/08/2011
-- Description:	Obtiene y autoriza los cambios para la informacion de familiares del empleado

-- Modificado: 11-Ago-2016
-- Modificado por: Alexander Vargas
-- Comentario: se agrega estado Autorizado o Rechazado en la tabla de gth_portal_hdvempleado_rechazos
-- el valor se agrega al autorizar y también al rechazar

-- Modificado: 09/04/2021
-- Modificado por: Alexander Vargas
-- Comentario: Se agrega validacion para segundo apellido en nulo

-- Modificado: 22-06-2022
-- Modificado por: Alexander Vargas
-- Comentario: se modifica el nombre de la sección y se agrega la columna campo 
-- con el valor Nuevo - Registro completo

-- SPA Estado autorización HV
-- Modificado: 14/04/023
-- Modificado por: Alexander Vargas
-- Comentario: al actualizar o rechazar se registra el estado en rhh_portal_idioma
-- =============================================
CREATE PROCEDURE [dbo].[SP_gth_cambios_Empleados_Familia]
	@cod_emp CHAR(12) = NULL,
	@num_ced CHAR(12) = NULL, 
	@opc	 CHAR(2), --A:Cambio de info Autorizado para cod_emp 
					 --N:Cambio de info Negado para cod_emp
					 --C:Consultar todos los cambios pendientes
	@motivo		varchar(500) = NULL
--WITH ENCRYPTION	
AS
BEGIN
	IF(@opc='A')
	BEGIN
		IF(EXISTS (SELECT cod_emp,num_ced FROM rhh_familia A WHERE A.cod_emp=@cod_emp AND A.num_ced=@num_ced))
		BEGIN
			UPDATE A
			SET  A.ap1_fam=B.ap1_fam, A.ap2_fam=ISNULL(B.ap2_fam,''), A.nom_fam=B.nom_fam, A.tip_fam=B.tip_fam, A.gra_san=B.gra_san
					, A.tip_ide=B.tip_ide, A.fec_nac=B.fec_nac, A.sex_fam=B.sex_fam, A.est_civ=B.est_civ, A.niv_est=B.niv_est
					, A.ind_comp=B.ind_comp, A.ocu_fam=B.ocu_fam, A.sal_bas=B.sal_bas,A.ind_sub=B.ind_sub, A.ind_pro=B.ind_pro
					, A.ind_conv=B.ind_conv, A.ind_adulto_mayor=B.ind_adulto_mayor 
			FROM rhh_familia A, rhh_portal_familia B
			WHERE A.cod_emp=@cod_emp AND B.cod_emp=@cod_emp AND A.num_ced=@num_ced AND B.num_ced=@num_ced
			
			

			INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado) VALUES (@cod_emp, 'Familiares', @motivo,'Aprobado')
			DELETE FROM rhh_portal_familia WHERE cod_emp=@cod_emp AND num_ced=@num_ced
		END
		ELSE
		BEGIN
			INSERT INTO rhh_familia (cod_emp, ap1_fam, ap2_fam, nom_fam, tip_fam, gra_san, tip_ide, num_ced, fec_nac, sex_fam, est_civ, niv_est, ind_comp, ocu_fam, sal_bas, 
                      ind_sub, ind_pro, ind_conv, ind_adulto_mayor)
				SELECT     cod_emp, ap1_fam, ISNULL(ap2_fam,'') AS ap2_fam, nom_fam, tip_fam, gra_san, tip_ide, num_ced, fec_nac, sex_fam, est_civ, niv_est, ind_comp, ocu_fam, sal_bas, 
                      ind_sub, ind_pro, ind_conv, ind_adulto_mayor 
				FROM         rhh_portal_familia B
				WHERE B.cod_emp=@cod_emp AND B.num_ced=@num_ced 

				UPDATE rhh_portal_familia SET cod_estado=2,motivo=@motivo WHERE cod_emp=@cod_emp AND num_ced=@num_ced
				
				INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado,campo) VALUES (@cod_emp, 'Familiares', @motivo,'Aprobado','Nuevo - Registro completo')
			DELETE FROM rhh_portal_familia WHERE cod_emp=@cod_emp AND num_ced=@num_ced
		END
	END
	ELSE IF (@opc='N')
	BEGIN
		 UPDATE rhh_portal_familia SET cod_estado=3,motivo=@motivo WHERE cod_emp=@cod_emp AND num_ced=@num_ced
		DELETE FROM rhh_portal_familia WHERE cod_emp=@cod_emp AND num_ced=@num_ced
		INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado,campo) VALUES (@cod_emp, 'Familiares', @motivo,'Rechazado','Nuevo - Registro completo')
	END
	ELSE IF (@opc='C')
	BEGIN
		SELECT A.cod_emp, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', 
			RTRIM(A.nom_fam)+' '+RTRIM(A.ap1_fam)+' '+ ISNULL(RTRIM(A.ap2_fam),'') AS nom_fam, D.nom_par, A.gra_san, 
			E.des_tip, A.num_ced, A.fec_nac, 
			CASE A.sex_fam WHEN 1 THEN 'Femenino'
						WHEN 2 THEN 'Masculino' END AS dessex_fam, 
			H.des_est AS 'des_estCiv', G.des_est, A.ind_comp, F.des_ocu, A.sal_bas, A.ind_sub, 
			A.ind_pro, A.ind_conv,
			--Campos para comparar con los nuevos
			C.cod_emp as 'T.cod_emp', RTRIM(C.nom_fam)+' '+RTRIM(C.ap1_fam)+' '+RTRIM(C.ap2_fam) AS 'T.nom_fam',
			J.nom_par as 'T.nom_par', C.gra_san as 'T.gra_san', C.fec_nac as 'T.fec_nac',
			A.sex_fam, C.sex_fam as 'T.sex_fam', I.des_est as 'T.des_estCiv', k.des_est as 'T.des_est', 
			C.ind_comp as 'T.ind_comp', L.des_ocu as 'T.des_ocu', C.sal_bas as 'T.sal_bas',C.ind_sub as 'T.ind_sub',
			C.ind_pro as 'T.ind_pro', C.ind_conv as 'T.ind_conv'
			--===================================
		FROM rhh_portal_familia A INNER JOIN rhh_emplea B ON A.cod_emp=B.cod_emp
			LEFT JOIN rhh_familia C ON A.cod_emp = C.cod_emp and A.num_ced = C.num_ced
				LEFT JOIN gen_parentesco D ON A.tip_fam=D.cod_par
					LEFT JOIN gen_tipide E ON E.cod_tip=A.tip_ide
						LEFT JOIN GTH_Ocupacion F ON F.cod_ocu=A.ocu_fam
							LEFT JOIN rhh_tbclaest G ON G.tip_est=A.niv_est
								LEFT JOIN gth_estcivil H ON A.est_civ = H.cod_est	
									LEFT JOIN gth_estcivil I ON C.est_civ = I.cod_est
										LEFT JOIN gen_parentesco J ON C.tip_fam = J.cod_par		
											LEFT JOIN rhh_tbclaest K ON K.tip_est=C.niv_est
												LEFT JOIN GTH_Ocupacion L ON L.cod_ocu=C.ocu_fam			
	END

	ELSE IF (@opc='CE')
	BEGIN
		SELECT A.cod_emp, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', 
			RTRIM(A.nom_fam)+' '+RTRIM(A.ap1_fam)+' '+ ISNULL(RTRIM(A.ap2_fam),'') AS nom_fam, D.nom_par, A.gra_san, 
			E.des_tip, A.num_ced, A.fec_nac, 
			CASE A.sex_fam WHEN 1 THEN 'Femenino'
						WHEN 2 THEN 'Masculino' END AS dessex_fam, 
			H.des_est AS 'des_estCiv', G.des_est, A.ind_comp, F.des_ocu, A.sal_bas, A.ind_sub, 
			A.ind_pro, A.ind_conv,
			--Campos para comparar con los nuevos
			C.cod_emp as 'T.cod_emp', RTRIM(C.nom_fam)+' '+RTRIM(C.ap1_fam)+' '+RTRIM(C.ap2_fam) AS 'T.nom_fam',
			J.nom_par as 'T.nom_par', C.gra_san as 'T.gra_san', C.fec_nac as 'T.fec_nac',
			A.sex_fam, C.sex_fam as 'T.sex_fam', I.des_est as 'T.des_estCiv', k.des_est as 'T.des_est', 
			C.ind_comp as 'T.ind_comp', L.des_ocu as 'T.des_ocu', C.sal_bas as 'T.sal_bas',C.ind_sub as 'T.ind_sub',
			C.ind_pro as 'T.ind_pro', C.ind_conv as 'T.ind_conv', IIF(C.cod_emp IS NULL,'Nuevo','') as TipoCambio 
			--===================================
		FROM rhh_portal_familia A INNER JOIN rhh_emplea B ON A.cod_emp=B.cod_emp
			LEFT JOIN rhh_familia C ON A.cod_emp = C.cod_emp and A.num_ced = C.num_ced
				LEFT JOIN gen_parentesco D ON A.tip_fam=D.cod_par
					LEFT JOIN gen_tipide E ON E.cod_tip=A.tip_ide
						LEFT JOIN GTH_Ocupacion F ON F.cod_ocu=A.ocu_fam
							LEFT JOIN rhh_tbclaest G ON G.tip_est=A.niv_est
								LEFT JOIN gth_estcivil H ON A.est_civ = H.cod_est	
									LEFT JOIN gth_estcivil I ON C.est_civ = I.cod_est
										LEFT JOIN gen_parentesco J ON C.tip_fam = J.cod_par		
											LEFT JOIN rhh_tbclaest K ON K.tip_est=C.niv_est
												LEFT JOIN GTH_Ocupacion L ON L.cod_ocu=C.ocu_fam		
												WHERE A.cod_emp=@cod_emp	
	END


	ELSE IF (@opc='B') --Borrar cambios de portal cuando se han revisado todos
	BEGIN
			DELETE FROM rhh_portal_familia WHERE cod_emp=@cod_emp AND num_ced=@num_ced 

			UPDATE prt_portal_Historial_Familia SET cod_estado=4, fec_proceso=GETDATE(), motivo='Anulado por el empleado'   
			 where cod_emp=@cod_emp and num_ced=@num_ced AND tipo_cambio=1 and cod_estado=1
	END

END

```
