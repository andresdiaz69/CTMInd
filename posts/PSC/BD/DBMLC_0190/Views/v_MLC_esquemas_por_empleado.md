# View: v_MLC_esquemas_por_empleado

## Usa los objetos:
- [[vw_EmpleadosRangosMaestras]]

```sql
create view v_MLC_esquemas_por_empleado as
select Cant=ROW_NUMBER () over(partition by CodigoEmpleado order by CodigoEmpleado),
CodigoEmpleado,CodigoEmpresa,NombreEmpresa,CodigoCentro,NombreCentro,cod_marca,nombre_marca,
CodigoCargo,NombreCargo,IdRangoMaestra,NombreMaestra
from [dbo].[vw_EmpleadosRangosMaestras] 
where fecharetiro is null
and IdRangoMaestra is not null
```
