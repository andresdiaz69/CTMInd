# Stored Procedure: sp_Presupuestos_CalculoDiferidos

## Usa los objetos:
- [[spiga_Diferidos_Presupuesto]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_CalculoDiferidos]
	-- =============================================
	-- Control de Cambios
	-- 2024|11|09 - Jhon Hernandez - Creado para Listar Facturacion de consignaciones y calcular valores por mes
	-- 2024|11|10 - Alexis Barreto - Se modifica el valor retorno del sp, para devolver en una sola consulta el valor de la obra y software y no por separado
	-- Description:	<SP PARA CALCULO DE DIFERIDOS PRESUPUESTOS>
	-- =============================================
    @codlinea int,
    @codcentro int,
    @Anio_Periodo int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
    SET NOCOUNT ON;
    SET FMTONLY OFF;

    DECLARE @count int = 0,
            @count1 int = 0,
            @Software decimal(18, 2) = 0,
            @Obra decimal(18, 2) = 0;

    -- Contar registros para software
    SELECT @count = COUNT(*)
    FROM PSCService_DB.dbo.spiga_Diferidos_Presupuesto
    WHERE FkCentros_Desglose = @codcentro
        AND (Descripcion LIKE 'Licencia%' OR Descripcion LIKE '%sistemas%');

    -- Asignar valor de Software
    IF @count > 0
    BEGIN
        SELECT TOP 1 @Software = importeDebe
        FROM PSCService_DB.dbo.spiga_Diferidos_Presupuesto
        WHERE FkCentros_Desglose = @codcentro
            AND (Descripcion LIKE 'Licencia%' OR Descripcion LIKE '%sistemas%');
    END

    -- Contar registros para obras
    SELECT @count1 = COUNT(*)
    FROM PSCService_DB.dbo.spiga_Diferidos_Presupuesto
    WHERE FkCentros_Desglose = @codcentro
        AND (Descripcion LIKE 'remodelaciones%' OR Descripcion LIKE 'Polizas%');

    -- Asignar valor de Obra
    IF @count1 > 0
    BEGIN
        SELECT TOP 1 @Obra = importeDebe
        FROM PSCService_DB.dbo.spiga_Diferidos_Presupuesto
        WHERE FkCentros_Desglose = @codcentro
            AND (Descripcion LIKE 'remodelaciones%' OR Descripcion LIKE 'Polizas%');
    END

    -- Retornar los valores de Software y Obra en una sola fila
    SELECT @Software AS Software, @Obra AS Obra;
END

```
