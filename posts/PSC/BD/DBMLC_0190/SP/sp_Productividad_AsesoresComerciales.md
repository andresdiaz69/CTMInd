# Stored Procedure: sp_Productividad_AsesoresComerciales

## Usa los objetos:
- [[EstadosEmpleado]]
- [[Periodos]]
- [[ProductividadAsesoresComerciales]]

```sql
CREATE PROCEDURE [dbo].[sp_Productividad_AsesoresComerciales]  
(
	@AñoPrimerFecha int, 
	@MesesPrimeraFecha nvarchar(255), 
	@AñoSegundoFecha int, 
	@MesesSegundoFecha nvarchar(255)
) AS
--set @AñoPrimerFecha = 2021
--set @MesesPrimeraFecha = ',1,2,3,'
--set @AñoSegundoFecha = 2020
--set @MesesSegundoFecha = ',10,11,12,'

BEGIN 
SELECT Año_Periodo, Mes_Periodo, TipoIntCargo, CodigoUnidadNegocio, NombreUnidadNegocio, CodigoCentro, NombreCentro, CedulaAsesor, 
	NombreAsesor = REPLACE(REPLACE(REPLACE(NombreAsesor,' ','<>'),'><',''),'<>',' '), FechaIngreso, FechaRetiro, Valor, EstadoEmpleado 
FROM 
(
	SELECT Año_Periodo, Mes_Periodo, TipoIntCargo, CodigoUnidadNegocio, NombreUnidadNegocio, CodigoCentro, NombreCentro, CedulaAsesor, NombreAsesor, 
				FechaIngreso, FechaRetiro, Valor, EstadoEmpleado 
	FROM
	(
		SELECT  p.Ano_Periodo AS Año_Periodo, p.Mes_Periodo, p.TipoIntCargo, P.CodigoUnidadNegocio, p.NombreUnidadNegocio, p.CodigoCentro, p.NombreCentro, 
			p.CedulaAsesor, p.NombreAsesor, est.FechaIngreso, est.FechaRetiro, p.Valor, est.Estado AS EstadoEmpleado
		FROM 
		(
			SELECT p.Ano_Periodo, p.Mes_Periodo, p.TipoIntCargo, p.NombreUnidadNegocio, p.CodigoUnidadNegocio, p.CodigoCentro, p.NombreCentro, p.CedulaAsesor, p.NombreAsesor, 
				c.FechaIngreso, c.FechaRetiro, ISNULL(c.ValorNeto,0)AS Valor
			FROM 
			(
				SELECT Per.Ano_Periodo, Per.Mes_Periodo, TVMarca.TipoIntCargo, TVMarca.CodigoUnidadNegocio, TVMarca.NombreUnidadNegocio, TVMarca.CodigoCentro, 
						TVMarca.NombreCentro, TVMarca.CedulaAsesor, TVMarca.NombreAsesor
				FROM   dbo.Periodos AS Per
				CROSS JOIN 
				(
					SELECT DISTINCT TipoIntCargo, CodigoUnidadNegocio, NombreUnidadNegocio, CodigoCentro, NombreCentro, CedulaAsesor, NombreAsesor
					FROM ProductividadAsesoresComerciales
					WHERE (Año = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes AS varchar)+',',@MesesPrimeraFecha)>0 AND CONVERT(INT,ValorNeto) > 0) 
						OR (Año = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes AS varchar)+',',@MesesSegundoFecha)>0 AND CONVERT(INT,ValorNeto) > 0)
				)AS TVMarca
				WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
						OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
			) AS P
		
			LEFT JOIN 
			(
				SELECT Año, Mes, CedulaAsesor, NombreAsesor, CodigoUnidadNegocio, NombreUnidadNegocio, CodigoCentro, NombreCentro, FechaIngreso, FechaRetiro, ValorNeto, 
					TipoIntCargo
				FROM ProductividadAsesoresComerciales 
				WHERE CONVERT(INT,ValorNeto) > 0
			)AS C ON	P.Ano_Periodo = C.Año AND P.Mes_Periodo = C.Mes AND p.TipoIntCargo = c.TipoIntCargo  
						AND p.CodigoUnidadNegocio = c.CodigoUnidadNegocio AND p.CodigoCentro = c.CodigoCentro 
						AND p.CedulaAsesor = c.CedulaAsesor 
		) p

		INNER JOIN EstadosEmpleado as est on p.CedulaAsesor = est.CodigoEmpleado AND p.Ano_Periodo = est.Año_Periodo 
																					AND p.Mes_Periodo = est.Mes_Periodo
	) Primera

	UNION ALL

	SELECT  Año_Periodo, Mes_Periodo, TipoIntCargo, CodigoUnidadNegocio, NombreUnidadNegocio, CodigoCentro, NombreCentro, CedulaAsesor, NombreAsesor,
				FechaIngreso, FechaRetiro, Valor, EstadoEmpleado = 'ACTIVO' 
	FROM 
	(
		SELECT p.Ano_Periodo AS Año_Periodo, p.Mes_Periodo, p.TipoIntCargo, p.CodigoUnidadNegocio, p.NombreUnidadNegocio, p.CodigoCentro, p.NombreCentro, 
			p.CedulaAsesor, p.NombreAsesor, c.FechaIngreso, c.FechaRetiro, ISNULL(c.ValorNeto,0)AS Valor
		FROM 
		(
			SELECT Per.Ano_Periodo, Per.Mes_Periodo, TVMarca.TipoIntCargo, TVMarca.CodigoUnidadNegocio, TVMarca.NombreUnidadNegocio, TVMarca.CodigoCentro, 
				TVMarca.NombreCentro,TVMarca.CedulaAsesor, TVMarca.NombreAsesor
			FROM   dbo.Periodos AS Per
			CROSS JOIN 
			(
				SELECT DISTINCT TipoIntCargo, CodigoUnidadNegocio, NombreUnidadNegocio, CodigoCentro, NombreCentro, CedulaAsesor, NombreAsesor
				FROM ProductividadAsesoresComerciales
				WHERE (Año = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes AS varchar)+',',@MesesPrimeraFecha)>0 AND CedulaAsesor = '86000000' AND CONVERT(INT,ValorNeto) > 0) 
					OR (Año = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes AS varchar)+',',@MesesSegundoFecha)>0 AND CedulaAsesor = '86000000' AND CONVERT(INT,ValorNeto) > 0)
			)AS TVMarca
			WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
					OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
		) AS P
		
		LEFT JOIN 
		(
			SELECT Año, Mes, CedulaAsesor, NombreAsesor, CodigoUnidadNegocio, NombreUnidadNegocio, CodigoCentro, NombreCentro, FechaIngreso, FechaRetiro, ValorNeto, 
				TipoIntCargo
			FROM ProductividadAsesoresComerciales 
			WHERE CONVERT(INT,ValorNeto) > 0
		)AS C ON	P.Ano_Periodo = C.Año AND P.Mes_Periodo = C.Mes AND p.TipoIntCargo = c.TipoIntCargo  
					AND p.CodigoUnidadNegocio = c.CodigoUnidadNegocio AND p.CodigoCentro = c.CodigoCentro 
					AND p.CedulaAsesor = c.CedulaAsesor 
	) p

	UNION ALL

	SELECT Año, Mes, TipoIntCargo, CodigoUnidadNegocio, NombreUnidadNegocio, CodigoCentro, NombreCentro, CedulaAsesor, NombreAsesor, 
		FechaIngreso, FechaRetiro, ValorNeto, Estado
	FROM ProductividadAsesoresComerciales
	WHERE (Año = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes AS varchar)+',',@MesesPrimeraFecha)>0 AND Estado = 'INACTIVO' AND CONVERT(INT,ValorNeto) > 0) 
		OR (Año = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes AS varchar)+',',@MesesSegundoFecha)>0 AND Estado = 'INACTIVO' AND CONVERT(INT,ValorNeto) > 0)
) AS A
WHERE NombreAsesor IS NOT NULL
END

```
