# Stored Procedure: sp_sst_MatrizLegalEnc

## Usa los objetos:
- [[GTH_NivAprobUsuarios]]
- [[gth_vargen]]
- [[SST_MatrizLegalEnc]]
- [[SST_NivAprob]]
- [[SST_NivAprobDetAprob]]
- [[SST_NivAprobEmpItems]]
- [[SST_NivAprobEmplea]]

```sql

-- =============================================
-- Author:		Marco Lara
-- Create date: Septienbre 2021
-- Description:	Actualiza la tabla de autorizaciones de SST
-- =============================================
CREATE PROCEDURE [dbo].[sp_sst_MatrizLegalEnc] 
	@cod_cia		CHAR(3),
	@version		VARCHAR(10)
AS 
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE @llave VARCHAR(100);
	DECLARE	@MIN INT = 1;
	DECLARE @MAX INT;
	DECLARE @act_aprob NVARCHAR(MAX); --Indicador de activación de aprobaciones.
	DECLARE @Tabla TABLE
	(
		ID		INT IDENTITY,
		cod_cia	CHAR(3),
		version	VARCHAR(10),
		llave	VARCHAR(100)
	);

	SELECT @act_aprob = val_var 
	FROM gth_vargen 
	WHERE num_var = 20;

	INSERT INTO @Tabla
	SELECT @cod_cia,
		   @version,
		   CONCAT(RTRIM(LTRIM(@cod_cia)), '*', RTRIM(LTRIM(@version))) 

	SELECT @MAX = COUNT(1) FROM @Tabla;

	WHILE @MIN <= @MAX
	BEGIN
		SELECT	@cod_cia = cod_cia,
				@llave = llave,
				@version = version
		FROM	@Tabla
		WHERE	ID = @MIN;

		IF EXISTS(SELECT N.cod_cia, N.niv_aprob, N.cod_item, @llave, U.usu_emp, N.cod_emp, '0', NA.orden, NULL
				  FROM	 SST_NivAprobEmpItems AS N
				  INNER	JOIN SST_NivAprobEmplea AS NE  ON N.niv_aprob = NE.niv_aprob
				  		 AND N.cod_cia = NE.cod_cia 
						 AND N.cod_emp = NE.cod_emp
				  INNER	JOIN GTH_NivAprobUsuarios AS U ON N.cod_emp = U.cod_emp
				  INNER	JOIN SST_NivAprob AS NA ON N.niv_aprob = NA.niv_aprob
				  		 AND N.cod_cia = NA.cod_cia
				  WHERE	N.cod_cia = @cod_cia 
				    AND cod_item = '007'
				  	AND NA.ind_desact = 0 
					AND NE.ind_desact = 0)
			AND @act_aprob = 'SI'
		BEGIN
			INSERT INTO SST_NivAprobDetAprob(cod_cia, niv_aprob, cod_item, llave, usu_emp, cod_emp, ind_aprob, ord_aprob, obs_aprob)
			SELECT	N.cod_cia, N.niv_aprob, N.cod_item, @llave, U.usu_emp, N.cod_emp, '0', NA.orden, NULL
			FROM	SST_NivAprobEmpItems AS N
			INNER	JOIN SST_NivAprobEmplea AS NE  ON N.niv_aprob = NE.niv_aprob
					AND N.cod_cia = NE.cod_cia 
					AND N.cod_emp = NE.cod_emp
			INNER	JOIN GTH_NivAprobUsuarios AS U ON N.cod_emp = U.cod_emp
			INNER	JOIN SST_NivAprob AS NA ON N.niv_aprob = NA.niv_aprob
					AND N.cod_cia = NA.cod_cia
			WHERE	N.cod_cia = @cod_cia 
			        AND cod_item = '007'
					AND NA.ind_desact = 0 
					AND NE.ind_desact = 0;
		END
		ELSE
		BEGIN
			UPDATE SST_MatrizLegalEnc
			SET cod_est_apro = '2'
			WHERE cod_cia = @cod_cia
			  AND version = @version;
		END	

		SET @MIN = @MIN + 1;
	END
END

```
