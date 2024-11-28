# View: v_esquemas_por_cargo

## Usa los objetos:
- [[vw_EmpleadosRangosMaestras]]

```sql

CREATE view [dbo].[v_esquemas_por_cargo] as
select	codigoempleado,CodigoCargo,NombreCargo,CodigoEmpresa,NombreEmpresa,cod_marca,nombre_marca,CodigoCentro,NombreCentro,
Esquema1= case when cant = 1 then Nombremaestra else '' end, 
Esquema2= case when cant = 2 then Nombremaestra else '' end, 
Esquema3= case when cant = 3 then Nombremaestra else '' end,
Esquema4= case when cant = 4 then Nombremaestra else '' end,
Esquema5= case when cant = 5 then Nombremaestra else '' end,
Esquema6= case when cant = 6 then Nombremaestra else '' end
from(
		select Cant=ROW_NUMBER () over(partition by CodigoEmpleado order by CodigoEmpleado),
		CodigoEmpleado,CodigoEmpresa,NombreEmpresa,CodigoCentro,NombreCentro,cod_marca,nombre_marca,
		CodigoCargo,NombreCargo,IdRangoMaestra,NombreMaestra
		from [dbo].[vw_EmpleadosRangosMaestras] 
		where fecharetiro is null
) a
--where  CodigoCargo = 190
--and cod_marca = 19
--and codigocentro = 12




```
