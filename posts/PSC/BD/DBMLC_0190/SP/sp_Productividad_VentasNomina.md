# Stored Procedure: sp_Productividad_VentasNomina

## Usa los objetos:
- [[Centros]]
- [[EmpleadosActivos]]
- [[EstadosEmpleado]]
- [[Periodos]]
- [[ProductividadTipoVehiculo]]
- [[ProductividadVentasNomina]]
- [[VehiculosMarcas]]
- [[vw_UnidadDeNegocio]]

```sql
create PROCEDURE [dbo].[sp_Productividad_VentasNomina]
(
	@AñoPrimerFecha INT, 
	@MesesPrimeraFecha NVARCHAR(255), 
	@AñoSegundoFecha INT, 
	@MesesSegundoFecha NVARCHAR(255)
) AS
--SET @AñoPrimerFecha = 2023
--SET @MesesPrimeraFecha = ',1,2,3,4,5,'
--SET @AñoSegundoFecha = 2022
--SET @MesesSegundoFecha = ',10,11,12,'

BEGIN
	-- Verifica si la tabla temporal existe
	IF OBJECT_ID(N'tempdb.dbo.#TempConsultaGeneral', N'U') IS NOT NULL
			DROP TABLE #TempConsultaGeneral

	
	IF OBJECT_ID(N'tempdb.dbo.#TempConsultaConUnidad', N'U') IS NOT NULL
			DROP TABLE #TempConsultaConUnidad

	
	IF OBJECT_ID(N'tempdb.dbo.#TempConsultaSinUnidad', N'U') IS NOT NULL
			DROP TABLE #TempConsultaSinUnidad


	--CONSULTAR LA INFORMACIÓN DE LAS VENTAS A EXCEPCIÓN DE LA UNIDAD DE NEGOCIO 4 (USC)
	SELECT	Ano_Periodo,					Mes_Periodo,				Unidad_Negocio,				Nombre_Unidad_Negocio,			CodigoMarca,			
			Marca,							CodigoCentro, 				Centro,						CodigoEmpleado,					NombreEmpleado,				
			CodigoTipoVehiculo, 			TipoVehiculo, 				FechaIngreso,				FechaRetiro,					Estado AS EstadoEmpleado,						
			Cantidad

	INTO #TempConsultaGeneral

	FROM 
	(
		SELECT 	A.Ano_Periodo,				A.Mes_Periodo,				A.Unidad_Negocio,				Nombre_Unidad_Negocio = U.NombreUnidadNegocio, 
				A.CodigoMarca,				M.Marca,					A.CodigoCentro, 				Centro = C.NombreCentro, 
				A.CodigoEmpleado,			EM.NombreEmpleado,			A.CodigoTipoVehiculo, 			TP.TipoVehiculo, 		
				est.FechaIngreso,			est.FechaRetiro,			est.Estado,						Cantidad

		FROM
		(
			SELECT	A.Ano_Periodo,			A.Mes_Periodo,				A.Unidad_Negocio,				A.CodigoMarca, 
					A.CodigoCentro,			A.CodigoEmpleado,			A.CodigoTipoVehiculo, 			Cantidad = SUM(ISNULL(B.Cantidad,0))
				
			FROM 
			(
				SELECT	Per.Ano_Periodo,		Per.Mes_Periodo,			Inf.Unidad_Negocio,			Inf.CodigoMarca, 
						Inf.CodigoCentro, 		Inf.CodigoEmpleado,			Inf.CodigoTipoVehiculo

				FROM Periodos Per
				CROSS JOIN 
				(
					SELECT DISTINCT Unidad_Negocio,		CodigoMarca,	CodigoCentro,		CodigoEmpleado,		CodigoTipoVehiculo
					FROM ProductividadVentasNomina
					WHERE (Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
						OR (Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
				) Inf
				WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
					OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
			) A
			LEFT JOIN ProductividadVentasNomina B ON A.Ano_Periodo = B.Ano_Periodo			AND A.Mes_Periodo = B.Mes_Periodo
											AND A.Unidad_Negocio = B.Unidad_Negocio			AND A.CodigoMarca = B.CodigoMarca
											AND A.CodigoCentro = B.CodigoCentro				AND A.CodigoEmpleado = B.CodigoEmpleado
											AND A.CodigoTipoVehiculo = B.CodigoTipoVehiculo

			GROUP BY	A.Ano_Periodo,		A.Mes_Periodo,			A.Unidad_Negocio,		A.CodigoMarca, 
						A.CodigoCentro,		A.CodigoEmpleado,		A.CodigoTipoVehiculo
		) A

		INNER JOIN EstadosEmpleado as est on A.CodigoEmpleado = est.CodigoEmpleado AND A.Ano_Periodo = est.Año_Periodo AND A.Mes_Periodo = est.Mes_Periodo

		LEFT JOIN 
		(
			SELECT DISTINCT CodUnidadNegocio, NombreUnidadNegocio 
			FROM vw_UnidadDeNegocio
		) U ON A.Unidad_Negocio = U.CodUnidadNegocio

		LEFT JOIN VehiculosMarcas M ON A.CodigoMarca = M.CodigoMarca

		LEFT JOIN Centros C ON A.CodigoCentro = C.CodigoCentro

		LEFT JOIN ProductividadTipoVehiculo TP ON A.CodigoTipoVehiculo = TP.CodigoTipoVehiculo
		
		INNER JOIN 
		(
			SELECT DISTINCT CodigoEmpleado,
				NombreEmpleado=MAX(REPLACE(REPLACE(REPLACE(Nombres+' '+Apellido1+' '+Apellido2,' ','<>'),'><',''),'<>',' '))
			FROM EmpleadosActivos 
			GROUP BY CodigoEmpleado
		) EM ON EM.CodigoEmpleado = A.CodigoEmpleado


		UNION ALL


		SELECT	Ano_Periodo,					Mes_Periodo,				Unidad_Negocio,					Nombre_Unidad_Negocio, 
				CodigoMarca,					Marca,						CodigoCentro, 					Centro, 
				CodigoEmpleado,					NombreEmpleado,				CodigoTipoVehiculo, 			TipoVehiculo, 		
				FechaIngreso,					FechaRetiro,				Estado,							Cantidad
		FROM 
		(
			SELECT  A.Ano_Periodo,				A.Mes_Periodo,				A.Unidad_Negocio,				Nombre_Unidad_Negocio = U.NombreUnidadNegocio, 
					A.CodigoMarca,				M.Marca,					A.CodigoCentro, 				Centro = C.NombreCentro, 
					A.CodigoEmpleado,			EM.NombreEmpleado,			A.CodigoTipoVehiculo, 			A.TipoVehiculo, 		
					est.FechaIngreso,			est.FechaRetiro,			est.Estado,						A.Cantidad
				

			FROM ProductividadVentasNomina A
		
			LEFT JOIN EstadosEmpleado as est on A.CodigoEmpleado = est.CodigoEmpleado AND A.Ano_Periodo = est.Año_Periodo AND A.Mes_Periodo = est.Mes_Periodo
		
			LEFT JOIN 
			(
				SELECT DISTINCT CodUnidadNegocio, NombreUnidadNegocio 
				FROM vw_UnidadDeNegocio
			) U ON A.Unidad_Negocio = U.CodUnidadNegocio

			LEFT JOIN VehiculosMarcas M ON A.CodigoMarca = M.CodigoMarca

			LEFT JOIN Centros C ON A.CodigoCentro = C.CodigoCentro

			INNER JOIN 
			(		
				SELECT DISTINCT CodigoEmpleado,
					NombreEmpleado=MAX(REPLACE(REPLACE(REPLACE(Nombres+' '+Apellido1+' '+Apellido2,' ','<>'),'><',''),'<>',' '))
				FROM EmpleadosActivos 
				GROUP BY CodigoEmpleado			
			) EM ON EM.CodigoEmpleado = A.CodigoEmpleado

			WHERE (A.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(A.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
						OR (A.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(A.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
		)A
		WHERE Estado IS NULL
	)A
	WHERE Unidad_Negocio <> 4


	
	--CONSULTAR LA INFORMACIÓN QUE SI CONTIENE LA UNIDAD DE NEGOCIO
	SELECT	Ano_Periodo,					Mes_Periodo,				Unidad_Negocio,				Nombre_Unidad_Negocio,			CodigoMarca,			
			Marca,							CodigoCentro, 				Centro,						CodigoEmpleado,					NombreEmpleado,				
			CodigoTipoVehiculo, 			TipoVehiculo, 				FechaIngreso,				FechaRetiro,					EstadoEmpleado,						
			Cantidad

	INTO #TempConsultaConUnidad

	FROM #TempConsultaGeneral
	WHERE Nombre_Unidad_Negocio IS NOT NULL



	
	--CONSULTAR LA INFORMACIÓN QUE NO CONTIENE LA UNIDAD DE NEGOCIO
	SELECT	Ano_Periodo,					Mes_Periodo,				Unidad_Negocio,					Nombre_Unidad_Negocio = UPPER(Marca),			
			CodigoMarca,					Marca,						CodigoCentro, 					Centro,						
			CodigoEmpleado,					NombreEmpleado,				CodigoTipoVehiculo, 			TipoVehiculo, 				
			FechaIngreso,					FechaRetiro,				EstadoEmpleado,					Cantidad

	INTO #TempConsultaSinUnidad

	FROM #TempConsultaGeneral
	WHERE Nombre_Unidad_Negocio IS NULL


	
	--CONSULTA FINAL
	SELECT	Ano_Periodo,					Mes_Periodo,				Unidad_Negocio,				Nombre_Unidad_Negocio,			CodigoMarca,			
			Marca,							CodigoCentro, 				Centro,						CodigoEmpleado,					NombreEmpleado,				
			CodigoTipoVehiculo, 			TipoVehiculo, 				FechaIngreso,				FechaRetiro,					EstadoEmpleado,						
			Cantidad
	FROM
	(
		SELECT	Ano_Periodo,					Mes_Periodo,				Unidad_Negocio,				Nombre_Unidad_Negocio,			CodigoMarca,			
				Marca,							CodigoCentro, 				Centro,						CodigoEmpleado,					NombreEmpleado,				
				CodigoTipoVehiculo, 			TipoVehiculo, 				FechaIngreso,				FechaRetiro,					EstadoEmpleado,						
				Cantidad
		FROM #TempConsultaConUnidad

		UNION
		
		SELECT	Ano_Periodo,					Mes_Periodo,				Unidad_Negocio,				Nombre_Unidad_Negocio,			CodigoMarca,			
				Marca,							CodigoCentro, 				Centro,						CodigoEmpleado,					NombreEmpleado,				
				CodigoTipoVehiculo, 			TipoVehiculo, 				FechaIngreso,				FechaRetiro,					EstadoEmpleado,						
				Cantidad
		FROM #TempConsultaSinUnidad
	) A

END 

```
