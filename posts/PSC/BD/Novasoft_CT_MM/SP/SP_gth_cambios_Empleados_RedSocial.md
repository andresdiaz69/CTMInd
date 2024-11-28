# Stored Procedure: SP_gth_cambios_Empleados_RedSocial

## Usa los objetos:
- [[GTH_EmpRedSocial]]
- [[GTH_portal_EmpRedSocial]]
- [[gth_portal_hdvempleado_rechazos]]
- [[GTH_RedesSociales]]
- [[GTH_RptEmpRedSocial]]
- [[prt_Portal_Historial_RedSocial]]
- [[rhh_emplea]]

```sql




-- =============================================
-- Author:		Yeinny Garzón
-- Create date: 03 Jun 2014
-- Description:	Obtiene y autoriza los cambios para la informacion de Redes Sociales del empleado
-- Modificado por: Alexander Vargas
-- Fecha modificado: 22-Jul-2015
-- Cambio: en el condicional se cambió el nombre de la tabla GTH_portal_EmpRedSocial por  GTH_EmpRedSocial
-- El condicional debe revisar si el cambio ya existe en la tabla de Enterprise, en este 
-- caso la tabla GTH_EmpRedSocial.

-- Modificado: 11-Ago-2016
-- Modificado por: Alexander Vargas
-- Comentario: se agrega estado Autorizado o Rechazado en la tabla de gth_portal_hdvempleado_rechazos
-- el valor se agrega al autorizar y también al rechazar

-- Modificado: 11-Ago-2016
-- Modificado por: Alexander Vargas
-- Comentario: se agrega estado Autorizado o Rechazado en la tabla de gth_portal_hdvempleado_rechazos
-- el valor se agrega al autorizar y también al rechazar

-- Modificado: 22-06-2022
-- Modificado por: Alexander Vargas
-- Comentario: se modifica el nombre de la sección y se agrega la columna campo 
-- con el valor Nuevo - Registro completo

-- SPA Estado autorización HV
-- Modificado: 24-04-2023
-- Modificado por: Alexander Vargas
-- Comentario: al actualizar o rechazar se registra el estado en GTH_portal_EmpRedSocial

-- =============================================
CREATE PROCEDURE [dbo].[SP_gth_cambios_Empleados_RedSocial]
	@cod_emp	CHAR(12) = NULL,
	@cod_RedSoc CHAR(3) = NULL, 
	@opc		CHAR(2),	--A:Cambio de info Autorizado para cod_emp 
							--N:Cambio de info Negado para cod_emp
							--C:Consultar todos los cambios pendientes
	@motivo		varchar(500) = '.'
--WITH ENCRYPTION	
AS

BEGIN
	IF(@opc='A')
	BEGIN
		IF(EXISTS (SELECT cod_emp,cod_redsoc FROM GTH_EmpRedSocial A WHERE A.cod_emp=@cod_emp AND A.cod_redsoc=@cod_RedSoc))
		BEGIN
			UPDATE A
			SET  A.cod_emp=@cod_emp, A.cod_redsoc=@cod_RedSoc, A.usuario = B.usuario
			FROM GTH_EmpRedSocial A, GTH_portal_EmpRedSocial B
			WHERE A.cod_emp=@cod_emp AND B.cod_emp=@cod_emp AND A.cod_redsoc=@cod_RedSoc AND B.cod_redsoc=@cod_RedSoc
			
			UPDATE GTH_portal_EmpRedSocial SET cod_estado=2 
			WHERE cod_emp=@cod_emp AND cod_redsoc=cod_redsoc and cod_estado=1

			INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado) VALUES (@cod_emp, 'Redes sociales', @motivo,'Aprobado')
			DELETE FROM GTH_portal_EmpRedSocial WHERE cod_emp=@cod_emp AND cod_redsoc=cod_redsoc
		END
		ELSE
		BEGIN
			INSERT INTO GTH_EmpRedSocial(cod_emp, cod_redsoc, usuario)
				SELECT  cod_emp, cod_redsoc, usuario
				FROM    GTH_portal_EmpRedSocial B
				WHERE	B.cod_emp=@cod_emp AND B.cod_redsoc=@cod_RedSoc

				--cambia el estado a aprobado para disparar el trigger y actualizar el historial
				UPDATE GTH_portal_EmpRedSocial SET cod_estado=2 
				WHERE cod_emp=@cod_emp AND cod_redsoc=cod_redsoc and cod_estado=1
				
				INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado,campo) VALUES (@cod_emp, 'Redes sociales', @motivo,'Aprobado','Nuevo - Registro completo')
			DELETE FROM GTH_portal_EmpRedSocial WHERE cod_emp=@cod_emp AND cod_redsoc=@cod_RedSoc
		END
	END
	ELSE IF (@opc='N')
	BEGIN
	--cambia el estado a rechazado para disparar el trigger y actualizar el historial
		UPDATE GTH_portal_EmpRedSocial SET cod_estado=3 
		WHERE cod_emp=@cod_emp AND cod_redsoc=cod_redsoc and cod_estado=1

		DELETE FROM GTH_portal_EmpRedSocial WHERE cod_emp=@cod_emp AND cod_redsoc=@cod_RedSoc
		INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado,campo) VALUES (@cod_emp, 'Redes sociales', @motivo,'Rechazado','Nuevo - Registro completo')
	END
	ELSE IF (@opc='C')
	BEGIN

		SET @cod_emp= ISNULL(@cod_emp,'%')

		SELECT A.cod_emp, A.cod_redsoc, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', C.nom_redsoc, A.usuario,
		--Campos para comparar con los nuevos
		D.cod_emp as 'T.cod_emp', D.cod_redsoc as 'T.cod_redSocial', D.usuario AS 'T.usuario', IIF(D.cod_emp IS NULL,'Nuevo','') as TipoCambio 
		--===================================
		FROM GTH_portal_EmpRedSocial A 
			INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp
			LEFT JOIN GTH_RedesSociales C ON C.cod_redsoc = A.cod_redsoc
			LEFT JOIN GTH_EmpRedSocial D ON A.cod_emp = D.cod_emp AND A.cod_redsoc = D.cod_redsoc
			LEFT JOIN GTH_RptEmpRedSocial E ON A.cod_emp = E.cod_emp AND A.cod_redsoc = E.cod_redsoc
		WHERE A.cod_emp LIKE RTRIM(@cod_emp)
	END

	ELSE IF (@opc='B')
	BEGIN
		DELETE FROM GTH_portal_EmpRedSocial WHERE cod_emp=@cod_emp AND cod_redsoc=@cod_RedSoc
		
		--Para cuando se elimina desde portal
		 UPDATE prt_Portal_Historial_RedSocial SET cod_estado=4, fec_proceso=GETDATE(), motivo='Anulado por el empleado'   
		where cod_emp=@cod_emp and cod_redsoc=@cod_RedSoc AND tipo_cambio=1 and cod_estado=1

		INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado,campo) VALUES (@cod_emp, 'Redes sociales', @motivo,'Rechazado','Nuevo - Registro completo')
	END

END


```
