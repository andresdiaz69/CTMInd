# Stored Procedure: sp_Presupuestos_DuplicarParametrosComercialesMaquinariaPorLineas

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesMaquinariaPorLineas]]
- [[Presupuestos_VariablesParametrizacionesPorLineas]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_DuplicarParametrosComercialesMaquinariaPorLineas]

-- =============================================
-- Control de Cambios
-- 2024|10|31 - Wilder Chacón - Creado para Duplicar Parametros Comerciales Maquinaria Por Lineas
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
			AND [IdTipo] IN (117, 121, 122, 123, 125, 126, 128, 129)  -- Condición para IdTipo 
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


    MERGE [Presupuestos_VariablesParametrizacionesMaquinariaPorLineas] AS target
    USING (
        -- Esta es la fuente de datos de los registros que vamos a duplicar
        SELECT 
            @NuevoIdClase AS [IdClase],
            [IdTipo],
			[IdCategoria],
            [CodigoLinea],
            [Ano_Periodo],
            [Mes_Periodo],
            [Valor]
        FROM 
            [Presupuestos_VariablesParametrizacionesMaquinariaPorLineas]
        WHERE
            [IdClase] = 1         -- Condición para IdClase original
			AND [CodigoLinea] = @CodigoLinea
			AND [IdTipo] IN (154, 155, 156)  -- Condición para IdTipo 
			AND [Ano_Periodo] = @AnoPeriodo
    ) AS source
    ON (target.[IdClase] = source.[IdClase]
        AND target.[IdTipo] = source.[IdTipo]
		AND target.[IdCategoria] = source.[IdCategoria]
        AND target.[CodigoLinea] = source.[CodigoLinea]
        AND target.[Ano_Periodo] = source.[Ano_Periodo]
        AND target.[Mes_Periodo] = source.[Mes_Periodo])
    
    -- Si la clave primaria ya existe, actualizar el campo [Valor]
    WHEN MATCHED THEN
        UPDATE SET target.[Valor] = source.[Valor]

    -- Si no existe, insertar un nuevo registro
    WHEN NOT MATCHED THEN
        INSERT ([IdClase], [IdTipo], [IdCategoria], [CodigoLinea], [Ano_Periodo], [Mes_Periodo], [Valor])
        VALUES (source.[IdClase], source.[IdTipo], source.[IdCategoria], source.[CodigoLinea], source.[Ano_Periodo], source.[Mes_Periodo], source.[Valor]);

    COMMIT TRANSACTION;

END

```
