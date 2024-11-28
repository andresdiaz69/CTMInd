# View: vw_Devoluciones_EmpleadosActivosRetirados

## Usa los objetos:
- [[EmpleadosActivos]]
- [[EmpleadosRetirados]]
- [[vw_Empresas]]

```sql

--- 2. Crear vista [vw_Devoluciones_EmpleadosActivosRetirados]
CREATE VIEW [dbo].[vw_Devoluciones_EmpleadosActivosRetirados] AS
SELECT orden=ISNULL(ROW_NUMBER()OVER(ORDER BY CodigoEmpleado ASC), -1),Estado=LTRIM(RTRIM(Estado)),CodigoEmpleado,Ano_Periodo,Mes_Periodo,A.CodigoEmpresa,
	Empresa = B.NombreEmpresa,Nombres=LTRIM(RTRIM(Nombres)),Apellido1=LTRIM(RTRIM(Apellido1)),Apellido2=LTRIM(RTRIM(Apellido2)),Fecha_Ingreso,CodigoMarca,
	Marca=LTRIM(RTRIM(Marca)),codigo_centro=LTRIM(RTRIM(codigo_centro)),nombre_centro=LTRIM(RTRIM(nombre_centro)),codigo_seccion=LTRIM(RTRIM(codigo_seccion)),
	nombre_seccion=LTRIM(RTRIM(nombre_seccion)),Codigo_Sucursal=LTRIM(RTRIM(Codigo_Sucursal)),Nombre_Sucursal=LTRIM(RTRIM(Nombre_Sucursal)),
	codigo_departamento=LTRIM(RTRIM(codigo_departamento)),nombre_departamento=LTRIM(RTRIM(nombre_departamento)),Codigo_Cargo=LTRIM(RTRIM(Codigo_Cargo)),
	Nombre_Cargo=LTRIM(RTRIM(Nombre_Cargo)),Unidad_Negocio=LTRIM(RTRIM(Unidad_Negocio)),Nombre_Unidad_Negocio=LTRIM(RTRIM(Nombre_Unidad_Negocio)),
	email=LTRIM(RTRIM(email)),Codigo_Cargo_Generico=LTRIM(RTRIM(Codigo_Cargo_Generico)),Nombre_Cargo_generico=LTRIM(RTRIM(Nombre_Cargo_generico)),
	Codigo_Departamento_trabajo=LTRIM(RTRIM(Codigo_Departamento_trabajo)),Nombre_Departamento_trabajo=LTRIM(RTRIM(Nombre_Departamento_trabajo)),
	Codigo_Ciudad_trabajo=LTRIM(RTRIM(Codigo_Ciudad_trabajo)),Nombre_Ciudad_trabajo=LTRIM(RTRIM(Nombre_Ciudad_trabajo)),
	CausaRetiro=LTRIM(RTRIM(CausaRetiro)),Codigo_Cargo_Junta=LTRIM(RTRIM(Codigo_Cargo_Junta)),Nombre_Cargo_Junta=LTRIM(RTRIM(Nombre_Cargo_Junta)),
	Codigo_Tipo_Contrato=LTRIM(RTRIM(Codigo_Tipo_Contrato)),Nombre_Tipo_Contrato=LTRIM(RTRIM(Nombre_Tipo_Contrato)),
	Fecha_retiro=LTRIM(RTRIM(Fecha_retiro)),Codigo_Causa_retiro=LTRIM(RTRIM(Codigo_Causa_retiro))
FROM            
(
	SELECT Estado='Activo',CodigoEmpleado,Ano_Periodo,Mes_Periodo,Nombres,Apellido1,Apellido2,Fecha_Ingreso,CodigoMarca,Marca,
		codigo_centro,nombre_centro,codigo_seccion,nombre_seccion,Codigo_Sucursal,Nombre_Sucursal,codigo_departamento,nombre_departamento,Codigo_Cargo,
		Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,email,Email_Corporativo,Codigo_Departamento_trabajo,Nombre_Departamento_trabajo,
		Codigo_Ciudad_trabajo,Nombre_Ciudad_trabajo,Codigo_Cargo_Junta,Nombre_Cargo_Junta,Codigo_Tipo_Contrato,Nombre_Tipo_Contrato,Fecha_retiro= NULL,
		Codigo_Causa_retiro=NULL,CausaRetiro=NULL,Fecha_Nacimiento,Genero,Indicador_salario_variable,Indicador_comisiones,Prefijo_Cuenta_contable,
		Codigo_CNO,Descripcion_CNO,Codigo_clase_salario,Nombre_Clase_salario, Documento,
		CodigoEmpresa=CASE WHEN Empresa LIKE '%TORO%' THEN 1 ELSE CodigoEmpresa END,
		Unidad_Negocio=CASE WHEN LTRIM(RTRIM(Unidad_Negocio)) = '6' THEN '2' ELSE Unidad_Negocio END,
		Nombre_Unidad_Negocio=CASE WHEN LTRIM(RTRIM(unidad_negocio)) = '6' THEN 'VOLKSWAGEN' 
								WHEN LTRIM(RTRIM(unidad_negocio)) = '3' THEN 'MERCEDES-BENZ' 
								ELSE Nombre_Unidad_Negocio END
	FROM EmpleadosActivos
	WHERE Ano_Periodo = YEAR(GETDATE())
	AND Mes_Periodo = MONTH(GETDATE())
	
	UNION ALL

	SELECT Estado='Retirado',A.CodigoEmpleado,Ano_Periodo,Mes_Periodo,Nombres,Apellido1,Apellido2,Fecha_Ingreso,CodigoMarca,
		Marca,codigo_centro,nombre_centro,codigo_seccion,nombre_seccion,Codigo_Sucursal,Nombre_Sucursal,codigo_departamento,nombre_departamento,
		Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,email,Email_Corporativo=NULL,Codigo_Departamento_trabajo,
		Nombre_Departamento_trabajo,Codigo_Ciudad_trabajo,Nombre_Ciudad_trabajo,Codigo_Cargo_Junta,Nombre_Cargo_Junta,Codigo_Tipo_Contrato,
		Nombre_Tipo_Contrato,Fecha_retiro,Codigo_Causa_retiro,CausaRetiro,Fecha_Nacimiento,Genero,Indicador_salario_variable,Indicador_comisiones='',
		Prefijo_Cuenta_contable,Codigo_CNO,Descripcion_CNO,Codigo_clase_salario,Nombre_Clase_salario,Documento,
		CodigoEmpresa=CASE WHEN Empresa LIKE '%TORO%' THEN 1 ELSE CodigoEmpresa END,
		Unidad_Negocio=CASE WHEN LTRIM(RTRIM(Unidad_Negocio)) = '6' THEN '2' ELSE Unidad_Negocio END,
		Nombre_Unidad_Negocio=CASE WHEN LTRIM(RTRIM(unidad_negocio)) = '6' THEN 'VOLKSWAGEN' 
								WHEN LTRIM(RTRIM(unidad_negocio)) = '3' THEN 'MERCEDES-BENZ' 
								ELSE Nombre_Unidad_Negocio END
	FROM EmpleadosRetirados A
	INNER JOIN (SELECT 
		MAX(Fecha_retiro) FECHA, CodigoEmpleado FROM EmpleadosRetirados 
		GROUP BY CodigoEmpleado) CC ON CC.CodigoEmpleado = A.CodigoEmpleado
		                           AND CC.FECHA = A.Fecha_retiro
	WHERE Ano_Periodo >= YEAR(GETDATE())-5
		AND A.CodigoEmpleado NOT IN (SELECT CodigoEmpleado 
	                              FROM EmpleadosActivos
								  WHERE Ano_Periodo = YEAR(GETDATE())
								  AND Mes_Periodo = MONTH(GETDATE()))
) A
LEFT JOIN vw_Empresas B ON A.CodigoEmpresa = B.CodigoEmpresa
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



```
