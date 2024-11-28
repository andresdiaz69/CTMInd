# Stored Procedure: sp_QuantumProveedores

## Usa los objetos:
- [[QuantumProveedores]]
- [[spiga_ContabilidadMovimientos]]
- [[vw_Terceros_Consolidado]]

```sql
CREATE PROCEDURE [dbo].[sp_QuantumProveedores]
(
    @Empresa smallint, 
    @Año smallint,
    @Mes smallint
)
AS
BEGIN
    SET NOCOUNT ON;
    SET FMTONLY OFF;

    DECLARE @FechaDesde datetime
    DECLARE @FechaHasta datetime

    SET @FechaDesde = DATEFROMPARTS(@Año, @Mes, 1)
    SET @FechaHasta = EOMONTH(@FechaDesde)

    DELETE FROM QuantumProveedores 
    WHERE Año = @Año 
    AND Mes = @Mes 
    AND ((@Empresa = 6 AND Empresa = 6) OR (@Empresa = 5 AND Empresa = 5) OR (@Empresa = 1 AND Empresa IN (1, 22)))  

    INSERT INTO QuantumProveedores
    SELECT DISTINCT @Año AS Año, @Mes AS Mes, @Empresa AS Empresa, ISNULL(NifCif, '') AS Nit, 
    CASE WHEN TipoDocumento <> 'NIT' THEN Nombre 
    ELSE '' END AS Nombre, 
    CASE WHEN TipoDocumento <> 'NIT' THEN ISNULL(Apellido1, '') + ISNULL(' ' + Apellido2, '') 
    ELSE '' END AS Apellidos, 
    CASE WHEN TipoDocumento = 'NIT' THEN Nombre 
    ELSE '' END AS RazonSocial,
    'Proveedor' AS Descripcion, TipoDocumento
    FROM vw_Terceros_consolidado t1
    INNER JOIN (
        SELECT DISTINCT CodigoTercero 
        FROM [PSCService_DB]..spiga_ContabilidadMovimientos 
        WHERE TipoFactura = 'R' 
        AND FechaAsiento BETWEEN @FechaDesde AND @FechaHasta 
        AND ((@Empresa = 6 AND IdEmpresas = 6) OR (@Empresa = 5 AND IdEmpresas = 5) OR (@Empresa = 1 AND IdEmpresas IN (1, 22)))  
        GROUP BY CodigoTercero
    ) AS t2 ON t2.CodigoTercero = t1.PkTerceros
END

```
