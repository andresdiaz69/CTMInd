# Stored Procedure: sp_Productividad_Update_AsesoresComerciales

## Usa los objetos:
- [[Centros]]
- [[ProductividadAsesoresComerciales]]
- [[v_EmpleadosActivosRetirados]]

```sql
CREATE PROCEDURE [dbo].[sp_Productividad_Update_AsesoresComerciales] 
(
	@Año INT, 
	@Mes INT
) 
AS
BEGIN

	SET NOCOUNT ON;
	SET FMTONLY OFF;
	
	--Inicialización de Variables Fechas	
	DECLARE
	--@Año INT, 
	--@Mes INT,
	@FechaActual DATETIME, 
	@FechaAnterior DATETIME

	--SET @Año = 2021
	--SET @Mes = 1
	SET @FechaActual = DATEFROMPARTS ( @Año, @Mes, 1 )
	SET @FechaAnterior = DATEADD(YEAR, -1, @FechaActual)


	--Visualizar si las tablas temporales existen y eliminarlas
	IF OBJECT_ID(N'tempdb.dbo.#tmpProductividadAñoAnterior', N'U') IS NOT NULL
				DROP TABLE #tmpProductividadAñoAnterior

	IF OBJECT_ID(N'tempdb.dbo.#tmpProductividadAñoActual', N'U') IS NOT NULL
				DROP TABLE #tmpProductividadAñoActual

	--Consulta del Año anterior en los Fitros (variable año Anterior)
	SELECT DISTINCT P.IdTable,P.Año,P.Mes,P.CodigoUnidadNegocio,P.NombreUnidadNegocio,P.CedulaAsesor,
		CASE WHEN E.CodigoEmpleado IS NOT NULL THEN (REPLACE(REPLACE(REPLACE(E.NombreCompleto,' ','<>'),'><',''),'<>',' ')) 
			ELSE (REPLACE(REPLACE(REPLACE(P.NombreAsesor,' ','<>'),'><',''),'<>',' ')) END NombreAsesor, CodigoCentro = E.codigo_centro,
		CASE WHEN E.CodigoEmpleado IS NOT NULL THEN E.NombreCentro ELSE P.NombreCentro END NombreCentro, P.TipoIntCargo, ValorNeto, Estado, FechaIngreso, FechaRetiro

	INTO #tmpProductividadAñoAnterior

	FROM ProductividadAsesoresComerciales P
	LEFT JOIN 
	(
		SELECT A.CodigoEmpleado, NombreCompleto=A.Nombres+' '+A.Apellido1+' '+A.Apellido2,A.codigo_centro,B.NombreCentro 
		FROM v_EmpleadosActivosRetirados A
		INNER JOIN Centros B ON A.codigo_centro = B.CodigoCentro
		WHERE Ano_Periodo = YEAR(@FechaActual) AND Mes_Periodo = MONTH(@FechaActual)
	) E ON P.CedulaAsesor = E.CodigoEmpleado
	WHERE Año = YEAR(@FechaAnterior) 

	--Actalizar la información del año anterior (Nombre Asesor, Código Centro, Nombre Centro) de cada usuario
	UPDATE ProductividadAsesoresComerciales 
	SET ProductividadAsesoresComerciales.NombreAsesor = #tmpProductividadAñoAnterior.NombreAsesor, 
		ProductividadAsesoresComerciales.CodigoCentro = #tmpProductividadAñoAnterior.CodigoCentro, 
		ProductividadAsesoresComerciales.NombreCentro = #tmpProductividadAñoAnterior.NombreCentro
	FROM #tmpProductividadAñoAnterior
	WHERE ProductividadAsesoresComerciales.IdTable = #tmpProductividadAñoAnterior.IdTable




	--Consulta del Año Enviado en los Fitros (variable año actual)
	SELECT DISTINCT P.IdTable,P.Año,P.Mes,P.CodigoUnidadNegocio,P.NombreUnidadNegocio,P.CedulaAsesor,
		CASE WHEN E.CodigoEmpleado IS NOT NULL THEN (REPLACE(REPLACE(REPLACE(E.NombreCompleto,' ','<>'),'><',''),'<>',' ')) 
			ELSE (REPLACE(REPLACE(REPLACE(P.NombreAsesor,' ','<>'),'><',''),'<>',' ')) END NombreAsesor, CodigoCentro=E.codigo_centro,
		CASE WHEN E.CodigoEmpleado IS NOT NULL THEN E.NombreCentro ELSE P.NombreCentro END NombreCentro, P.TipoIntCargo, ValorNeto, Estado, FechaIngreso, FechaRetiro

	INTO #tmpProductividadAñoActual

	FROM ProductividadAsesoresComerciales P
	LEFT JOIN 
	(
		SELECT A.CodigoEmpleado, NombreCompleto=A.Nombres+' '+A.Apellido1+' '+A.Apellido2,A.codigo_centro,B.NombreCentro 
		FROM v_EmpleadosActivosRetirados A
		INNER JOIN Centros B ON A.codigo_centro = B.CodigoCentro
		WHERE Ano_Periodo = YEAR(@FechaActual) AND Mes_Periodo = MONTH(@FechaActual)
	) E ON P.CedulaAsesor = E.CodigoEmpleado
	WHERE Año = YEAR(@FechaActual) AND Mes >= 1 AND Mes <= MONTH(@FechaActual) 

	--Actalizar la información del Año Actual (Nombre Asesor, Código Centro, Nombre Centro) de cada usuario
	UPDATE ProductividadAsesoresComerciales 
	SET ProductividadAsesoresComerciales.NombreAsesor = #tmpProductividadAñoActual.NombreAsesor, 
		ProductividadAsesoresComerciales.CodigoCentro = #tmpProductividadAñoActual.CodigoCentro, 
		ProductividadAsesoresComerciales.NombreCentro = #tmpProductividadAñoActual.NombreCentro
	FROM #tmpProductividadAñoActual
	WHERE ProductividadAsesoresComerciales.IdTable = #tmpProductividadAñoActual.IdTable



	-- Eliminar las tablas temporales
	IF OBJECT_ID(N'tempdb.dbo.#tmpProductividadAñoAnterior', N'U') IS NOT NULL
				DROP TABLE #tmpProductividadAñoAnterior

	IF OBJECT_ID(N'tempdb.dbo.#tmpProductividadAñoActual', N'U') IS NOT NULL
				DROP TABLE #tmpProductividadAñoActual

END 

```
