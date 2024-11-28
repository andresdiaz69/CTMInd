# View: v_esquemas_Manuales_por_empleado

## Usa los objetos:
- [[vw_EmpleadosRangosManualesMaestras]]

```sql
create view v_esquemas_Manuales_por_empleado as
select	codigoempleado,
Esquema1= case when cant = 1 then Nombremaestra else '' end, 
Esquema2= case when cant = 2 then Nombremaestra else '' end, 
Esquema3= case when cant = 3 then Nombremaestra else '' end,
Esquema4= case when cant = 4 then Nombremaestra else '' end,
Esquema5= case when cant = 5 then Nombremaestra else '' end,
Esquema6= case when cant = 6 then Nombremaestra else '' end
from(
	select Cant=ROW_NUMBER () over(partition by CodigoEmpleado order by CodigoEmpleado),
	CodigoEmpleado,IdRangoMaestra,NombreMaestra
	from [com].[vw_EmpleadosRangosManualesMaestras]
	where Comentarios = 'ACTIVO'
)a
```
