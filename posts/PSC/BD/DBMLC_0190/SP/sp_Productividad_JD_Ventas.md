# Stored Procedure: sp_Productividad_JD_Ventas

## Usa los objetos:
- [[EstadosEmpleado]]
- [[Periodos]]
- [[ProductividadVentas_JD]]

```sql


CREATE PROCEDURE [dbo].[sp_Productividad_JD_Ventas]  
(
@AñoPrimerFecha int, 
@MesesPrimeraFecha nvarchar(255), 
@AñoSegundoFecha int, 
@MesesSegundoFecha nvarchar(255)
) AS
--set @AñoPrimerFecha = 2020
--set @MesesPrimeraFecha = ',1,2,3,4,'
--set @AñoSegundoFecha = 2019
--set @MesesSegundoFecha = ',11,12,'

BEGIN 
SELECT Año_Periodo, Mes_Periodo, CodigoTipoVehiculo, TipoVehiculo, CodigoEmpresa, Empresa, CodigoMarca, Marca, CodigoCentro, Centro, CodigoEmpleado, 
		NombreEmpleado = REPLACE(REPLACE(REPLACE(NombreEmpleado,' ','<>'),'><',''),'<>',' '), FechaIngreso, FechaRetiro, Valor, EstadoEmpleado 
FROM 
(
	SELECT Año_Periodo, Mes_Periodo, CodigoTipoVehiculo, TipoVehiculo, CodigoEmpresa, Empresa, CodigoMarca, Marca, CodigoCentro, Centro, CodigoEmpleado, NombreEmpleado, 
				FechaIngreso, FechaRetiro, Valor, EstadoEmpleado 
	FROM
	(
		SELECT  p.Ano_Periodo AS Año_Periodo, p.Mes_Periodo, p.CodigoTipoVehiculo, p.TipoVehiculo, P.CodigoEmpresa, P.Empresa, p.CodigoMarca, p.Marca, p.CodigoCentro, p.Centro, p.CodigoEmpleado, p.NombreEmpleado, 
					est.FechaIngreso, est.FechaRetiro, p.Valor, est.Estado AS EstadoEmpleado
		FROM 
		(
			SELECT p.Ano_Periodo, p.Mes_Periodo, p.CodigoTipoVehiculo, p.TipoVehiculo, p.CodigoMarca, p.Marca, p.CodigoCentro, p.Centro, p.CodigoEmpleado, p.NombreEmpleado, 
				c.FechaIngreso, c.FechaRetiro, ISNULL(c.Valor,0)AS Valor, C.CodigoEmpresa, C.Empresa
			FROM 
			(
				SELECT Per.Ano_Periodo, Per.Mes_Periodo, TVMarca.CodigoTipoVehiculo, TVMarca.TipoVehiculo, TVMarca.CodigoMarca, TVMarca.Marca, TVMarca.CodigoCentro, 
						TVMarca.Centro, TVMarca.CodigoEmpleado, TVMarca.NombreEmpleado
				FROM   dbo.Periodos AS Per
				CROSS JOIN 
				(
					SELECT DISTINCT CodigoTipoVehiculo,TipoVehiculo, CodigoMarca, Marca, CodigoCentro, Centro, CodigoEmpleado, NombreEmpleado 
					FROM ProductividadVentas_JD
					WHERE (Año_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
							OR (Año_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
				)AS TVMarca
				WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
						OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
			) AS P
		
			LEFT JOIN 
			(
				SELECT Año_Periodo, Mes_Periodo, CodigoEmpleado, NombreEmpleado, CodigoEmpresa, Empresa, CodigoMarca, Marca, CodigoCentro, Centro, FechaIngreso, FechaRetiro, Valor, 
					CodigoTipoVehiculo, TipoVehiculo
				FROM ProductividadVentas_JD 
			)AS C ON P.Ano_Periodo = C.Año_Periodo AND P.Mes_Periodo = C.Mes_Periodo AND p.CodigoTipoVehiculo = c.CodigoTipoVehiculo  
													AND p.CodigoMarca = c.CodigoMarca AND p.CodigoCentro = c.CodigoCentro 
													AND p.CodigoEmpleado = c.CodigoEmpleado 
		) p

		INNER JOIN EstadosEmpleado as est on p.CodigoEmpleado = est.CodigoEmpleado AND p.Ano_Periodo = est.Año_Periodo 
																					AND p.Mes_Periodo = est.Mes_Periodo
	) Primera

	UNION ALL

	SELECT  Año_Periodo, Mes_Periodo, CodigoTipoVehiculo, TipoVehiculo, CodigoEmpresa, Empresa, CodigoMarca, Marca, CodigoCentro, Centro, CodigoEmpleado, NombreEmpleado, 
				FechaIngreso, FechaRetiro, Valor, EstadoEmpleado = 'ACTIVO' 
	FROM 
	(
		SELECT p.Ano_Periodo AS Año_Periodo, p.Mes_Periodo, p.CodigoTipoVehiculo, p.TipoVehiculo, p.CodigoMarca, p.Marca, p.CodigoCentro, p.Centro, p.CodigoEmpleado, p.NombreEmpleado, 
			c.FechaIngreso, c.FechaRetiro, ISNULL(c.Valor,0)AS Valor, C.CodigoEmpresa, C.Empresa
		FROM 
		(
			SELECT Per.Ano_Periodo, Per.Mes_Periodo, TVMarca.CodigoTipoVehiculo, TVMarca.TipoVehiculo, TVMarca.CodigoMarca, TVMarca.Marca, TVMarca.CodigoCentro, 
					TVMarca.Centro, TVMarca.CodigoEmpleado, TVMarca.NombreEmpleado
			FROM   dbo.Periodos AS Per
			CROSS JOIN 
			(
				SELECT DISTINCT CodigoTipoVehiculo,TipoVehiculo, CodigoMarca, Marca, CodigoCentro, Centro, CodigoEmpleado, NombreEmpleado 
				FROM ProductividadVentas_JD
				WHERE (Año_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0 AND CodigoEmpleado = '86000000') 
					OR (Año_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0 AND CodigoEmpleado = '86000000')
			)AS TVMarca
			WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
					OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
		) AS P
		
		LEFT JOIN 
		(
			SELECT Año_Periodo, Mes_Periodo, CodigoEmpleado, NombreEmpleado, CodigoEmpresa, Empresa, CodigoMarca, Marca, CodigoCentro, Centro, FechaIngreso, FechaRetiro, Valor, 
				CodigoTipoVehiculo, TipoVehiculo
			FROM ProductividadVentas_JD 
		)AS C ON P.Ano_Periodo = C.Año_Periodo AND P.Mes_Periodo = C.Mes_Periodo AND p.CodigoTipoVehiculo = c.CodigoTipoVehiculo  
												AND p.CodigoMarca = c.CodigoMarca AND p.CodigoCentro = c.CodigoCentro 
												AND p.CodigoEmpleado = c.CodigoEmpleado 
	) p

	UNION ALL

	SELECT Año_Periodo, Mes_Periodo, CodigoTipoVehiculo, TipoVehiculo, CodigoEmpresa, Empresa, CodigoMarca, Marca, CodigoCentro, Centro, CodigoEmpleado, NombreEmpleado, 
				FechaIngreso, FechaRetiro, Valor, EstadoEmpleado
	FROM ProductividadVentas_JD
	WHERE (Año_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0 AND EstadoEmpleado = 'INACTIVO') 
		OR (Año_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0 AND EstadoEmpleado = 'INACTIVO')

	UNION ALL

	SELECT Año_Periodo, Mes_Periodo, CodigoTipoVehiculo, TipoVehiculo, CodigoEmpresa, Empresa, CodigoMarca, Marca, CodigoCentro, Centro, CodigoEmpleado, NombreEmpleado, 
				FechaIngreso, FechaRetiro, Valor, EstadoEmpleado 
	FROM
	(
		SELECT  p.Ano_Periodo AS Año_Periodo, p.Mes_Periodo, p.CodigoTipoVehiculo, p.TipoVehiculo, P.CodigoEmpresa, P.Empresa, p.CodigoMarca, p.Marca, p.CodigoCentro, p.Centro, p.CodigoEmpleado, p.NombreEmpleado, 
					FechaIngreso, FechaRetiro, p.Valor, EstadoEmpleado
		FROM 
		(
			SELECT p.Ano_Periodo, p.Mes_Periodo, p.CodigoTipoVehiculo, p.TipoVehiculo, p.CodigoMarca, p.Marca, p.CodigoCentro, p.Centro, p.CodigoEmpleado, p.NombreEmpleado, 
				c.FechaIngreso, c.FechaRetiro, ISNULL(c.Valor,0)AS Valor, C.CodigoEmpresa, C.Empresa, P.EstadoEmpleado
			FROM 
			(
				SELECT Per.Ano_Periodo, Per.Mes_Periodo, TVMarca.CodigoTipoVehiculo, TVMarca.TipoVehiculo, TVMarca.CodigoMarca, TVMarca.Marca, TVMarca.CodigoCentro, 
						TVMarca.Centro, TVMarca.CodigoEmpleado, TVMarca.NombreEmpleado, TVMarca.EstadoEmpleado
				FROM   dbo.Periodos AS Per
				CROSS JOIN 
				(
					SELECT DISTINCT CodigoTipoVehiculo,TipoVehiculo, CodigoMarca, Marca, CodigoCentro, Centro, CodigoEmpleado, NombreEmpleado, EstadoEmpleado
					FROM ProductividadVentas_JD
					WHERE (Año_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0 AND CodigoTipoVehiculo = 3) 
						OR (Año_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0 AND CodigoTipoVehiculo = 3)
				)AS TVMarca
				WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
					OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
			) AS P
		
			LEFT JOIN 
			(
				SELECT Año_Periodo, Mes_Periodo, CodigoEmpleado, NombreEmpleado, CodigoEmpresa, Empresa, CodigoMarca, Marca, CodigoCentro, Centro, FechaIngreso, FechaRetiro, Valor, 
					CodigoTipoVehiculo, TipoVehiculo
				FROM ProductividadVentas_JD 
			)AS C ON P.Ano_Periodo = C.Año_Periodo AND P.Mes_Periodo = C.Mes_Periodo AND p.CodigoTipoVehiculo = c.CodigoTipoVehiculo  
													AND p.CodigoMarca = c.CodigoMarca AND p.CodigoCentro = c.CodigoCentro 
													AND p.CodigoEmpleado = c.CodigoEmpleado 
		) p
	) Internas
) AS A
WHERE (Marca IS NOT NULL) OR (LTRIM(RTRIM(Marca)) = '')
END

```
