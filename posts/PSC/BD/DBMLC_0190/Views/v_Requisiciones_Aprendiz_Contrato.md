# View: v_Requisiciones_Aprendiz_Contrato

## Usa los objetos:
- [[AspNetUsers]]
- [[Cargos]]
- [[EmpleadosActivos]]
- [[JerarquiaEmpleados]]
- [[Profiles]]
- [[rhh_emplea]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Aprendiz_Contrato] AS
SELECT CodigoEmpleado,			Nombres,				Apellido1,					Apellido2,						NombreCompleto,
	Telefono_fijo,				Celular,				Fecha_Nacimiento,			CorreoEmpleado,					CodCargo_Actual,			
	NombreCargo_Actual,			CodCargo_Nuevo,			NombreCargo_Nuevo,			Fecha_Ingreso,					FechaTerminacionContrato,			
	CodigoEmpresa,				Empresa,				Unidad_Negocio,				Nombre_Unidad_Negocio,			codigo_centro,							
	nombre_centro,				codigo_seccion,			nombre_seccion,				codigo_departamento,			nombre_departamento, 
	Codigo_Sucursal,			Nombre_Sucursal,		CC_Jefe1,					Nombre_Jefe1,					Correo_Jefe1
FROM
(
	SELECT EA.CodigoEmpleado,						EA.Nombres,										EA.Apellido1,				
		EA.Apellido2,								EA.Telefono_fijo,								EA.Celular,										
		EA.Fecha_Nacimiento,						EA.Email AS CorreoEmpleado,						EA.Codigo_Cargo AS CodCargo_Actual,			
		EA.Nombre_Cargo AS NombreCargo_Actual,		C.CodigoCargo AS CodCargo_Nuevo,				C.NombreCargo AS NombreCargo_Nuevo, 
		N.fec_ing AS Fecha_Ingreso,					N.fec_egr AS FechaTerminacionContrato,			EA.CodigoEmpresa, 
		EA.Empresa,									EA.Unidad_Negocio,								EA.Nombre_Unidad_Negocio,
		EA.codigo_centro,							EA.nombre_centro,								EA.codigo_seccion, 
		EA.nombre_seccion,							EA.codigo_departamento,							EA.nombre_departamento, 
		EA.Codigo_Sucursal,							EA.Nombre_Sucursal,								JE.CC_Jefe1, 
		JE.Nombre_Jefe1,							JE.Correo_Jefe1,
		NombreCompleto = REPLACE(REPLACE(REPLACE(UPPER(EA.Nombres + ' ' + EA.Apellido1 + ' ' + EA.Apellido2),' ','<>'),'><',''),'<>',' ')

	FROM EmpleadosActivos AS EA

	LEFT JOIN (
		SELECT JE.Cedula, JE.CC_Jefe1, APU.Email AS Correo_Jefe1,
			Nombre_Jefe1 = REPLACE(REPLACE(REPLACE(UPPER(P.Nombres + ' ' + P.Apellidos),' ','<>'),'><',''),'<>',' ')
		FROM JerarquiaEmpleados AS JE
		LEFT JOIN AspNetUsers AS APU ON LTRIM(RTRIM(APU.UserName)) = CONVERT(NVARCHAR(50),JE.CC_Jefe1)
		LEFT JOIN Profiles AS P ON P.UserId = APU.Id
	) AS JE ON JE.Cedula = EA.CodigoEmpleado

	LEFT JOIN Cargos AS C ON C.CodigoCargo = 167

	LEFT JOIN [Novasoft_CT_MM].[dbo].[rhh_emplea] AS N ON N.cod_emp = EA.CodigoEmpleado

	WHERE EA.Ano_Periodo = YEAR(GETDATE()) 
		AND EA.Mes_Periodo = MONTH(GETDATE())
		AND EA.Codigo_Cargo = 166 
) A

```
