# Stored Procedure: usr_rhh_exportainterfazcontable

## Usa los objetos:
- [[nom_inf_con]]

```sql

-- =============================================
-- Author:		<Orlando Ramirez>
-- Create date: <03/Abril/2013>
-- Description:	<Consulta de tabla de interfaz contable de Nomina Solicitado por Juliet Rincon sin SRS>
-- =============================================
CREATE PROCEDURE [dbo].[usr_rhh_exportainterfazcontable] 
	@ano_doc char(4),
	@qqperi char(2),
	@qqperf char(2),
	@ndoc char (14)
AS
BEGIN
	SET NOCOUNT ON;
	SET ROWCOUNT 0;
	if @ndoc =' '
	SELECT * FROM nom_inf_con WHERE ano_doc=@ano_doc AND per_doc BETWEEN @qqperi AND @qqperf;
	ELSE
    SELECT * FROM nom_inf_con WHERE ano_doc=@ano_doc AND num_doc = @ndoc AND per_doc BETWEEN @qqperi AND @qqperf;
	
END

```
