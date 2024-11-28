# Stored Procedure: SP_gth_cambios_Aspirantes

```sql




-- =============================================
-- Author:		David Alarcon Betancur, Diego Ordoñez
-- Create date: 26/08/2011
-- Description:	Selecciona los datos que estan por aprobar de la informacion basica del empleado
-- Modified Date: 08/08/2013
-- Description:	Modificacion para obtener los datos del empleado que han cambiado

-- Modified by: Alexander Vargas
-- Modified Date: 27/01/2017
-- Description:	Se agregan mas filtros para dejarlo como el de
--asignacion de candidatos, procedimiento PA_PORTAL_ASIGNACION_CANDIDATOS

-- Modified by: Alexander Vargas
-- Modified Date: 17/02/2017
-- Description:	Se valida que exista un idioma para aplicar filtro por nivel de idioma
-- Se valida que existe experiencia para aplicar filtro años experiencia.


-- Modified by: Alexander Vargas
-- Modified Date: 21/02/2017
-- Description:	Se agrega sentencia para insertar referencias personales


-- Solicitud:	SNR2019-0221 Filtro fecha candidato
-- Modified by: Alexander Vargas
-- Modified Date: 11/09/2019
-- Description:	Se agrega filtro por fecha y por cedula
-- La fecha usada es la de la autorización de manejo de datos

--Modified  by: Alexander Vargas
--Modified date:	15/09/2020
--Description:	se agrega funcion QUOTENAME para 
--				evitar inyección SQL

--Pruebas V4 Alejandra
--Modified by: Alexander Vargas
--Modified date:	01/10/2020
--Description:	se agrega tipo de identificacion y cedula
--				del familiar

--SPA2021 – 0008  Agregar campos en estudios
--Modified by: Alexander Vargas
--Modified date:	11/03/2021
--Description:	se agregan nuevos campos de estudios
--				como fec_ven,mod_est, cur_act

--Ajustes para version 402
--Modified by:		Alexander Vargas
--Modified date:	25/07/2021
--Description:	en el campo cod_est los valores nulos
--				se convierten en 01-Registrado

--SPA2019-0485 Agregar campos estrato y vivienda actual en candidatos
--Modified by:		Alexander Vargas
--Modified date:	28/12/2021
--Description:	se agregan los campos estrato y viv_act en Vivienda

--SPA2022 Agregar pestañas de Discapacidades y de Hobbies
--Modified by:		Alexander Vargas
--Modified date:	28/12/2021
--Description:	se agregan pestañas de Discapacidades y de Hobbies

--SPA2023 - 0099 ajustes vivienda en candidatos
--Modified by:		Alexander Vargas
--Modified date:	22/02/2023
--Description:	se agrega indicador de convive con el empleado en familiares
--y se actualizan datos de residencia con los de la vivienda actual


--SPA2023 - 0139 Campos para homologación de estudios
--Modified by:		Alexander Vargas
--Modified date:	16/03/2023
--Description:	se agregan los 9 campos solicitados en el SPA, los cuales son:
--ndiploma,nacta,nfolio,nlibro,est_exterior,inst_exterior,cod_pais,est_homologa,fec_homologa

--Ajustes version 5
--Modify by:	Alexander Vargas
--Modify date:	17/04/2023
--Description:	se cambia el nombre de la tabla
--GTH_RptVivienda por prt_CandidatoTempVivienda

--SPA agregar campos a HV Empleados y candidatos
--Modified by: Alexander Vargas
--Modified date:	08/05/2023
--Description: se agregan los campos ind_prepens,ind_cab_fam e ind_mascota a la consulta 
--de datos básicos y tambien ind_adulto_mayor en familiares

-- =============================================
CREATE PROCEDURE [dbo].[SP_gth_cambios_Aspirantes]
	@bdPortal		varchar(50) = NULL,
	--@cod_emp CHAR(12) = NULL,
	@opc	 CHAR(2), --A:Aspirante Autorizado  
					 --R:Aspirante rechazado p
					 --C:Consultar todos los aspirantes
	@motivo		varchar(500) = NULL,

	@barrio varchar (50)=null,
	@genero varchar (1)=null,
	@cargo varchar (50)=null,	
	@experiencia varchar (50)=null,
	@idiomas varchar (50)=null,
	@nivelIdioma varchar (50)=null,

	@niveleduca varchar (2)=null,

	@aniosExp varchar (50)=null,
	@estcivil varchar (50)=null,

	@estaturaIni varchar (4)=null,
	@estaturaFin varchar (4)=null,
	@pesoIni varchar (3)=null,
	@pesoFin varchar (3)=null,

	@edadIni varchar (3)=null,
	@edadFin varchar (3)=null,

	@salarioIni varchar (50)=null,
	@salarioFin varchar (50)=null,

	@depto varchar (50)=null,
	@ciudad varchar (50)=null,

	@cod_emp varchar (12)=null,
	@num_req varchar (50)=null,

	@estudio varchar (50)=null,
	@cedula varchar (20)=null,

	@fecIni varchar (8)=null,
	@fecFin varchar (8)=null


--WITH ENCRYPTION	


AS
BEGIN
DECLARE @cCadena VARCHAR(MAX);


	IF(@opc='A')  --Se pasa la hoja de vida desde el Portal hasta GH  
	BEGIN

		--actualizar datos de residencia con los de la vivienda actual de la 
	--tabla de vivienda

	SET @cCadena='


	UPDATE TOP (1) emplea SET pai_res=vivienda.cod_pai,dpt_res=vivienda.cod_dep,
	ciu_res=vivienda.cod_ciu, dir_res=vivienda.dir_viv 
	FROM ' + QUOTENAME(@bdportal) +'.dbo.prt_CandidatoTempVivienda AS vivienda
	INNER JOIN ' + QUOTENAME(@bdportal) +'.dbo.GTH_RptEmplea AS emplea 
	ON emplea.cod_emp=vivienda.cod_emp
	where viv_act=1 and emplea.cod_emp=' + ''''+ @cod_emp+ ''''
	PRINT @cCadena
	EXEC (@cCadena);

--Datos basicos

	SET @cCadena='INSERT INTO GTH_RptEmplea( cod_emp, ap1_emp, ap2_emp, nom_emp, tip_ide, pai_exp, ciu_exp, dpt_exp, fec_nac, cod_pai, cod_dep, cod_ciu, sex_emp, num_lib, cla_lib, dim_lib, gru_san, fac_rhh, est_civ, nac_emp, dir_res, tel_res, 
                         pai_res, dpt_res, ciu_res, per_car, tam_emp, pes_emp, e_mail, tel_cel, asp_sal, pto_gas, deudas, Cpto_Deudas, Niv_aca, num_ide,  nom1_emp, nom2_emp, cod_est, barrio, e_mail_alt, 
                         login_portal,Aut_Dat,Fec_Aut,fto_emp,ind_cab_fam,ind_mascota   
)  SELECT  cod_emp, ap1_emp, ap2_emp, nom_emp,tip_ide, pai_exp, ciu_exp, dpt_exp, fec_nac, cod_pai, cod_dep, cod_ciu, sex_emp, num_lib, cla_lib, dim_lib, gru_san, fac_rhh, est_civ, nac_emp, dir_res, tel_res, 
                         pai_res, dpt_res, ciu_res, per_car, tam_emp, pes_emp, e_mail, tel_cel, asp_sal, pto_gas, deudas, Cpto_Deudas, Niv_aca, num_ide,  nom1_emp, nom2_emp, ISNULL(cod_est,''01'') AS cod_est, barrio, e_mail_alt, 
                         login_portal,Aut_Dat,Fec_Aut,fto_emp,ind_cab_fam,ind_mascota   
  FROM '+  QUOTENAME(@bdportal) + '..GTH_RptEmplea WHERE cod_emp='+ ''''+ @cod_emp+ ''''

		EXEC (@cCadena);

------------------------------
--Datos estudio

		SET @cCadena='INSERT INTO GTH_RptEstudio(cod_emp, cod_est,nom_est , cod_ins, ano_est, sem_apr, gra_son, ind_can, tip_est,hor_est,fec_gra,nro_tar,
			cod_even,fto_certif,nom_anex,ind_gth,cod_cons,tipo_est,NRO,ind_estsup,num_sg_act,
			fec_cons,cons,fec_ven,mod_est,cur_act,ndiploma,nacta,nfolio,nlibro,est_exterior,inst_exterior,cod_pais,est_homologa,fec_homologa )
			SELECT cod_emp, cod_est, nom_est, cod_ins, ano_est, sem_apr, gra_son, ind_can, tip_est, hor_est,fec_gra,nro_tar,
			cod_even,fto_certif,nom_anex,ind_gth,cod_cons,tipo_est,NRO,ind_estsup,num_sg_act,
			fec_cons,cons,fec_ven,mod_est,cur_act,ndiploma,nacta,nfolio,nlibro,est_exterior,ins_exterior,cod_pais,est_homologa,fec_homologa 
FROM ' +  QUOTENAME(@bdportal) + '..GTH_RptEstudio WHERE cod_emp=' + ''''+ @cod_emp+ ''''

		EXEC (@cCadena);
------------------------------

--------------------------------
--Datos Familia

			SET @cCadena='INSERT INTO GTH_RptFamilia(cod_emp, ap1_fam, ap2_fam, nom_fam, tip_fam, fec_nac, sex_fam, est_civ, niv_est, ocu_fam,num_ced,tip_ide,ind_conv,ind_adulto_mayor )  SELECT cod_emp, ap1_fam, ap2_fam, nom_fam, tip_fam, fec_nac, sex_fam, est_civ, niv_est, ocu_fam, num_ced, tip_ide, ind_conv, ind_adulto_mayor     
FROM '  +  QUOTENAME(@bdPortal) + '..GTH_RptFamilia WHERE cod_emp=' + ''''+ @cod_emp+ ''''


		EXEC (@cCadena);
--------------------------------




--------------------------------
--Datos Idioma

			SET @cCadena='INSERT INTO GTH_RptIdioma(cod_emp, cod_idi, cod_calif )  SELECT cod_emp, cod_idi, cod_calif   
FROM '  +  QUOTENAME(@bdPortal) + '..GTH_RptIdioma WHERE cod_emp=' + ''''+ @cod_emp+ ''''


		EXEC (@cCadena);
--------------------------------

--------------------------------
--Datos Red social

			SET @cCadena='INSERT INTO GTH_RptEmpRedSocial(cod_emp, cod_redsoc, usuario )  SELECT cod_emp, cod_redsoc, usuario    
FROM '  +  QUOTENAME(@bdPortal) + '..GTH_RptEmpRedSocial WHERE cod_emp=' + ''''+ @cod_emp+ ''''


		EXEC (@cCadena);
--------------------------------



--------------------------------
--Datos Exp Laboral

			SET @cCadena='INSERT INTO GTH_ExpLaboral( cod_emp, nom_empr, nom_car, area_exp, des_fun, log_car, tpo_exp, mot_ret, jefe_inm, num_tel, sal_bas,fec_ing, fec_ter )  SELECT   cod_emp, nom_empr, nom_car, area_exp, des_fun, log_car, tpo_exp, mot_ret, jefe_inm, num_tel, sal_bas,fec_ing, fec_ter 
FROM '  +  QUOTENAME(@bdPortal) + '..GTH_ExpLaboral WHERE cod_emp=' + ''''+ @cod_emp+ ''''


		EXEC (@cCadena);
--------------------------------

--------------------------------
--Datos Vivienda

			SET @cCadena='INSERT INTO GTH_RptVivienda(cod_emp, dir_viv, cod_ciu, cod_dep, cod_pai, tip_viv, tip_ten,estrato,viv_act )  SELECT   cod_emp, dir_viv, cod_ciu, cod_dep, cod_pai, tip_viv, tip_ten, estrato, viv_act  
FROM '  +  QUOTENAME(@bdPortal) + '..prt_CandidatoTempVivienda WHERE cod_emp=' + ''''+ @cod_emp+ ''''


		EXEC (@cCadena);
--------------------------------

--------------------------------
--Datos Referencias Personales

			SET @cCadena='INSERT INTO GTH_RptReferencias ( cod_emp, nom_ref, tel_ref, tip_ref,  ocu_ref, ent_ref, parent, cel_ref, dir_ref) SELECT  cod_emp, Nom_ref, Tel_ref, Tip_ref,  ocu_ref, ent_ref, parent, cel_ref, dir_ref 
FROM '  +  QUOTENAME(@bdPortal) + '..GTH_RptRefePers WHERE cod_emp=' + ''''+ @cod_emp+ ''''


		EXEC (@cCadena);
--------------------------------


--Discapacidades

			SET @cCadena='INSERT INTO GTH_RptDiscapEmplea ( cod_emp, cod_disc, req_disc) SELECT  cod_emp, cod_disc, req_disc  
FROM '  +  QUOTENAME(@bdPortal) + '..GTH_RptDiscapEmplea WHERE cod_emp=' + ''''+ @cod_emp+ ''''


		EXEC (@cCadena);
--------------------------------

--Hobbies

			SET @cCadena='INSERT INTO GTH_RptHobbies ( conse,cod_emp, descripcion) SELECT  conse,cod_emp, descripcion  
FROM '  +  QUOTENAME(@bdPortal) + '..GTH_RptHobbies WHERE cod_emp=' + ''''+ @cod_emp+ ''''


		EXEC (@cCadena);
--------------------------------



		
		--Revisar cuando se rechazan los aspirantes
		--En este momento no se usa
	END
	ELSE IF (@opc='R')
	BEGIN
		SET @cCadena='UPDATE ' + QUOTENAME(@bdPortal) + '..GTH_RptEmplea SET ind_rechazo=1, ' 
				+ ' Observaciones = ' + ''''+ @motivo+ ''''
				+ '  WHERE cod_emp='+ ''''+ @cod_emp+ ''''
				PRINT (@cCadena);

				EXEC (@cCadena);
	END
	ELSE IF (@opc='C')  --Consulta
	BEGIN


	--Revisar si se utiliza el rechazado o solo es para marcar el aspirante
	--AND (EP.ind_rechazo <>1 OR EP.ind_rechazo IS NULL)

	SET @cCadena='SELECT DISTINCT  EP.cod_emp,
								EP.tip_ide,	
								T.des_tip,
								RTRIM(EP.nom_emp)+' + '''  ''' + ' + RTRIM(EP.ap1_emp) +'  + '''  '''+ ' + RTRIM(EP.ap2_emp) AS nombre,
								EP.tel_res,
								EP.tel_cel,
								EP.e_mail, 
								EP.Observaciones, 
								EP.ind_rechazo, 
								EP.Fec_aut 
					FROM ' +QUOTENAME(@bdPortal) + '..GTH_ExpLaboral EXP 
						INNER JOIN ' + QUOTENAME(@bdPortal) + '..GTH_RptEstudio AS EST ON EXP.cod_emp = EST.cod_emp COLLATE DATABASE_DEFAULT  
						RIGHT JOIN ' +QUOTENAME(@bdPortal) + '..GTH_RptEmplea EP ON EXP.cod_emp=EP.cod_emp COLLATE DATABASE_DEFAULT  
						INNER JOIN gen_tipide T ON T.cod_tip = EP.tip_ide COLLATE DATABASE_DEFAULT 
						LEFT JOIN GTH_RptEmplea EE ON EP.cod_emp=EE.cod_emp COLLATE DATABASE_DEFAULT  
						LEFT JOIN ' +QUOTENAME(@bdPortal) + '..GTH_RptIdioma idi ON EP.cod_emp=idi.cod_emp COLLATE DATABASE_DEFAULT  WHERE EE.cod_emp IS NULL  '
	

		IF @genero IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND EP.sex_emp LIKE ' + CHAR(39) + '%' +  @genero + '%' + CHAR(39)
		END

		IF @estcivil IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND EP.est_civ LIKE ' + CHAR(39) + '%' +  @estcivil + '%' + CHAR(39)
		END

		IF @salarioIni IS NOT NULL AND @salarioFin IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND EP.asp_sal BETWEEN ' +  @salarioIni + ' AND ' + @salarioFin
		END

		IF @pesoIni IS NOT NULL AND @pesoFin IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND EP.pes_emp BETWEEN ' +  @pesoIni + ' AND ' + @pesoFin
		END

		IF @estaturaIni IS NOT NULL AND @estaturaFin IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND EP.tam_emp BETWEEN ' +  @estaturaIni + ' AND ' + @estaturaFin
		END
		
		IF @edadIni IS NOT NULL AND @edadFin IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND DATEDIFF(year,EP.fec_nac,GETDATE()) BETWEEN ' +  @edadIni + ' AND ' + @edadFin
		END

		--IF @libretamilitar  IS NOT NULL AND @libretamilitar='1'
		--BEGIN
				
		--SET @cCadena=@cCadena + ' AND EP.num_lib IS NOT NULL '
		--END

		IF @barrio IS NOT NULL
		BEGIN
			SET @barrio=QUOTENAME(@barrio,CHAR(39))
			SET @barrio=REPLACE(@barrio,'''','')
			SET @cCadena=@cCadena + ' AND EP.barrio LIKE ' + CHAR(39) + '%' +  @barrio + '%' + CHAR(39)
		END

		IF @ciudad IS NOT NULL
		BEGIN
			SET @cCadena=@cCadena + ' AND EP.ciu_res LIKE ' + CHAR(39) + '%' +  @ciudad + '%' + CHAR(39)
		END

		IF @idiomas IS NOT NULL
		BEGIN
			SET @cCadena=@cCadena + ' AND idi.cod_idi LIKE ' + CHAR(39) + '%' +  @idiomas + '%' + CHAR(39)
		END

		IF @nivelIdioma IS NOT NULL AND @idiomas IS NOT NULL
		BEGIN
			SET @cCadena=@cCadena + ' AND idi.cod_calif LIKE ' + CHAR(39) + '%' +  @nivelIdioma + '%' + CHAR(39)
		END

		
		IF @cargo IS NOT NULL
		BEGIN
			SET @cargo=QUOTENAME(@cargo,CHAR(39))
			SET @cargo=REPLACE(@cargo,'''','')
			SET @cCadena=@cCadena + ' AND EXP.nom_car LIKE ' + CHAR(39) + '%' +  @cargo + '%' + CHAR(39)
		END

		IF @experiencia IS NOT NULL
		BEGIN
			SET @cCadena=@cCadena + ' AND EXP.area_exp LIKE ' + CHAR(39) + '%' +  @experiencia + '%' + CHAR(39)
		END

		IF @aniosExp IS NOT NULL AND @experiencia IS NOT NULL
		BEGIN
			SET @cCadena=@cCadena + ' AND EXP.tpo_exp LIKE ' + CHAR(39) + '%' +  @aniosExp + '%' + CHAR(39)
		END

		IF @niveleduca IS NOT NULL
		BEGIN
			SET @cCadena=@cCadena + ' AND EP.Niv_aca LIKE ' + CHAR(39) + '%' +  @niveleduca + '%' + CHAR(39)
		END

		IF @estudio IS NOT NULL
		BEGIN
			SET @cCadena=@cCadena + ' AND EST.cod_est LIKE ' + CHAR(39) + '%' +  @estudio + '%' + CHAR(39)
		END

		IF @cedula IS NOT NULL
		BEGIN
			SET @cedula=QUOTENAME(@cedula,CHAR(39))
			SET @cedula=REPLACE(@cedula,'''','')
			SET @cCadena=@cCadena + ' AND EP.cod_emp LIKE ' + CHAR(39) + '%' +  @cedula + '%' + CHAR(39)
		END

		IF @fecIni IS NOT NULL AND @fecFin IS NOT NULL
		BEGIN
			SET @cCadena=@cCadena + ' AND EP.Fec_aut BETWEEN ' + CHAR(39) +  @fecIni + CHAR(39) + ' AND ' + CHAR(39) + @fecFin + CHAR(39)
		END



		--IF @formacion  IS NOT NULL
		--BEGIN
		--SET @cCadena=@cCadena + ' AND EP.Niv_aca= ' +  @formacion 
		--END

		PRINT (@cCadena);

		EXEC (@cCadena);
	
	END
END

```
