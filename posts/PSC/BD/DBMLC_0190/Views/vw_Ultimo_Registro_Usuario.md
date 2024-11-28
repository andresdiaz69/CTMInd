# View: vw_Ultimo_Registro_Usuario

## Usa los objetos:
- [[AspNetUsers]]
- [[Profiles]]
- [[v_Requisiciones_EmpleadosActivosRetirados]]

```sql

CREATE VIEW [dbo].[vw_Ultimo_Registro_Usuario] as
SELECT	UserId,					Nombres,					Apellidos,				FechaCreacion,			UserName,		
	CodigoEmpresa,				Empresa,					codigo_centro,			nombre_centro,			CodigoMarca,
	Marca,						codigo_seccion,				nombre_seccion,			Codigo_Sucursal,		Nombre_Sucursal,
	codigo_departamento,		nombre_departamento,		Codigo_Cargo,			Nombre_Cargo,			Unidad_Negocio,
	Nombre_Unidad_Negocio,		Email
FROM 
(
	SELECT Nombres=REPLACE(REPLACE(REPLACE(UPPER(P.Nombres),' ','<>'),'><',''),'<>',' '), 
		Apellidos=REPLACE(REPLACE(REPLACE(UPPER(P.Apellidos),' ','<>'),'><',''),'<>',' '), 
		P.UserId,				P.FechaCreacion,			A.UserName,						E.CodigoEmpresa,	
		E.Empresa,				E.codigo_centro,			E.nombre_centro,				E.CodigoMarca,
		E.Marca,				E.codigo_seccion,			E.nombre_seccion,				E.Codigo_Sucursal,
		E.Nombre_Sucursal,		E.codigo_departamento,		E.nombre_departamento,			E.Codigo_Cargo,
		E.Nombre_Cargo, 		E.Unidad_Negocio,			E.Nombre_Unidad_Negocio,		A.Email
	FROM Profiles P
	LEFT JOIN AspNetUsers A ON P.UserId = A.Id
	LEFT JOIN [v_Requisiciones_EmpleadosActivosRetirados] E ON A.UserName = E.CodigoEmpleado 
) A

```
