# Stored Procedure: sp_Presupuestos_DuplicarParametrosComercialesPorModelos

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesPorModelos]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql
CREATE PROCEDURE sp_Presupuestos_DuplicarParametrosComercialesPorModelos

-- =============================================
-- Control de Cambios
-- 2024|10|18 - Wilder Chacón - Creado para Duplicar Parametros Comerciales Por Modelos/Gamas
-- Modulo - Presupuestos
-- =============================================

    @NuevoIdClase SMALLINT,  
	@CodigoLinea INT,
	@AnoPeriodo SMALLINT
AS
BEGIN
    
    BEGIN TRANSACTION;

    -- Usar MERGE para actualizar o insertar registros según corresponda
    MERGE [Presupuestos_VariablesParametrizacionesPorModelos] AS target
    USING (
        -- Esta es la fuente de datos de los registros que vamos a duplicar
        SELECT 
            @NuevoIdClase AS [IdClase],
            [IdTipo],
            [CodigoCentro],
			[CodigoModelo],
            [Ano_Periodo],
            [Mes_Periodo],
            [Valor]
        FROM 
            [Presupuestos_VariablesParametrizacionesPorModelos]
        WHERE
            [IdClase] = 1        
			AND [Ano_Periodo] = @AnoPeriodo
			AND [CodigoCentro] IN (Select CodCentro from vw_Presupuestos_CentrosPorLinea where CodUnidadNegocio = @CodigoLinea)
    ) AS source
    ON (target.[IdClase] = source.[IdClase]
        AND target.[IdTipo] = source.[IdTipo]
        AND target.[CodigoCentro] = source.[CodigoCentro]
		AND target.[CodigoModelo] = source.[CodigoModelo]
        AND target.[Ano_Periodo] = source.[Ano_Periodo]
        AND target.[Mes_Periodo] = source.[Mes_Periodo])
    
    -- Si la clave primaria ya existe, actualizar el campo [Valor]
    WHEN MATCHED THEN
        UPDATE SET target.[Valor] = source.[Valor]

    -- Si no existe, insertar un nuevo registro
    WHEN NOT MATCHED THEN
        INSERT ([IdClase], [IdTipo], [CodigoCentro], [CodigoModelo], [Ano_Periodo], [Mes_Periodo], [Valor])
        VALUES (source.[IdClase], source.[IdTipo], source.[CodigoCentro], source.[CodigoModelo], source.[Ano_Periodo], source.[Mes_Periodo], source.[Valor]);

    
    COMMIT TRANSACTION;

END
```
