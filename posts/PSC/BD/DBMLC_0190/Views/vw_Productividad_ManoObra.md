# View: vw_Productividad_ManoObra

## Usa los objetos:
- [[Centros]]
- [[ComisionesSpigaTallerPorOT]]
- [[EmpleadosActivos]]
- [[EmpleadosRetirados]]
- [[Empresas]]
- [[EstadosEmpleado]]
- [[UnidadDeNegocio]]

```sql
CREATE VIEW [dbo].[vw_Productividad_ManoObra] AS
SELECT Ano_Periodo,				Mes_Periodo,				CodigoEmpresa,			NombreEmpresa,		 		CodUnidadNegocio,
	NombreUnidadNegocio,		CodigoCentro,				NombreCentro,			CodigoSeccion,				NombreSeccion,
	CodDepartamento,			NombreDepartamento,			CodCargo,				NombreCargo,				TipoIntCargo,
	CedulaOperario,				NombreOperario,				Estado,					FechaIngreso,				FechaRetiro,
	CodUnidad_Novasoft,			NombreUnidad_Novasoft,		UnidadesVendidas=SUM(UnidadesVendidas)
FROM 
(
	SELECT MO.Ano_Spiga AS Ano_Periodo,					MO.Mes_Spiga AS Mes_Periodo,				U.CodEmpresa AS CodigoEmpresa,
		U.NombreEmpresa,		 						CodigoSeccion=U.CodSeccion,					U.NombreSeccion,			
		CodDepartamento=U.CodDepartamento,				CodCargo=E.Codigo_Cargo,					NombreCargo=E.Nombre_Cargo,
		MO.TipoIntCargo,								MO.CedulaOperario,							EE.Estado,									
		EE.FechaIngreso,								EE.FechaRetiro,								MO.UnidadesVendidas,
		U.NombreDepartamento,							MO.CodigoCentro,							C.NombreCentro,
		U.CodUnidadNegocio,								U.NombreUnidadNegocio,
		CASE WHEN E.CodigoEmpleado IS NULL THEN MO.NombreOperario ELSE E.NombreCompleto END NombreOperario,				
		CASE WHEN E.CodigoEmpleado IS NULL THEN 0 ELSE 	E.Unidad_Negocio END CodUnidad_Novasoft,				
		CASE WHEN E.CodigoEmpleado IS NULL THEN 'SIN LINEA' ELSE 
			(CASE WHEN E.Unidad_Negocio = 3 THEN 'MERCEDES-BENZ' ELSE E.Nombre_Unidad_Negocio END) END NombreUnidad_Novasoft
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
	) MO

	LEFT JOIN 
	(
		SELECT Estado='ACTIVO',			CodigoEmpleado,				Ano_Periodo,			Mes_Periodo,			CodigoEmpresa,			
			Empresa,					codigo_centro,				nombre_centro,			codigo_seccion,			nombre_seccion,		
			codigo_departamento,		Codigo_Cargo,				Nombre_Cargo,			Unidad_Negocio,
			CASE WHEN Unidad_Negocio = 3 THEN 'MERCEDES-BENZ' ELSE Nombre_Unidad_Negocio END AS Nombre_Unidad_Negocio,
			REPLACE(REPLACE(REPLACE(UPPER(Nombres + ' ' + Apellido1 + ' ' + Apellido2),' ','<>'),'><',''),'<>',' ')NombreCompleto
		FROM EmpleadosActivos
		WHERE Ano_Periodo = YEAR(GETDATE())
			AND Mes_Periodo = MONTH(GETDATE())
	
		UNION ALL 

		SELECT Estado='RETIRADO',			A.CodigoEmpleado,				A.Ano_Periodo,			A.Mes_Periodo,			A.CodigoEmpresa,			
			A.Empresa,						A.codigo_centro,				A.nombre_centro,		A.codigo_seccion,		A.nombre_seccion,		
			A.codigo_departamento,			A.Codigo_Cargo,					A.Nombre_Cargo,			A.Unidad_Negocio,
			CASE WHEN A.Unidad_Negocio = 3 THEN 'MERCEDES-BENZ' ELSE A.Nombre_Unidad_Negocio END AS Nombre_Unidad_Negocio,
			REPLACE(REPLACE(REPLACE(UPPER(Nombres + ' ' + Apellido1 + ' ' + Apellido2),' ','<>'),'><',''),'<>',' ')NombreCompleto
		FROM EmpleadosRetirados A
		INNER JOIN (
			SELECT MAX(Fecha_retiro) FECHA, CodigoEmpleado FROM EmpleadosRetirados GROUP BY CodigoEmpleado
		) CC ON CC.CodigoEmpleado = A.CodigoEmpleado AND CC.FECHA = A.Fecha_retiro
		WHERE Ano_Periodo >= YEAR(GETDATE())-5 
			AND A.CodigoEmpleado NOT IN (SELECT CodigoEmpleado 
										FROM EmpleadosActivos
										WHERE Ano_Periodo = YEAR(GETDATE())
										AND Mes_Periodo = MONTH(GETDATE()))
	) AS E ON E.CodigoEmpleado = MO.CedulaOperario

	LEFT JOIN EstadosEmpleado AS EE ON MO.Ano_Spiga = EE.Año_Periodo AND MO.Mes_Spiga = EE.Mes_Periodo 
									AND MO.CedulaOperario = EE.CodigoEmpleado
	
	LEFT JOIN Centros C ON C.CodigoCentro = MO.CodigoCentro

	LEFT JOIN (
		SELECT DISTINCT CodUnidadNegocio, CodSeccion, NombreSeccion, CodDepartamento, CodEmpresa, NombreEmpresa,
			CASE WHEN LTRIM(RTRIM(CodDepartamento)) = 'CO' THEN 'ADMINISTRACION'
				WHEN LTRIM(RTRIM(CodDepartamento)) = 'RE' THEN 'REPUESTOS'
				WHEN LTRIM(RTRIM(CodDepartamento)) = 'TC' THEN 'TALLER COLISION'
				WHEN LTRIM(RTRIM(CodDepartamento)) = 'TM' THEN 'TALLER MECANICA'
				WHEN LTRIM(RTRIM(CodDepartamento)) = 'VN' THEN 'VEHICULOS NUEVOS'
				WHEN LTRIM(RTRIM(CodDepartamento)) = 'VO' THEN 'VEHICULOS OCASION' END NombreDepartamento,
			CASE WHEN CodUnidadNegocio = 3 THEN 'MERCEDES-BENZ' ELSE UPPER(NombreUnidadNegocio) END	NombreUnidadNegocio 
		FROM UnidadDeNegocio U
		LEFT JOIN Empresas EM ON EM.CodigoEmpresa = U.CodEmpresa
		WHERE CodEmpresa in (24,5,1,22,27,6,4)
	) U ON U.CodSeccion = MO.CodigoSeccion AND U.CodEmpresa = MO.CodigoEmpresa
	
	--WHERE Ano_Spiga = 2023 and Mes_Spiga = 8 -- and CedulaOperario = '1121867315' and CodigoCentro = 75 
) A
GROUP BY Ano_Periodo,			Mes_Periodo,				CodigoEmpresa,			NombreEmpresa,		 		CodUnidadNegocio,
	NombreUnidadNegocio,		CodigoCentro,				NombreCentro,			CodigoSeccion,				NombreSeccion,
	CodDepartamento,			NombreDepartamento,			CodCargo,				NombreCargo,				TipoIntCargo,
	CedulaOperario,				NombreOperario,				Estado,					FechaIngreso,				FechaRetiro,
	CodUnidad_Novasoft,			NombreUnidad_Novasoft

```
