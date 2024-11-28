# Stored Procedure: sp_Empleados_ActivosyRetiradosDigital

## Usa los objetos:
- [[EmpleadosActivos]]
- [[EmpleadosRetirados]]

```sql
create PROCEDURE [dbo].[sp_Empleados_ActivosyRetiradosDigital] 
@Ano as int,
@Mes as int
AS
BEGIN
select distinct CodigoEmpleado,Nombres,Fecha_Ingreso,Fecha_Retiro
from(
		select CodigoEmpleado,Nombres=Nombres + ' ' + Apellido1 + ' ' + Apellido2,Fecha_Ingreso,Fecha_Retiro = NULL
		from EmpleadosActivos where year(Fecha_Ingreso)=@Ano and month(fecha_ingreso)=@Mes and Ano_Periodo = @Ano and Mes_Periodo=@Mes
		union all
		select CodigoEmpleado,Nombres=Nombres + ' ' + Apellido1 + ' ' + Apellido2,Fecha_Ingreso,Fecha_Retiro 
		from EmpleadosRetirados where year(Fecha_retiro)=@Ano and month(Fecha_retiro)=@Mes
) a --order by CodigoEmpleado
end
```
