# Stored Procedure: SP_gth_cambios_Empleados_Educacion

## Usa los objetos:
- [[gth_portal_hdvempleado_rechazos]]
- [[GTH_TipoEstudio]]
- [[prt_Portal_Historial_Estudios]]
- [[rhh_emplea]]
- [[rhh_estudio]]
- [[rhh_portal_estudio]]
- [[rhh_tbestud]]
- [[rhh_tbinsti]]

```sql






-- =============================================
-- Author:		David Alarcon Betancur
-- Create date: 26/08/2011
-- Description:	Obtiene y autoriza los cambios para la informacion de educacion del empleado

-- Modificado: 11-Ago-2016
-- Modificado por: Alexander Vargas
-- Comentario: se agrega estado Autorizado o Rechazado en la tabla de gth_portal_hdvempleado_rechazos
-- el valor se agrega al autorizar y también al rechazar

-- SPA2021 – 0008  Agregar campos en estudios
-- Modificado: 03/03/2021
-- Modificado por: Alexander Vargas
-- Comentario: en la opcion CE (consulta empleado) se agrega
-- cons y fec_ven para mostrar en la consulta en Enterprise

-- SPA2021 – 0008  Agregar campos en estudios
-- Modificado: 08/04/2021
-- Modificado por: Alexander Vargas
-- Comentario: se agrega cons en el borrado del cambio 
--				en portal y en la consulta se agrega el campo des_tipo 
--				como tipo de estudio

-- SPA2021 – 0008  Agregar campos en estudios
-- Modificado: 16/04/2021
-- Modificado por: Alexander Vargas
-- Comentario: se agrega cod_even

-- ajustes para version 402
-- Modificado: 26/07/2021
-- Modificado por: Alexander Vargas
-- Comentario: se agrega cons en el where
--				al momento de actualizar o agregar 
--				un nuevo estudio

-- ajustes para version 402
-- Modificado: 30/07/2021
-- Modificado por: Alexander Vargas
-- Comentario: se agrega cons en la opción de borrar
--				al momento de actualizar o agregar 
--				un nuevo estudio

-- Modificado: 22-06-2022
-- Modificado por: Alexander Vargas
-- Comentario: se modifica el nombre de la sección y se agrega la columna campo 
-- con el valor Nuevo - Registro completo

--SPA2023 - 0139 Campos para homologación de estudios
--Modify by:	Alexander Vargas
--Modify date:	30/03/2023
--Description:	ajuste por pruebas, se agregan texto modificación en consulta de estudios
--tambien se revisan estos campos
--ndiploma,nacta,nfolio,nlibro,est_exterior,ins_exterior,cod_pais,est_homologa,fec_homologa

-- SPA Estado autorización HV
-- Modificado: 21/04/023
-- Modificado por: Alexander Vargas
-- Comentario: al actualizar o rechazar se registra el estado en rhh_portal_estudios

-- =============================================
CREATE PROCEDURE [dbo].[SP_gth_cambios_Empleados_Educacion]
	@cod_emp CHAR(12) = NULL,
	@cod_est CHAR(5) = NULL, 
	@cod_ins CHAR(10) = NULL,
	@opc	 CHAR(2), --A:Cambio de info Autorizado para cod_emp 
					 --N:Cambio de info Negado para cod_emp
					 --C:Consultar todos los cambios pendientes
					 --IM: Obtiene imagen asociada al cambio
	@motivo	varchar(500) = NULL,
	@cons	INT=1,
	@cod_even VARCHAR(6)='0'
	
--WITH ENCRYPTION	
AS
BEGIN
	IF(@opc='A')
	BEGIN
		IF(EXISTS (SELECT cod_emp,cod_est,cod_ins FROM rhh_estudio A WHERE A.cod_emp=@cod_emp AND A.cod_est=@cod_est AND A.cod_ins=@cod_ins AND A.cons=@cons ))
		BEGIN
			UPDATE A
			SET  A.ano_est=B.ano_est, A.sem_apr=B.sem_apr, A.hor_est=B.hor_est, A.gra_son=B.gra_son, A.fec_gra=B.fec_gra, 
					A.nro_tar=B.nro_tar, A.ind_can=B.ind_can, A.tip_est=B.tip_est, A.nom_est=B.nom_est, A.nom_anex=B.nom_arch, A.fto_certif=B.arch_soporte, 
					A.tipo_est=B.tipo_est,A.mod_est=B.mod_est, A.cod_even=B.cod_even,A.ind_gth=B.ind_gth,A.cod_cons=B.cod_cons,A.NRO=B.NRO,
					A.ind_estsup=B.ind_estsup,A.num_sg_act=B.num_sg_act,A.num_act_cons=B.num_act_cons,A.fec_cons=B.fec_cons,
					A.cons=B.cons,A.fec_ven=B.fec_ven,A.cur_act=B.cur_act,A.ndiploma=B.ndiploma,A.nacta=B.nacta,A.nlibro=B.nlibro,
					A.nfolio=B.nfolio,A.est_exterior=B.est_exterior,A.inst_exterior=B.inst_exterior,A.cod_pais=B.cod_pais,
					A.est_homologa=B.est_homologa,A.fec_homologa=B.fec_homologa 
			FROM rhh_estudio A, rhh_portal_estudio B
			WHERE A.cod_emp=@cod_emp AND B.cod_emp=@cod_emp AND A.cod_est=@cod_est AND A.cod_ins=@cod_ins AND B.cod_est=@cod_est AND B.cod_ins=@cod_ins AND A.cons=@cons AND B.cons=@cons
			
			INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado) VALUES (@cod_emp, 'Estudios', @motivo,'Aprobado')
			DELETE FROM rhh_portal_estudio WHERE cod_emp=@cod_emp AND cod_est=@cod_est AND cod_ins=@cod_ins AND cons=@cons
		END
		ELSE
		BEGIN
			INSERT INTO rhh_estudio (cod_emp, cod_est, nom_est, cod_ins, ano_est, sem_apr, hor_est, gra_son, fec_gra, nro_tar, ind_can, tip_est, nom_anex,fto_certif, 
			cod_even,ind_gth,cod_cons,tipo_est,NRO,ind_estsup,num_sg_act,num_act_cons,fec_cons,cons,fec_ven,mod_est,cur_act,
			ndiploma,nacta,nlibro,nfolio,est_exterior,inst_exterior,cod_pais,est_homologa,fec_homologa)
				SELECT     cod_emp, cod_est, nom_est, cod_ins, ano_est, sem_apr, hor_est, gra_son, fec_gra, nro_tar, ind_can, tip_est, nom_arch, arch_soporte, 
				cod_even,ind_gth,cod_cons,tipo_est,NRO,ind_estsup,num_sg_act,num_act_cons,fec_cons,cons,fec_ven,mod_est,cur_act,
				ndiploma,nacta,nlibro,nfolio,est_exterior,inst_exterior,cod_pais,est_homologa,fec_homologa 
				FROM         rhh_portal_estudio B
				WHERE B.cod_emp=@cod_emp AND B.cod_est=@cod_est AND B.cod_ins=@cod_ins AND B.cons=@cons AND cod_even=@cod_even 
				--aprobado
				UPDATE rhh_portal_estudio SET cod_estado=2,motivo=@motivo 
				WHERE cod_emp=@cod_emp AND cod_est=@cod_est AND cod_ins=@cod_ins AND cons=@cons AND cod_even=@cod_even 
				
			
			INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado,campo) VALUES (@cod_emp, 'Estudios', @motivo,'Aprobado','Nuevo - Registro completo')	
			DELETE FROM rhh_portal_estudio WHERE cod_emp=@cod_emp AND cod_est=@cod_est AND cod_ins=@cod_ins AND cons=@cons
		END
	END
	ELSE IF (@opc='N')
	BEGIN
		  --Para rechazado
		  UPDATE rhh_portal_estudio SET cod_estado=3,motivo=@motivo 
		  WHERE cod_emp=@cod_emp AND cod_est=@cod_est AND cod_ins=@cod_ins AND cons=@cons AND cod_even=@cod_even 
		
		DELETE FROM rhh_portal_estudio WHERE cod_emp=@cod_emp AND cod_est=@cod_est AND cod_ins=@cod_ins
		INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado,campo) VALUES (@cod_emp, 'Estudios', @motivo,'Rechazado','Nuevo - Registro completo')
	END
	ELSE IF (@opc='C')
	BEGIN
		SELECT     A.cod_emp, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', A.cod_est, C.nom_est, A.nom_est AS des_est, 
			 A.cod_ins,D.nom_ins, A.ano_est, A.sem_apr, A.hor_est, A.gra_son, A.fec_gra, A.nro_tar, CONVERT(BIT,A.ind_can) AS ind_can, A.tip_est,A.nom_arch,
			--Campos para comparar con los nuevos
			E.cod_emp as 'T.cod_emp', E.nom_est as 'T.des_est', E.ano_est as 'T.ano_est', E.sem_apr as 'T.sem_apr',  
			E.hor_est as 'T.hor_est', E.gra_son as 'T.gra_son', E.fec_gra as 'T.fec_gra', e.nro_tar as 'T.nro_tar', CONVERT(BIT,E.ind_can) as 'T.ind_can',
			E.tip_est as 'T.tip_est', E.nom_anex as 'T.nom_arch'
			--===================================
			FROM  rhh_portal_estudio A left JOIN rhh_estudio E ON A.cod_emp = E.cod_emp and A.cod_est = E.cod_est and A.cod_ins = E.cod_ins
				INNER JOIN rhh_emplea B ON B.cod_emp=A.cod_emp
				LEFT JOIN rhh_tbestud C ON C.cod_est=A.cod_est
				LEFT JOIN rhh_tbinsti D ON D.cod_ins=A.cod_ins
					
	END
		ELSE IF (@opc='CE') --Consulta de un empleado
	BEGIN
		SELECT DISTINCT    A.cod_emp, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', A.cod_est, C.nom_est, A.nom_est AS des_est, 
			 A.cod_ins,D.nom_ins, A.ano_est, A.sem_apr, A.hor_est, A.gra_son, A.fec_gra, A.nro_tar, CONVERT(BIT,A.ind_can) AS ind_can, A.tip_est,A.nom_arch,
			A.cons,A.fec_ven,TE.des_tipo,A.cod_even,   
			
			--Campos para comparar con los nuevos
			--E.cod_emp as 'T.cod_emp', E.nom_est as 'T.des_est', E.ano_est as 'T.ano_est', E.sem_apr as 'T.sem_apr',  
			--E.hor_est as 'T.hor_est', E.gra_son as 'T.gra_son', E.fec_gra as 'T.fec_gra', e.nro_tar as 'T.nro_tar', CONVERT(BIT,E.ind_can) as 'T.ind_can',
			E.tip_est as 'T.tip_est', E.nom_anex as 'T.nom_arch',IIF(E.cod_emp IS NULL,'Nuevo','Modificación') as TipoCambio 
			--===================================
			FROM  rhh_portal_estudio A left JOIN rhh_estudio E ON A.cod_emp = E.cod_emp and A.cod_est = E.cod_est and A.cod_ins = E.cod_ins AND A.cons=E.cons 
				INNER JOIN rhh_emplea B ON B.cod_emp=A.cod_emp
				LEFT JOIN rhh_tbestud C ON C.cod_est=A.cod_est
				LEFT JOIN rhh_tbinsti D ON D.cod_ins=A.cod_ins
				LEFT JOIN GTH_TipoEstudio TE ON TE.tipo_est=A.tipo_est

				
				WHERE A.cod_emp=@cod_emp
					
	END
	ELSE IF (@opc='IM')
	BEGIN
		SELECT arch_soporte FROM rhh_portal_estudio WHERE cod_emp=@cod_emp AND cod_est=@cod_est AND cod_ins=@cod_ins
	END

		ELSE IF (@opc='EX')
	BEGIN
		SELECT cod_emp FROM rhh_estudio WHERE cod_emp=@cod_emp AND cod_est=@cod_est AND cod_ins=@cod_ins
	END

	ELSE IF (@opc='B') --Borrar cambios de portal cuando se han revisado todos
	BEGIN
			DELETE FROM rhh_portal_estudio WHERE cod_emp=@cod_emp AND cod_est=@cod_est AND cod_ins=@cod_ins AND cons=@cons 
			 
			 UPDATE prt_Portal_Historial_Estudios SET cod_estado=4, fec_proceso=GETDATE(), motivo='Anulado por el empleado'   
			 where cod_emp=@cod_emp AND cod_est=@cod_est AND cod_ins=@cod_ins AND cons=@cons  AND tipo_cambio=1 and cod_estado=1
	END

	
END

```
