# Stored Procedure: sp_Presupuestos_DuplicarParametrosComercialesMaquinariaPorCentros

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesMaquinariaPorCentros]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_DuplicarParametrosComercialesMaquinariaPorCentros]

-- =============================================
-- Control de Cambios
-- 2024|10|31 - Wilder Chacón - Creado para Duplicar Parametros Comerciales Maquinaria Por Centros
-- Modulo - Presupuestos
-- =============================================

    @NuevoIdClase SMALLINT,  
	@CodigoLinea INT,
	@AnoPeriodo SMALLINT
AS
BEGIN
    
    BEGIN TRANSACTION;

    -- Usar MERGE para actualizar o insertar registros según corresponda
    MERGE [Presupuestos_VariablesParametrizacionesMaquinariaPorCentros] AS target
    USING (
        -- Esta es la fuente de datos de los registros que vamos a duplicar
        SELECT 
            @NuevoIdClase AS [IdClase],
            [IdTipo],
			[IdCategoria],
			[CodigoLinea],
            [CodigoCentro],
            [Ano_Periodo],
            [Mes_Periodo],
            [Valor]
        FROM 
            [Presupuestos_VariablesParametrizacionesMaquinariaPorCentros]
        WHERE
            [IdClase] = 1        
			AND [Ano_Periodo] = @AnoPeriodo
			AND [CodigoLinea] = @CodigoLinea
            AND [IdTipo] IN (120, 124, 127, 130, 131, 133, 134) 
    ) AS source
    ON (target.[IdClase] = source.[IdClase]
        AND target.[IdTipo] = source.[IdTipo]
        AND target.[IdCategoria] = source.[IdCategoria]
        AND target.[CodigoLinea] = source.[CodigoLinea]
        AND target.[CodigoCentro] = source.[CodigoCentro]
        AND target.[Ano_Periodo] = source.[Ano_Periodo]
        AND target.[Mes_Periodo] = source.[Mes_Periodo])
    
    -- Si la clave primaria ya existe, actualizar el campo [Valor]
    WHEN MATCHED THEN
        UPDATE SET target.[Valor] = source.[Valor]

    -- Si no existe, insertar un nuevo registro
    WHEN NOT MATCHED THEN
        INSERT ([IdClase], [IdTipo], [IdCategoria], [CodigoLinea], [CodigoCentro], [Ano_Periodo], [Mes_Periodo], [Valor])
        VALUES (source.[IdClase], source.[IdTipo], source.[IdCategoria], source.[CodigoLinea], source.[CodigoCentro], source.[Ano_Periodo], source.[Mes_Periodo], source.[Valor]);

    
    COMMIT TRANSACTION;

END


```
