# Stored Procedure: sp_cMandos_Presentacion

## Usa los objetos:
- [[cMandos_Presentacion]]
- [[sp_cMandos_Consolidado]]
- [[sp_cMandos_Datos]]

```sql


CREATE PROCEDURE [dbo].[sp_cMandos_Presentacion] 
	(
	@CodigoLinea int = 8, 
	@Año_Periodo int = 2020,
	@Mes_Periodo int = 6
	)
AS
BEGIN

	SET FMTONLY OFF
	SET NOCOUNT ON

		DELETE FROM cMandos_Presentacion WHERE CodigoLinea = @CodigoLinea and Año = @Año_Periodo and Mes = @Mes_Periodo 

		IF @CodigoLinea <> 32700
		BEGIN

			EXEC sp_cMandos_Datos @CodigoLinea,@Año_Periodo,@Mes_Periodo

		END
		ELSE
		BEGIN

			EXEC sp_cMandos_Consolidado @Año_Periodo,@Mes_Periodo

		END

		select * from cMandos_Presentacion where CodigoLinea = @CodigoLinea and Año = @Año_Periodo and Mes = @Mes_Periodo order by CodigoTipo,CodigoRenglon

END

```
