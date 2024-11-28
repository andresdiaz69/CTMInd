# Stored Procedure: sp_sst_EnviarAprobacion

## Usa los objetos:
- [[SST_CronogramaInspecciones]]
- [[SST_MatrizLegalEnc]]
- [[SST_NivAprobDetAprob]]
- [[SST_ObjetivoGral]]
- [[SST_PlanAnualCapac]]
- [[SST_PlanAnualTrabajo]]
- [[SST_PlanEmergencia]]
- [[SST_Politica]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 10/02/2021
-- Description: Consulta si el item ya se encuentra aprobado o pendiente de aprobación.
-- =============================================

CREATE PROCEDURE [dbo].[sp_sst_EnviarAprobacion]
	@llave VARCHAR(100),
	@cod_item CHAR(3)
--WITH ENCRYTPION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	/* Si existe el detalle de la aprobación */
	IF (SELECT COUNT(llave)
		FROM SST_NivAprobDetAprob
		WHERE cod_item = @cod_item
			AND llave = @llave) > 0
	BEGIN
		/* Si todos los detalles están pendientes de aprobación */
		IF (SELECT COUNT(llave)
			FROM SST_NivAprobDetAprob
			WHERE cod_item = @cod_item
			  AND llave = @llave
			  AND ind_aprob <> '0') = 0
		BEGIN
			SELECT CONVERT(BIT,0) AS 'mostrar_boton';
		END
		/* Si el último nivel aprobado está pendiente de aprobación */
		ELSE IF (SELECT ind_aprob 
				 FROM SST_NivAprobDetAprob 
				 WHERE llave = @llave AND cod_item = @cod_item AND ord_aprob = (SELECT MAX(ord_aprob) 
																				FROM SST_NivAprobDetAprob
																				WHERE ind_aprob <> '0'
																					AND cod_item = @cod_item
																					AND llave = @llave
																				GROUP BY llave)) = '2'
		BEGIN
			SELECT CONVERT(BIT,1) AS 'mostrar_boton';
		END
		ELSE
		/* Si el último esta aprobado */
		BEGIN
			SELECT CONVERT(BIT,0) AS 'mostrar_boton';
		END
	END
	/* Si no existe detalle de aprobación */
	ELSE IF @cod_item = '001' AND (SELECT TOP(1) cod_est_apro
							  FROM SST_ObjetivoGral
							  WHERE CONCAT(RTRIM(LTRIM(cod_cia)), '*', RTRIM(LTRIM(anio_obj_gral))) = @llave) = 2
	BEGIN
		SELECT CONVERT(BIT,0) AS 'mostrar_boton';
	END
	ELSE IF @cod_item = '002' AND (SELECT TOP(1) cod_est_apro
							  FROM SST_Politica
							  WHERE CONCAT(RTRIM(LTRIM(cod_cia)), '*', RTRIM(LTRIM(cod_polit))) = @llave) = 2
	BEGIN
		SELECT CONVERT(BIT,0) AS 'mostrar_boton';
	END
	ELSE IF @cod_item = '003' AND (SELECT TOP(1) cod_est_apro
							  FROM SST_PlanEmergencia
							  WHERE CONCAT(RTRIM(LTRIM(cod_cia)), '*', RTRIM(LTRIM(cod_plan_emerg)), '*', RTRIM(LTRIM(cod_ClasPlanEme))) = @llave) = 2
	BEGIN
		SELECT CONVERT(BIT,0) AS 'mostrar_boton';
	END
	ELSE IF @cod_item = '004' AND (SELECT TOP(1) cod_est_apro
							  FROM SST_PlanAnualTrabajo
							  WHERE CONCAT(RTRIM(LTRIM(cod_cia)), '*', RTRIM(LTRIM(anio)), '*', RTRIM(LTRIM(version)),'*', RTRIM(LTRIM(cod_suc)),'*', RTRIM(LTRIM(cod_cli))) = @llave) = 2
	BEGIN
		SELECT CONVERT(BIT,0) AS 'mostrar_boton';
	END
	ELSE IF @cod_item = '005' AND (SELECT TOP(1) cod_est_apro
								   FROM SST_PlanAnualCapac
								   WHERE CONCAT(RTRIM(LTRIM(cod_cia)), '*', RTRIM(LTRIM(anio)), '*', RTRIM(LTRIM(version)),'*', RTRIM(LTRIM(cod_suc)),'*', RTRIM(LTRIM(cod_cli))) = @llave) = 2
	BEGIN
		SELECT CONVERT(BIT,0) AS 'mostrar_boton';
	END
	ELSE IF @cod_item = '007' AND (SELECT TOP(1) cod_est_apro
								   FROM SST_MatrizLegalEnc
								   WHERE CONCAT(RTRIM(LTRIM(cod_cia)), '*', RTRIM(LTRIM(version))) = @llave) = 2
	BEGIN
		SELECT CONVERT(BIT,0) AS 'mostrar_boton';
	END
	ELSE IF @cod_item = '008' AND (SELECT TOP(1) cod_est_apro
								   FROM SST_CronogramaInspecciones
								   WHERE CONCAT(RTRIM(LTRIM(cod_cia)), '*', RTRIM(LTRIM(anio)), '*', RTRIM(LTRIM(version)), '*', RTRIM(LTRIM(CONVERT(CHAR,cons))), '*', RTRIM(LTRIM(cod_suc)), '*', RTRIM(LTRIM(cod_cli))) = @llave) = 2
	BEGIN
		SELECT CONVERT(BIT,0) AS 'mostrar_boton';
	END
	ELSE
	BEGIN
		SELECT CONVERT(BIT,1) AS 'mostrar_boton';
	END
END

```
