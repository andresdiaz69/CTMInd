# View: v_EmpleadosActivosRetirados_Requisicion

## Usa los objetos:
- [[v_EmpleadosActivosRetirados]]

```sql
CREATE VIEW [dbo].[v_EmpleadosActivosRetirados_Requisicion]
AS

SELECT        isnull(ROW_NUMBER()over (order by CodigoEmpleado asc), -1) as orden,RTRIM(Estado) AS Estado, RTRIM(CodigoEmpleado) AS CodigoEmpleado, RTRIM(Ano_Periodo) AS Ano_Periodo, RTRIM(Mes_Periodo) AS Mes_Periodo, RTRIM(CodigoEmpresa) AS CodigoEmpresa, 
                         RTRIM(Empresa) AS Empresa, RTRIM(Nombres) AS Nombres, RTRIM(Apellido1) AS Apellido1, RTRIM(Apellido2) AS Apellido2, RTRIM(Fecha_Ingreso) AS Fecha_Ingreso, 
						 RTRIM(CodigoMarca) AS CodigoMarca, 
                         RTRIM(Marca) AS Marca, RTRIM(codigo_centro) AS codigo_centro, RTRIM(nombre_centro) AS nombre_centro, RTRIM(codigo_seccion) AS codigo_seccion, RTRIM(nombre_seccion) AS nombre_seccion, 
                         RTRIM(Codigo_Sucursal) AS Codigo_Sucursal, RTRIM(Nombre_Sucursal) AS Nombre_Sucursal, RTRIM(codigo_departamento) AS codigo_departamento, 
						 RTRIM(nombre_departamento) AS nombre_departamento, 
                         RTRIM(Codigo_Cargo) AS Codigo_Cargo, RTRIM(Nombre_Cargo) AS Nombre_Cargo, RTRIM(Codigo_Cargo_Generico) AS Codigo_Cargo_Generico, RTRIM(Nombre_Cargo_generico) AS Nombre_Cargo_generico, 
                         RTRIM(email) AS email, RTRIM(Codigo_Departamento_trabajo) AS Codigo_Departamento_trabajo, RTRIM(Nombre_Departamento_trabajo) AS Nombre_Departamento_trabajo, RTRIM(Codigo_Ciudad_trabajo) 
                         AS Codigo_Ciudad_trabajo, RTRIM(Nombre_Ciudad_trabajo) AS Nombre_Ciudad_trabajo, RTRIM(Codigo_Cargo_Junta) AS Codigo_Cargo_Junta, 
						 RTRIM(Nombre_Cargo_Junta) AS Nombre_Cargo_Junta, 
                         RTRIM(Codigo_Tipo_Contrato) AS Codigo_Tipo_Contrato, RTRIM(Nombre_Tipo_Contrato) AS Nombre_Tipo_Contrato, RTRIM(Fecha_retiro) AS Fecha_retiro, RTRIM(Codigo_Causa_retiro) AS Codigo_Causa_retiro, 
                         RTRIM(CausaRetiro) AS CausaRetiro,Unidad_Negocio=rtrim(Unidad_Negocio),Nombre_Unidad_Negocio=rtrim(Nombre_Unidad_Negocio)
FROM            dbo.v_EmpleadosActivosRetirados


```
