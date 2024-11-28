# Stored Procedure: sp_rhh_enviocertifingret

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_liqhis]]

```sql
CREATE PROCEDURE [dbo].[sp_rhh_enviocertifingret]
	@codcia   CHAR(3),
	@CodCco   VARCHAR(10),
	@CodSuc   CHAR(3),
	@cod_cla1 VARCHAR(12),
	@FecIni   DATETIME, -- Es la fecha inicial para búsqueda de información -- COSPINA Feb/2013
	@FecFin   DATETIME,
	@CodEmp   CHAR(12)
AS
BEGIN
    SELECT DISTINCT
		 E.cod_emp,
		 ISNULL(e_mail, '') AS e_mail
    FROM rhh_emplea AS E
    INNER JOIN rhh_liqhis AS H ON H.COD_EMP = E.COD_EMP
    WHERE E.cod_emp LIKE RTRIM(@CodEmp)
		AND H.fec_cte BETWEEN @FecIni AND @FecFin
		AND H.cod_cia LIKE RTRIM(@CodCia)
		AND E.cod_cco LIKE RTRIM(@CodCco)
		AND E.cod_suc LIKE RTRIM(@CodSuc)
		AND E.cod_emp LIKE RTRIM(@CodEmp)
		AND E.cod_cl1 LIKE RTRIM(@Cod_cla1)
    ORDER BY E.cod_emp;
END;

```
