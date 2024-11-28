# Stored Procedure: sp_rhh_AusentConsulta_NE

## Usa los objetos:
- [[fn_rhh_DiaAusentismo_Contrato]]
- [[fn_rhh_ValParmConv]]
- [[rhh_emplea]]
- [[rhh_pertlq]]
- [[RHH_TBTIPAUS]]

```sql


-- =============================================
-- Author:		Jorge Diaz Rev Diego Ortiz
-- Create date:	29/10/2021
-- Description:	Genera la cantidad de Días que corresponden a los tipos de 
--				ausentismo según el concepto utilizado
-- =============================================
-- EXEC sp_rhh_AusentConsulta_NE 'C200653','000010','20210831',774
CREATE PROCEDURE [dbo].[sp_rhh_AusentConsulta_NE]
	@codemp  CHAR(12),
	@CodCon  CHAR(6),
	@Fecliq  DATETIME,
	@CodCont INT

--WITH ENCRIPTYON
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @FecIni DATETIME;
    DECLARE @FecFin DATETIME;
    DECLARE @desde DATETIME;

    SET @desde = DATEADD(m, -1, DATEADD(d, 1, @Fecliq));

    SELECT @FECINI = MIN(fec_ini),
		 @FecFin = MAX(fec_fin)
    FROM rhh_emplea AS E
    INNER JOIN rhh_pertlq AS P ON P.cod_tlq = dbo.fn_rhh_ValParmConv( E.cod_emp, @Fecliq, 'cod_tlq' )
    AND (@desde <= fec_fin AND fec_fin <= @fecliq
	   )
    WHERE cod_emp LIKE(RTRIM(@codemp));

    WITH mycte
	    AS (SELECT CAST(@FECINI AS DATETIME) AS DateValue,
				dbo.fn_rhh_DiaAusentismo_Contrato( @codemp, @FECINI, @CodCont ) AS Cod_aus
		   UNION ALL
		   SELECT DateValue + 1,
				dbo.fn_rhh_DiaAusentismo_Contrato( @codemp, DateValue + 1, @CodCont ) AS Cod_aus
		   FROM mycte
		   WHERE DateValue + 1 <= @FECfin)
	    SELECT COUNT(M.cod_aus) AS dias,
			 M.cod_aus,
			 T.nom_aus
	    FROM mycte AS M
	    INNER JOIN RHH_TBTIPAUS AS T ON M.cod_aus = T.cod_aus
	    WHERE M.Cod_aus <> '99' AND T.cod_con LIKE RTRIM(@CodCon)
	    GROUP BY M.cod_aus,
			   T.nom_aus OPTION(MAXRECURSION 0);
END;

```
