# View: vw_empleados_retirados

## Usa los objetos:
- [[v_EmpleadosActivosRetirados]]

```sql
CREATE view [dbo].[vw_empleados_retirados] as 
select distinct CodigoEmpresa,Empresa,Cedula=CodigoEmpleado,Nombres = Nombres + ' ' + Apellido1 + ' ' + Apellido2,
CodigoMarca,Marca,codigo_centro,nombre_centro,codigo_seccion, nombre_seccion,Codigo_Sucursal,Nombre_Sucursal,
codigo_departamento,nombre_departamento,Unidad_Negocio,Nombre_Unidad_Negocio,Codigo_Cargo,Nombre_Cargo,email=Email_Corporativo,
Fecha_Ingreso,Fecha_retiro,CausaRetiro
from v_EmpleadosActivosRetirados
where estado = 'RETIRADO'
and Fecha_retiro < convert(varchar,getdate(),23)
--and year(Fecha_retiro) = 2024
--and month(Fecha_retiro)=1

```
