# View: vw_Descargos_CorreosGerentes

## Usa los objetos:
- [[AspNetUsers]]
- [[Cargos]]
- [[EmpleadosActivos]]

```sql



---VISTAS
CREATE VIEW [dbo].[vw_Descargos_CorreosGerentes] AS
SELECT DISTINCT 
	CodigoEmpleado,				Nombres,			Apellido1,				Apellido2,					Codigo_Cargo,				Nombre_Cargo,			
	CodigoEmpresa,				Empresa,			Unidad_Negocio,			Nombre_Unidad_Negocio,		CodigoMarca,				Marca,					
	codigo_centro,				nombre_centro,		codigo_seccion,			nombre_seccion,				codigo_departamento,		nombre_departamento,
	b.Email 
FROM 
(
	SELECT DISTINCT 
		CodigoEmpleado,			Nombres,			Apellido1,			Apellido2,					Codigo_Cargo,			Nombre_Cargo,			
		CodigoEmpresa,			Empresa,			Unidad_Negocio,		Nombre_Unidad_Negocio,		CodigoMarca,			Marca,					
		codigo_centro,			nombre_centro,		codigo_seccion,		nombre_seccion,				codigo_departamento,	nombre_departamento,
		Email_Corporativo
	FROM
	(
		SELECT DISTINCT 
			CodigoEmpleado,			Nombres,			Apellido1,			Apellido2,					Codigo_Cargo,			Nombre_Cargo,			
			CodigoEmpresa,			Empresa,			Unidad_Negocio,		Nombre_Unidad_Negocio,		CodigoMarca,			Marca,					
			codigo_centro,			nombre_centro,		codigo_seccion,		nombre_seccion,				codigo_departamento,	nombre_departamento,
			Email_Corporativo
		FROM 
		(
			SELECT DISTINCT  
				CodigoEmpleado,					Nombres,				Apellido1,				CONVERT(SMALLINT,Codigo_Cargo)Codigo_Cargo,
				Apellido2,						CodigoEmpresa,			Empresa,				CONVERT(SMALLINT,Unidad_Negocio)Unidad_Negocio,
				CodigoMarca,					Marca,					Nombre_Cargo,			CONVERT(SMALLINT,codigo_centro)codigo_centro,			
				Nombre_Unidad_Negocio,			nombre_centro,			nombre_seccion,			CONVERT(SMALLINT,codigo_seccion)codigo_seccion,						
				nombre_departamento,			Email_Corporativo,		LTRIM(RTRIM(codigo_departamento))codigo_departamento
			
			FROM EmpleadosActivos 
			WHERE Ano_Periodo = YEAR(GETDATE()) 
				AND Mes_Periodo = MONTH(GETDATE())
		) A

		INNER JOIN
		(
			SELECT DISTINCT CodigoCargo, NombreCargo
			FROM [DBMLC_0190].[dbo].[Cargos]
			WHERE NombreCargo LIKE 'geren%' 
				AND Activo = 1 
				AND Obsoleto = 0
		) b ON a.Codigo_Cargo = b.codigocargo
	)A
	WHERE (Codigo_Cargo IN (520,514,79,465,429,364)) OR (Codigo_Cargo = 83 AND LTRIM(RTRIM(Unidad_Negocio)) <> '19')

	UNION ALL

	SELECT DISTINCT 
		CodigoEmpleado,			Nombres,			Apellido1,			Apellido2,					Codigo_Cargo,			Nombre_Cargo,			
		CodigoEmpresa,			Empresa,			Unidad_Negocio,		Nombre_Unidad_Negocio,		CodigoMarca,			Marca,					
		codigo_centro,			nombre_centro,		codigo_seccion,		nombre_seccion,				codigo_departamento,	nombre_departamento,
		Email_Corporativo
	FROM
	(	
		SELECT DISTINCT  
			CodigoEmpleado,				Nombres,					Apellido1,				CONVERT(SMALLINT,Codigo_Cargo)Codigo_Cargo,									
			Apellido2,					Nombre_Cargo,				CodigoEmpresa,			Nombre_Unidad_Negocio = 'BYD',
			Empresa,					Unidad_Negocio = 245,		CodigoMarca,			CONVERT(SMALLINT,codigo_centro)codigo_centro,				
			Marca,						nombre_centro,				nombre_seccion,			CONVERT(SMALLINT,codigo_seccion)codigo_seccion,			
			LTRIM(RTRIM(codigo_departamento))codigo_departamento,	nombre_departamento,	Email_Corporativo
		FROM EmpleadosActivos 
		WHERE Ano_Periodo = YEAR(GETDATE()) 
			AND Mes_Periodo = MONTH(GETDATE())
			AND Codigo_Cargo = '83'
			AND Unidad_Negocio = '20'
			AND CodigoEmpresa = 6
	) B
) A
LEFT JOIN AspNetUsers B ON A.CodigoEmpleado = B.UserName

```
