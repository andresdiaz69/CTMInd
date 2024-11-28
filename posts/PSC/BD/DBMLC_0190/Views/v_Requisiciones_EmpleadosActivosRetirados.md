# View: v_Requisiciones_EmpleadosActivosRetirados

## Usa los objetos:
- [[Cargos]]
- [[EmpleadosActivos]]
- [[EmpleadosRetirados]]
- [[vw_Empresas]]
- [[vw_UnidadDeNegocio]]

```sql
CREATE VIEW [dbo].[v_Requisiciones_EmpleadosActivosRetirados] AS
SELECT	orden=ISNULL(ROW_NUMBER()OVER(ORDER BY CodigoEmpleado ASC), -1),
	Estado,											CodigoEmpleado,												Ano_Periodo,
	Mes_Periodo,									A.CodigoEmpresa,											Empresa=B.NombreEmpresa,
	Nombres,										Apellido1=LTRIM(RTRIM(Apellido1)),							Apellido2=LTRIM(RTRIM(Apellido2)),
	NombreCompleto,									Fecha_Ingreso,												CodigoMarca,
	Marca=LTRIM(RTRIM(Marca)),						codigo_centro=LTRIM(RTRIM(codigo_centro)),					nombre_centro=C.NombreCentro,
	codigo_seccion=LTRIM(RTRIM(codigo_seccion)),	nombre_seccion=S.NombreSeccion,								Codigo_Sucursal=LTRIM(RTRIM(Codigo_Sucursal)),
	Nombre_Sucursal,								codigo_departamento=LTRIM(RTRIM(codigo_departamento)),		nombre_departamento=D.NombreDepartamento,
	Codigo_Cargo=LTRIM(RTRIM(A.Codigo_Cargo)),		CASE WHEN CA.CodigoCargo IS NULL THEN A.Nombre_Cargo ELSE CA.NombreCargo END Nombre_Cargo,
	Unidad_Negocio,
	Nombre_Unidad_Negocio,							email,														Codigo_Cargo_Generico,
	Nombre_Cargo_generico,							Codigo_Departamento_trabajo,								Nombre_Departamento_trabajo,
	Codigo_Ciudad_trabajo,							Nombre_Ciudad_trabajo,										CausaRetiro,
	Codigo_Cargo_Junta,								Nombre_Cargo_Junta,											Codigo_Tipo_Contrato,
	Nombre_Tipo_Contrato,							Fecha_retiro,												Codigo_Causa_retiro
FROM            
(
	SELECT	Estado='Activo',					CodigoEmpleado,						Ano_Periodo,					Mes_Periodo,
			Apellido1,							Apellido2,							Fecha_Ingreso,					CodigoMarca,
			Marca,								codigo_seccion,						Codigo_Sucursal,
			codigo_departamento,				Codigo_Cargo,						Nombre_Cargo,					Codigo_Cargo_Generico,
			Nombre_Cargo_generico,				email,								Email_Corporativo,				Codigo_Departamento_trabajo,
			Nombre_Departamento_trabajo,		Codigo_Ciudad_trabajo,				Nombre_Ciudad_trabajo,			Codigo_Cargo_Junta,
			Nombre_Cargo_Junta,					Codigo_Tipo_Contrato,				Nombre_Tipo_Contrato,			Fecha_retiro= NULL,
			Codigo_Causa_retiro=NULL,			CausaRetiro=NULL,					Fecha_Nacimiento,				Genero,
			Indicador_salario_variable,			Indicador_comisiones,				Prefijo_Cuenta_contable,		Codigo_CNO,
			Descripcion_CNO,					Codigo_clase_salario,				Nombre_Clase_salario, 			Documento,
			codigo_centro = case when codigo_centro like '146%' then '146' else codigo_centro end,
			Nombre_Sucursal=LTRIM(RTRIM(Nombre_Sucursal)),
			Nombres=REPLACE(REPLACE(REPLACE(Nombres,' ','<>'),'><',''),'<>',' '),
			NombreCompleto=REPLACE(REPLACE(REPLACE((Nombres + ' ' + Apellido1 + ' ' + Apellido2),' ','<>'),'><',''),'<>',' '),
			CodigoEmpresa=CONVERT(SMALLINT,CASE WHEN Empresa LIKE '%TORO%' THEN 1 ELSE CodigoEmpresa END),
			Unidad_Negocio=CASE WHEN LTRIM(RTRIM(Unidad_Negocio)) = '6' THEN '2' ELSE LTRIM(RTRIM(Unidad_Negocio)) END,
			Nombre_Unidad_Negocio=CASE WHEN LTRIM(RTRIM(unidad_negocio)) = '6' THEN 'VOLKSWAGEN'
									WHEN LTRIM(RTRIM(unidad_negocio)) = '3' THEN 'MERCEDES-BENZ'
									ELSE Nombre_Unidad_Negocio END
	FROM EmpleadosActivos 
	WHERE Ano_Periodo = YEAR(GETDATE())
		AND Mes_Periodo = MONTH(GETDATE())
	
	UNION ALL

	SELECT	Estado='Retirado',					A.CodigoEmpleado,					Ano_Periodo,					Mes_Periodo,
			Apellido1,							Apellido2,							Fecha_Ingreso,					CodigoMarca,
			Marca,								codigo_seccion,						Codigo_Sucursal,
			codigo_departamento,				Codigo_Cargo,						Nombre_Cargo,					Codigo_Cargo_Generico,
			Nombre_Cargo_generico,				email,								Email_Corporativo=NULL,			Codigo_Departamento_trabajo,
			Nombre_Departamento_trabajo,		Codigo_Ciudad_trabajo,				Nombre_Ciudad_trabajo,			Codigo_Cargo_Junta,
			Nombre_Cargo_Junta,					Codigo_Tipo_Contrato,				Nombre_Tipo_Contrato,			Fecha_retiro,
			Codigo_Causa_retiro,				CausaRetiro,						Fecha_Nacimiento,				Genero,
			Indicador_salario_variable,			Indicador_comisiones='',			Prefijo_Cuenta_contable,		Codigo_CNO,
			Descripcion_CNO,					Codigo_clase_salario,				Nombre_Clase_salario,			Documento,
			codigo_centro = case when codigo_centro like '146%' then '146' else codigo_centro end,
			Nombre_Sucursal=LTRIM(RTRIM(Nombre_Sucursal)),
			Nombres=REPLACE(REPLACE(REPLACE(Nombres,' ','<>'),'><',''),'<>',' '),
			NombreCompleto=REPLACE(REPLACE(REPLACE((Nombres + ' ' + Apellido1 + ' ' + Apellido2),' ','<>'),'><',''),'<>',' '),
			CodigoEmpresa=CONVERT(SMALLINT,CASE WHEN Empresa LIKE '%TORO%' THEN 1 ELSE CodigoEmpresa END),
			Unidad_Negocio=CASE WHEN LTRIM(RTRIM(Unidad_Negocio)) = '6' THEN '2' ELSE Unidad_Negocio END,
			Nombre_Unidad_Negocio=CASE WHEN LTRIM(RTRIM(unidad_negocio)) = '6' THEN 'VOLKSWAGEN'
									WHEN LTRIM(RTRIM(unidad_negocio)) = '3' THEN 'MERCEDES-BENZ'
									ELSE Nombre_Unidad_Negocio END
	FROM EmpleadosRetirados A
	INNER JOIN (SELECT 
		MAX(Fecha_retiro) FECHA, CodigoEmpleado FROM EmpleadosRetirados 
		GROUP BY CodigoEmpleado) CC ON CC.CodigoEmpleado = A.CodigoEmpleado
		                           AND CC.FECHA = A.Fecha_retiro
	WHERE Ano_Periodo >= YEAR(GETDATE())-4
		AND A.CodigoEmpleado NOT IN (SELECT CodigoEmpleado 
	                              FROM EmpleadosActivos
								  WHERE Ano_Periodo = YEAR(GETDATE())
								  AND Mes_Periodo = MONTH(GETDATE()))
) A

LEFT JOIN (
	SELECT * FROM Cargos WHERE NombreCargo NOT LIKE '%(NA)%' AND Activo = 1 AND Obsoleto = 0
) CA ON A.Codigo_Cargo = CA.CodigoCargo

LEFT JOIN vw_Empresas B ON A.CodigoEmpresa = B.CodigoEmpresa

LEFT JOIN (
		SELECT DISTINCT CodCentro, NombreCentro FROM vw_UnidadDeNegocio
	) AS C ON C.CodCentro = A.codigo_centro

LEFT JOIN (
		SELECT DISTINCT CodSeccion, NombreSeccion FROM vw_UnidadDeNegocio
	) AS S ON S.CodSeccion = A.codigo_seccion

LEFT JOIN (
		SELECT DISTINCT CodDepartamento, NombreDepartamento FROM vw_UnidadDeNegocio
	) AS D ON D.CodDepartamento = A.codigo_departamento

```
