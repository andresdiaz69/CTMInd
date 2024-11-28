# Stored Procedure: sp_sst_ConsultaAutorizaciones

## Usa los objetos:
- [[gen_compania]]
- [[SST_NivAprobDetAprob]]
- [[V_SST_NivAprobItems]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 25/03/2020
-- Description:	Consulta las autorizaciones de items de SST.
-- =============================================

CREATE PROCEDURE [dbo].[sp_sst_ConsultaAutorizaciones]
	@cod_cia  CHAR(3)       = NULL,
	@cod_item CHAR(3)       = NULL,
	@usuario  NVARCHAR(128)

--WITH ENCRYTPION
AS
BEGIN

	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	DECLARE @table TABLE(
		cod_cia CHAR(3),
		nom_cia CHAR(200),
		cod_item CHAR(3),
		des_item VARCHAR(200),
		llave VARCHAR(100),
		ord_aprob INT
	);

	DECLARE @niveles_aprobados TABLE(ord_aprob INT, cod_item CHAR(3), llave VARCHAR(100));
	
	INSERT INTO @niveles_aprobados
	SELECT (MAX(ord_aprob) + 1) AS ord_aprob, cod_item, llave
	FROM SST_NivAprobDetAprob
	WHERE ind_aprob = 1
	GROUP BY cod_item, llave
	UNION
	SELECT MIN(ord_aprob) AS ord_aprob, cod_item, llave
	FROM SST_NivAprobDetAprob
	WHERE ind_aprob = 0
	GROUP BY cod_item, llave;
	
	DECLARE @orden_actual TABLE(ord_aprob INT, cod_item CHAR(3), llave VARCHAR(100));
	
	INSERT INTO @orden_actual
	SELECT MAX(ord_aprob), cod_item, llave 
	FROM @niveles_aprobados 
	GROUP BY cod_item, llave;

	INSERT INTO @table
	SELECT A.cod_cia, B.nom_cia, A.cod_item, C.des_item, A.llave, A.ord_aprob
	FROM   SST_NivAprobDetAprob AS A
    INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
	INNER JOIN V_SST_NivAprobItems AS C ON A.cod_item = C.cod_item
	INNER JOIN @orden_actual AS D ON A.cod_item = D.cod_item AND A.llave = D.llave AND A.ord_aprob = D.ord_aprob
	WHERE A.ind_aprob = '0'
	  AND A.usu_emp = @usuario;
	  
	
	IF @cod_cia IS NOT NULL
	BEGIN
		DELETE FROM @table
		WHERE llave NOT LIKE CONCAT(RTRIM(@cod_cia), '*%');
	END

	IF @cod_item IS NOT NULL
	BEGIN
		DELETE FROM @table
		WHERE cod_item <> @cod_item;
	END

	SELECT cod_cia, nom_cia, cod_item, des_item, llave 
	FROM @table;
END

```
