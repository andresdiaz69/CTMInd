# View: vw_Descargos_Usuarios

## Usa los objetos:
- [[AspNetRoles]]
- [[AspNetUserRoles]]
- [[AspNetUsers]]
- [[Cargos]]
- [[Centros]]
- [[Departamentos]]
- [[EmpleadosActivos]]
- [[Empresas]]
- [[Profiles]]
- [[Secciones]]
- [[vw_Descargos_UnidadNegocio]]

```sql
CREATE VIEW [dbo].[vw_Descargos_Usuarios] AS
SELECT DISTINCT T.Id,T.UserName,T.NombreCompleto,T.CodigoEmpresa,E.NombreEmpresa,U.CodUnidadNegocio,U.NombreUnidadNegocio,C.CodigoCentro,C.NombreCentro, 
	S.CodigoSeccion,S.Seccion AS NombreSeccion,D.CodigoDepartamento,D.NombreDepartamento,CodigoSucursal=SE.CodSedeAmbiental,NombreSucursal=SE.SedeAmbiental, 
	Email,Rol,CA.CodigoCargo,CA.NombreCargo,Estado
FROM 
(
	--Usuarios con Registro en Empleados Activos
	SELECT DISTINCT a.Id,a.UserName,NombreCompleto=REPLACE(REPLACE(REPLACE(b.Nombres+' '+b.Apellido1+' '+b.Apellido2,' ','<>'),'><',''),'<>',' '), 
		b.CodigoEmpresa,b.Unidad_Negocio,b.codigo_centro,b.codigo_seccion,b.Codigo_Sucursal,a.Email,Rol=d.Name,b.Codigo_Cargo,b.codigo_departamento,
		Estado = 'ACTIVO'

	FROM AspNetUsers AS a

	INNER JOIN 
	(
		SELECT * FROM EmpleadosActivos 
		WHERE Ano_Periodo = YEAR(GETDATE()) 
		AND Mes_Periodo = MONTH(GETDATE())
	)	AS b ON a.UserName = b.CodigoEmpleado							
		
	INNER JOIN AspNetUserRoles AS c ON a.id = c.UserId 
		
	INNER JOIN 
	(
		SELECT * FROM AspNetRoles 
		WHERE Name LIKE 'DESCARGOS-%'
	) AS d on c.RoleId = d.Id

	UNION ALL

	--Usuarios sin Probabilidad de estar en Empleados Activos
	SELECT Id, UserName, REPLACE(REPLACE(REPLACE(UPPER(NombreCompleto),' ','<>'),'><',''),'<>',' ')NombreCompleto, CodigoEmpresa, Unidad_Negocio,
		codigo_centro, codigo_seccion, Codigo_Sucursal, Email, Rol, Codigo_Cargo, codigo_departamento, Estado
	FROM 
	(
		SELECT DISTINCT  a.Id, a.UserName, CodigoEmpresa = e.CodigoEmpresa, Unidad_Negocio = e.Unidad_Negocio, Codigo_Cargo, codigo_departamento,
			CASE WHEN E.Nombres IS NOT NULL THEN E.Nombres + ' ' + E.Apellido1 + ' ' + E.Apellido2 
					ELSE b.Nombres + ' ' + b.Apellidos END NombreCompleto, 
			CASE WHEN e.Estado IS NOT NULL THEN 'ACTIVO' ELSE 'INACTIVO' END AS Estado,
			codigo_centro = e.codigo_centro, codigo_seccion = e.codigo_seccion, Codigo_Sucursal = e.Codigo_Sucursal, a.Email, Rol = d.Name 
		FROM		AspNetUsers		AS a
		INNER JOIN	Profiles		AS b on a.Id = b.UserId
		INNER JOIN	AspNetUserRoles AS c ON a.id = c.UserId
		INNER JOIN 
		(
			SELECT * FROM	AspNetRoles
			WHERE Name IN ('DESCARGOS-ADMINISTRADOR', 'DESCARGOS-ABOGADO')
		) AS d ON c.RoleId = d.Id
		LEFT JOIN	
		(
			SELECT * FROM EmpleadosActivos 
			WHERE Ano_Periodo = YEAR(GETDATE()) 
			AND Mes_Periodo = MONTH(GETDATE())
		)	AS e ON a.UserName = e.CodigoEmpleado
	) B
) T

LEFT JOIN Empresas E ON T.CodigoEmpresa = E.CodigoEmpresa

LEFT JOIN
(
	SELECT DISTINCT CodUnidadNegocio, NombreUnidadNegocio 
	FROM vw_Descargos_UnidadNegocio
) U ON LTRIM(RTRIM(T.Unidad_Negocio)) = U.CodUnidadNegocio

LEFT JOIN Centros C ON T.codigo_centro = C.CodigoCentro

LEFT JOIN Secciones S ON T.codigo_seccion = S.CodigoSeccion

LEFT JOIN
(
	SELECT DISTINCT CodSedeAmbiental, SedeAmbiental
	FROM vw_Descargos_UnidadNegocio
) SE ON LTRIM(RTRIM(T.Codigo_Sucursal)) = SE.CodSedeAmbiental

LEFT JOIN Departamentos D ON T.codigo_departamento = D.CodigoDepartamento

LEFT JOIN Cargos CA ON T.Codigo_Cargo = CA.CodigoCargo

```
