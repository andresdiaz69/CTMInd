# View: vw_Descargos_Solicitudes

## Usa los objetos:
- [[AspNetUsers]]
- [[Cargos]]
- [[Descargos_Empleado]]
- [[Descargos_FaltasComunes]]
- [[Descargos_Sanciones]]
- [[Descargos_SolicitudDescargos]]
- [[Descargos_Solicitudes]]
- [[EmpleadosActivos]]
- [[Profiles]]
- [[vw_Descargos_Estados]]
- [[vw_Descargos_FuerosBySolicitudes]]
- [[vw_Descargos_UnidadNegocio]]

```sql

CREATE VIEW [dbo].[vw_Descargos_Solicitudes] AS
SELECT DISTINCT 
	--Descargo
	S.IdDescargo,					D.IdEstado,						D.NombreEstado,					DetalleEstado,					D.FechaSolicitud,
	D.DescripcionHechos,			D.CodigoFalta,					D.NombreFalta,					D.CodigoSancion,				D.NombreSancion,
	D.CodSAI,						D.CartaSancionFirmada,			D.SancionDefitiva,				D.NombreSancionDefitiva,		D.EstadoUsuario,
	D.TipoEstado,

	--Fueros
	D.Enfermedad,					D.PrePension,					D.CabezaFamilia,				D.Maternidad,					D.Convivencia,
	D.OtrosFueros,					D.DescOtrosFueros,			
	
	--Empleado
	E.CedulaEmpleado,				E.NombreEmpleado,				E.CodCargoEmpleado,				E.NombreCargoEmpelado,			E.CodEmpresaEmpleado,
	E.NombreEmpresaEmpleado,		E.CodUnidadEmpleado,			E.NombreUnidadEmpleado,			E.CodCentroEmpleado,			E.NombreCentroEmpleado,
	E.CodSeccionEmpleado,			E.NombreSeccionEmpleado,		E.CodDepartamentoEmpleado,		E.NombreDepartamentoEmpleado,	
	
	--Solicitante
	S.IdSolicitante,				S.CedulaSolicitante,			S.NombreSolicitante,			S.CodCargoSolicitante,			S.NombreCargoSolicitante,
	S.CodEmpresaSolicitante,		S.NombreEmpresaSolicitante,		S.CodUnidadSolicitante,			S.NombreUnidadSolicitante,		S.CodCentroSolicitante,
	S.NombreCentroSolicitante,		S.CodSeccionSolicitante,		S.NombreSeccionSolicitante,		S.CodDepartamentoSolicitante,	S.NombreDepartamentoSolicitante,
	S.Email
FROM 
(
	SELECT	S.IdSolicitante,									CedulaSolicitante=U.UserName,								CodCargoSolicitante=E.Codigo_Cargo,
		NombreCargoSolicitante=c.NombreCargo,					CodEmpresaSolicitante=E.CodigoEmpresa,						NombreEmpresaSolicitante=e.Empresa,
		CodUnidadSolicitante=e.Unidad_Negocio,					NombreUnidadSolicitante=e.Nombre_Unidad_Negocio,			CodCentroSolicitante=e.codigo_centro,
		NombreCentroSolicitante=e.nombre_centro,				CodSeccionSolicitante=e.codigo_seccion,						NombreSeccionSolicitante=e.nombre_seccion,
		CodDepartamentoSolicitante=e.codigo_departamento,		NombreDepartamentoSolicitante=e.nombre_departamento,		u.Email,
		S.IdDescargo,											S.CedulaEmpleado,	
		NombreSolicitante = CONCAT(LTRIM(RTRIM(P.Nombres)),' ',LTRIM(RTRIM(P.Apellidos)))

	FROM Descargos_Solicitudes S

	LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
	
	LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
	
	LEFT JOIN EmpleadosActivos E ON E.Ano_Periodo = YEAR(GETDATE()) AND E.Mes_Periodo = MONTH(GETDATE()) AND E.CodigoEmpleado = U.UserName
	
	LEFT JOIN Cargos C ON C.CodigoCargo = E.Codigo_Cargo AND Obsoleto = 0 AND Activo = 1
) S

LEFT JOIN 
(
	SELECT	D.IdDescargo,				D.IdEstado,					E.NombreEstado,				DetalleEstado = E.Descripcion, 			
			D.FechaSolicitud,			D.DescripcionHechos,		D.CodigoFalta,				F.NombreFalta, 				
			D.CodigoSancion, 			S.NombreSancion,			D.CodSAI,					D.CartaSancionFirmada,		
			E.EstadoUsuario,			E.TipoEstado,				D.SancionDefitiva,			NombreSancionDefitiva = SA_D.NombreSancion,			
			DF.Enfermedad,				DF.PrePension, 				DF.CabezaFamilia,			DF.Maternidad,
			DF.Convivencia,				DF.OtrosFueros,				DF.DescOtrosFueros

	FROM Descargos_SolicitudDescargos D

	LEFT JOIN Descargos_FaltasComunes F ON D.CodigoFalta = F.CodigoFalta

	LEFT JOIN Descargos_Sanciones S ON S.CodigoSancion = D.CodigoSancion

	LEFT JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado

	LEFT JOIN Descargos_Sanciones SA_D ON SA_D.CodigoSancion = D.SancionDefitiva

	LEFT JOIN vw_Descargos_FuerosBySolicitudes DF ON DF.IdDescargo = D.IdDescargo

) D ON S.IdDescargo = D.IdDescargo

LEFT JOIN 
(
	SELECT	E.CedulaEmpleado,								E.NombreEmpleado,									CodCargoEmpleado = E.CodCargo, 
			NombreCargoEmpelado = C.NombreCargo,			CodEmpresaEmpleado = E.CodEmpresa,					NombreEmpresaEmpleado = U.NombreEmpresa, 
			CodUnidadEmpleado =	E.CodUnidadNegocio,			NombreUnidadEmpleado = U.NombreUnidadNegocio,		CodCentroEmpleado = E.CodCentro,
			NombreCentroEmpleado = U.NombreCentro,			CodSeccionEmpleado = E.CodSeccion,					NombreSeccionEmpleado = U.NombreSeccion,
			CodDepartamentoEmpleado = E.CodDepartamento,	NombreDepartamentoEmpleado = U.NombreDepartamento
	
	FROM Descargos_Empleado E
	
	LEFT JOIN vw_Descargos_UnidadNegocio U ON U.CodEmpresa = E.CodEmpresa AND U.CodCentro = E.CodCentro 
			AND U.CodSeccion = E.CodSeccion AND U.CodDepartamento = E.CodDepartamento 
			AND U.CodUnidadNegocio = E.CodUnidadNegocio
	
	LEFT JOIN Cargos C ON C.CodigoCargo = E.CodCargo AND Obsoleto = 0 AND Activo = 1

) E ON E.CedulaEmpleado = S.CedulaEmpleado

```
