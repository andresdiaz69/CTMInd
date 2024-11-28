# Stored Procedure: sp_Productividad_Vehiculos_Ventas

## Usa los objetos:
- [[Empresas]]
- [[EstadosEmpleado]]
- [[Periodos]]
- [[ProductividadVentas]]

```sql
CREATE PROCEDURE [dbo].[sp_Productividad_Vehiculos_Ventas]  
(
	--DECLARE
	@AñoPrimerFecha INT, 
	@MesesPrimeraFecha NVARCHAR(255), 
	@AñoSegundoFecha INT, 
	@MesesSegundoFecha NVARCHAR(255),
	@CodEmpresa SMALLINT
) AS
BEGIN 
	--DECLARE @AñoPrimerFecha INT					SET @AñoPrimerFecha = 2023
	--DECLARE @AñoSegundoFecha INT				SET @AñoSegundoFecha = 0--2019
	--DECLARE @MesesPrimeraFecha NVARCHAR(255)	SET @MesesPrimeraFecha = ',8,9,10,'
	--DECLARE @MesesSegundoFecha NVARCHAR(255)	SET @MesesSegundoFecha = ''--',11,12,'
	--DECLARE @CodEmpresa SMALLINT				SET @CodEmpresa  = 24

	--CONSULTAR TODAS LAS EMPRESAS
	IF @CodEmpresa = 0
		BEGIN
			SELECT	DISTINCT				A.Año_Periodo,					A.Mes_Periodo,			A.CodigoEmpresa,			A.NombreEmpresa,		
					A.CodigoMarca, 			A.NombreMarca,					A.CodigoCentro,			A.NombreCentro,				A.CodigoEmpleado,		
					NombreEmpleado = REPLACE(REPLACE(REPLACE(NombreEmpleado,' ','<>'),'><',''),'<>',' '), 
					A.FechaIngreso,			A.CodigoTipoVehiculo, 			A.TipoVehiculo,			A.Cantidad,					A.FechaRetiro, 
					A.Tipo 
			FROM 
			(
				SELECT	Año_Periodo,			Mes_Periodo,				CodigoEmpleado,			NombreEmpleado,				CodigoEmpresa,		
						NombreEmpresa, 			CodigoMarca,				NombreMarca,			CodigoCentro,				NombreCentro, 			
						FechaIngreso,			CodigoTipoVehiculo,			TipoVehiculo,			Cantidad,					FechaRetiro, 
						Tipo 
				FROM
				(
					SELECT	(p.Ano_Periodo)Año_Periodo,				p.Mes_Periodo,					p.CodigoTipoVehiculo,				p.TipoVehiculo,			
							P.CodigoEmpresa, 						P.NombreEmpresa,				p.CodigoMarca,						p.NombreMarca,						
							p.CodigoCentro,							p.NombreCentro, 				p.CodigoEmpleado,					p.NombreEmpleado,				
							est.FechaIngreso,						est.FechaRetiro,				p.Cantidad,							est.Estado AS Tipo
					FROM 
					(
						SELECT	p.Ano_Periodo,		p.Mes_Periodo,		p.CodigoTipoVehiculo,		p.TipoVehiculo,			p.CodigoMarca,			
								p.NombreMarca, 		p.CodigoCentro,		p.NombreCentro,				p.CodigoEmpleado,		p.NombreEmpleado, 		
								c.FechaIngreso,		c.FechaRetiro, 		C.CodigoEmpresa,			C.NombreEmpresa,		ISNULL(c.Cantidad,0)Cantidad
						FROM 
						(
							SELECT	Per.Ano_Periodo,		Per.Mes_Periodo,			TVMarca.CodigoTipoVehiculo,		TVMarca.TipoVehiculo,		TVMarca.CodigoMarca, 
									TVMarca.NombreMarca,	TVMarca.CodigoCentro, 		TVMarca.NombreCentro,			TVMarca.CodigoEmpleado,		TVMarca.NombreEmpleado
							FROM   dbo.Periodos AS Per
							CROSS JOIN 
							(
								SELECT	DISTINCT			CodigoTipoVehiculo,			TipoVehiculo,			CodigoMarca,		NombreMarca,		
										CodigoCentro,		NombreCentro,				CodigoEmpleado,			NombreEmpleado 
								FROM ProductividadVentas
								WHERE (Año_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
										OR (Año_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
							)AS TVMarca
							WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
									OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
						) AS P
		
						LEFT JOIN 
						(
							SELECT	Año_Periodo,			Mes_Periodo,		CodigoEmpleado,			NombreEmpleado,				CodigoEmpresa,		
									NombreEmpresa, 			CodigoMarca,		NombreMarca,			CodigoCentro,				NombreCentro,			
									FechaIngreso,			FechaRetiro, 		Cantidad,				CodigoTipoVehiculo,			TipoVehiculo
							FROM ProductividadVentas
						)AS C ON P.Ano_Periodo = C.Año_Periodo AND P.Mes_Periodo = C.Mes_Periodo	AND p.CodigoTipoVehiculo = c.CodigoTipoVehiculo  
																AND p.CodigoMarca = c.CodigoMarca	AND p.CodigoCentro = c.CodigoCentro 
																AND p.CodigoEmpleado = c.CodigoEmpleado 
					) p

					INNER JOIN EstadosEmpleado AS est ON p.CodigoEmpleado = est.CodigoEmpleado AND p.Ano_Periodo = est.Año_Periodo 
																								AND p.Mes_Periodo = est.Mes_Periodo
				) Primera

				UNION ALL

				SELECT	(p.Ano_Periodo)Año_Periodo,			p.Mes_Periodo,				p.CodigoEmpleado,			p.NombreEmpleado,			P.CodigoEmpresa, 
						P.NombreEmpresa,					p.CodigoMarca,				p.NombreMarca,				p.CodigoCentro, 			p.NombreCentro, 
						p.FechaIngreso,						p.CodigoTipoVehiculo,		p.TipoVehiculo,				p.Cantidad,					p.FechaRetiro, 
						Tipo = 'ACTIVO' 						
				FROM 
				(
					SELECT	p.Ano_Periodo,			p.Mes_Periodo,			p.CodigoTipoVehiculo,			p.TipoVehiculo,				p.CodigoMarca, 
							p.NombreMarca,			p.CodigoCentro,			p.NombreCentro,					p.CodigoEmpleado,			p.NombreEmpleado, 
							c.FechaIngreso,			c.FechaRetiro,			C.CodigoEmpresa,				C.NombreEmpresa,			ISNULL(c.Cantidad,0)Cantidad
					FROM 
					(
						SELECT	Per.Ano_Periodo,				Per.Mes_Periodo,				TVMarca.CodigoTipoVehiculo,				TVMarca.TipoVehiculo, 
								TVMarca.CodigoMarca,			TVMarca.NombreMarca,			TVMarca.CodigoCentro, 					TVMarca.NombreCentro, 
								TVMarca.CodigoEmpleado,			TVMarca.NombreEmpleado
						FROM   dbo.Periodos AS Per
						CROSS JOIN 
						(
							SELECT	DISTINCT				CodigoTipoVehiculo,			TipoVehiculo,			CodigoMarca,			NombreMarca,		
									CodigoCentro, 			NombreCentro,				CodigoEmpleado,			NombreEmpleado 
							FROM ProductividadVentas
							WHERE (Año_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0 AND CodigoEmpleado = '86000000') 
									OR (Año_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0 AND CodigoEmpleado = '86000000')
						)AS TVMarca
						WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
								OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
					) AS P
		
					LEFT JOIN 
					(
						SELECT	Año_Periodo,			Mes_Periodo,		CodigoEmpleado,			NombreEmpleado,				CodigoEmpresa,		
								NombreEmpresa, 			CodigoMarca,		NombreMarca,			CodigoCentro,				NombreCentro,			
								FechaIngreso, 			FechaRetiro, 		Cantidad,				CodigoTipoVehiculo,			TipoVehiculo
						FROM ProductividadVentas
					)AS C ON P.Ano_Periodo = C.Año_Periodo AND P.Mes_Periodo = C.Mes_Periodo	AND p.CodigoTipoVehiculo = c.CodigoTipoVehiculo  
															AND p.CodigoMarca = c.CodigoMarca	AND p.CodigoCentro = c.CodigoCentro 
															AND p.CodigoEmpleado = c.CodigoEmpleado 
				) p

				UNION ALL

				SELECT	Año_Periodo,			Mes_Periodo,				CodigoEmpleado,			NombreEmpleado,			CodigoEmpresa, 
						NombreEmpresa,			CodigoMarca,				NombreMarca,			CodigoCentro,			NombreCentro, 				
						FechaIngreso,			CodigoTipoVehiculo,			TipoVehiculo,			Cantidad,				FechaRetiro, 
						Tipo
				FROM ProductividadVentas
				WHERE (Año_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0 AND Tipo = 'INACTIVO') 
								OR (Año_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0 AND Tipo = 'INACTIVO')

				UNION ALL

				--Ventas Internas
				SELECT	Año_Periodo,			Mes_Periodo,					CodigoEmpleado,				NombreEmpleado,				CodigoEmpresa, 
						NombreEmpresa,			CodigoMarca,					NombreMarca,				CodigoCentro,				NombreCentro, 				
						FechaIngreso,			CodigoTipoVehiculo,				TipoVehiculo,				Cantidad,					FechaRetiro, 
						Tipo 
				FROM
				(
					SELECT	(p.Ano_Periodo)Año_Periodo,				p.Mes_Periodo,				p.CodigoTipoVehiculo,				p.TipoVehiculo, 
							P.CodigoEmpresa,						P.NombreEmpresa,			p.CodigoMarca,						p.NombreMarca, 
							p.CodigoCentro, 						p.NombreCentro,				p.CodigoEmpleado,					p.NombreEmpleado, 
							FechaIngreso,							FechaRetiro,				p.Cantidad,							Tipo
					FROM 
					(
						SELECT	p.Ano_Periodo,				p.Mes_Periodo,				p.CodigoTipoVehiculo,				p.TipoVehiculo, 
								p.CodigoMarca,				p.NombreMarca,				p.CodigoCentro,						p.NombreCentro, 
								p.CodigoEmpleado,			p.NombreEmpleado, 			c.FechaIngreso,						c.FechaRetiro, 
								C.CodigoEmpresa,			C.NombreEmpresa,			Tipo,								ISNULL(c.Cantidad,0)Cantidad
						FROM 
						(
							SELECT	Per.Ano_Periodo,				Per.Mes_Periodo,				TVMarca.CodigoTipoVehiculo,			TVMarca.TipoVehiculo, 
									TVMarca.CodigoMarca,			TVMarca.NombreMarca,			TVMarca.CodigoCentro, 				TVMarca.NombreCentro, 
									TVMarca.CodigoEmpleado,			TVMarca.NombreEmpleado,			TVMarca.Tipo
							FROM   dbo.Periodos AS Per
							CROSS JOIN 
							(
								SELECT	DISTINCT			CodigoTipoVehiculo,			TipoVehiculo,			CodigoMarca,			NombreMarca, 
										CodigoCentro,		NombreCentro,				CodigoEmpleado,			NombreEmpleado,			Tipo
								FROM ProductividadVentas
								WHERE (Año_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0 AND CodigoTipoVehiculo = 5) 
									OR (Año_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0 AND CodigoTipoVehiculo = 5)
							)AS TVMarca
							WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
									OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
						) AS P
		
						LEFT JOIN 
						(
							SELECT	Año_Periodo,			Mes_Periodo,			CodigoEmpleado,				NombreEmpleado,				CodigoEmpresa, 
									NombreEmpresa,			CodigoMarca,			NombreMarca,				CodigoCentro,				NombreCentro, 
									FechaIngreso, 			FechaRetiro,			Cantidad,					CodigoTipoVehiculo,			TipoVehiculo
							FROM ProductividadVentas
						)AS C ON P.Ano_Periodo = C.Año_Periodo AND P.Mes_Periodo = C.Mes_Periodo	AND p.CodigoTipoVehiculo = c.CodigoTipoVehiculo  
																AND p.CodigoMarca = c.CodigoMarca	AND p.CodigoCentro = c.CodigoCentro 
																AND p.CodigoEmpleado = c.CodigoEmpleado 
					) p
				) Internas
			) AS A
			WHERE (NombreMarca IS NOT NULL) OR (LTRIM(RTRIM(NombreMarca)) = '')
		END

	--CONSULTAR POR EMPRESA
	ELSE 
		BEGIN 
			SELECT	DISTINCT				A.Año_Periodo,					A.Mes_Periodo,			CodigoEmpresa = @CodEmpresa,			
					E.NombreEmpresa,		A.CodigoMarca, 					A.NombreMarca,			A.CodigoCentro,			
					A.NombreCentro,			A.CodigoEmpleado,		
					NombreEmpleado = REPLACE(REPLACE(REPLACE(NombreEmpleado,' ','<>'),'><',''),'<>',' '), 
					A.FechaIngreso,			A.CodigoTipoVehiculo, 			A.TipoVehiculo,			A.Cantidad,					
					A.FechaRetiro, 			A.Tipo 
			FROM 
			(
				SELECT	Año_Periodo,			Mes_Periodo,				CodigoEmpleado,			NombreEmpleado,				CodigoEmpresa,		
						NombreEmpresa, 			CodigoMarca,				NombreMarca,			CodigoCentro,				NombreCentro, 			
						FechaIngreso,			CodigoTipoVehiculo,			TipoVehiculo,			Cantidad,					FechaRetiro, 
						Tipo 
				FROM
				(
					SELECT	(p.Ano_Periodo)Año_Periodo,				p.Mes_Periodo,					p.CodigoTipoVehiculo,				p.TipoVehiculo,			
							P.CodigoEmpresa, 						P.NombreEmpresa,				p.CodigoMarca,						p.NombreMarca,						
							p.CodigoCentro,							p.NombreCentro, 				p.CodigoEmpleado,					p.NombreEmpleado,				
							est.FechaIngreso,						est.FechaRetiro,				p.Cantidad,							est.Estado AS Tipo
					FROM 
					(
						SELECT	p.Ano_Periodo,		p.Mes_Periodo,		p.CodigoTipoVehiculo,		p.TipoVehiculo,			p.CodigoMarca,			
								p.NombreMarca, 		p.CodigoCentro,		p.NombreCentro,				p.CodigoEmpleado,		p.NombreEmpleado, 		
								c.FechaIngreso,		c.FechaRetiro, 		C.CodigoEmpresa,			C.NombreEmpresa,		ISNULL(c.Cantidad,0)Cantidad
						FROM 
						(
							SELECT	Per.Ano_Periodo,		Per.Mes_Periodo,			TVMarca.CodigoTipoVehiculo,		TVMarca.TipoVehiculo,		TVMarca.CodigoMarca, 
									TVMarca.NombreMarca,	TVMarca.CodigoCentro, 		TVMarca.NombreCentro,			TVMarca.CodigoEmpleado,		TVMarca.NombreEmpleado
							FROM   dbo.Periodos AS Per
							CROSS JOIN 
							(
								SELECT	DISTINCT			CodigoTipoVehiculo,			TipoVehiculo,			CodigoMarca,		NombreMarca,		
										CodigoCentro,		NombreCentro,				CodigoEmpleado,			NombreEmpleado 
								FROM ProductividadVentas
								WHERE (CodigoEmpresa = @CodEmpresa AND Año_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
										OR (CodigoEmpresa = @CodEmpresa AND Año_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
							)AS TVMarca
							WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
									OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
						) AS P
		
						LEFT JOIN 
						(
							SELECT	Año_Periodo,			Mes_Periodo,		CodigoEmpleado,			NombreEmpleado,				CodigoEmpresa,		
									NombreEmpresa, 			CodigoMarca,		NombreMarca,			CodigoCentro,				NombreCentro,			
									FechaIngreso,			FechaRetiro, 		Cantidad,				CodigoTipoVehiculo,			TipoVehiculo
							FROM ProductividadVentas
							WHERE CodigoEmpresa = @CodEmpresa
						)AS C ON P.Ano_Periodo = C.Año_Periodo AND P.Mes_Periodo = C.Mes_Periodo	AND p.CodigoTipoVehiculo = c.CodigoTipoVehiculo  
																AND p.CodigoMarca = c.CodigoMarca	AND p.CodigoCentro = c.CodigoCentro 
																AND p.CodigoEmpleado = c.CodigoEmpleado 
					) p

					INNER JOIN EstadosEmpleado AS est ON p.CodigoEmpleado = est.CodigoEmpleado AND p.Ano_Periodo = est.Año_Periodo 
																								AND p.Mes_Periodo = est.Mes_Periodo
				) Primera

				UNION ALL

				SELECT	(p.Ano_Periodo)Año_Periodo,			p.Mes_Periodo,				p.CodigoEmpleado,			p.NombreEmpleado,			P.CodigoEmpresa, 
						P.NombreEmpresa,					p.CodigoMarca,				p.NombreMarca,				p.CodigoCentro, 			p.NombreCentro, 
						p.FechaIngreso,						p.CodigoTipoVehiculo,		p.TipoVehiculo,				p.Cantidad,					p.FechaRetiro, 
						Tipo = 'ACTIVO' 						
				FROM 
				(
					SELECT	p.Ano_Periodo,			p.Mes_Periodo,			p.CodigoTipoVehiculo,			p.TipoVehiculo,				p.CodigoMarca, 
							p.NombreMarca,			p.CodigoCentro,			p.NombreCentro,					p.CodigoEmpleado,			p.NombreEmpleado, 
							c.FechaIngreso,			c.FechaRetiro,			C.CodigoEmpresa,				C.NombreEmpresa,			ISNULL(c.Cantidad,0)Cantidad
					FROM 
					(
						SELECT	Per.Ano_Periodo,				Per.Mes_Periodo,				TVMarca.CodigoTipoVehiculo,				TVMarca.TipoVehiculo, 
								TVMarca.CodigoMarca,			TVMarca.NombreMarca,			TVMarca.CodigoCentro, 					TVMarca.NombreCentro, 
								TVMarca.CodigoEmpleado,			TVMarca.NombreEmpleado
						FROM   dbo.Periodos AS Per
						CROSS JOIN 
						(
							SELECT	DISTINCT				CodigoTipoVehiculo,			TipoVehiculo,			CodigoMarca,			NombreMarca,		
									CodigoCentro, 			NombreCentro,				CodigoEmpleado,			NombreEmpleado 
							FROM ProductividadVentas
							WHERE (CodigoEmpresa = @CodEmpresa AND Año_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0 AND CodigoEmpleado = '86000000') 
								OR (CodigoEmpresa = @CodEmpresa AND Año_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0 AND CodigoEmpleado = '86000000')
						)AS TVMarca
						WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
								OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
					) AS P
		
					LEFT JOIN 
					(
						SELECT	Año_Periodo,			Mes_Periodo,		CodigoEmpleado,			NombreEmpleado,				CodigoEmpresa,		
								NombreEmpresa, 			CodigoMarca,		NombreMarca,			CodigoCentro,				NombreCentro,			
								FechaIngreso, 			FechaRetiro, 		Cantidad,				CodigoTipoVehiculo,			TipoVehiculo
						FROM ProductividadVentas
						WHERE CodigoEmpresa = @CodEmpresa
					)AS C ON P.Ano_Periodo = C.Año_Periodo AND P.Mes_Periodo = C.Mes_Periodo	AND p.CodigoTipoVehiculo = c.CodigoTipoVehiculo  
															AND p.CodigoMarca = c.CodigoMarca	AND p.CodigoCentro = c.CodigoCentro 
															AND p.CodigoEmpleado = c.CodigoEmpleado 
				) p

				UNION ALL

				SELECT	Año_Periodo,			Mes_Periodo,				CodigoEmpleado,			NombreEmpleado,			CodigoEmpresa, 
						NombreEmpresa,			CodigoMarca,				NombreMarca,			CodigoCentro,			NombreCentro, 				
						FechaIngreso,			CodigoTipoVehiculo,			TipoVehiculo,			Cantidad,				FechaRetiro, 
						Tipo
				FROM ProductividadVentas
				WHERE (CodigoEmpresa = @CodEmpresa AND Año_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0 AND Tipo = 'INACTIVO') 
						OR (CodigoEmpresa = @CodEmpresa AND Año_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0 AND Tipo = 'INACTIVO')

				UNION ALL

				--Ventas Internas
				SELECT	Año_Periodo,			Mes_Periodo,					CodigoEmpleado,				NombreEmpleado,				CodigoEmpresa, 
						NombreEmpresa,			CodigoMarca,					NombreMarca,				CodigoCentro,				NombreCentro, 				
						FechaIngreso,			CodigoTipoVehiculo,				TipoVehiculo,				Cantidad,					FechaRetiro, 
						Tipo 
				FROM
				(
					SELECT	(p.Ano_Periodo)Año_Periodo,				p.Mes_Periodo,				p.CodigoTipoVehiculo,				p.TipoVehiculo, 
							P.CodigoEmpresa,						P.NombreEmpresa,			p.CodigoMarca,						p.NombreMarca, 
							p.CodigoCentro, 						p.NombreCentro,				p.CodigoEmpleado,					p.NombreEmpleado, 
							FechaIngreso,							FechaRetiro,				p.Cantidad,							Tipo
					FROM 
					(
						SELECT	p.Ano_Periodo,				p.Mes_Periodo,				p.CodigoTipoVehiculo,				p.TipoVehiculo, 
								p.CodigoMarca,				p.NombreMarca,				p.CodigoCentro,						p.NombreCentro, 
								p.CodigoEmpleado,			p.NombreEmpleado, 			c.FechaIngreso,						c.FechaRetiro, 
								C.CodigoEmpresa,			C.NombreEmpresa,			Tipo,								ISNULL(c.Cantidad,0)Cantidad
						FROM 
						(
							SELECT	Per.Ano_Periodo,				Per.Mes_Periodo,				TVMarca.CodigoTipoVehiculo,			TVMarca.TipoVehiculo, 
									TVMarca.CodigoMarca,			TVMarca.NombreMarca,			TVMarca.CodigoCentro, 				TVMarca.NombreCentro, 
									TVMarca.CodigoEmpleado,			TVMarca.NombreEmpleado,			TVMarca.Tipo
							FROM   dbo.Periodos AS Per
							CROSS JOIN 
							(
								SELECT	DISTINCT			CodigoTipoVehiculo,			TipoVehiculo,			CodigoMarca,			NombreMarca, 
										CodigoCentro,		NombreCentro,				CodigoEmpleado,			NombreEmpleado,			Tipo
								FROM ProductividadVentas
								WHERE (CodigoEmpresa = @CodEmpresa AND Año_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0 AND CodigoTipoVehiculo = 5) 
									OR (CodigoEmpresa = @CodEmpresa AND Año_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0 AND CodigoTipoVehiculo = 5)
							)AS TVMarca
							WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
									OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
						) AS P
		
						LEFT JOIN 
						(
							SELECT	Año_Periodo,			Mes_Periodo,			CodigoEmpleado,				NombreEmpleado,				CodigoEmpresa, 
									NombreEmpresa,			CodigoMarca,			NombreMarca,				CodigoCentro,				NombreCentro, 
									FechaIngreso, 			FechaRetiro,			Cantidad,					CodigoTipoVehiculo,			TipoVehiculo
							FROM ProductividadVentas
							WHERE CodigoEmpresa = @CodEmpresa
						)AS C ON P.Ano_Periodo = C.Año_Periodo AND P.Mes_Periodo = C.Mes_Periodo	AND p.CodigoTipoVehiculo = c.CodigoTipoVehiculo  
																AND p.CodigoMarca = c.CodigoMarca	AND p.CodigoCentro = c.CodigoCentro 
																AND p.CodigoEmpleado = c.CodigoEmpleado 
					) p
				) Internas
			) AS A

			LEFT JOIN Empresas E ON E.CodigoEmpresa = @CodEmpresa

			WHERE (NombreMarca IS NOT NULL) OR (LTRIM(RTRIM(NombreMarca)) = '')
		END

END

```
