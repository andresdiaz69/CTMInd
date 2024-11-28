# Stored Procedure: sp_prt_CambiosHVViviendaEmp

## Usa los objetos:
- [[gen_ciudad]]
- [[gen_deptos]]
- [[gen_paises]]
- [[GTH_TenenciaViv]]
- [[GTH_TipoViv]]
- [[prt_Portal_Emp_Vivienda]]
- [[rhh_emplea]]
- [[rhh_vivienda]]

```sql



-- =============================================
-- Author:		Jessy Tatiana Peralta Florez
-- Create date: 13-03-2023
-- Description:	Consulta los cambios que estan pendientes de vivienda.

--exec sp_prt_CambiosHVViviendaEmp @cod_emp='1018465875',@dir_viv='',@motivo='',@opcion='ModificacionRegistro'

--SPA Estado autorizacion HV
--Modified by:		Alexander Vargas
--Modified date:	05/04/2023
--Description:		en la opcion AutorizaCambioVivienda se agrega la actualización del estado
--				en la tabla de portal para que se guarde en el historial

--

--SPA2023-0279 Consultar historial cambios HV
--Modified by:		Alexander Vargas
--Modified date:	01/06/2023
--ajuste para dejar en el campo cod_ciu, los cambios de país, depto y ciudad

-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_CambiosHVViviendaEmp]
	@cod_emp	CHAR(12) = NULL,
	
	@dir_viv	VARCHAR(40) ='',
	@motivo		VARCHAR(500)='',
	@opcion		CHAR(35)
	
--WITH ENCRYPTION	
AS
BEGIN
	IF (@opcion='ConsultaPorEmpleado') /* consulta los registros pendientes por autorizar o rechazar */
	BEGIN
		SELECT	A.cod_emp, 
				RTRIM(e.nom_emp) + ' ' + RTRIM(e.ap1_emp) + ' ' + RTRIM(e.ap2_emp) AS 'nom_emp', 
				a.dir_viv,
				a.tip_viv,
				b.des_tip,
				A.tip_ten,
				C.des_Ten,
				IIF(V.cod_emp IS NULL,'Nuevo','Modificación') as TipoCambio
			--===================================
				

		FROM prt_Portal_Emp_Vivienda A
		INNER JOIN rhh_emplea E ON E.cod_emp = A.cod_emp
		INNER JOIN GTH_TipoViv B ON A.tip_viv = b.tip_viv
		INNER JOIN GTH_TenenciaViv C ON a.tip_ten = c.tip_ten
		LEFT JOIN rhh_vivienda V ON A.cod_emp = V.cod_emp and A.dir_viv = V.dir_viv
		WHERE A.cod_emp=@cod_emp	

	END

	IF(@opcion='NuevoRegistro') /* Muestra el detalle del registro cuando se nuevo seleccionado */
	BEGIN
		SELECT CONVERT(VARCHAR(255),nueva.cod_emp) AS cod_emp, CONVERT(VARCHAR(255),ext.Descripcion) AS Descripcion, CONVERT(VARCHAR(255),nueva.campo) AS campo,CONVERT(VARCHAR(255),valor_nuevo) AS valor_nuevo,  CONVERT(VARCHAR(255),'') AS valor_actual 
				--cod_emp,nueva.campo, valor_nuevo,'' Valor_anterior
		FROM	(
					SELECT cod_emp,campo, valor_nuevo
					FROM
						(	SELECT	cod_emp--CAST(PD.cod_emp AS VARCHAR(255)) AS cod_emp
									,CAST(P.dir_viv AS VARCHAR(150)) AS dir_viv
									,CAST(Concat(P.cod_pai,'_',Pa.nom_pai) + ',' + Concat(P.cod_dep,'_',D.nom_dep) + ',' + Concat (P.cod_ciu,'_',C.nom_ciu) AS VARCHAR(150)) AS cod_ciu	
									,CAST(Concat(P.tip_viv,'_',B.[des_tip]) AS VARCHAR(150)) AS tip_viv--Descripcion Tipo Vivienda
									,CAST(Concat(P.tip_ten,'_',TC.[des_ten]) AS VARCHAR(150)) AS tip_ten --Descripcion Tenencia clase vivienda
									,CAST(P.are_tom AS VARCHAR(150)) AS are_tom
									,CAST(P.are_com AS VARCHAR(150)) AS are_com
									,CAST(P.num_alc AS VARCHAR(150)) AS num_alc
									,CAST(P.noc_alc AS VARCHAR(150)) AS noc_alc
									,CAST(Concat(P.ser_acu,'_',iif(P.ser_acu=0,'NO','SI')) AS VARCHAR(150)) AS ser_acu
									,CAST(Concat(P.ser_ene,'_',iif(P.ser_ene=0,'NO','SI')) AS VARCHAR(150)) AS ser_ene
									,CAST(Concat(P.ser_tel,'_',iif(P.ser_tel=0,'NO','SI')) AS VARCHAR(150)) AS ser_tel
									,CAST(Concat(P.ser_alc,'_',iif(P.ser_alc=0,'NO','SI')) AS VARCHAR(150)) AS ser_alc
									,CAST(Concat(P.ser_gad,'_',iif(P.ser_gad=0,'NO','SI')) AS VARCHAR(150)) AS ser_gad
									,CAST(Concat(P.viv_act,'_',iif(P.viv_act=0,'NO','SI')) AS VARCHAR(150)) AS viv_act
									,CAST(Concat(P.ser_int,'_',iif(P.ser_int=0,'NO','SI')) AS VARCHAR(150)) AS ser_int
									
									,CAST(P.estrato AS VARCHAR(150)) AS estrato
									--,CAST(P.cant_pers_convive AS VARCHAR(150)) AS cant_pers_convive
									
							FROM prt_Portal_Emp_Vivienda P
								INNER JOIN gen_paises Pa ON P.cod_pai = Pa.cod_pai
								INNER JOIN gen_deptos D ON P.cod_pai = D.cod_pai AND P.cod_dep = D.cod_dep 
								INNER JOIN gen_ciudad C ON P.cod_pai = c.cod_pai AND P.cod_dep = C.cod_dep  AND P.cod_ciu = C.cod_ciu
								
								INNER JOIN GTH_TipoViv B ON P.tip_viv = B.tip_viv
								INNER JOIN GTH_TenenciaViv TC ON P.tip_ten = TC.tip_ten

							WHERE p.cod_emp = @cod_emp --'1018465875'--
								AND p.dir_viv= @dir_viv --'nueva actual'--
							
						) NuevaDiscapacidad
					
					UNPIVOT (valor_nuevo FOR campo IN (dir_viv,cod_ciu,tip_viv,tip_ten,are_tom,are_com,num_alc,noc_alc,ser_acu,ser_ene,ser_tel,ser_alc,
													   ser_gad,viv_act,ser_int,estrato)


					) AS TN
				) AS Nueva
		INNER JOIN 
		(
			SELECT c.name AS Campo, value AS Descripcion
			FROM sys.extended_properties AS ep
			INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
			INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
			WHERE class = 1 and t.name='prt_Portal_Emp_Vivienda'
		) AS EXT ON nueva.campo=EXT.Campo 
		
-----------------------------------------------------------------------------------------------------------------------------------------------------------------

	END

	ELSE IF (@opcion='ModificacionRegistro') /*Muestra el detalle del registro cuando es editado seleccionado*/
	BEGIN
		
		
		SELECT convert(varchar(12),nueva.cod_emp) as cod_emp,
				convert(varchar(255),ext.Descripcion) as Descripcion, 
				convert(varchar(255),nueva.campo) as campo,
				convert(varchar(255),valor_nuevo) as valor_nuevo,
				convert(varchar(255),Act_valor_actual) as valor_actual  

		
		FROM
		(	SELECT cod_emp,campo, valor_nuevo
			FROM
				(	SELECT	cod_emp--CAST(PD.cod_emp AS VARCHAR(255)) AS cod_emp
							,CAST(P.dir_viv AS VARCHAR(150)) AS dir_viv
							,CAST(Concat(P.cod_pai,'_',Pa.nom_pai) + ',' + Concat(P.cod_dep,'_',D.nom_dep) + ',' + Concat(P.cod_ciu,'_',C.nom_ciu) AS VARCHAR(150)) AS cod_ciu	
														
							,CAST(Concat(P.tip_viv,'_',B.[des_tip]) AS VARCHAR(150)) AS tip_viv--Descripcion Tipo Vivienda
							,CAST(Concat(P.tip_ten,'_',TC.[des_ten]) AS VARCHAR(150)) AS tip_ten --Descripcion Tenencia clase vivienda
							,CAST(isnull(P.are_tom,0) AS VARCHAR(150)) AS are_tom
							,CAST(isnull(P.are_com,0) AS VARCHAR(150)) AS are_com
							,CAST(P.num_alc AS VARCHAR(150)) AS num_alc
							,CAST(P.noc_alc AS VARCHAR(150)) AS noc_alc
							,CAST(Concat(P.ser_acu,'_',iif(P.ser_acu=0,'NO','SI')) AS VARCHAR(150)) AS ser_acu
							,CAST(Concat(P.ser_ene,'_',iif(P.ser_ene=0,'NO','SI')) AS VARCHAR(150)) AS ser_ene
							,CAST(Concat(P.ser_tel,'_',iif(P.ser_tel=0,'NO','SI')) AS VARCHAR(150)) AS ser_tel
							,CAST(Concat(P.ser_alc,'_',iif(P.ser_alc=0,'NO','SI')) AS VARCHAR(150)) AS ser_alc
							,CAST(Concat(P.ser_gad,'_',iif(P.ser_gad=0,'NO','SI')) AS VARCHAR(150)) AS ser_gad
							,CAST(Concat(P.viv_act,'_',iif(P.viv_act=0,'NO','SI')) AS VARCHAR(150)) AS viv_act
							,CAST(Concat(P.ser_int,'_',iif(P.ser_int=0,'NO','SI')) AS VARCHAR(150)) AS ser_int
							,CAST(isnull(P.estrato,0) AS VARCHAR(150)) AS estrato
							--,CAST(P.cant_pers_convive AS VARCHAR(150)) AS cant_pers_convive
							
					FROM prt_Portal_Emp_Vivienda P
						INNER JOIN gen_paises Pa ON P.cod_pai = Pa.cod_pai
						INNER JOIN gen_deptos D ON P.cod_pai = D.cod_pai AND P.cod_dep = D.cod_dep 
						INNER JOIN gen_ciudad C ON P.cod_pai = c.cod_pai AND P.cod_dep = C.cod_dep  AND P.cod_ciu = C.cod_ciu
						INNER JOIN GTH_TipoViv B ON P.tip_viv = B.tip_viv
						INNER JOIN GTH_TenenciaViv TC ON P.tip_ten = TC.tip_ten
					WHERE	p.cod_emp = @cod_emp --'1018465875'--
							AND p.dir_viv= @dir_viv --'nueva actual'--
					
				) NuevaDiscapacidad
			
				UNPIVOT 
				
				(valor_nuevo FOR campo IN (dir_viv,cod_ciu,tip_viv,tip_ten,are_tom,are_com,num_alc,noc_alc,ser_acu,ser_ene,ser_tel,ser_alc,
												   ser_gad,viv_act,ser_int,estrato)

				) AS ColumnaNuevaDiscapacidad	
		) as NUEVA
		
		INNER JOIN
		(
			SELECT cod_emp Act_cod_emp,campo Act_campo, valor_actual Act_valor_actual
			FROM
			(	SELECT	cod_emp--CAST(PD.cod_emp AS VARCHAR(255)) AS cod_emp
							,CAST(A.dir_viv AS VARCHAR(150)) AS dir_viv
							,CAST(Concat(A.cod_pai,'_',Pa.nom_pai) + ',' + Concat(A.cod_dep,'_',D.nom_dep) + ',' + Concat(A.cod_ciu,'_',C.nom_ciu) AS VARCHAR(150)) AS cod_ciu							
							,CAST(Concat(A.tip_viv,'_',B.[des_tip]) AS VARCHAR(150)) AS tip_viv--Descripcion Tipo Vivienda
							,CAST(Concat(A.tip_ten,'_',TC.[des_ten]) AS VARCHAR(150)) AS tip_ten --Descripcion Tenencia clase vivienda
							,CAST(isnull(A.are_tom,0) AS VARCHAR(150)) AS are_tom
							,CAST(isnull(A.are_com,0) AS VARCHAR(150)) AS are_com
							,CAST(A.num_alc AS VARCHAR(150)) AS num_alc
							,CAST(A.noc_alc AS VARCHAR(150)) AS noc_alc
							,CAST(Concat(A.ser_acu,'_',iif(A.ser_acu=0,'NO','SI')) AS VARCHAR(150)) AS ser_acu
							,CAST(Concat(A.ser_ene,'_',iif(A.ser_ene=0,'NO','SI')) AS VARCHAR(150)) AS ser_ene
							,CAST(Concat(A.ser_tel,'_',iif(A.ser_tel=0,'NO','SI')) AS VARCHAR(150)) AS ser_tel
							,CAST(Concat(A.ser_alc,'_',iif(A.ser_alc=0,'NO','SI')) AS VARCHAR(150)) AS ser_alc
							,CAST(Concat(A.ser_gad,'_',iif(A.ser_gad=0,'NO','SI')) AS VARCHAR(150)) AS ser_gad
							,CAST(Concat(A.viv_act,'_',iif(A.viv_act=0,'NO','SI')) AS VARCHAR(150)) AS viv_act
							,CAST(Concat(A.ser_int,'_',iif(A.ser_int=0,'NO','SI')) AS VARCHAR(150)) AS ser_int							
							,CAST(isnull(A.estrato,0) AS VARCHAR(150)) AS estrato
							--,CAST(A.cant_pers_convive AS VARCHAR(150)) AS cant_pers_convive
							
				FROM rhh_vivienda A
					INNER JOIN gen_paises Pa ON A.cod_pai = Pa.cod_pai
					INNER JOIN gen_deptos D ON A.cod_pai = D.cod_pai AND A.cod_dep = D.cod_dep 
					INNER JOIN gen_ciudad C ON A.cod_pai = c.cod_pai AND A.cod_dep = C.cod_dep  AND A.cod_ciu = C.cod_ciu
					INNER JOIN GTH_TipoViv B ON A.tip_viv = B.tip_viv
					INNER JOIN GTH_TenenciaViv TC ON A.tip_ten = TC.tip_ten
					--INNER JOIN GTH_Discapacidades B ON A.cod_disc = B.cod_disc
				WHERE A.cod_emp = @cod_emp --'1018465875'--
					AND A.dir_viv= @dir_viv --'02'--
			) NuevaDiscapacidad
		
			UNPIVOT 
			
			(valor_actual FOR campo IN (dir_viv,cod_ciu,tip_viv,tip_ten,are_tom,are_com,num_alc,noc_alc,ser_acu,ser_ene,ser_tel,ser_alc,
												   ser_gad,viv_act,ser_int,estrato)
			
			) AS ColumnaAnteriorDiscapacidad
		)as  ACTUAL ON NUEVA.cod_emp = ACTUAL.Act_cod_emp 
					AND NUEVA.campo = ACTUAL.Act_campo
					AND RTRIM(NUEVA.valor_nuevo) <> RTRIM(ACTUAL.Act_valor_actual)

		INNER JOIN 
		(
			SELECT c.name AS Campo, value AS Descripcion
			FROM sys.extended_properties AS ep
			INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
			INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
			WHERE class = 1 and t.name='prt_Portal_Emp_Vivienda'
		) AS EXT ON nueva.campo=EXT.Campo 
		

	END
	
	ELSE IF (@opcion='AutorizaCambioVivienda') -- Crea el registro en Enterprise y elimina el registro que esta en Portal
	BEGIN

		INSERT INTO rhh_vivienda ([cod_emp] --cod Empleado
								,[dir_viv] --Dirección Vivienda 
								,[cod_pai] --Cod Pais
								,[cod_dep] --Cod Depto
								,[cod_ciu] --Cod Ciudad
								,[tip_viv] --Tipo Vivienda
								,[tip_ten] --Tenencia clase vivienda 
								,[are_tom] --Área Terreno (M)
								,[are_com] --Área Construida (M)
								,[num_alc] --Numero Alcobas
								,[noc_alc] --No Ocupantes por Alcoba
								,[ser_acu] --Ind Serv Acueducto
								,[ser_ene] --Ind Serv Energia
								,[ser_tel] --Ind Serv Telefono
								,[ser_alc] --Ind Serv Alcantarillado
								,[ser_gad] --Ind Serv GAS
								,[viv_act] --Ind Vivienda Actual
								,[ser_int] --Ind Serv Internet
								,[estrato] --Estatro
								--,[cant_pers_convive] --Nro Personas que convive)
								)
		SELECT	[cod_emp] --cod Empleado
				,[dir_viv] --Dirección Vivienda 
				,[cod_pai] --Cod Pais
				,[cod_dep] --Cod Depto
				,[cod_ciu] --Cod Ciudad
				,[tip_viv] --Tipo Vivienda
				,[tip_ten] --Tenencia clase vivienda 
				,[are_tom] --Área Terreno (M)
				,[are_com] --Área Construida (M)
				,[num_alc] --Numero Alcobas
				,[noc_alc] --No Ocupantes por Alcoba
				,[ser_acu] --Ind Serv Acueducto
				,[ser_ene] --Ind Serv Energia
				,[ser_tel] --Ind Serv Telefono
				,[ser_alc] --Ind Serv Alcantarillado
				,[ser_gad] --Ind Serv GAS
				,[viv_act] --Ind Vivienda Actual
				,[ser_int] --Ind Serv Internet
				,[estrato] --Estatro
				--,[cant_pers_convive] --Nro Personas que convive 
				
			FROM prt_Portal_Emp_Vivienda A 
			WHERE cod_emp=@cod_emp AND dir_viv = @dir_viv
		
		UPDATE prt_Portal_Emp_Vivienda SET cod_estado=2 WHERE cod_emp=@cod_emp AND dir_viv = @dir_viv 
		
		/*Elimina el requistro que viene de portal*/
		DELETE FROM prt_Portal_Emp_Vivienda WHERE cod_emp=@cod_emp AND dir_viv = @dir_viv

	END

	ELSE IF (@opcion='RechazaCambioVivienda') -- Borra cambios que se estan rechazando
	BEGIN
		UPDATE prt_Portal_Emp_Vivienda SET cod_estado=3 WHERE cod_emp=@cod_emp AND dir_viv = @dir_viv and cod_estado=1
		DELETE FROM prt_Portal_Emp_Vivienda WHERE cod_emp=@cod_emp AND dir_viv=@dir_viv
	END

	ELSE IF (@opcion='EliminaCambioRechazadoVivienda') -- Borra cambios que se estan rechazando
	BEGIN
		DELETE FROM prt_Portal_Emp_Vivienda WHERE cod_emp=@cod_emp AND dir_viv=@dir_viv
	END

END

```
