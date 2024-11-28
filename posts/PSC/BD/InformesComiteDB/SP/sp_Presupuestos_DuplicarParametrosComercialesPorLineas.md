# Stored Procedure: sp_Presupuestos_DuplicarParametrosComercialesPorLineas

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesGlobales]]
- [[Presupuestos_VariablesParametrizacionesPorLineas]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_DuplicarParametrosComercialesPorLineas]

-- =============================================
-- Control de Cambios
-- 2024|10|18 - Wilder Chacón - Creado para Duplicar Parametros Comerciales Por Lineas
-- Modulo - Presupuestos
-- =============================================

    @NuevoIdClase SMALLINT,  
	@CodigoLinea INT,
	@AnoPeriodo SMALLINT
AS
BEGIN
    
    BEGIN TRANSACTION;

    -- Usar MERGE para actualizar o insertar registros según corresponda
    MERGE [Presupuestos_VariablesParametrizacionesPorLineas] AS target
    USING (
        -- Esta es la fuente de datos de los registros que vamos a duplicar
        SELECT 
            @NuevoIdClase AS [IdClase],
            [IdTipo],
            [CodigoLinea],
            [Ano_Periodo],
            [Mes_Periodo],
            [Valor]
        FROM 
            [Presupuestos_VariablesParametrizacionesPorLineas]
        WHERE
            [IdClase] = 1         -- Condición para IdClase original
			AND [CodigoLinea] = @CodigoLinea
			AND [IdTipo] IN (115, 116, 117, 118, 119, 121, 122, 123, 125, 126, 128, 129)  -- Condición para IdTipo 
			AND [Ano_Periodo] = @AnoPeriodo
    ) AS source
    ON (target.[IdClase] = source.[IdClase]
        AND target.[IdTipo] = source.[IdTipo]
        AND target.[CodigoLinea] = source.[CodigoLinea]
        AND target.[Ano_Periodo] = source.[Ano_Periodo]
        AND target.[Mes_Periodo] = source.[Mes_Periodo])
    
    -- Si la clave primaria ya existe, actualizar el campo [Valor]
    WHEN MATCHED THEN
        UPDATE SET target.[Valor] = source.[Valor]

    -- Si no existe, insertar un nuevo registro
    WHEN NOT MATCHED THEN
        INSERT ([IdClase], [IdTipo], [CodigoLinea], [Ano_Periodo], [Mes_Periodo], [Valor])
        VALUES (source.[IdClase], source.[IdTipo], source.[CodigoLinea], source.[Ano_Periodo], source.[Mes_Periodo], source.[Valor]);

	-- Se insertan los valores que dependen del Total industria o Vtas Vehículos (K) - variable macro
	DECLARE @UnidadesFabrica DECIMAL (18,2);
	DECLARE @UnidadesCompañia DECIMAL (18,2);

	SET @UnidadesFabrica = 

		(SELECT Valor FROM Presupuestos_VariablesParametrizacionesGlobales
						WHERE	Ano_Periodo = @AnoPeriodo 
							AND IdClase		= @NuevoIdClase 
							AND IdTipo		= 10 -- Vtas Vehículos (K)
		) * 1000 *

		(SELECT  Valor FROM Presupuestos_VariablesParametrizacionesPorLineas
						WHERE	CodigoLinea = @CodigoLinea 
							AND Ano_Periodo = @AnoPeriodo 
							AND IdClase		= @NuevoIdClase 
							AND IdTipo		= 115 -- % Participacion Fabrica
		) / 100 

	SET @UnidadesCompañia =  

		@UnidadesFabrica *

		(SELECT Valor FROM Presupuestos_VariablesParametrizacionesPorLineas
						WHERE	CodigoLinea = @CodigoLinea 
							AND Ano_Periodo = @AnoPeriodo 
							AND IdClase		= @NuevoIdClase 
							AND IdTipo		= 116 --% Peso Comercial Compañia
		) / 100

	UPDATE Presupuestos_VariablesParametrizacionesPorLineas
		SET Valor = @UnidadesFabrica
		WHERE	 Ano_Periodo  = @AnoPeriodo 
			AND  CodigoLinea  = @CodigoLinea 
			AND  IdTipo       = 118 --Unidades Fabrica VN
			AND  IdClase	  = @NuevoIdClase

	UPDATE Presupuestos_VariablesParametrizacionesPorLineas
		SET Valor = @UnidadesCompañia
		WHERE	 Ano_Periodo  = @AnoPeriodo 
			AND  CodigoLinea  = @CodigoLinea 
			AND  IdTipo       = 119 --Unidades Compañia VN
			AND  IdClase	  = @NuevoIdClase
    
    COMMIT TRANSACTION;

END

```
