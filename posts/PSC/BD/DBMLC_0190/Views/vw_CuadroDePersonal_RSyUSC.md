# View: vw_CuadroDePersonal_RSyUSC

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_RSyUSC]
--MS:161123 vista del procedimiento sp_CuadroDePersonal_RSyUSC para  poder filtrar la informacion
AS

Select distinct Ano_Periodo,Mes_Periodo,  row_number() over( order by Empresa asc) Orden,Empresa, 
COUNT(CodigoEmpleado) as Total , sum(case when unidad_negocio = 4 then 1 else 0 end ) USC,
		sum(case when Unidad_Negocio = 418 then 1 else 0 end) Nebula,
		sum(case when Unidad_Negocio in (15,23) then 1 else 0 end) Bellpi
from EmpleadosActivos
--where Ano_Periodo = 2023 
--and Mes_Periodo = 9
group by Ano_Periodo,Mes_Periodo, Empresa



```
