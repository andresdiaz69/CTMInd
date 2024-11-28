# View: vw_CuadroDePersonal_Retiros_Indemnizaciones

## Usa los objetos:
- [[v_Informe_Efectivos_Indemnizaciones]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_Retiros_Indemnizaciones] 
--MS:161123 vista del procedimiento sp_CuadroDePersonal_Retiros_Indemnizaciones para poder filtrar la informacion
AS

select 	 año,mes,[Nombre_Unidad_Negocio],[Personas]=sum([Personas]),[TotalPagado]=sum([TotalPagado])
from(
	select año,mes, [Nombre_Unidad_Negocio],[Personas],[TotalPagado]
		from v_Informe_Efectivos_Indemnizaciones
		--where año =@Ano
		--  and mes <= @mes
	group by año,mes,[Nombre_Unidad_Negocio],[Personas],[TotalPagado]
) a 
--where año = 2023
--and mes <=9
group by año,mes,[Nombre_Unidad_Negocio]


```
