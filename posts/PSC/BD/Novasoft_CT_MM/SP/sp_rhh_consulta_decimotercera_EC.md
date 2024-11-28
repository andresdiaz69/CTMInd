# Stored Procedure: sp_rhh_consulta_decimotercera_EC

## Usa los objetos:
- [[rhh_decimotercera_EC]]
- [[rhh_emplea]]

```sql
-- =============================================
-- Author:		<Luz Reyna >
-- Create date: <10/Noviembre /2015>
-- Description:	<Consulta de tabla de rhh_decimotercera_EC>
-- =============================================
CREATE PROCEDURE [dbo].[sp_rhh_consulta_decimotercera_EC]
	@Fec_cte datetime = '20150930'
AS
BEGIN
	SET NOCOUNT ON;
	SET ROWCOUNT 0;

    SELECT ap1_emp , ap2_emp, nom_emp, fec_ing, fec_egr, u.* 
	FROM rhh_decimotercera_EC U 
	INNER JOIN rhh_emplea e on e.cod_emp = u.cod_emp
	WHERE Fec_cte=@Fec_cte ;
END



```
