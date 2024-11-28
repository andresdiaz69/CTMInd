# View: vw_Ultimo_Registro_EmpleadosActivos

## Usa los objetos:
- [[EmpleadosActivos]]
- [[UnidadDeNegocio]]
- [[v_EmpleadosActivosRetirados]]

```sql

CREATE VIEW [dbo].[vw_Ultimo_Registro_EmpleadosActivos] as
SELECT DISTINCT CodigoEmpleado, Nombres, Apellido1, Apellido2, Codigo_Cargo, Nombre_Cargo, CodigoEmpresa, Empresa, codigo_centro, nombre_centro, CodigoMarca, 
	Marca, codigo_seccion, nombre_seccion, Codigo_Sucursal, Nombre_Sucursal, codigo_departamento, nombre_departamento, Unidad_Negocio, 
	CASE WHEN B.NombreUnidadNegocio IS NULL THEN (SELECT DISTINCT EM.Nombre_Unidad_Negocio FROM EmpleadosActivos EM WHERE EM.Unidad_Negocio = A.Unidad_Negocio)
	ELSE B.NombreUnidadNegocio END 	AS Nombre_Unidad_Negocio,Fecha_Ingreso, Fecha_retiro, Estado
FROM 
(
	select CodigoEmpleado,
		(SELECT TOP(1) Nombres FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Nombres,
		(SELECT TOP(1) Apellido1 FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Apellido1,
		(SELECT TOP(1) Apellido2 FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Apellido2,
		(SELECT TOP(1) CodigoEmpresa FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  CodigoEmpresa,
		(SELECT TOP(1) Empresa FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Empresa,
		(SELECT TOP(1) codigo_centro FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  codigo_centro,
		(SELECT TOP(1) nombre_centro FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  nombre_centro,
		(SELECT TOP(1) CodigoMarca FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  CodigoMarca,
		(SELECT TOP(1) Marca FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Marca,
		(SELECT TOP(1) codigo_seccion FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  codigo_seccion,
		(SELECT TOP(1) nombre_seccion FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  nombre_seccion,
		(SELECT TOP(1) Codigo_Sucursal FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Codigo_Sucursal,
		(SELECT TOP(1) Nombre_Sucursal FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Nombre_Sucursal,
		(SELECT TOP(1) codigo_departamento FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  codigo_departamento,
		(SELECT TOP(1) nombre_departamento FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  nombre_departamento,
		(SELECT TOP(1) Codigo_Cargo FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Codigo_Cargo,
		(SELECT TOP(1) Nombre_Cargo FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Nombre_Cargo,
		(SELECT TOP(1) Unidad_Negocio FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Unidad_Negocio,
		(SELECT TOP(1) Fecha_Ingreso FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Fecha_Ingreso,
		(SELECT TOP(1) Fecha_retiro FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Fecha_retiro,
		(SELECT TOP(1) Estado FROM v_EmpleadosActivosRetirados WHERE CodigoEmpleado = a.CodigoEmpleado ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Estado
	FROM v_EmpleadosActivosRetirados a GROUP BY CodigoEmpleado
) A
LEFT JOIN UnidadDeNegocio B ON A.Unidad_Negocio = B.CodUnidadNegocio

```
