# View: v_viaticos_EmailUsers

## Usa los objetos:
- [[AspNetRoles]]
- [[AspNetUserRoles]]
- [[AspNetUsers]]
- [[EmpleadosActivos]]
- [[Profiles]]

```sql


CREATE VIEW [dbo].[v_viaticos_EmailUsers] AS
SELECT DISTINCT Id, UserName, NombreCompleto = REPLACE(REPLACE(REPLACE(NombreCompleto,' ','<>'),'><',''),'<>',' '), CodigoEmpresa, CodigoMarca, Unidad_Negocio, 
	codigo_centro, codigo_seccion, Codigo_Sucursal, Email, Rol 
FROM 
(
	SELECT Id, UserName, NombreCompleto, CodigoEmpresa, CodigoMarca, Unidad_Negocio, codigo_centro, codigo_seccion, Codigo_Sucursal, Email, Rol
	FROM 
	(
		SELECT DISTINCT a.Id, a.UserName, NombreCompleto = b.Nombres + ' ' + b.Apellido1 + ' ' + b.Apellido2, b.CodigoEmpresa, 
			b.CodigoMarca, b.Unidad_Negocio, b.codigo_centro, b.codigo_seccion, b.Codigo_Sucursal, a.Email, Rol = d.Name 
		FROM AspNetUsers AS a
		INNER JOIN (SELECT * FROM EmpleadosActivos 
					WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE()))	AS b ON a.UserName = b.CodigoEmpleado							
		INNER JOIN AspNetUserRoles AS c ON a.id = c.UserId 
		INNER JOIN (SELECT * FROM AspNetRoles
					WHERE Name LIKE '%VIATICOS-%' ) AS d on c.RoleId = d.Id
	) A
		
	UNION ALL

	SELECT Id, UserName, REPLACE(REPLACE(REPLACE(UPPER(NombreCompleto),' ','<>'),'><',''),'<>',' ')NombreCompleto, CodigoEmpresa, CodigoMarca, 
	Unidad_Negocio, codigo_centro, codigo_seccion, Codigo_Sucursal, Email, Rol
	FROM 
	(
		SELECT DISTINCT  a.Id, a.UserName, CodigoEmpresa = e.CodigoEmpresa, CodigoMarca = e.CodigoMarca, Unidad_Negocio = e.Unidad_Negocio,
			CASE WHEN E.Nombres IS NOT NULL THEN E.Nombres + ' ' + E.Apellido1 + ' ' + E.Apellido2 
					ELSE b.Nombres + ' ' + b.Apellidos END NombreCompleto, 		
			codigo_centro = e.codigo_centro, codigo_seccion = e.codigo_seccion, Codigo_Sucursal = e.Codigo_Sucursal, a.Email, Rol = d.Name 
		FROM		AspNetUsers		AS a
		INNER JOIN	Profiles		AS b on a.Id = b.UserId
		INNER JOIN	AspNetUserRoles AS c ON a.id = c.UserId
		INNER JOIN (SELECT * FROM	AspNetRoles
					WHERE Name LIKE '%VIATICOS-%') AS d ON c.RoleId = d.Id
		LEFT JOIN	(SELECT * FROM EmpleadosActivos 
					WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE()))	AS e ON a.UserName = e.CodigoEmpleado
	) B

	UNION ALL

	SELECT Id, UserName, NombreCompleto, CodigoEmpresa, CodigoMarca, Unidad_Negocio, codigo_centro, codigo_seccion, Codigo_Sucursal, Email, Rol
	FROM 
	(
		SELECT DISTINCT a.Id, a.UserName, NombreCompleto = UPPER(e.Nombres) + ' ' + UPPER(e.Apellidos), b.CodigoEmpresa, 
			b.CodigoMarca, b.Unidad_Negocio, b.codigo_centro, b.codigo_seccion, b.Codigo_Sucursal, a.Email, Rol = d.Name 
		FROM AspNetUsers AS a
		LEFT JOIN (SELECT * FROM EmpleadosActivos 
					WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE()))	AS b ON a.UserName = b.CodigoEmpleado							
		INNER JOIN AspNetUserRoles	AS c ON a.id = c.UserId 
		INNER JOIN	Profiles		AS e on a.Id = e.UserId
		INNER JOIN (SELECT * FROM AspNetRoles	
					WHERE Name LIKE '%VIATICOS-%') AS d on c.RoleId = d.Id
	) C
	WHERE C.Unidad_Negocio IS NULL AND C.CodigoEmpresa IS NULL

	UNION ALL

	--USUARIOS AGREGADOS DE MANERA MANUAL 
	SELECT Id, UserName, NombreCompleto, CodigoEmpresa, CodigoMarca, Unidad_Negocio, codigo_centro, codigo_seccion, Codigo_Sucursal, Email, Rol
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
						WHERE Name LIKE '%VIATICOS-%')		AS d on c.RoleId = d.Id
		
	) C
) D

```
