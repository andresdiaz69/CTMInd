# Stored Procedure: SP_gth_cambios_Empleados_Dotacion

## Usa los objetos:
- [[GTH_DotaEle]]
- [[GTH_DotaTallaEmplea]]
- [[GTH_portal_DotaTallaEmplea]]
- [[gth_portal_hdvempleado_rechazos]]
- [[prt_Portal_Historial_Dotacion]]
- [[rhh_emplea]]

```sql




-- =============================================
-- Author:		David Alarcon Betancur
-- Create date: 26/08/2011
-- Description:	Obtiene y autoriza los cambios para la informacion de la dotacion para empleado
-- Modificado: 22-Jul-2015
-- Modificado por: Alexander Vargas
-- Comentario: se cambia en la opcion 'A' el nombre de la tabla que debe revisar
-- en la parte falsa del condicional el nombre de la tabla y el campo cod_idi por cod_ele

-- Modificado: 11-Ago-2016
-- Modificado por: Alexander Vargas
-- Comentario: se agrega estado Autorizado o Rechazado en la tabla de gth_portal_hdvempleado_rechazos
-- el valor se agrega al autorizar y también al rechazar

--SRS2020-1385 Autorizacion dotacion
-- Modify date: 29/12/2020
-- Modify by:	Alexander Vargas
-- Comentario: se agrega Borrar cambios de portal cuando se han revisado todos

-- SPA2022-0332 Cambiar rotulos autoriza dotación
-- Modify date: 04/05/2022
-- Modify by:	Alexander Vargas
-- Comentario: se modifica el texto del tipo de cambio según lo indicado

-- SPA Estado autorización HV
-- Modificado: 03-05-2023
-- Modificado por: Alexander Vargas
-- Comentario: al actualizar o rechazar se registra el estado en GTH_portal_DotaTallaEmplea

-- =============================================
CREATE PROCEDURE [dbo].[SP_gth_cambios_Empleados_Dotacion]
	@cod_emp CHAR(12) = NULL,
	@cod_ele CHAR(5) = NULL, 
	@opc	 CHAR(2), --A:Cambio de info Autorizado para cod_emp 
					 --N:Cambio de info Negado para cod_emp
					 --C:Consultar todos los cambios pendientes
	@motivo		varchar(500) = NULL
--WITH ENCRYPTION	
AS
BEGIN
	IF(@opc='A')
	BEGIN
		IF(EXISTS (SELECT cod_emp, cod_ele FROM GTH_DotaTallaEmplea A WHERE A.cod_emp=@cod_emp AND A.cod_ele=@cod_ele))
		BEGIN
			UPDATE A
			SET  A.cod_emp=@cod_emp, A.cod_ele=@cod_ele, A.Talla=B.Talla
			FROM GTH_DotaTallaEmplea A, GTH_portal_DotaTallaEmplea B
			WHERE A.cod_emp=@cod_emp AND B.cod_emp=@cod_emp AND A.cod_ele=@cod_ele
			
			--cambia el estado a aprobado para disparar el trigger y actualizar el historial
			UPDATE GTH_portal_DotaTallaEmplea SET cod_estado=2 WHERE cod_emp=@cod_emp AND cod_ele=@cod_ele and cod_estado=1

			INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado) VALUES (@cod_emp, '06', @motivo,'Autorizado')
			DELETE FROM GTH_portal_DotaTallaEmplea WHERE cod_emp=@cod_emp AND cod_ele=@cod_ele
			
		END
		ELSE
		BEGIN
			INSERT INTO GTH_DotaTallaEmplea(cod_emp, cod_ele, Talla)
				SELECT     cod_emp, cod_ele, Talla 
				FROM         GTH_portal_DotaTallaEmplea B
				WHERE B.cod_emp=@cod_emp AND B.cod_ele=@cod_ele
			
			--cambia el estado a aprobado para disparar el trigger y actualizar el historial
			UPDATE GTH_portal_DotaTallaEmplea SET cod_estado=2 WHERE cod_emp=@cod_emp AND cod_ele=@cod_ele and cod_estado=1

			INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado) VALUES (@cod_emp, '06', @motivo,'Autorizado')
			DELETE FROM GTH_portal_DotaTallaEmplea WHERE cod_emp=@cod_emp AND cod_ele=@cod_ele
		END
	END
	ELSE IF (@opc='N')
	BEGIN
		  --cuando se rechaza todo el cambio se actualiza estado con código 3, esto dispara el trigger que se
		  --encarga de actualizar el historial
		UPDATE GTH_portal_DotaTallaEmplea SET cod_estado=3 WHERE cod_emp=@cod_emp AND cod_ele=@cod_ele and cod_estado=1

		DELETE FROM GTH_portal_DotaTallaEmplea WHERE cod_emp=@cod_emp AND cod_ele=@cod_ele
		INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado) VALUES (@cod_emp, '06', @motivo,'Rechazado')
	END
	ELSE IF (@opc='C')
	BEGIN
		SELECT A.cod_emp,RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp',
			A.cod_ele, RTRIM(C.des_ele) AS 'des_ele', A.Talla,
			--Campos para comparar con los nuevos
			D.cod_emp as 'T.cod_emp', D.Talla as 'T.Talla'
			--===================================
			FROM GTH_portal_DotaTallaEmplea A INNER JOIN rhh_emplea B on B.cod_emp=A.cod_emp
				LEFT JOIN GTH_DotaEle C on A.cod_ele=C.cod_ele
					LEFT JOIN GTH_DotaTallaEmplea D on D.cod_emp = A.cod_emp and D.cod_ele = A.cod_ele
	END
	ELSE IF (@opc='CE')
	BEGIN
		SELECT A.cod_emp,RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp',
			A.cod_ele, RTRIM(C.des_ele) AS 'des_ele', A.Talla,
			--Campos para comparar con los nuevos
			D.cod_emp as 'T.cod_emp', D.Talla as 'T.Talla', IIF(D.cod_emp IS NULL,'Nuevo Registro','Registro Modificado') as TipoCambio 
			--===================================
			FROM GTH_portal_DotaTallaEmplea A INNER JOIN rhh_emplea B on B.cod_emp=A.cod_emp
				LEFT JOIN GTH_DotaEle C on A.cod_ele=C.cod_ele
					LEFT JOIN GTH_DotaTallaEmplea D on D.cod_emp = A.cod_emp and D.cod_ele = A.cod_ele 
					WHERE A.cod_emp=RTRIM(@cod_emp)
	END

	ELSE IF (@opc='B') --Borrar cambios de portal cuando se han revisado todos
	BEGIN
			DELETE FROM GTH_portal_DotaTallaEmplea WHERE cod_emp=@cod_emp AND cod_ele=@cod_ele 

			--para anular el trámite en el historial cuando el empleado borra el registro
			UPDATE prt_Portal_Historial_Dotacion SET cod_estado=4, fec_proceso=GETDATE(), motivo='Anulado por el empleado'   
			 WHERE cod_emp=@cod_emp and cod_ele=@cod_ele AND tipo_cambio=1 and cod_estado=1
	END

END




```
