# Stored Procedure: SP_portal_rhh_empleado_estudio_modif

## Usa los objetos:
- [[gen_usuarios]]
- [[prt_Portal_Historial_Estudios]]
- [[rhh_estudio]]
- [[rhh_portal_estudio]]

```sql




-- =============================================
-- Author:		David Alarcon Betancur
-- Create date: 12-08-2011
-- Description:	Modifica o inserta cambios del portal

-- GKNINO 16/07/2015 Se aumenta la longitud del campo cod_ins de 4 a 10. SRS 2015-0550.

-- Modified by:		Alexander Vargas
-- Date modified:	12 Nov 2015
-- Description:	Se establece el parametro @ind_can a cero por defecto, se hace esto
-- para que no sea obligatorio llenarlo en el formulario. Ind_can significa si se canceló
-- el estudio que se está en la sección de  Portal Web - Hoja de vida - Información Estudios 

-- Modified by:		Alexander Vargas
-- Date modified:	03 May 2017
-- Description:	Se agregan los campos nom_ins y Estudio para mostrar estos campos en el 
--	grid de estudios de la HV del empleado.
-- Jessy Peralta -- SRS2019 - 0915 valida el cambio vs el dato original para insertarlo o eliminar el registro de la tabla de portal para que no se encuentre cambios pendientes.

--Modify by:	Alexander Vargas
--Modify date:	18/09/2020
--Description:	Ajuste para eliminar los datos de estudios cuando son 
--				iguales a los que hay autorizados en Enterprise.
--				La modificacion de datos continua funcionando.

--SRS2020-1358 En autorizacion de HV se queda pegado al consultar cambios
--Modify by:	Alexander Vargas
--Modify date:	22/12/2020
--Description:	Ajuste para guardar como 0 valores numéricos que vienen en nulo.

--SPA2021 – 0008  Agregar campos en estudios
--Modify by:	Alexander Vargas
--Modify date:	14/01/2021
--Description:	Se agregan campos de estudio faltantes y nuevos al momento de
--				insertar y editar un estudio.

--SPA2021 – 0008  Agregar campos en estudios
--Modify by:	Alexander Vargas
--Modify date:	03/03/2021
--Description:	Se agrega calculo de consecutivo para el tema de validación de estudios
-- que tienen cod_emp, cod_ins y cod_est iguales. cod_even se envia en 0

--SPA2021 – 0008  Agregar campos en estudios
--Modify by:	Alexander Vargas
--Modify date:	25/03/2021
--Description:	Se agrega cons en la validacion de la existencia del estudio

--SPA2021 – 0008  Agregar campos en estudios
--Modify by:	Alexander Vargas
--Modify date:	30/03/2021
--Description:	en la validacion de la existencia del estudio se quita el año
--				y se agregan otros campos como cur_act

--SPA2021 – 0008  Agregar campos en estudios
--Modify by:	Alexander Vargas
--Modify date:	12/04/2021
--Description:	ajuste para incluir cod_even al momento de actualizaar
--				un estudio

--SPA2021 – 0008  Agregar campos en estudios
--Modify by:	Alexander Vargas
--Modify date:	30/04/2021
--Description:	se valida nulo de @consecEnterp y se deja en 0

--Ajustes empaquetado 401
--Modify by:	Alexander Vargas
--Modify date:	06/05/2021
--Description:	se agrega ajuste para dejar como 0 los nulos sem_apr
--				al momento de comparar las tablas y borrar de portal

--Ajustes version 402
--Modify by:	Alexander Vargas
--Modify date:	30/07/2021
--Description:	se agrega validación para cuando @consecEnterp es nulo
--				

--SPA2023 - 0139 Campos para homologación de estudios
--Modify by:	Alexander Vargas
--Modify date:	10/03/2023
--Description:	se agregan los siguientes campos a la tabla  GTH_RptEstudio 
--ndiploma,nacta,nfolio,nlibro,est_exterior,inst_exterior,cod_pais,est_homologa,fec_homologa



--SPA2023 - 0139 Campos para homologación de estudios
--Modify by:	Alexander Vargas
--Modify date:	30/03/2023
--Description:	ajuste, se cambia campo ins_exterior por inst_exterior
--de registros. Los campos son:
--ndiploma,nacta,nfolio,nlibro,est_exterior,inst_exterior,cod_pais,est_homologa,fec_homologa


-- SPA Estado autorizacion HV
-- Modificado: 20/04/2023
-- Modificado por: Alexander Vargas
-- Comentario: cuando no hay cambios borrar el registro y en el historial
-- lo deja con estado 4 (anulado)

-- =============================================

CREATE PROCEDURE [dbo].[SP_portal_rhh_empleado_estudio_modif] 
	@loginEmplea NVARCHAR(20),
	@cod_est CHAR(5),
	@nom_est CHAR(50),
	@cod_ins CHAR(10),
	@ano_est INT=0,
	@sem_apr INT=0,
	@hor_est INT=0,
	@gra_son BIT=0,
	@fec_gra DATETIME,
	@nro_tar CHAR(13)='0',
	@ind_can BIT=0,
	@tip_est CHAR(2) = 0,
	@arch_soporte VARBINARY(max) = NULL,
	@nom_arch NVARCHAR(100) = NULL,
	@nom_ins CHAR(50)=NULL,
	@Estudio CHAR(50)=NULL,
	@tipo_est CHAR(2)=NULL,
	@mod_est INT=1,
	@num_sg_act INT=0,
	@num_act_cons VARCHAR(20)=NULL,
	@fec_cons DATETIME=NULL,
	@NRO VARCHAR(50)=NULL,
	@ind_estsup BIT=0,
	@cons INT=0,
	@fec_ven DATETIME=NULL,
	@cur_act BIT=0,
	@cod_even VARCHAR(6)='0',
	@ndiploma NVARCHAR(100)=NULL,
	@nacta NVARCHAR(100)=NULL,
	@nfolio NVARCHAR(100)=NULL,
	@nlibro NVARCHAR(100)=NULL,
	@est_exterior BIT =0,
	@inst_exterior VARCHAR(200),
	@cod_pais CHAR(3)=NULL,
	@est_homologa CHAR(2)=NULL,
	@fec_homologa VARCHAR(8)=NULL


--WITH ENCRYPTION
AS
BEGIN
	
	DECLARE @consecPortal INT
	DECLARE @consecEnterp INT

	DECLARE @cod_Emp CHAR(12)
	SELECT @cod_Emp=cod_emp FROM gen_usuarios WHERE RTRIM(log_usu) LIKE @loginEmplea

	SET @sem_apr=ISNULL(@sem_apr,0)
	SET @hor_est=ISNULL(@hor_est,0)
	SET @nro_tar=ISNULL(@nro_tar,'0')

	SET @fec_ven=ISNULL(@fec_ven,'19000101')

	--AND cons=@cons
	IF(NOT EXISTS(SELECT cod_emp FROM rhh_portal_estudio WHERE cod_emp=@cod_Emp AND cod_ins=@cod_ins AND cod_est=@cod_est and cons=@cons AND cod_even=@cod_even ))
		BEGIN
		print('ingresa')
			IF(NOT EXISTS(SELECT cod_emp FROM rhh_estudio WHERE cod_emp=@cod_Emp AND cod_ins=@cod_ins AND cod_est=@cod_est and cons=@cons AND cod_even=@cod_even  ))
				BEGIN
					SELECT @consecPortal= MAX(cons) FROM rhh_portal_estudio WHERE cod_emp=@cod_Emp AND cod_est=@cod_est AND cod_ins=@cod_ins
					print('no existe')
					SELECT @consecEnterp= MAX(cons) FROM rhh_estudio WHERE cod_emp=@cod_Emp AND cod_est=@cod_est AND cod_ins=@cod_ins
					
					IF @consecEnterp IS NULL
					BEGIN
						SET @consecEnterp=ISNULL(@cons,0)
					END

					IF @consecPortal > @consecEnterp
						BEGIN
							SET @cons=@consecPortal +1
						END
					ELSE
						BEGIN
							SET @cons=@consecEnterp +1
						END

						SET @cons=ISNULL(@cons,1)

						PRINT('nuevo')
						PRINT(@cons)
						--PRINT(@consecPortal)
						--PRINT(@consecEnterp)
						--cod_even se envia como 0 por defecto
						INSERT INTO rhh_portal_estudio (cod_emp, cod_est, nom_est, cod_ins, ano_est, sem_apr, 
						hor_est, gra_son, fec_gra, nro_tar, ind_can, tip_est,arch_soporte,nom_arch,tipo_est, 
						NRO,mod_est,num_sg_act,num_act_cons,fec_cons,ind_estsup,cons,fec_ven,cod_even,cur_act,
						ndiploma,nacta,nfolio,nlibro,est_exterior,inst_exterior,cod_pais,est_homologa,fec_homologa,cod_estado,tipo_cambio)
						VALUES(@cod_Emp,@cod_est,@nom_est,@cod_ins,@ano_est,@sem_apr,@hor_est,@gra_son,@fec_gra,@nro_tar,
						@ind_can,@tip_est,@arch_soporte,@nom_arch,@tipo_est,@NRO,@mod_est,@num_sg_act,@num_act_cons,
						@fec_cons,@ind_estsup,@cons,@fec_ven,0,@cur_act,
						@ndiploma,@nacta,@nfolio,@nlibro,@est_exterior,@inst_exterior,@cod_pais,@est_homologa,@fec_homologa,1,1)

				END
		
			
		ELSE --IF(EXISTS(SELECT cod_emp FROM rhh_estudio WHERE cod_emp=@cod_Emp AND cod_ins=@cod_ins AND cod_est=@cod_est and cons=@cons AND cod_even=@cod_even  ))
			BEGIN
			print('existe estudio')
				INSERT INTO rhh_portal_estudio (cod_emp, cod_est, nom_est, cod_ins, ano_est, sem_apr, hor_est, gra_son, 
				fec_gra, nro_tar, ind_can, tip_est,arch_soporte,nom_arch,tipo_est, NRO,mod_est,num_sg_act,num_act_cons,
				fec_cons,ind_estsup,cons,fec_ven,cod_even,cur_act,
				ndiploma,nacta,nfolio,nlibro,est_exterior,inst_exterior,cod_pais,est_homologa,fec_homologa,cod_estado,tipo_cambio)
				VALUES(@cod_Emp,@cod_est,@nom_est,@cod_ins,@ano_est,@sem_apr,@hor_est,@gra_son,@fec_gra,@nro_tar,@ind_can,
				@tip_est,@arch_soporte,@nom_arch,@tipo_est,@NRO,@mod_est,@num_sg_act,@num_act_cons,@fec_cons,@ind_estsup,
				@cons,@fec_ven,@cod_even,@cur_act,
				@ndiploma,@nacta,@nfolio,@nlibro,@est_exterior,@inst_exterior,@cod_pais,@est_homologa,@fec_homologa,1,2)
			END

		END
		
	ELSE IF EXISTS(SELECT cod_emp FROM rhh_portal_estudio WHERE cod_emp=@cod_Emp AND cod_est=@cod_est AND cod_ins=@cod_ins and cons=@cons AND cod_even=@cod_even)
		BEGIN
		print('actualiza')
			UPDATE rhh_portal_estudio
			SET nom_est=@nom_est , ano_est=@ano_est , sem_apr=@sem_apr , hor_est=@hor_est , gra_son=@gra_son , 
			fec_gra=@fec_gra , nro_tar=@nro_tar , ind_can=@ind_can , tip_est=@tip_est, 
			NRO=@NRO,mod_est=@mod_est,num_sg_act=@num_sg_act,num_act_cons=@num_act_cons,
			fec_cons=@fec_cons,ind_estsup=@ind_estsup,cons=@cons,fec_ven=@fec_ven,cur_act=@cur_act,
			ndiploma=@ndiploma,nacta=@nacta,nfolio=@nfolio,nlibro=@nlibro,est_exterior=@est_exterior,
			inst_exterior=@inst_exterior,cod_pais=@cod_pais,est_homologa=@est_homologa,fec_homologa=@fec_homologa,cod_estado=1  
			WHERE cod_emp=@cod_Emp AND cod_est=@cod_est AND cod_ins=@cod_ins AND cons=@cons AND cod_even=@cod_even
		END



	--Si los registros son iguales entonces lo elimna de la tabla de portal para que
	 --no se muestre como un cambio pendiente

		IF NOT EXISTS (SELECT cod_emp, cod_est, nom_est, cod_ins, sem_apr, hor_est, gra_son, fec_gra, nro_tar, ind_can, 
		tip_est,cod_even,ind_gth,cod_cons,tipo_est,NRO,ind_estsup,num_sg_act, num_act_cons,fec_cons,cons,fec_ven, mod_est, 
		cur_act,ISNULL(ndiploma,'') AS ndiploma,ISNULL(nacta,'') AS nacta,ISNULL(nfolio,'') AS nfolio,
		ISNULL(nlibro,'') AS nlibro,est_exterior,ISNULL(inst_exterior,'') AS inst_exterior,cod_pais,est_homologa,
		fec_homologa  
			FROM rhh_portal_estudio 
			WHERE cod_emp=@cod_Emp AND cod_est=@cod_est AND cod_ins=@cod_ins AND cons=@cons AND cod_even=@cod_even
			EXCEPT 
			SELECT e.cod_emp, cod_est, nom_est, cod_ins, ISNULL(sem_apr,0) AS sem_apr, hor_est, gra_son, fec_gra, nro_tar, 
			ind_can, tip_est,cod_even,ind_gth,cod_cons,tipo_est,NRO,ind_estsup,num_sg_act, num_act_cons,fec_cons,cons,
			fec_ven, mod_est, cur_act, ISNULL(ndiploma,'') AS ndiploma,ISNULL(nacta,'') AS nacta,
			ISNULL(nfolio,'') AS nfolio,ISNULL(nlibro,'') AS nlibro,est_exterior,ISNULL(inst_exterior,'') AS inst_exterior,
			cod_pais,est_homologa,fec_homologa  
		FROM rhh_estudio e WHERE cod_emp=@cod_Emp AND cod_est=@cod_est AND cod_ins=@cod_ins AND cons=@cons AND cod_even=@cod_even )	
			BEGIN
				DELETE rhh_portal_estudio WHERE cod_emp=@cod_Emp and  cod_est=@cod_est AND cod_ins=@cod_ins AND cons=@cons AND cod_even=@cod_even

				IF EXISTS(SELECT * FROM prt_Portal_Historial_Estudios 
				WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_est) = RTRIM(@cod_est) AND RTRIM(cod_ins)=RTRIM(@cod_ins) 
				AND RTRIM(cons)=RTRIM(@cons) AND RTRIM(cod_even)=RTRIM(@cod_even) AND cod_estado=1)
				BEGIN
				    UPDATE prt_Portal_Historial_Estudios 
				    SET cod_estado=4, motivo='Anulado por el empleado',fec_proceso=GETDATE() 
				    WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_est) = RTRIM(@cod_est) AND RTRIM(cod_ins)=RTRIM(@cod_ins) 
				    AND RTRIM(cons)=RTRIM(@cons) AND RTRIM(cod_even)=RTRIM(@cod_even) AND cod_estado=1 
				END
			END


END

```
