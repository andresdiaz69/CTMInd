# Stored Procedure: sp_CuadroDePersonal_Retiros_Indemnizaciones

## Usa los objetos:
- [[v_Informe_Efectivos_Indemnizaciones]]

```sql
CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_Retiros_Indemnizaciones] 
	@Ano as smallint,
		@mes as smallint

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		SET FMTONLY OFF

select 	 [Nombre_Unidad_Negocio],[Personas]=sum([Personas]),[TotalPagado]=sum([TotalPagado])
from(
	select [Nombre_Unidad_Negocio],[Personas],[TotalPagado]
		from v_Informe_Efectivos_Indemnizaciones
		where año =@Ano
		  and mes <= @mes
	group by [Nombre_Unidad_Negocio],[Personas],[TotalPagado]
) a group by [Nombre_Unidad_Negocio]

END



```
