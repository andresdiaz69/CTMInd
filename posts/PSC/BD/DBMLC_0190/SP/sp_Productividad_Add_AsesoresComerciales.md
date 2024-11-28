# Stored Procedure: sp_Productividad_Add_AsesoresComerciales

## Usa los objetos:
- [[Centros]]
- [[ComisionesSpigaTallerPorOT]]
- [[EmpleadosRetirados]]
- [[ProductividadAsesoresComerciales]]
- [[ProductividadAsesoresComerciales]]
- [[UnidadDeNegocio]]
- [[vw_Ultimo_Registro_EmpleadosActivos]]

```sql
CREATE PROCEDURE [dbo].[sp_Productividad_Add_AsesoresComerciales]
(
	@Año INT,
	@Mes INT
)
AS
BEGIN
	
	SET NOCOUNT ON;
	SET FMTONLY OFF;

	--DECLARE @Año INT, @Mes INT
	--SET @Año = 2021
	--SET @Mes = 3


	-- Verifica si la tabla temporal existe
	IF OBJECT_ID(N'tempdb.dbo.#tmpProductividadAsesoresComercialesRaiz', N'U') IS NOT NULL
			DROP TABLE #tmpProductividadAsesoresComercialesRaiz

	IF OBJECT_ID(N'tempdb.dbo.#tmpProductividadAsesoresComerciales', N'U') IS NOT NULL
			DROP TABLE #tmpProductividadAsesoresComerciales

	-- Consulta de la información que se guardara en la tabla.
	SELECT Año,Mes,CodigoUnidadNegocio,NombreUnidadNegocio,CedulaAsesor,NombreAsesor,CodigoCentro,NombreCentro,TipoIntCargo,
		ValorNeto=CONVERT(BIGINT,SUM(ValorNeto)),Estado,FechaIngreso,FechaRetiro

	INTO #tmpProductividadAsesoresComercialesRaiz

	FROM
	(
		SELECT Año=CONVERT(INT,A.Año),Mes=CONVERT(INT,A.Mes),CodigoUnidadNegocio=CONVERT(NVARCHAR(50),B.Unidad_Negocio),
			NombreUnidadNegocio=CONVERT(NVARCHAR(50),B.Nombre_Unidad_Negocio),CedulaAsesor=CONVERT(BIGINT,A.CedulaAsesorServicioResponsable),
			NombreAsesor=CONVERT(NVARCHAR(100),(REPLACE(REPLACE(REPLACE(b.NombreCompleto,' ','<>'),'><',''),'<>',' '))),
			CodigoCentro=CONVERT(SMALLINT,B.codigo_centro),NombreCentro=CONVERT(NVARCHAR(50),B.NombreCentro),TipoIntCargo=CONVERT(NVARCHAR(25),A.TipoIntCargo),
			ValorNeto=CONVERT(DECIMAL(34,8),A.ValorNeto),FechaIngreso=CONVERT(DATETIME,B.Fecha_Ingreso),FechaRetiro=CONVERT(DATETIME,B.Fecha_retiro),
			Estado=CONVERT(NVARCHAR(20),(CASE WHEN LTRIM(RTRIM(UPPER(B.Estado))) = 'ACTIVO' THEN 'ACTIVO'
											WHEN LTRIM(RTRIM(UPPER(B.Estado))) = 'RETIRADO' THEN 'RETIRADO' ELSE 'INACTIVO' END))
		FROM
		(
			SELECT Año=YEAR(t.FechaFactura),Mes=MONTH(t.FechaFactura),u.CodUnidadNegocio,u.NombreUnidadNegocio,t.CedulaAsesorServicioResponsable,			
				TipoIntCargo = CASE WHEN t.TipoIntCargo = 'A' THEN 'Alistamiento'
									WHEN t.TipoIntCargo = 'C' THEN 'Cliente'
									WHEN t.TipoIntCargo = 'G' THEN 'Garantias'
									WHEN t.TipoIntCargo = 'GA' THEN 'Garantias'
									WHEN t.TipoIntCargo = 'I' THEN 'Internos'
									WHEN t.TipoIntCargo = 'S' THEN 'Aseguradora'  END,ValorNeto=SUM(t.ValorNeto)
			FROM ComisionesSpigaTallerPorOT		t
			LEFT JOIN UnidadDeNegocio			u	ON	t.CodigoEmpresa = u.CodEmpresa
														AND t.CodigoCentro = u.CodCentro
														AND t.CodigoSeccion = u.CodSeccion
		
			WHERE t.CodigoCentro NOT IN (48,78) AND u.CodUnidadNegocio IS NOT NULL AND t.Ano_Periodo = @Año AND t.Mes_Periodo = @Mes 
				--	AND t.CedulaAsesorServicioResponsable = 1023016422
			GROUP BY YEAR(t.FechaFactura),MONTH(t.FechaFactura),t.CodigoEmpresa,t.empresa,t.CodigoCentro,t.centro,t.CodigoSeccion,t.Seccion,t.TipoIntCargo,
				t.CedulaAsesorServicioResponsable,u.CodCentro,u.NombreCentro,u.CodUnidadNegocio,u.NombreUnidadNegocio,t.CodigoSeccion,t.Seccion

			UNION ALL

			SELECT Año,Mes,n.CodUnidadNegocio,n.NombreUnidadNegocio,CedulaAsesorServicioResponsable,
				TipoIntCargo = CASE WHEN TipoIntCargo = 'A' THEN 'Alistamiento'
									WHEN TipoIntCargo = 'C' THEN 'Cliente'
									WHEN TipoIntCargo = 'G' THEN 'Garantias'
									WHEN TipoIntCargo = 'GA' THEN 'Garantias'
									WHEN TipoIntCargo = 'I' THEN 'Internos'
									WHEN TipoIntCargo = 'S' THEN 'Aseguradora'  END,ValorNeto=SUM(ValorNeto)
			FROM
			(
				SELECT Año=YEAR(t.FechaFactura),Mes=MONTH(t.FechaFactura),u.CodUnidadNegocio,u.NombreUnidadNegocio,t.CodigoSeccion,t.Seccion,
				t.CedulaAsesorServicioResponsable,t.TipoIntCargo,ValorNeto=SUM(t.ValorNeto)
				FROM ComisionesSpigaTallerPorOT		AS t
				LEFT JOIN UnidadDeNegocio			AS u	ON	t.CodigoEmpresa = u.CodEmpresa
															AND t.CodigoCentro = u.CodCentro
															AND t.CodigoSeccion = u.CodSeccion
			
				WHERE t.CodigoCentro NOT IN (48,78) AND u.CodUnidadNegocio IS NULL AND t.Ano_Periodo = @Año AND t.Mes_Periodo = @Mes
					--AND t.CedulaAsesorServicioResponsable = 1023016422
				GROUP BY YEAR(t.FechaFactura),MONTH(t.FechaFactura),t.CodigoEmpresa,t.empresa,t.TipoIntCargo,
					t.CedulaAsesorServicioResponsable,u.CodCentro,u.NombreCentro,u.CodUnidadNegocio,u.NombreUnidadNegocio,t.CodigoSeccion,t.Seccion
			) a	
			LEFT JOIN UnidadDeNegocio AS n ON a.CodigoSeccion = n.CodSeccion
			GROUP BY Año,Mes,n.CodUnidadNegocio,n.NombreUnidadNegocio,CodigoSeccion,Seccion,CedulaAsesorServicioResponsable,TipoIntCargo
		)A

		LEFT JOIN 
		(
			SELECT A.CodigoEmpleado, NombreCompleto=A.Nombres+' '+A.Apellido1+' '+A.Apellido2, A.Unidad_Negocio, A.Nombre_Unidad_Negocio, A.codigo_centro, B.NombreCentro, 
				Fecha_Ingreso, Fecha_retiro, Estado
			FROM
			(
				SELECT CodigoEmpleado, Nombres, Apellido1, Apellido2, codigo_centro, Fecha_Ingreso, Fecha_retiro, Estado, Unidad_Negocio, Nombre_Unidad_Negocio
				FROM vw_Ultimo_Registro_EmpleadosActivos
				--WHERE Ano_Periodo = @Año AND Mes_Periodo = @Mes
			) A

			LEFT JOIN Centros B ON A.codigo_centro = B.CodigoCentro

		) B ON A.CedulaAsesorServicioResponsable = B.CodigoEmpleado
	) A
	GROUP BY Año,Mes,CodigoUnidadNegocio,NombreUnidadNegocio,CedulaAsesor,NombreAsesor,CodigoCentro,NombreCentro,TipoIntCargo,FechaIngreso,FechaRetiro,Estado
	
	--Validar los asesores que estan inactivos
	SELECT Año,Mes,CodigoUnidadNegocio,NombreUnidadNegocio,CedulaAsesor,NombreAsesor,CodigoCentro,NombreCentro,TipoIntCargo,ValorNeto,Estado,FechaIngreso,FechaRetiro

	INTO #tmpProductividadAsesoresComerciales

	FROM 
	(
		SELECT * FROM #tmpProductividadAsesoresComercialesRaiz
		WHERE NombreAsesor IS NOT NULL

		UNION ALL

		SELECT Año,Mes,CodigoUnidadNegocio,NombreUnidadNegocio,CedulaAsesor,NombreAsesor=CONVERT(NVARCHAR(100),(REPLACE(REPLACE(REPLACE(NombreAsesor,' ','<>'),'><',''),'<>',' '))),
			CodigoCentro=CONVERT(SMALLINT,CodigoCentro),NombreCentro=CONVERT(NVARCHAR(50),NombreCentro),TipoIntCargo,ValorNeto,Estado,
			FechaIngreso=CONVERT(DATETIME,FechaIngreso),FechaRetiro=CONVERT(DATETIME,FechaRetiro)
		FROM 
		(

			SELECT A.Año,A.Mes,A.CodigoUnidadNegocio,A.NombreUnidadNegocio,A.CedulaAsesor,NombreAsesor=B.Nombres+' '+B.Apellido1+' '+B.Apellido2,CodigoCentro=B.codigo_centro,
				C.NombreCentro,A.TipoIntCargo,A.ValorNeto,A.Estado,FechaIngreso=B.Fecha_Ingreso,FechaRetiro=B.Fecha_retiro
			FROM #tmpProductividadAsesoresComercialesRaiz A
			LEFT JOIN EmpleadosRetirados B	ON A.CedulaAsesor = B.CodigoEmpleado	 
			LEFT JOIN Centros C				ON B.codigo_centro = C.CodigoCentro 
			WHERE NombreAsesor IS NULL
		) A
	) A


	-- Eliminar información del mes
	DELETE FROM ProductividadAsesoresComerciales where Año = @Año and Mes = @Mes


	-- Insertar los datos de la tabla temporal en la tabla principal
	INSERT INTO dbo.ProductividadAsesoresComerciales SELECT * FROM #tmpProductividadAsesoresComerciales
	

	-- Borra las tablas temporales
	IF OBJECT_ID(N'tempdb.dbo.#tmpProductividadAsesoresComercialesRaiz', N'U') IS NOT NULL
			DROP TABLE #tmpProductividadAsesoresComercialesRaiz

	IF OBJECT_ID(N'tempdb.dbo.#tmpProductividadAsesoresComerciales', N'U') IS NOT NULL
			DROP TABLE #tmpProductividadAsesoresComerciales
END

```
