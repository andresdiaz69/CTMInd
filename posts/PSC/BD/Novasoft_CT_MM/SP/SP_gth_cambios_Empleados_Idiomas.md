# Stored Procedure: SP_gth_cambios_Empleados_Idiomas

## Usa los objetos:
- [[GTH_Calificacion]]
- [[gth_portal_hdvempleado_rechazos]]
- [[prt_portal_Historial_Idiomas]]
- [[rhh_emplea]]
- [[rhh_idioma]]
- [[rhh_portal_idioma]]
- [[rhh_tbidioma]]

```sql



-- =============================================
-- Author:		David Alarcon Betancur
-- Create date: 26/08/2011
-- Description:	Obtiene y autoriza los cambios para la informacion de idiomas del empleado

-- Modificado: 11-Ago-2016
-- Modificado por: Alexander Vargas
-- Comentario: se agrega estado Autorizado o Rechazado en la tabla de gth_portal_hdvempleado_rechazos
-- el valor se agrega al autorizar y también al rechazar

-- Modificado: 22-06-2022
-- Modificado por: Alexander Vargas
-- Comentario: se modifica el nombre de la sección y se agrega la columna campo 
-- con el valor Nuevo - Registro completo

-- Modificado: 27-03-2023
-- Modificado por: Alexander Vargas
-- Comentario: en la opcion de eliminar se cambia el estado del cambio de idioma a anulado

-- SPA Estado autorización HV
-- Modificado: 30-03-2023
-- Modificado por: Alexander Vargas
-- Comentario: al actualizar o rechazar se registra el estado en rhh_portal_idioma
-- =============================================
CREATE PROCEDURE [dbo].[SP_gth_cambios_Empleados_Idiomas]
	@cod_emp CHAR(12) = NULL,
	@cod_idi CHAR(3) = NULL, 
	@opc	 CHAR(2), --A:Cambio de info Autorizado para cod_emp 
					 --N:Cambio de info Negado para cod_emp
					 --C:Consultar todos los cambios pendientes
	@motivo		varchar(500) = NULL
--WITH ENCRYPTION	
AS
BEGIN
	IF(@opc='A')
	BEGIN
		IF(EXISTS (SELECT cod_emp,cod_idi FROM rhh_idioma A WHERE A.cod_emp=@cod_emp AND A.cod_idi=@cod_idi))
		BEGIN
			UPDATE A
			SET  A.cod_emp=@cod_emp, A.cod_idi=@cod_idi, A.cod_calif=B.cod_calif, A.cod_hab=B.cod_hab 
			FROM rhh_idioma A, rhh_portal_idioma B
			WHERE A.cod_emp=@cod_emp AND B.cod_emp=@cod_emp AND A.cod_idi=@cod_idi AND B.cod_idi=@cod_idi 
			
			UPDATE rhh_portal_idioma SET cod_estado=2 WHERE cod_emp=@cod_emp AND cod_idi=@cod_idi and cod_estado=1
			
			INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado) VALUES (@cod_emp, 'Idiomas', @motivo,'Aprobado')
			DELETE FROM rhh_portal_idioma WHERE cod_emp=@cod_emp AND cod_idi=@cod_idi
		END
		ELSE
		BEGIN
			INSERT INTO rhh_idioma(cod_emp, cod_idi, cod_calif, cod_hab)
				SELECT     cod_emp, cod_idi, cod_calif, cod_hab
				FROM         rhh_portal_idioma B
				WHERE B.cod_emp=@cod_emp AND B.cod_idi=@cod_idi
			
			INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado,campo) VALUES (@cod_emp, 'Idiomas', @motivo,'Aprobado','Nuevo - Registro completo')	
			
			UPDATE rhh_portal_idioma SET cod_estado=2 WHERE cod_emp=@cod_emp AND cod_idi=@cod_idi and cod_estado=1
			DELETE FROM rhh_portal_idioma WHERE cod_emp=@cod_emp AND cod_idi=@cod_idi
		END
	END
	ELSE IF (@opc='N')
	BEGIN
		UPDATE rhh_portal_idioma SET cod_estado=3,motivo=@motivo WHERE cod_emp=@cod_emp AND cod_idi=@cod_idi
		DELETE FROM rhh_portal_idioma WHERE cod_emp=@cod_emp AND cod_idi=@cod_idi
		INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado,campo) VALUES (@cod_emp, 'Idiomas', @motivo,'Rechazado','Nuevo - Registro completo')
	END
	ELSE IF (@opc='C')
	BEGIN
		SELECT A.cod_emp, A.cod_idi, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', C.nom_idi, E.Txt_Calif,
		--Campos para comparar con los nuevos
		D.cod_emp as 'T.cod_emp', D.cod_idi as 'T.cod_idi', F.Txt_Calif AS 'T.Txt_Calif'
		--===================================
		FROM rhh_portal_idioma A INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp
			LEFT JOIN rhh_tbidioma C ON C.cod_idi = A.cod_idi
				LEFT JOIN rhh_idioma D ON A.cod_emp = D.cod_emp AND A.cod_idi = D.cod_idi
					LEFT JOIN GTH_Calificacion E ON E.cod_calif = A.cod_calif
						LEFT JOIN GTH_Calificacion F ON F.cod_calif = D.cod_calif
					
	END

	ELSE IF (@opc='CE') --Consulta de un empleado
	BEGIN
		SELECT A.cod_emp, A.cod_idi, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', C.nom_idi, E.Txt_Calif,
		--Campos para comparar con los nuevos
		D.cod_emp as 'T.cod_emp', D.cod_idi as 'T.cod_idi', F.Txt_Calif AS 'T.Txt_Calif', IIF(D.cod_emp IS NULL,'Nuevo','') as TipoCambio 
		--===================================
		FROM rhh_portal_idioma A INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp
			LEFT JOIN rhh_tbidioma C ON C.cod_idi = A.cod_idi
				LEFT JOIN rhh_idioma D ON A.cod_emp = D.cod_emp AND A.cod_idi = D.cod_idi
					LEFT JOIN GTH_Calificacion E ON E.cod_calif = A.cod_calif
						LEFT JOIN GTH_Calificacion F ON F.cod_calif = D.cod_calif
						WHERE A.cod_emp=@cod_emp
					
	END

	ELSE IF (@opc='B')--Borrar datos de la tabla de Portal, rhh_portal_emplea
	BEGIN
		DELETE FROM rhh_portal_idioma WHERE cod_emp=@cod_emp AND cod_idi=@cod_idi

		UPDATE prt_portal_Historial_Idiomas SET cod_estado=4, fec_proceso=GETDATE(), motivo='Anulado por el empleado'   
		where cod_emp=@cod_emp and cod_idi=@cod_idi AND tipo_cambio=1 and cod_estado=1
	END

END

```
