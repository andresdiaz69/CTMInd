# Stored Procedure: sp_sst_NivelesAprobacion

## Usa los objetos:
- [[gen_compania]]
- [[SST_NivAprob]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 23/03/2020
-- Description: Inserta, Edita, Consulta, Elimina los Niveles de aprobación.
-- =============================================

CREATE PROCEDURE [dbo].[sp_sst_NivelesAprobacion]
	@niv_aprob CHAR(6) = NULL,
	@des_niv VARCHAR(200) = NULL,
	@ind_cia BIT = NULL,
	@cod_cia CHAR(3) = NULL,
	@orden INT = NULL,
	@ind_desact BIT = NULL,
	@ind_desact_ant BIT = NULL,
	@ind_funcionamiento INT /* 1 - Insercion, 2 - Edición, 3 - Eliminación, 4 - Consultar Especifico, 5 - Consultar Todos*/
--WITH ENCRYTPION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	DECLARE @msg VARCHAR(200);

	IF @ind_funcionamiento = 1
	BEGIN
		IF @ind_cia = 0 AND
		   EXISTS (SELECT orden FROM SST_NivAprob WHERE orden = @orden AND ind_cia = 1 AND cod_cia = 0 AND ind_desact = 0)
		BEGIN
			SET @msg = CONCAT('Ya existe un nivel de orden: ', CONVERT(VARCHAR, @orden), ' que aprueba a todas las compañias.')
			RAISERROR (@msg, 16, 1);
		END
		ELSE 
		IF @ind_cia = 1 AND
		   EXISTS (SELECT orden FROM SST_NivAprob WHERE orden = @orden AND ind_cia = 0 AND ind_desact = 0)
		BEGIN
			SET @msg = CONCAT('Ya existe un nivel de orden: ', CONVERT(VARCHAR, @orden), ' para una compañía especifica.')
			RAISERROR (@msg, 16, 1);
		END
		ELSE 
		IF EXISTS (SELECT orden FROM SST_NivAprob WHERE orden = @orden AND cod_cia = @cod_cia)
		BEGIN
			RAISERROR ('Ya existe un nivel de aprobación para la compañía y orden especificados.', 16, 1);
		END
		ELSE
		BEGIN
			INSERT INTO SST_NivAprob(niv_aprob, des_niv, ind_cia, cod_cia, orden, ind_desact)
			VALUES (@niv_aprob, @des_niv, @ind_cia, @cod_cia, @orden, @ind_desact);
		END
	END

	ELSE IF @ind_funcionamiento = 2
	BEGIN
		SELECT @ind_desact_ant = ind_desact, @ind_cia = ind_cia FROM SST_NivAprob WHERE niv_aprob = @niv_aprob AND cod_cia = @cod_cia;

		IF @ind_desact_ant = @ind_desact OR @ind_desact = 1
		BEGIN
			UPDATE SST_NivAprob 
			SET des_niv = @des_niv, orden = @orden, ind_desact = @ind_desact
			WHERE niv_aprob = @niv_aprob AND cod_cia = @cod_cia;
		END
		ELSE IF @ind_desact = 0 
		BEGIN
			IF @ind_cia = 1 AND EXISTS (SELECT ind_desact FROM SST_NivAprob WHERE orden = @orden AND ind_cia = 0 AND ind_desact = 0)
			BEGIN
				RAISERROR ('No se puede activar el nivel ya que existe un nivel con el mismo orden asignado para una compañía específica.', 16, 1);
			END
			ELSE IF @ind_cia = 0 AND EXISTS (SELECT ind_desact FROM SST_NivAprob WHERE orden = @orden AND ind_cia = 1 AND cod_cia = '0' AND ind_desact = 0)
			BEGIN
				RAISERROR ('No se puede activar el nivel ya que existe un nivel con el mismo orden asignado para todas las compañías.', 16, 1);
			END
			ELSE
			BEGIN
				UPDATE SST_NivAprob 
				SET des_niv = @des_niv, orden = @orden, ind_desact = @ind_desact
				WHERE niv_aprob = @niv_aprob AND cod_cia = @cod_cia;
			END
		END
	END

	ELSE IF @ind_funcionamiento = 3
	BEGIN
		DELETE FROM SST_NivAprob
		WHERE niv_aprob = @niv_aprob
		  AND cod_cia = @cod_cia; 
	END

	ELSE IF @ind_funcionamiento = 4
	BEGIN
		SELECT des_niv, ind_cia, orden, ind_desact
		FROM SST_NivAprob
		WHERE niv_aprob = @niv_aprob
		  AND cod_cia = @cod_cia;
	END

	ELSE IF @ind_funcionamiento = 5
	BEGIN
		SELECT niv_aprob, des_niv, ind_cia, A.cod_cia, B.nom_cia, orden, ind_desact
		FROM SST_NivAprob AS A
		INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
		ORDER BY A.niv_aprob;
	END
END

```
