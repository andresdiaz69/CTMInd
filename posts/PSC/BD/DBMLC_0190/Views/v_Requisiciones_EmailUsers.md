# View: v_Requisiciones_EmailUsers

## Usa los objetos:
- [[AspNetRoles]]
- [[AspNetUserRoles]]
- [[AspNetUsers]]
- [[EmpleadosActivos]]
- [[Profiles]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_EmailUsers] AS
SELECT DISTINCT Id, UserName, NombreCompleto = REPLACE(REPLACE(REPLACE(NombreCompleto,' ','<>'),'><',''),'<>',' '), CodigoEmpresa, CodigoMarca, 
	Unidad_Negocio, codigo_centro, codigo_seccion, Codigo_Sucursal, Email, Rol, Sincronizar
FROM 
(
	--CONSULTA GENERAL DE LOS USUARIOS DE SOLICITUD DE PERSONAL QUE ESTAN EN EMPLEADOS ACTIVOS 
	SELECT Id, UserName, NombreCompleto, CodigoEmpresa, CodigoMarca, Unidad_Negocio, codigo_centro, codigo_seccion, Codigo_Sucursal, Email, Rol, 
		Sincronizar=0
	FROM 
	(
		SELECT DISTINCT a.Id, a.UserName, NombreCompleto = b.Nombres + ' ' + b.Apellido1 + ' ' + b.Apellido2, b.CodigoEmpresa, 
			b.CodigoMarca, b.Unidad_Negocio, b.codigo_centro, b.codigo_seccion, b.Codigo_Sucursal, a.Email, Rol = d.Name 
		FROM AspNetUsers AS a
		INNER JOIN (SELECT * FROM EmpleadosActivos 
					WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE()))	AS b ON a.UserName = b.CodigoEmpleado							
		INNER JOIN AspNetUserRoles AS c ON a.id = c.UserId 
		INNER JOIN (SELECT * FROM AspNetRoles
					WHERE Name LIKE '%REQUISICION-%' AND Name NOT LIKE '%PERSONAL%') AS d on c.RoleId = d.Id
	) A
		

	UNION ALL


	--USUARIOS RECLUTADOR 
	SELECT	DISTINCT			Id,					UserName,			REPLACE(REPLACE(REPLACE(UPPER(NombreCompleto),' ','<>'),'><',''),'<>',' ')NombreCompleto, 
			CodigoEmpresa,		CodigoMarca, 		Unidad_Negocio,		codigo_centro,			codigo_seccion,			
			Codigo_Sucursal,	Email,				Rol,				Sincronizar=0
	FROM 
	(
		SELECT DISTINCT		a.Id,		a.UserName,				e.CodigoEmpresa,		e.CodigoMarca,		e.Unidad_Negocio,  
				e.codigo_centro,		e.codigo_seccion,		e.Codigo_Sucursal,		a.Email,			Rol = d.Name,
			CASE WHEN E.Nombres IS NOT NULL THEN E.Nombres + ' ' + E.Apellido1 + ' ' + E.Apellido2 
				ELSE P.Nombres + ' ' + P.Apellidos END NombreCompleto
		FROM		AspNetUsers		AS a
		INNER JOIN	AspNetUserRoles AS c ON a.id = c.UserId
		INNER JOIN (SELECT * FROM AspNetRoles
					WHERE Name IN ('REQUISICION-RECLUTADOR')) AS B ON C.RoleId = B.Id
		INNER JOIN (SELECT * FROM	AspNetRoles
					WHERE Name IN ('REQUISICION-RECLUTADOR')) AS d ON c.RoleId = d.Id
		--INNER JOIN v_Requisiciones_UsuariosReclutadores AS SR ON A.UserName = SR.Cedula_Usuario
		INNER JOIN Profiles		AS P on a.Id = P.UserId
		LEFT JOIN	(SELECT * FROM EmpleadosActivos 
					WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE()))	AS e ON a.UserName = e.CodigoEmpleado
	) AS A 


	UNION ALL


	--USUARIOS ENTREVISTADOR
	SELECT Id, UserName, REPLACE(REPLACE(REPLACE(UPPER(NombreCompleto),' ','<>'),'><',''),'<>',' ')NombreCompleto, CodigoEmpresa, CodigoMarca, 
	Unidad_Negocio, codigo_centro, codigo_seccion, Codigo_Sucursal, Email, Rol, Sincronizar=0
	FROM 
	(
		SELECT DISTINCT 
			a.Id,					a.UserName,					e.CodigoEmpresa,			e.CodigoMarca,			e.Unidad_Negocio,  
			e.codigo_centro,		e.codigo_seccion,			e.Codigo_Sucursal,			a.Email,				Rol = d.Name,
			
			CASE WHEN E.Nombres IS NOT NULL THEN E.Nombres + ' ' + E.Apellido1 + ' ' + E.Apellido2 
					ELSE b.Nombres + ' ' + b.Apellidos END NombreCompleto
		
		FROM		AspNetUsers		AS a
		INNER JOIN	Profiles		AS b on a.Id = b.UserId
		INNER JOIN	AspNetUserRoles AS c ON a.id = c.UserId
		INNER JOIN (SELECT * FROM	AspNetRoles
					WHERE Name IN ('REQUISICION-ENTREVISTADOR')) AS d ON c.RoleId = d.Id
		LEFT JOIN	(SELECT * FROM EmpleadosActivos 
					WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE()))	AS e ON a.UserName = e.CodigoEmpleado
	) B

	UNION ALL


	--USUARIOS DE GESTIÓN HUMANA QUE NO SE ENCUENTRAN EN EMPLEADOS ACTIVOS
	SELECT Id, UserName, NombreCompleto, CodigoEmpresa, CodigoMarca, Unidad_Negocio, codigo_centro, codigo_seccion, Codigo_Sucursal, Email, Rol, 
		Sincronizar=0
	FROM 
	(
		SELECT DISTINCT 
			a.Id,					a.UserName,					e.CodigoEmpresa,			e.CodigoMarca,			e.Unidad_Negocio,  
			e.codigo_centro,		e.codigo_seccion,			e.Codigo_Sucursal,			a.Email,				Rol = d.Name,
			
			CASE WHEN E.Nombres IS NOT NULL THEN E.Nombres + ' ' + E.Apellido1 + ' ' + E.Apellido2 
					ELSE b.Nombres + ' ' + b.Apellidos END NombreCompleto
		
		FROM AspNetUsers AS a							
		INNER JOIN	Profiles		AS b on a.Id = b.UserId
		INNER JOIN AspNetUserRoles	AS c ON a.id = c.UserId 
		INNER JOIN (SELECT * FROM AspNetRoles	
					WHERE Name IN ('REQUISICION-GESTION-HUMANA', 'REQUISICION-GESTION-HUMANA-ASISTENTE')) AS d on c.RoleId = d.Id
		LEFT JOIN (SELECT * FROM EmpleadosActivos 
					WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE()))	AS e ON a.UserName = e.CodigoEmpleado
	) C
	WHERE C.Unidad_Negocio IS NULL AND C.CodigoEmpresa IS NULL


	UNION ALL


	--USUARIOS AGREGADOS DE MANERA MANUAL  
	SELECT Id, UserName, NombreCompleto, CodigoEmpresa, CodigoMarca, Unidad_Negocio, codigo_centro, codigo_seccion, Codigo_Sucursal, Email, Rol, 
		Sincronizar=0
	FROM 
	(
		SELECT DISTINCT a.Id, a.UserName, NombreCompleto = UPPER(e.Nombres) + ' ' + UPPER(e.Apellidos), b.CodigoEmpresa, 
			b.CodigoMarca, b.Unidad_Negocio, b.codigo_centro, b.codigo_seccion, b.Codigo_Sucursal, a.Email, Rol = d.Name 
		FROM AspNetUsers AS a
		LEFT JOIN (SELECT * FROM EmpleadosActivos 
					WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE()))	AS b ON a.UserName = b.CodigoEmpleado
		INNER JOIN  AspNetUserRoles	AS c ON a.id = c.UserId 
		INNER JOIN	Profiles		AS e on a.Id = e.UserId
		INNER JOIN  (SELECT * FROM AspNetRoles
						WHERE Name LIKE '%REQUISICION-%' AND Name NOT LIKE '%PERSONAL%')		AS d on c.RoleId = d.Id
		WHERE A.UserName IN ('31584386')
	) C


	UNION ALL


	--USUARIOS ADMINISTRATIVOS (PSC)
	SELECT a.Id, a.UserName, NombreCompleto = LTRIM(RTRIM(UPPER(B.Nombres))) + ' ' + LTRIM(RTRIM(UPPER(B.Apellidos))), CodigoEmpresa='', CodigoMarca='', 
		Unidad_Negocio='', codigo_centro='', codigo_seccion='', Codigo_Sucursal='', a.Email, Rol = 'REQUISICION-ADMINISTRADOR', Sincronizar=1
	FROM AspNetUsers AS a
	INNER JOIN Profiles B ON A.Id = B.UserId
	WHERE B.Nombres LIKE '%ADMIN%' AND B.Apellidos LIKE '%PSC%' 

) D

```
