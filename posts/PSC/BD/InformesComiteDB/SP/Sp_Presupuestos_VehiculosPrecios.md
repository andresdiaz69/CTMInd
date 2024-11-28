# Stored Procedure: Sp_Presupuestos_VehiculosPrecios

## Usa los objetos:
- [[Presupuestos_Combustible]]
- [[Presupuestos_LineasMayorista]]
- [[Presupuestos_VehiculosPrecios]]
- [[spiga_TipoClasificacionesVehiculos]]
- [[VehiculosGamas]]
- [[VehiculosMarcas]]
- [[VehiculosModelos]]

```sql
CREATE PROCEDURE [dbo].[Sp_Presupuestos_VehiculosPrecios] 
(
	@IdMarca INT,
	@anoPre  INT,
	@idClase INT
) AS
	--****************************
	--Autor: Manuel Suarez
	-- Date: 27/06/2024
	--Descr: Create SP para proyecto presupuestos precios por Marca, gama, modelo y tipo de vehiculo. Donde se valida por marca y se sincroniza la informacion en una tabla.
	--****************************
	--****************************
	--Autor: Manuel Suarez
	-- Date: 24/10/2024
	--Descr: Alter SP para el manejo de Motorysa daimler y seat.
	--****************************
	--****************************
	--Autor: Manuel Suarez
	-- Date: 29/10/2024
	--Descr: Alter SP donde se agrega nueva variable por clase
	--****************************
	--declare @IdMarca int =3;
	--declare @anoPre  int =2025
	--declare @idClase int =1

BEGIN
	SET NOCOUNT ON;
	SET FMTONLY OFF;
    
	DECLARE @idmarcam INT;
	DECLARE @marca VARCHAR(100) = NULL;

	-- Definir el cursor o el valor directo dependiendo de @IdMarca
	IF @IdMarca = 21 OR @IdMarca = 246
	BEGIN
			SELECT @idmarcam = lm.Codmarca, 
					@marca = lm.NombreMarcaPresupuestos 
			FROM [dbo].[Presupuestos_LineasMayorista] lm
			WHERE lm.codmarcaPresupuestos = @IdMarca;
		  
			-- Configura el cursor con el único valor de @idmarcam
			DECLARE CodigosMarcasCursor CURSOR FOR 
			SELECT @idmarcam AS CodigoMarcaSpigaValido;
	END
	ELSE
			BEGIN
			-- Selección de múltiples valores en el cursor o asignación directa
				IF EXISTS ( SELECT 1 
							FROM [DBMLC_0190]..VehiculosMarcas 
							WHERE Unidad_Negocio IS NOT NULL 
								AND CodigoMarcaSpigaValido <> 0 
								AND Unidad_Negocio <> 2 
								AND CodigoMarca    <> 3 
								AND Unidad_Negocio = @IdMarca) 
				begin
					DECLARE CodigosMarcasCursor CURSOR FOR 
						SELECT DISTINCT CodigoMarcaSpigaValido 
						FROM [DBMLC_0190]..VehiculosMarcas
						WHERE Unidad_Negocio IS NOT NULL 
						AND CodigoMarcaSpigaValido <> 0 
						AND Unidad_Negocio <> 2 
						AND CodigoMarca <> 3 
						AND Unidad_Negocio = @IdMarca;
				end
				else if EXISTS (SELECT 1
									FROM [DBMLC_0190]..VehiculosMarcas 
								WHERE Unidad_Negocio IS  NULL 
									AND CodigoMarcaSpigaValido <> 0 
									AND CodigoMarca <> 3
									AND CodigoMarcaSpigaValido in (410,411,520)
									AND CodigoMarcaSpigaValido = @IdMarca) 
				begin
					DECLARE CodigosMarcasCursor CURSOR FOR 
						SELECT DISTINCT CodigoMarca 
						FROM [DBMLC_0190]..VehiculosMarcas 
						WHERE Unidad_Negocio IS  NULL 
						AND CodigoMarcaSpigaValido <> 0 
						AND CodigoMarca <> 3
						AND CodigoMarcaSpigaValido in (410,411,520)
						AND CodigoMarcaSpigaValido = @IdMarca;
				end
		-- Asignación directa si no existen valores distintos
				else
			BEGIN
					SET @idmarcam = @IdMarca;
					DECLARE CodigosMarcasCursor CURSOR FOR 
					SELECT @idmarcam AS CodigoMarcaSpigaValido;
			END
	END;

	-- Iniciar transacción
	BEGIN TRAN;
	BEGIN TRY
		-- Abrir el cursor y recorrer para cada marca
		OPEN CodigosMarcasCursor;
		FETCH NEXT FROM CodigosMarcasCursor INTO @idmarcam;

		WHILE @@FETCH_STATUS = 0
		BEGIN
			IF OBJECT_ID('tempdb.dbo.#VehiculosPres', 'U') IS NOT NULL
				DROP TABLE #VehiculosPres;

			-- Crear y poblar la tabla temporal con los datos
			SELECT [AnoPresupuesto] = @anoPre, 
					codigomarca = @IdMarca, 
					ISNULL(@marca, Marca) AS Marca, 
					a.CodigoGama, 
					g.Gama, 
					CONCAT(@IdMarca,case when @IdMarca in(1,420,410,411,520) then case when a.codigomarca not in(410,411,520)then a.codigomarca end end, a.CodigoGama, c.id_combustible) CodigoModelo, 
					CONCAT(g.Gama, ' (', Combustible, ')') AS Modelo,                   
					AVG(PrecioListaAntesDeImpuestos) AS PrecioListaAntesDeImpuestos, 
					clasificacion,    
					Combustible,
					AplicaPresupuesto = 1, 
					usuario = NULL, 
					fechamodificacion = NULL,
					idclase = @idClase
				INTO #VehiculosPres   
				FROM (SELECT ROW_NUMBER() OVER (PARTITION BY CodigoGama, CodigoMarca, CodigoModelo ORDER BY AnoModelo DESC) AS RowNum,
							CodigoGama, CodigoMarca, CodigoModelo, AnoModelo, PrecioListaAntesDeImpuestos,   FechaModificacion
						FROM DBMLC_0190..VehiculosModelos c 
						WHERE modeloactivo = 1
						AND PrecioListaAntesDeImpuestos > 0
					) a
				LEFT JOIN DBMLC_0190..VehiculosMarcas m ON m.CodigoMarca = a.CodigoMarca
				LEFT JOIN (SELECT PkCodModelo, PkAnoModelo, PkFkMarcas, PkFkGamas, Nombre, 
								CASE WHEN NombreClasificacion IN ('Sedan', 'AUTOMÓVIL', 'CAMIONETA', 'Campero', 'MICROBUS', 'CUADRICICLO', 'SIN CLASE') THEN 'AUTOMOVIL'
										WHEN NombreClasificacion IN ('ARAÑA', 'Chasis Cabinado', 'VOLQUETA') OR NombreClasificacion LIKE '%cami%'          THEN 'TRACTO-CAMION'	
										WHEN NombreClasificacion LIKE '%agr%' OR NombreClasificacion LIKE '%const%'                                        THEN 'MAQUINARIA'
										WHEN NombreClasificacion IS NULL                                                                                   THEN 'Sin Clasificacion'
										ELSE NombreClasificacion END AS Clasificacion,
								FkCombustibleTipos, ROW_NUMBER() OVER (PARTITION BY PkCodModelo ORDER BY PkAnoModelo DESC, PkExtModelo) AS orden
							FROM PSCService_DB..spiga_TipoClasificacionesVehiculos
							WHERE activo = 1
							) tc ON tc.PkCodModelo = a.CodigoModelo 
								AND tc.PkAnoModelo = CONVERT(VARCHAR, a.AnoModelo) COLLATE Latin1_General_CI_AS
								AND tc.PkFkMarcas = a.CodigoMarca
								AND tc.PkFkGamas = a.CodigoGama
				LEFT JOIN (SELECT REPLACE(id_combustible, 18, 9) AS id_combustible,
								REPLACE(Combustible, 'Gas. Elec.', 'Gasolina Electrico') AS Combustible,
								PkCombustibleTipos
							FROM Presupuestos_Combustible
						) c ON c.PkCombustibleTipos = tc.FkCombustibleTipos
				LEFT JOIN DBMLC_0190..VehiculosGamas g ON g.CodigoMarca = a.CodigoMarca
													AND g.CodigoGama  = a.CodigoGama
				WHERE RowNum = 1
				AND orden = 1
				AND CONCAT(@IdMarca,case when @IdMarca in(1,420,410,411,520) then case when a.codigomarca not in(410,411,520)then a.codigomarca end end, a.CodigoGama, c.id_combustible)  
					NOT IN (SELECT CodigoModelo FROM Presupuestos_VehiculosPrecios WHERE Usuario IS NOT NULL AND AnoPresupuesto = @anoPre and idclase = @idClase )
				AND a.CodigoMarca = @idmarcam			    
			GROUP BY a.CodigoMarca, Marca, a.CodigoGama, g.Gama, id_combustible, Clasificacion, Combustible;
			--select * from  #VehiculosPres
			-- Realizar MERGE
			MERGE INTO [Presupuestos_VehiculosPrecios] pv
			USING #VehiculosPres tv   ON pv.AnoPresupuesto = tv.AnoPresupuesto 
										and pv.CodigoModelo   = tv.CodigoModelo
										and pv.CodigoMarca    = tv.CodigoMarca
										and pv.codigogama     = tv.codigogama
										and pv.idclase        = tv.idclase
				WHEN MATCHED THEN
					UPDATE SET pv.Modelo = tv.Modelo,
								pv.PrecioListaAntesDeImpuestos = tv.PrecioListaAntesDeImpuestos,
								pv.Clasificacion = tv.Clasificacion,
								pv.Combustible = tv.Combustible
				WHEN NOT MATCHED THEN
					INSERT (AnoPresupuesto, CodigoMarca, Marca, CodigoGama, Gama, CodigoModelo,
							Modelo, PrecioListaAntesDeImpuestos, Clasificacion, Combustible, 
							AplicaPresupuesto, usuario, fechamodificacion, idClase)
					VALUES (tv.AnoPresupuesto, tv.CodigoMarca, tv.Marca, tv.CodigoGama, tv.Gama, 
							tv.CodigoModelo, tv.Modelo, tv.PrecioListaAntesDeImpuestos, tv.Clasificacion, 
							tv.Combustible, tv.AplicaPresupuesto, tv.usuario, tv.fechamodificacion, tv.idClase);

			FETCH NEXT FROM CodigosMarcasCursor INTO @idmarcam;
		END;

		-- Cerrar y liberar el cursor
		CLOSE CodigosMarcasCursor;
		DEALLOCATE CodigosMarcasCursor;

		-- Confirmar transacción
		COMMIT;
	END TRY
	BEGIN CATCH
		ROLLBACK;
		CLOSE CodigosMarcasCursor;
		DEALLOCATE CodigosMarcasCursor;
		THROW;
	END CATCH;

	-- Resultados finales
	SELECT AnoPresupuesto, CodigoMarca, Marca, CodigoGama, Gama, CodigoModelo,
			Modelo, PrecioListaAntesDeImpuestos, Clasificacion, Combustible, 
			AplicaPresupuesto, Usuario, FechaModificacion, IdClase
		FROM Presupuestos_VehiculosPrecios
		WHERE CodigoMarca       = @IdMarca
		AND AnoPresupuesto    = @anoPre
		AND idClase           = @idClase
		AND AplicaPresupuesto = 1;
END;

```
