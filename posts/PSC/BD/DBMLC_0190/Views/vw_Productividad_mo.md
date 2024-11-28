# View: vw_Productividad_mo

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[EmpleadosActivos]]
- [[EstadosEmpleado]]
- [[Secciones]]
- [[v_EmpleadosActivosRetirados]]

```sql
CREATE VIEW [dbo].[vw_Productividad_mo] AS
SELECT Ano_Spiga, Mes_Spiga, CodigoEmpresa, Empresa, A.Unidad_Negocio, A.Nombre_Unidad_Negocio, CodigoCentro, Centro,CodigoSeccion,Seccion,TipoIntCargo, 
	CedulaOperario, NombreOperario, Estado, FechaIngreso, FechaRetiro, UnidadesVendidas = SUM (UnidadesVendidas)
FROM 
(
	SELECT A.Ano_Spiga,A.Mes_Spiga,A.CodigoEmpresa,A.Empresa,A.Unidad_Negocio,A.Nombre_Unidad_Negocio,A.CodigoCentro,A.Centro,A.CodigoSeccion,A.Seccion,		
		CASE WHEN A.CedulaOperario = 8300049938 THEN 'ACTIVO'
			WHEN A.CedulaOperario = 9002830997 THEN 'ACTIVO'
			WHEN A.CedulaOperario = 9003362494 THEN 'ACTIVO'
			WHEN A.CedulaOperario = 8600190638 THEN 'ACTIVO'
			WHEN A.CedulaOperario = 86000000 THEN 'ACTIVO'
		WHEN B.Estado IS NULL THEN 'INACTIVO' ELSE B.Estado END AS Estado, B.FechaIngreso, B.FechaRetiro,A.TipoIntCargo,A.CedulaOperario,NombreOperario,A.UnidadesVendidas 
	FROM 
	(
		SELECT Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,Unidad_Negocio,CASE WHEN Nombre_Unidad_Negocio IS NULL THEN 'Sin Marca' ELSE Nombre_Unidad_Negocio END AS Nombre_Unidad_Negocio,
			CodigoCentro,Centro,CodigoSeccion,Seccion,TipoIntCargo, 
			CedulaOperario, CASE WHEN NombreEmpleado IS NULL THEN NombreOperario ELSE NombreEmpleado END NombreOperario, UnidadesVendidas
		FROM
		(
			SELECT A.Ano_Spiga,A.Mes_Spiga,A.CodigoEmpresa,A.Empresa,B.Unidad_Negocio,B.Nombre_Unidad_Negocio,A.CodigoCentro,A.Centro,A.CodigoSeccion,s.Seccion,A.TipoIntCargo,
				A.CedulaOperario,A.NombreOperario,B.NombreEmpleado,UnidadesVendidas = SUM(A.UnidadesVendidas)
			FROM 
			(
				SELECT A.Ano_Spiga,A.Mes_Spiga,A.CodigoEmpresa,A.Empresa,A.CodigoCentro,A.Centro,A.CodigoSeccion,A.TipoIntCargo,
					CASE WHEN A.CedulaOperario = 791417761 THEN 79141776 
						WHEN A.CedulaOperario = 99093010481 THEN 1121966278		
						WHEN CedulaOperario = 10552726085 THEN 1055272608
						WHEN A.CedulaOperario = 528857141 THEN 52885714 
						WHEN A.CedulaOperario = 1026298221 THEN 1026298211
						WHEN A.CedulaOperario = 790572591 THEN 79057259 ELSE A.CedulaOperario END AS CedulaOperario,
						A.NombreOperario,UnidadesVendidas = SUM(A.UnidadesVendidas)
				FROM ComisionesSpigaTallerPorOT AS A	
				WHERE TipoOperacion = 'MO' and Ano_Spiga > 2018
				GROUP BY A.Ano_Spiga,A.Mes_Spiga,A.CodigoEmpresa,A.Empresa,A.CodigoCentro,A.Centro,CodigoSeccion,A.TipoIntCargo,A.TipoOperacion,A.CedulaOperario,A.NombreOperario
			) AS A	
			LEFT JOIN 
			(
				SELECT CodigoEmpleado,	
					
					(SELECT TOP(1) NombreEmpleado = Nombres+ ' ' + Apellido1 + ' ' + Apellido2 
					FROM EmpleadosActivos 
					WHERE CodigoEmpleado = a.CodigoEmpleado 
					ORDER BY Ano_Periodo DESC, Mes_Periodo DESC) NombreEmpleado,
					
					(SELECT TOP(1) Unidad_Negocio 
					FROM EmpleadosActivos 
					WHERE CodigoEmpleado = a.CodigoEmpleado 
					ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Unidad_Negocio,
					
					(SELECT TOP(1) Nombre_Unidad_Negocio 
					FROM EmpleadosActivos 
					WHERE CodigoEmpleado = a.CodigoEmpleado 
					ORDER BY Ano_Periodo DESC, Mes_Periodo DESC)  Nombre_Unidad_Negocio
				
				FROM v_EmpleadosActivosRetirados a GROUP BY CodigoEmpleado
			) AS B ON A.CedulaOperario = B.CodigoEmpleado
			LEFT JOIN Secciones AS S ON A.CodigoSeccion = S.CodigoSeccion
			GROUP BY A.Ano_Spiga,A.Mes_Spiga,A.CodigoEmpresa,A.Empresa,B.Unidad_Negocio,B.Nombre_Unidad_Negocio,A.CodigoCentro,A.Centro,A.CodigoSeccion,s.Seccion,A.TipoIntCargo,
				A.CedulaOperario,b.NombreEmpleado,a.NombreOperario
		)A		
	) A
	LEFT JOIN EstadosEmpleado AS B ON A.Ano_Spiga = B.Año_Periodo AND A.Mes_Spiga = B.Mes_Periodo AND A.CedulaOperario = B.CodigoEmpleado	
) A
--WHERE Ano_Spiga = 2019 AND Mes_Spiga = 1
GROUP BY Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,Unidad_Negocio,Nombre_Unidad_Negocio,CodigoCentro,Centro,CodigoSeccion,Seccion,TipoIntCargo,
	CedulaOperario,NombreOperario,Estado,FechaIngreso,FechaRetiro

```
