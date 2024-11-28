# Stored Procedure: sp_portal_rhh_empleado_Dotacion_modif

## Usa los objetos:
- [[gen_usuarios]]
- [[GTH_DotaTallaEmplea]]
- [[GTH_portal_DotaTallaEmplea]]
- [[prt_Portal_Historial_Dotacion]]

```sql





-- =============================================
-- Author:		David Alarcon
-- Create date: 10-08-2011
-- Description:	Procedimiento para obtener las tallas para dotacion del empleado

--SRS2020-1385 Autorización dotación
--Modify by:	Alexander Vargas
--Modify date:	30/12/2020
--Description:	Si la talla llega en nulo se convierte en ''

--Modify by:	Alexander Vargas
--Modify date:	07/01/2020
--Description:	Se agrega validacion para cuando los datos son iguales y el
--				empleado no realiza cambios

--Modify by:	Alexander Vargas
--Modify date:	26/04/2020
--Description:	Ajuste para cuando hay nulo en Enterprise y Portal tiene
--				valor ''

-- SPA Estado autorización HV
-- Modificado: 03/05/2023
-- Modificado por: Alexander Vargas
-- Comentario: al actualizar o rechazar se registra el estado en GTH_portal_DotaTallaEmplea

-- =============================================
CREATE PROCEDURE [dbo].[sp_portal_rhh_empleado_Dotacion_modif]
	@loginEmplea NVARCHAR(20),
	@cod_ele CHAR(5),
	@talla VARCHAR(10)

--WITH ENCRYPTION
AS
BEGIN
	DECLARE @cod_Emp CHAR(12)
	
	SELECT @cod_Emp=cod_emp FROM gen_usuarios WHERE RTRIM(log_usu) LIKE @loginEmplea
	
	SET @talla=ISNULL(@talla,'')

	IF(NOT EXISTS(SELECT dpe.Talla FROM GTH_portal_DotaTallaEmplea dpe WHERE dpe.cod_emp=@cod_Emp AND RTRIM(dpe.cod_ele)=RTRIM(@cod_ele)))
		BEGIN
		--Si no existe en Portal es una modificación (solo de puede cambiar talla de 
		--dotación, no incluir una nueva)
		
			INSERT INTO GTH_portal_DotaTallaEmplea (cod_emp,cod_ele,Talla,tipo_cambio)
			VALUES (@cod_Emp,@cod_ele,@talla,2)
		END
		ELSE
		BEGIN
			UPDATE GTH_portal_DotaTallaEmplea
			SET
			Talla=@talla
			WHERE cod_emp=@cod_Emp AND RTRIM(cod_ele)=RTRIM(@cod_ele)
		END

	 --Si los registros son iguales entonces lo elimna de la tabla de portal para que
	 --no se muestre como un cambio pendiente
	 IF NOT EXISTS (SELECT dpe.Talla FROM GTH_portal_DotaTallaEmplea dpe 
	 WHERE dpe.cod_emp=@cod_Emp AND RTRIM(dpe.cod_ele)=RTRIM(@cod_ele) 
						 EXCEPT SELECT ISNULL(dpe.Talla,'') AS Talla FROM GTH_DotaTallaEmplea dpe 
	 WHERE dpe.cod_emp=@cod_Emp AND RTRIM(dpe.cod_ele)=RTRIM(@cod_ele) 
	 )
						
			BEGIN
				DELETE GTH_portal_DotaTallaEmplea WHERE cod_emp=@cod_Emp AND cod_ele=@cod_ele 

				--despues de borrar cambia el estado a anulado en el historial
				IF EXISTS(SELECT * FROM prt_Portal_Historial_Dotacion 
				WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_ele) = RTRIM(@cod_ele)  and cod_estado=1)
				BEGIN
				    UPDATE prt_Portal_Historial_Dotacion 
				    SET cod_estado=4, fec_proceso=GETDATE(), motivo='Anulado por el empleado'
				    WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp) AND RTRIM(cod_ele) = RTRIM(@cod_ele)  and cod_estado=1
				END
			END	
END



```
