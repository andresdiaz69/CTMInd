# Stored Procedure: sp_Vacaciones_LastYear

## Usa los objetos:
- [[EmpleadosActivos]]
- [[EmpleadosActivos]]
- [[rhh_hisvac]]

```sql

CREATE procedure [dbo].[sp_Vacaciones_LastYear]
  @CodigoEmpleado as nvarchar(50)
as
begin

declare @mes int, @dia int, @year int, @fecha datetime

set @mes = (SELECT top 1 MONTH(a.Fecha_Ingreso)
  FROM [EmpleadosActivos] a
  where CodigoEmpleado = @CodigoEmpleado)
set @dia = (SELECT top 1 day(a.Fecha_Ingreso)
  FROM [dbo].[EmpleadosActivos] a
  where CodigoEmpleado = @CodigoEmpleado)
set @year = YEAR(getdate())
set @fecha = DATEFROMPARTS ( @year, @mes, @dia )  

select * 
from novasoft_Ct_mm.dbo.rhh_hisvac 
where cod_emp = @CodigoEmpleado and fec_vac between DATEADD(year, -1,@fecha) and @fecha 
end








```
