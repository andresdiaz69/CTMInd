# Stored Procedure: sp_Presupuestos_DuplicarParametrosComercialesPorCentros

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesPorCentros]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_DuplicarParametrosComercialesPorCentros]

-- =============================================
-- Control de Cambios
-- 2024|10|18 - Wilder Chacón - Creado para Duplicar Parametros Comerciales Por Centros
-- 2024|11|01 - Alexis Barreto - Se agrega la condicion para duplicar los parametros de Usados Consignacion
-- Modulo - Presupuestos
-- =============================================

    @NuevoIdClase SMALLINT,  
	@CodigoLinea INT,
	@AnoPeriodo SMALLINT
AS
BEGIN
    
    BEGIN TRANSACTION;

    -- Usar MERGE para actualizar o insertar registros según corresponda
    MERGE [Presupuestos_VariablesParametrizacionesPorCentros] AS target
    USING (
        -- Esta es la fuente de datos de los registros que vamos a duplicar
        SELECT 
            @NuevoIdClase AS [IdClase],
            [IdTipo],
            [CodigoCentro],
            [Ano_Periodo],
            [Mes_Periodo],
            [Valor]
        FROM 
            [Presupuestos_VariablesParametrizacionesPorCentros]
        WHERE
            [IdClase] = 1        
			AND [Ano_Periodo] = @AnoPeriodo
			AND [CodigoCentro] IN (Select CodCentro from vw_Presupuestos_CentrosPorLinea where CodUnidadNegocio = @CodigoLinea)
            AND [IdTipo] IN (120, 124, 127, 130, 131, 133, 134) 
    ) AS source
    ON (target.[IdClase] = source.[IdClase]
        AND target.[IdTipo] = source.[IdTipo]
        AND target.[CodigoCentro] = source.[CodigoCentro]
        AND target.[Ano_Periodo] = source.[Ano_Periodo]
        AND target.[Mes_Periodo] = source.[Mes_Periodo])
    
    -- Si la clave primaria ya existe, actualizar el campo [Valor]
    WHEN MATCHED THEN
        UPDATE SET target.[Valor] = source.[Valor]

    -- Si no existe, insertar un nuevo registro
    WHEN NOT MATCHED THEN
        INSERT ([IdClase], [IdTipo], [CodigoCentro], [Ano_Periodo], [Mes_Periodo], [Valor])
        VALUES (source.[IdClase], source.[IdTipo], source.[CodigoCentro], source.[Ano_Periodo], source.[Mes_Periodo], source.[Valor]);

    
	------Usados Consignacion
	IF (@CodigoLinea = 7)
		BEGIN
			 -- Usar MERGE para actualizar o insertar registros según corresponda
			MERGE [Presupuestos_VariablesParametrizacionesPorCentros] AS target
			USING (
				-- Esta es la fuente de datos de los registros que vamos a duplicar
				SELECT 
					@NuevoIdClase AS [IdClase],
					[IdTipo],
					[CodigoCentro],
					[Ano_Periodo],
					[Mes_Periodo],
					[Valor]
				FROM 
					[Presupuestos_VariablesParametrizacionesPorCentros]
				WHERE
					[IdClase] = 1        
					AND [Ano_Periodo] = @AnoPeriodo
					AND [CodigoCentro] IN (Select CodCentro from vw_Presupuestos_CentrosPorLinea where CodUnidadNegocio = @CodigoLinea)
					AND [IdTipo] = 169 
			) AS source
			ON (target.[IdClase] = source.[IdClase]
				AND target.[IdTipo] = source.[IdTipo]
				AND target.[CodigoCentro] = source.[CodigoCentro]
				AND target.[Ano_Periodo] = source.[Ano_Periodo]
				AND target.[Mes_Periodo] = source.[Mes_Periodo])
    
			-- Si la clave primaria ya existe, actualizar el campo [Valor]
			WHEN MATCHED THEN
				UPDATE SET target.[Valor] = source.[Valor]

			-- Si no existe, insertar un nuevo registro
			WHEN NOT MATCHED THEN
				INSERT ([IdClase], [IdTipo], [CodigoCentro], [Ano_Periodo], [Mes_Periodo], [Valor])
				VALUES (source.[IdClase], source.[IdTipo], source.[CodigoCentro], source.[Ano_Periodo], source.[Mes_Periodo], source.[Valor]);
		END


    COMMIT TRANSACTION;

END

```
