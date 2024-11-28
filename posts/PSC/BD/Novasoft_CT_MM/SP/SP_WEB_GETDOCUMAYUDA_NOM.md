# Stored Procedure: SP_WEB_GETDOCUMAYUDA_NOM

## Usa los objetos:
- [[fn_sis_GetUsuActual]]
- [[fn_web_GruposUsu]]
- [[gen_configtipo]]
- [[gen_permisos]]
- [[gen_subtipodoc]]
- [[nom_cabdoc]]
- [[nom_cabdoc_GTemp]]

```sql
-- ======================================================================================
-- Author: Viviana Solano
-- Create date: Septiembre 2 de 2019
-- Description: Copia del procedimiento SP_WEB_GETDOCUMAYUDA 
--			 Para ser utilizado en WEBFORM del manejo de documentos Nomina
--			 Para los subtipos 803 - 804 -805-809-810
-- ======================================================================================
CREATE PROCEDURE [dbo].[SP_WEB_GETDOCUMAYUDA_NOM]
	@ano  VARCHAR(4),
	@per  VARCHAR(2),
	@sub  VARCHAR(10),
	@num  VARCHAR(14),
	@apl  VARCHAR(3),
	@temp BIT         = 0
AS
BEGIN
    SET NOCOUNT ON;

    SELECT cod_sub,
		 b.cod_tip,
		 nom_sub
    INTO #t_subtips
    FROM gen_subtipodoc AS a
    INNER JOIN gen_configtipo AS b ON a.cod_tip = b.cod_tip
    INNER JOIN gen_permisos AS p ON a.cod_sub = p.cod_per
    WHERE b.cod_apl = @apl
		AND cod_sub > '802'
		AND cod_sub < '811'
		AND tip_per = 'T'
		AND ind_mod = 1
		AND cod_gru IN( SELECT *
					 FROM dbo.fn_web_GruposUsu( dbo.fn_sis_GetUsuActual() ) );

    IF @temp = 0
    BEGIN
	   SELECT ano_doc,
			per_doc,
			sub_tip,
			num_doc
	   FROM nom_cabdoc AS C WITH(NOLOCK)
	   INNER JOIN #t_subtips AS ST ON ST.cod_sub = C.sub_tip
	   WHERE ano_doc = @ano AND per_doc LIKE @per AND sub_tip LIKE @sub AND num_doc LIKE @num
	   ORDER BY per_doc,
			  sub_tip,
			  num_doc;
    END;
    IF @temp = 1
    BEGIN
	   SELECT ano_doc,
			per_doc,
			sub_tip,
			num_doc,
			des_doc
	   FROM nom_cabdoc_GTemp AS C WITH(NOLOCK)
	   INNER JOIN #t_subtips AS ST ON ST.cod_sub = C.sub_tip
	   WHERE ano_doc = @ano AND per_doc LIKE @per AND sub_tip LIKE @sub AND num_doc LIKE @num
	   ORDER BY per_doc,
			  sub_tip,
			  num_doc;
    END;
END;


```
