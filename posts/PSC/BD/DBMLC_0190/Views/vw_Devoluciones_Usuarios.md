# View: vw_Devoluciones_Usuarios

## Usa los objetos:
- [[AspNetRoles]]
- [[AspNetUserRoles]]
- [[AspNetUsers]]
- [[EmpleadosActivos]]
- [[Profiles]]

```sql

CREATE VIEW [dbo].[vw_Devoluciones_Usuarios] AS
SELECT DISTINCT
	UserID,				CedulaUsuario,			NombreUsuario,			Correo,				CodEmpresa, 
	CodUnidadNegocio,	CodCentro,				CodSeccion,				CodDepartamento,	CodSucursal, 
	CodCargo,			RoleID,					Rol,					Estado
FROM 
(
	SELECT DISTINCT  
		a.Id AS UserID,								a.UserName AS CedulaUsuario,			CodEmpresa = e.CodigoEmpresa, 
		CodUnidadNegocio = e.Unidad_Negocio,		Codigo_Cargo AS CodCargo,				codigo_departamento AS CodDepartamento,
		CodCentro = e.codigo_centro,				CodSeccion = e.codigo_seccion,			CodSucursal = e.Codigo_Sucursal, 
		a.Email AS Correo,							d.Id AS RoleID,							Rol = d.Name, 

		CASE WHEN E.Nombres IS NOT NULL THEN E.Nombres + ' ' + E.Apellido1 + ' ' + E.Apellido2 
				ELSE b.Nombres + ' ' + b.Apellidos END NombreUsuario, 

		CASE WHEN e.Estado IS NOT NULL THEN 'ACTIVO' ELSE 'INACTIVO' END AS Estado

	FROM		AspNetUsers		AS a
	INNER JOIN	Profiles		AS b on a.Id = b.UserId
	INNER JOIN	AspNetUserRoles AS c ON a.id = c.UserId
	INNER JOIN 
	(
		SELECT * FROM	AspNetRoles
		WHERE Name LIKE 'CONTROL-DEV%'
	) AS d ON c.RoleId = d.Id
	LEFT JOIN	
	(
		SELECT * FROM EmpleadosActivos 
		WHERE Ano_Periodo = YEAR(GETDATE()) 
		AND Mes_Periodo = MONTH(GETDATE())
	)	AS e ON a.UserName = e.CodigoEmpleado
)A 

```
