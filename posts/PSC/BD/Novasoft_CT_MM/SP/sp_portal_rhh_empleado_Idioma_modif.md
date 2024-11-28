# Stored Procedure: sp_portal_rhh_empleado_Idioma_modif

## Usa los objetos:
- [[gen_usuarios]]
- [[prt_Portal_Historial_Idiomas]]
- [[rhh_idioma]]
- [[rhh_portal_idioma]]

```sql


-- =============================================
-- Author:		David Alarcon
-- Create date: 10-08-2011
-- Description:	Procedimiento para obtener los Familiares del empleado

--Modify by:	Alexander Vargas
--Modify date:	26/01/2021
--Description:	Se agrega validacion para cuando los datos son iguales y el
--				empleado no realiza cambios

--Modify by:	Alexander Vargas
--Modify date:	08/04/2021
--Description:	Se quita el campo cod_hab porque no 
--				se llena en portal y en la comparacion puede 
--				estar diferente, nulo en una tabla y 0 en otra

--SPA Estado autorizacion HV
-- Modificado: 30-03-2023
-- Modificado por: Alexander Vargas
-- Comentario: cuando no hay cambios borrar el registro y en el historial
--  lo deja con estado 4 (anulado)

--SNR2023-0161 Estructura historial cambios HV
-- Modificado: 15/06/2023
-- Modificado por: Alexander Vargas
-- Comentario: se agrega fecha proceso en el anulado

-- =============================================
CREATE PROCEDURE [dbo].[sp_portal_rhh_empleado_Idioma_modif]
	@loginEmplea NVARCHAR(20),
	@cod_idi CHAR(3),
	@cod_calif CHAR(2)
	
	--WITH ENCRYPTION
AS
BEGIN
	DECLARE @cod_Emp CHAR(12)
	
	SELECT @cod_Emp=cod_emp FROM gen_usuarios WHERE RTRIM(log_usu) LIKE @loginEmplea
	
	IF NOT EXISTS (SELECT RTRIM(ip.cod_emp) FROM rhh_portal_idioma ip WHERE RTRIM(ip.cod_emp) = RTRIM(@cod_Emp) AND RTRIM(ip.cod_idi) = RTRIM(@cod_idi))
	BEGIN
	   --Si existe en Enterprise en una modificación en caso contrario es un idioma nuevo
	   IF EXISTS(SELECT * FROM rhh_idioma WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_idi) = RTRIM(@cod_idi))
		  BEGIN
			 INSERT INTO rhh_portal_idioma (cod_emp, cod_idi, cod_calif,tipo_cambio)
			 VALUES (@cod_Emp,@cod_idi,@cod_calif,2)
		  END
	   ELSE
		  BEGIN
			 INSERT INTO rhh_portal_idioma (cod_emp, cod_idi, cod_calif,tipo_cambio)
			 VALUES (@cod_Emp,@cod_idi,@cod_calif,1)
		  END
	END
	ELSE
	BEGIN 
		UPDATE rhh_portal_idioma
		SET cod_emp = @cod_Emp,
			cod_idi = @cod_idi, 
			cod_calif = @cod_calif,
			tipo_cambio=2
		WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_idi) = RTRIM(@cod_idi)
	END


	--Si los registros son iguales entonces lo elimna de la tabla de portal para que
	 --no se muestre como un cambio pendiente

		IF NOT EXISTS (SELECT cod_emp, cod_idi, cod_calif--,cod_hab  
			FROM rhh_portal_idioma 
			WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_idi) = RTRIM(@cod_idi) 
			EXCEPT SELECT cod_emp, cod_idi, cod_calif--,cod_hab  
		FROM rhh_idioma WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_idi) = RTRIM(@cod_idi)  )	
			BEGIN
				DELETE rhh_portal_idioma WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_idi) = RTRIM(@cod_idi) 

				IF EXISTS(SELECT * FROM prt_Portal_Historial_Idiomas 
				WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_idi) = RTRIM(@cod_idi)  and cod_estado=1)
				BEGIN
				    UPDATE prt_Portal_Historial_Idiomas 
				    SET cod_estado=4, motivo='Anulado por el empleado',fec_proceso=GETDATE()
				    WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_idi) = RTRIM(@cod_idi)  and cod_estado=1
				END
			END




END

```
