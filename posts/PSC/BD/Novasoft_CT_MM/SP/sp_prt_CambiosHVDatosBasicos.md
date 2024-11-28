# Stored Procedure: sp_prt_CambiosHVDatosBasicos

## Usa los objetos:
- [[gen_ciudad]]
- [[gen_deptos]]
- [[gen_paises]]
- [[gth_estcivil]]
- [[GTH_Genero]]
- [[rhh_emplea]]
- [[rhh_portal_emplea]]

```sql






-- =============================================
-- Author:		Alexander Vargas
-- Create date: 23/11/2017
-- Description:	Consulta los datos básicos actuales y nuevos para ser autorizados

-- Modificado: Alexander Vargas
-- Fecha:		26 mar 2018
-- comentario: se agregan las descripciones de los campos de lista como ciudad. Ej 1105-Bogota
--				tambien se validan valores en nulo

-- Modificado: Alexander Vargas
-- Fecha:		24 mar 2021
-- comentario: se valida campo avi_emp cuando llega en nulo

-- SPA2021-0333 Cambiar descripciones campos autoriza HV
-- Modificado:	Alexander Vargas
-- Fecha:		06/01/2022
-- comentario:	se cambian las descripciones de los campos
--				tel_cel,tel_res,e_mail y dir_res.
--				Se utiliza UNION ALL para agregar las descripciones

-- Modificado:	Alexander Vargas
-- Fecha:		08/08/2022
-- Se tabula y se quita código en comentarios


--SPA agregar campos a HV Empleados - Datos básicos
--Modified by: Alexander Vargas
--Modified date:	27/02/2023
--Description: se agregan campos para mostrarlos en la autorización
--de cambios en los datos básicos del empleado

--SPA Estado autorizacion HV
--Modified by: Alexander Vargas
--Modified date:	18/04/2023
--Description: se convierten los campos a varchar de 255 para poderlos 
--llamar desde otro procedimiento


--SPA agregar campos a HV Empleados y candidatos
--Modified by: Alexander Vargas
--Modified date:	08/05/2023
--Description: se agregan los campos ind_prepens,ind_cab_fam e ind_mascota a la consulta 
--de datos básicos



--EXEC sp_prt_CambiosHVDatosBasicos '1012389184','ModificacionRegistro'
-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_CambiosHVDatosBasicos]
	@cod_emp CHAR(12) = NULL,
	@opcion		CHAR(30)

--WITH ENCRYPTION	
AS
BEGIN



	IF(@opcion='ModificacionRegistro')
	BEGIN

		SELECT CONVERT(VARCHAR(12),nueva.cod_emp) AS cod_emp , CONVERT(VARCHAR(255),ext.Descripcion) AS Descripcion, CONVERT(VARCHAR(255),nueva.campo) AS campo,CONVERT(VARCHAR(255),valor_nuevo) AS valor_nuevo,CONVERT(VARCHAR(255),valor_actual) AS valor_actual  
		FROM
		(	
			--Se consultan los datos nuevos de la HV modificados por el empleado en Portal
		
					SELECT A.cod_emp,
					CAST(A.tel_res AS VARCHAR(255)) AS tel_res,
					CAST(A.tel_cel AS VARCHAR(255)) AS tel_cel, 
					CAST(AE.des_est AS VARCHAR(255)) AS des_est , 
					CAST(A.e_mail AS VARCHAR(255)) AS e_mail, 
					CAST(ISNULL(A.avi_emp,'') AS VARCHAR(255)) AS avi_emp, 
					CAST((RIGHT(A.fto_emp,5) + CONVERT(VARCHAR(100),LEN(A.fto_emp))) AS VARCHAR(255)) AS fto_emp, 
					CAST(RTRIM(A.est_civ)+'_'+ AE.des_est AS VARCHAR(255)) AS est_civ,
					CAST(CONVERT(DATE,A.fec_expdoc) AS VARCHAR(255)) AS fec_expdoc,
					CAST(A.num_lib AS VARCHAR(255)) AS num_lib,
					CAST(CONVERT(VARCHAR(3),A.cla_lib) + '_' + CASE A.cla_lib WHEN 0 THEN 'No Aplica' 
						WHEN 1 THEN 'Primera' WHEN 2 THEN 'Segunda' END AS VARCHAR(255)) AS cla_lib,
					CAST(A.dim_lib AS VARCHAR(255)) AS dim_lib,
					CAST(A.gru_san AS VARCHAR(255)) AS gru_san,
					CAST(A.fac_rhh AS VARCHAR(255)) AS fac_rhh,
					CAST(CONVERT(VARCHAR(2),A.nac_emp)  + '_' + CASE A.nac_emp WHEN 1 THEN 'Colombiano' WHEN 2 THEN 'Doble' WHEN 3 THEN 'Extranjero' END  AS VARCHAR(255)) AS nac_emp,
					CAST(A.e_mail_alt AS VARCHAR(255)) AS e_mail_alt,
					CAST(A.tam_emp AS VARCHAR(255)) AS tam_emp,
					CAST(A.pes_emp AS VARCHAR(255)) AS pes_emp,
					CAST(CONVERT(VARCHAR(2),A.sex_emp) + '_' + Gen.des_gen AS VARCHAR(255)) AS sex_emp,
					CAST(IIF(A.ind_prepens=1,'1_Sí','0_No') AS VARCHAR(255)) AS ind_prepens,
					CAST(IIF(A.ind_cab_fam=1,'1_Sí','0_No') AS VARCHAR(255)) AS ind_cab_fam,
					CAST(IIF(A.ind_mascota=1,'1_Sí','0_No') AS VARCHAR(255)) AS ind_mascota 

			
					----====================================
					FROM rhh_portal_emplea  A 
						LEFT JOIN rhh_emplea B on B.cod_emp=A.cod_emp COLLATE DATABASE_DEFAULT 
						LEFT JOIN gth_estcivil AE on AE.cod_est = A.est_civ 
						LEFT JOIN gen_paises P ON P.cod_pai = A.pai_res COLLATE DATABASE_DEFAULT 
						LEFT JOIN gen_deptos D ON D.cod_dep=A.dpt_res COLLATE DATABASE_DEFAULT  and D.cod_pai=A.pai_res COLLATE DATABASE_DEFAULT 
						LEFT JOIN gen_ciudad C ON C.cod_ciu=A.ciu_res and C.cod_dep=A.dpt_res COLLATE DATABASE_DEFAULT  and C.cod_pai=A.pai_res COLLATE DATABASE_DEFAULT 
						LEFT JOIN GTH_Genero Gen ON Gen.cod_gen=A.sex_emp
										WHERE A.cod_emp=@cod_emp) P
					UNPIVOT (valor_nuevo FOR campo IN (tel_res,tel_cel,des_est,e_mail,
					        avi_emp,est_civ,fto_emp,fec_expdoc,num_lib,cla_lib,dim_lib,gru_san,nac_emp,
							e_mail_alt,tam_emp,pes_emp,sex_emp,fac_rhh,ind_prepens,ind_cab_fam,ind_mascota)
							) AS Nueva

				INNER JOIN 
				(
				SELECT *
				FROM
				(		
				--Se consultan los datos actuales de la HV del empleado en Enteprise
						SELECT A.cod_emp,--Campos para comparar con los nuevos
								CAST(AE.des_est AS VARCHAR(255)) AS  'des_estCiv', 
								CAST(B.e_mail AS VARCHAR(255)) AS  'e_mail', 
								CAST(B.tel_cel AS VARCHAR(255)) AS tel_cel , 
								CAST(B.tel_res AS VARCHAR(255)) AS tel_res, 
								CAST(IIF(A.fto_emp IS NULL,'', (RIGHT(A.fto_emp,5))+ CONVERT(VARCHAR(100),LEN(A.fto_emp))) AS VARCHAR(255)) AS fto_emp, 
								CAST(RTRIM(A.est_civ)+'_'+ AE.des_est AS VARCHAR(255)) AS est_civ, 
								CAST(ISNULL(B.avi_emp,'') AS VARCHAR(255)) AS 'avi_emp', 								
								CAST(CONVERT(DATE,ISNULL(CONVERT(VARCHAR(30),A.fec_expdoc),'')) AS VARCHAR(255)) AS fec_expdoc,
								CAST(A.num_lib AS VARCHAR(255)) AS num_lib,
								CAST(CONVERT(VARCHAR(3),A.cla_lib) + '_' + CASE A.cla_lib WHEN 0 THEN 'No Aplica' 
									WHEN 1 THEN 'Primera' WHEN 2 THEN 'Segunda' END AS VARCHAR(255)) AS cla_lib,
								CAST(A.dim_lib AS VARCHAR(255)) AS dim_lib,
								CAST(A.gru_san AS VARCHAR(255)) AS gru_san,
								CAST(A.fac_rhh AS VARCHAR(255)) AS fac_rhh,
								CAST(CONVERT(VARCHAR(2),A.nac_emp)  + '_' + CASE A.nac_emp WHEN 1 THEN 'Colombiano' WHEN 2 THEN 'Doble' WHEN 3 THEN 'Extranjero' END  AS VARCHAR(255)) AS nac_emp,
								CAST(A.e_mail_alt AS VARCHAR(255)) AS e_mail_alt,
								CAST(A.tam_emp AS VARCHAR(255)) AS tam_emp,
								CAST(A.pes_emp AS VARCHAR(255)) AS pes_emp,
								CAST(CONVERT(VARCHAR(2),A.sex_emp) + '_' + Gen.des_gen AS VARCHAR(255)) AS sex_emp,
								CAST(IIF(A.ind_prepens=1,'1_Sí','0_No') AS VARCHAR(255)) AS ind_prepens,
								CAST(IIF(A.ind_cab_fam=1,'1_Sí','0_No') AS VARCHAR(255)) AS ind_cab_fam,
								CAST(IIF(A.ind_mascota=1,'1_Sí','0_No') AS VARCHAR(255)) AS ind_mascota 

								--====================================
								FROM rhh_emplea A left JOIN rhh_emplea B on B.cod_emp=A.cod_emp COLLATE DATABASE_DEFAULT 
								left JOIN gth_estcivil AE on AE.cod_est = A.est_civ 
								LEFT JOIN gen_paises P ON P.cod_pai = B.pai_res COLLATE DATABASE_DEFAULT 
								LEFT JOIN gen_deptos D ON D.cod_dep=A.dpt_res COLLATE DATABASE_DEFAULT  and D.cod_pai=A.pai_res COLLATE DATABASE_DEFAULT 
								LEFT JOIN gen_ciudad C ON C.cod_ciu=A.ciu_res COLLATE DATABASE_DEFAULT  and C.cod_dep=A.dpt_res COLLATE DATABASE_DEFAULT  and C.cod_pai=A.pai_res COLLATE DATABASE_DEFAULT 
								LEFT JOIN GTH_Genero Gen ON Gen.cod_gen=A.sex_emp
								WHERE A.cod_emp=@cod_emp) P
					UNPIVOT (valor_actual FOR campo IN (est_civ,des_estCiv,e_mail,tel_cel,tel_res,
							avi_emp,fto_emp,fec_expdoc,num_lib,cla_lib,dim_lib,gru_san,
							nac_emp,e_mail_alt,tam_emp,pes_emp,sex_emp,
							fac_rhh,ind_prepens,ind_cab_fam,ind_mascota)) AS TN
				) AS Actual
				ON Actual.campo=Nueva.campo 

			INNER JOIN 
			(
			--se consultan las propiedades extendidas para usarlas en las descripciones
			--de los campos
					SELECT c.name AS Campo, value AS Descripcion
					FROM sys.extended_properties AS ep
					INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
					INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
					WHERE class = 1  and t.name IN ('rhh_emplea') 

				) AS EXT ON Actual.campo=EXT.Campo 

			WHERE RTRIM(valor_nuevo)<>RTRIM(valor_actual )

	END
	ELSE IF (@opcion='B')--Borrar datos de la tabla de Portal, rhh_portal_emplea
	BEGIN
		DELETE FROM rhh_portal_emplea WHERE cod_emp=@cod_emp		
	END


END

```
