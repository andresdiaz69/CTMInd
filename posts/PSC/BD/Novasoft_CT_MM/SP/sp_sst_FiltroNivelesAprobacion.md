# Stored Procedure: sp_sst_FiltroNivelesAprobacion

## Usa los objetos:
- [[gen_compania]]
- [[SST_NivAprob]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 23/03/2020
-- Description: Filtro para el botón de busqueda para el formulario de Niveles de Aprobación.
-- =============================================

CREATE PROCEDURE [dbo].[sp_sst_FiltroNivelesAprobacion]
	@ind_filtro INT,
	@valor_filtro VARCHAR(200)
--WITH ENCRYTPION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	IF @ind_filtro = 1
	BEGIN
		SELECT niv_aprob, des_niv, ind_cia, A.cod_cia, B.nom_cia, orden, ind_desact
		FROM SST_NivAprob AS A
		INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
		WHERE niv_aprob LIKE @valor_filtro;
	END
	
	ELSE IF @ind_filtro = 2
	BEGIN
		SELECT niv_aprob, des_niv, ind_cia, A.cod_cia, B.nom_cia, orden, ind_desact
		FROM SST_NivAprob AS A
		INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
		WHERE des_niv LIKE @valor_filtro;
	END 

	ELSE IF @ind_filtro = 3
	BEGIN
		SELECT niv_aprob, des_niv, ind_cia, A.cod_cia, B.nom_cia, orden, ind_desact
		FROM SST_NivAprob AS A
		INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
		WHERE ind_cia LIKE @valor_filtro;
	END 

	ELSE IF @ind_filtro = 4
	BEGIN
		SELECT niv_aprob, des_niv, ind_cia, A.cod_cia, B.nom_cia, orden, ind_desact
		FROM SST_NivAprob AS A
		INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
		WHERE A.cod_cia LIKE @valor_filtro;
	END 

	ELSE IF @ind_filtro = 5
	BEGIN
		SELECT niv_aprob, des_niv, ind_cia, A.cod_cia, B.nom_cia, orden, ind_desact
		FROM SST_NivAprob AS A
		INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
		WHERE B.nom_cia LIKE @valor_filtro;
	END 

	ELSE IF @ind_filtro = 6
	BEGIN
		SELECT niv_aprob, des_niv, ind_cia, A.cod_cia, B.nom_cia, orden, ind_desact
		FROM SST_NivAprob AS A
		INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
		WHERE orden LIKE @valor_filtro;
	END 

	ELSE IF @ind_filtro = 7
	BEGIN
		SELECT niv_aprob, des_niv, ind_cia, A.cod_cia, B.nom_cia, orden, ind_desact
		FROM SST_NivAprob AS A
		INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
		WHERE ind_desact LIKE @valor_filtro;
	END 
END

```
