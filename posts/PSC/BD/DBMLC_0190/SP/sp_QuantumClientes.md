# Stored Procedure: sp_QuantumClientes

## Usa los objetos:
- [[QuantumClientes]]
- [[spiga_ContabilidadMovimientos]]
- [[vw_Terceros_Consolidado]]

```sql


CREATE PROCEDURE [dbo].[sp_QuantumClientes]
(
	@Empresa smallint, 
	@Año smallint,
	@Mes smallint
)
AS
--DECLARE @Empresa smallint, @Año smallint, @Mes smallint
--SET @Empresa = case when @Empresa =1
--SET @Año = 2023
--SET @Mes = 6

BEGIN
	SET NOCOUNT ON;
	SET FMTONLY OFF;

	DECLARE @FechaDesde datetime
	DECLARE @FechaHasta datetime

	SET @FechaDesde = DATEFROMPARTS(@Año, @Mes, 1)
	SET @FechaHasta = EOMONTH(@FechaDesde)

	DELETE FROM QuantumClientes 
    WHERE Año = @Año and Mes = @Mes 
        and ((@Empresa = 6 and Empresa = 6) or (@Empresa = 5 and Empresa = 5) or (@Empresa = 1 and Empresa in (1, 22)))

	INSERT INTO QuantumClientes
  	SELECT DISTINCT @Año AS Año, @Mes AS Mes, @Empresa AS Empresa, ISNULL(NifCif, '') AS Nit, 
		CASE WHEN TipoDocumento <> 'NIT' THEN Nombre
		ELSE '' END AS Nombre, 
		CASE WHEN TipoDocumento <> 'NIT' THEN ISNULL(Apellido1, '') + ISNULL(' ' + Apellido2, '')
		ELSE '' END AS Apellidos, 
		CASE WHEN TipoDocumento = 'NIT' THEN Nombre 
		ELSE '' END AS RazonSocial,
		'Cliente' AS Descripcion, TipoDocumento
    FROM vw_Terceros_consolidado t1
    INNER JOIN (SELECT DISTINCT CodigoTercero
                FROM [PSCService_DB]..spiga_ContabilidadMovimientos 
                WHERE TipoFactura = 'E' 
                    and FechaAsiento BETWEEN @FechaDesde AND @FechaHasta 
                    and ((@Empresa = 6 and IdEmpresas = 6) or (@Empresa = 5 and IdEmpresas = 5) or (@Empresa = 1 and IdEmpresas IN (1, 22)))  
                GROUP BY CodigoTercero
               ) AS t2 ON t2.CodigoTercero = t1.PkTerceros
END 

```
