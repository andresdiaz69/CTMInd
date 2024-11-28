# Stored Procedure: sp_prt_CambiosHVDiscapacidades

## Usa los objetos:
- [[GTH_Discapacidades]]
- [[GTH_DiscapEmplea]]
- [[prt_portal_DiscapEmplea]]
- [[rhh_emplea]]

```sql


-- =============================================
-- Author:		Jessy Tatiana Peralta Florez
-- Create date: 24-04-2023
-- Description:	Consulta los cambios que estan pendientes de discapacidades.

--exec sp_prt_CambiosHVDiscapacidades '1018465875','03','','ModificacionRegistro'

--SPA Estado autorizacion HV
--Modified by: Alexander Vargas
--Modified date:	28/04/2023
--Description: se convierten los campos a varchar de 255 para poderlos 
--llamar desde otro procedimiento
-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_CambiosHVDiscapacidades]
	@cod_emp	CHAR(12) = NULL,
	--@num_ced	CHAR(12) = NULL, 
	@cod_disc	CHAR(2) = NULL,
	@motivo		VARCHAR(500)='',
	@opcion		CHAR(35)
	
--WITH ENCRYPTION	
AS
BEGIN
	IF (@opcion='ConsultaPorEmpleado')
	BEGIN
		SELECT	PDE.cod_emp, 
				RTRIM(e.nom_emp) + ' ' + RTRIM(e.ap1_emp) + ' ' + RTRIM(e.ap2_emp) AS 'nom_emp', 
				PDE.cod_disc,
				D.des_disc,
				PDE.req_disc,
				IIF(DE.cod_emp IS NULL,'Nuevo','Modificación') as TipoCambio
			--===================================
				

		FROM prt_portal_DiscapEmplea PDE
		INNER JOIN rhh_emplea E ON E.cod_emp = PDE.cod_emp
		INNER JOIN GTH_Discapacidades D ON PDE.cod_disc = D.cod_disc
		LEFT JOIN GTH_DiscapEmplea DE ON PDE.cod_emp = DE.cod_emp and PDE.cod_disc = DE.cod_disc 
		WHERE PDE.cod_emp=@cod_emp	

	END

	IF(@opcion='NuevoRegistro')
	BEGIN
		SELECT convert(varchar(255),nueva.cod_emp) as cod_emp, convert(varchar(255),ext.Descripcion) as descripcion
			 ,convert(varchar(255),nueva.campo) as campo,convert(varchar(255),valor_nuevo) as valor_nuevo, convert(varchar(255),'') AS valor_actual 
				--cod_emp,nueva.campo, valor_nuevo,'' Valor_anterior
		FROM	(
					SELECT cod_emp,campo, valor_nuevo
					FROM
						(	SELECT	cod_emp--CAST(PD.cod_emp AS VARCHAR(255)) AS cod_emp
									,CAST(PD.cod_disc AS VARCHAR(150)) AS cod_disc
									,CAST(PD.req_disc AS VARCHAR(150)) AS req_disc
									
							FROM prt_portal_DiscapEmplea PD
								INNER JOIN GTH_Discapacidades D ON PD.cod_disc = D.cod_disc
							WHERE PD.cod_emp=@cod_emp AND PD.cod_disc=@cod_disc 
						) NuevaDiscapacidad
					
					UNPIVOT (valor_nuevo FOR campo IN (cod_disc,req_disc)
					) AS TN
				) AS Nueva
		INNER JOIN 
		(
			SELECT c.name AS Campo, value AS Descripcion
			FROM sys.extended_properties AS ep
			INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
			INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
			WHERE class = 1 and t.name='prt_portal_DiscapEmplea'
		) AS EXT ON nueva.campo=EXT.Campo 
		
	END

	ELSE IF (@opcion='ModificacionRegistro')
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
								,CAST(A.cod_disc AS VARCHAR(255)) AS cod_disc
								,CAST(A.req_disc AS VARCHAR(255)) AS req_disc
								
						FROM prt_portal_DiscapEmplea A
							INNER JOIN GTH_Discapacidades B ON A.cod_disc = B.cod_disc
						WHERE A.cod_emp=@cod_emp --'1018465875'--
							AND A.cod_disc=@cod_disc --'02'--
					) NuevaDiscapacidad
				
				UNPIVOT (valor_nuevo FOR campo IN (cod_disc,req_disc)
				) AS ColumnaNuevaDiscapacidad
		
		) as nueva
		
		INNER JOIN
		(
			SELECT cod_emp Act_cod_emp,campo Act_campo, valor_actual Act_valor_actual
			FROM
			(	SELECT	cod_emp--CAST(PD.cod_emp AS VARCHAR(255)) AS cod_emp
						,CAST(A.cod_disc AS VARCHAR(255)) AS cod_disc
						,CAST(A.req_disc AS VARCHAR(255)) AS req_disc
						
				FROM GTH_DiscapEmplea A
					INNER JOIN GTH_Discapacidades B ON A.cod_disc = B.cod_disc
				WHERE A.cod_emp=@cod_emp --'1018465875'--
					AND A.cod_disc= @cod_disc --'02'--
			) NuevaDiscapacidad
		
			UNPIVOT (valor_actual FOR campo IN (cod_disc,req_disc)
			) AS ColumnaAnteriorDiscapacidad
		)as  actual ON nueva.cod_emp = actual.Act_cod_emp 
					AND nueva.campo=actual.Act_campo
					AND RTRIM(nueva.valor_nuevo) <> RTRIM(actual.Act_valor_actual)

		INNER JOIN 
		(
			SELECT c.name AS Campo, value AS Descripcion
			FROM sys.extended_properties AS ep
			INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
			INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
			WHERE class = 1 and t.name='prt_portal_DiscapEmplea'
		) AS EXT ON nueva.campo=EXT.Campo 
		


	END

	ELSE IF (@opcion='AutorizaCambioDiscapacidad') --Borrar cambios de portal cuando se han revisado todos
	BEGIN
		INSERT INTO GTH_DiscapEmplea(cod_emp,cod_disc,req_disc)
		SELECT cod_emp,cod_disc,req_disc FROM prt_portal_DiscapEmplea WHERE cod_emp = @cod_emp AND cod_disc = @cod_disc
		
		UPDATE prt_portal_DiscapEmplea SET cod_estado=2 WHERE cod_emp=@cod_emp AND cod_disc = @cod_disc

		DELETE FROM prt_portal_DiscapEmplea 
		WHERE cod_emp = @cod_emp AND cod_disc = @cod_disc
	END

	ELSE IF (@opcion='RechazaCambioDiscapacidad') --Borrar cambios de portal cuando se han revisado todos
	BEGIN
		  UPDATE prt_portal_DiscapEmplea SET cod_estado=3 WHERE cod_emp=@cod_emp AND cod_disc = @cod_disc
		DELETE FROM prt_portal_DiscapEmplea WHERE cod_emp=@cod_emp AND cod_disc=@cod_disc
	END

	ELSE IF (@opcion='EliminaCambioRechazadoDiscapacidad') --Borrar cambios de portal cuando se han revisado todos
	BEGIN
	
		DELETE FROM prt_portal_DiscapEmplea 
		WHERE cod_emp = @cod_emp AND cod_disc = @cod_disc

	END

END

```
