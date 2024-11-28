# Stored Procedure: sp_portal_rhh_empleado_RedSocial_modif

## Usa los objetos:
- [[gen_usuarios]]
- [[GTH_EmpRedSocial]]
- [[GTH_portal_EmpRedSocial]]
- [[prt_Portal_Historial_RedSocial]]

```sql


-- ===============================================================================================
-- Author:		Yeinny Garzón
-- Create date: 29 May 2014
-- Description:	Procedimiento para obtener las redes sociales a las que pertenece el empleado

-- SRS2020-0396
-- Modified by: Alexander Vargas
-- MOdified date: 04-05-2020
-- Description: se agrega parametro estado por compatibilidad con el cambio en el procedimiento anterior
--				al editar el registro se envia el campo estado aunque en este procedimiento no se requiera.

--Modify by:	Alexander Vargas
--Modify date:	07/01/2020
--Description:	Se agrega validacion para cuando los datos son iguales y el
--				empleado no realiza cambios

--SPA Estado autorizacion HV
-- Modificado: 27/04/2023
-- Modificado por: Alexander Vargas
-- Comentario: cuando no hay cambios borrar el registro y en el historial
--  lo deja con estado 4 (anulado)
-- ===============================================================================================

CREATE PROCEDURE [dbo].[sp_portal_rhh_empleado_RedSocial_modif]
	@loginEmplea	NVARCHAR(20),
	@cod_redsoc		INT,
	@usuario		VARCHAR(100),
	@estado			VARCHAR(100)=NULL

--WITH ENCRYPTION

AS
BEGIN
	DECLARE @cod_Emp CHAR(12)
	
	SELECT @cod_Emp=cod_emp FROM gen_usuarios WHERE RTRIM(log_usu) LIKE @loginEmplea
	
	
	IF(NOT EXISTS(SELECT PERS.cod_emp FROM GTH_portal_EmpRedSocial PERS WHERE PERS.cod_emp=@cod_Emp AND RTRIM(PERS.cod_redsoc)=RTRIM(@cod_redsoc)))
		BEGIN

	   --Si existe en Enterprise es una modificación en caso contrario es un idioma nuevo
	   IF EXISTS(SELECT * FROM GTH_EmpRedSocial WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_redsoc) = RTRIM(@cod_redsoc))
		  BEGIN
			 INSERT INTO GTH_portal_EmpRedSocial (cod_emp,cod_redsoc,usuario,tipo_cambio)
			VALUES (@cod_Emp,@cod_redsoc,@usuario,2)
		  END
	   ELSE
		  BEGIN
			 INSERT INTO GTH_portal_EmpRedSocial (cod_emp,cod_redsoc,usuario,tipo_cambio,cod_estado)
			VALUES (@cod_Emp,@cod_redsoc,@usuario,1,1)
		  END

			
		END
		ELSE
		BEGIN
			UPDATE GTH_portal_EmpRedSocial
			SET	
				usuario = @usuario,tipo_cambio=2
			WHERE cod_emp=@cod_Emp AND RTRIM(cod_redsoc)=RTRIM(@cod_redsoc)
		END

			--Si los registros son iguales entonces lo elimna de la tabla de portal para que
	 --no se muestre como un cambio pendiente

		IF NOT EXISTS (SELECT cod_emp, cod_redsoc, usuario 
			FROM GTH_portal_EmpRedSocial 
			WHERE cod_emp=@cod_Emp AND cod_redsoc=@cod_redsoc AND usuario=@usuario 
			EXCEPT SELECT cod_emp, cod_redsoc, usuario 
		FROM GTH_EmpRedSocial WHERE cod_emp=@cod_Emp AND cod_redsoc=@cod_redsoc AND usuario=@usuario  )	
			BEGIN
				DELETE GTH_portal_EmpRedSocial WHERE cod_emp=@cod_Emp AND cod_redsoc=@cod_redsoc 

				--despues de borrar cambia el estado a anulado en el historial
				IF EXISTS(SELECT * FROM prt_Portal_Historial_RedSocial 
				WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_redsoc) = RTRIM(@cod_redsoc)  and cod_estado=1)
				BEGIN
				    UPDATE prt_Portal_Historial_RedSocial 
				        SET cod_estado=4, motivo='Anulado por el empleado',fec_proceso=GETDATE() 
				    WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_redsoc) = RTRIM(@cod_redsoc)  and cod_estado=1
				END
			END

END

```
