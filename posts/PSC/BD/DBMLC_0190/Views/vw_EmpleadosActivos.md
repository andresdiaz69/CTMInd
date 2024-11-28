# View: vw_EmpleadosActivos

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
create view [dbo].[vw_EmpleadosActivos] as
select distinct CodigoEmpleado, Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, Nombres, Apellido1, Apellido2,
NombreCompleto = Nombres + ' ' + Apellido1 + ' ' + Apellido2, Fecha_Ingreso,CodigoMarca,
Marca, codigo_centro, nombre_centro,codigo_seccion,nombre_seccion, Codigo_Sucursal,Nombre_Sucursal,codigo_departamento,nombre_departamento,
Codigo_Cargo,Nombre_Cargo, Codigo_Cargo_Generico, Nombre_Cargo_generico,email,Codigo_Departamento_trabajo,Nombre_Departamento_trabajo,
Codigo_Ciudad_trabajo, Nombre_Ciudad_trabajo, Codigo_Cargo_Junta,Nombre_Cargo_Junta,Codigo_Tipo_Contrato,Nombre_Tipo_Contrato,Unidad_Negocio,
Nombre_Unidad_Negocio,Fecha_Nacimiento,Genero,Indicador_salario_variable,Indicador_comisiones,Prefijo_Cuenta_contable,Codigo_CNO,Codigo_clase_salario,
Nombre_Clase_salario,Email_Corporativo,Celular,Telefono_fijo,Estado,Documento
from 
EmpleadosActivos 

```
