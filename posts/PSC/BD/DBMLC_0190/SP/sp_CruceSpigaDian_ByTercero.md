# Stored Procedure: sp_CruceSpigaDian_ByTercero

## Usa los objetos:
- [[ArchivoDian]]
- [[vw_FacturasProveedores]]

```sql
CREATE PROCEDURE [dbo].[sp_CruceSpigaDian_ByTercero]
@Ano_Periodo as int,
@Mes_periodo as int,
@CodEmpresa as int
AS
BEGIN

	SET NOCOUNT ON;

   
SELECT        

ISNULL(MODULO.Ano_Periodo, SPIGA.Ano_Periodo) AS Ano_Periodo, 
ISNULL(MODULO.Mes_Periodo, SPIGA.Mes_Periodo) AS Mes_Periodo, 
ISNULL(MODULO.CodEmpresa, SPIGA.CodEmpresa) AS CodEmpresa, 
ISNULL(MODULO.NombreEmpresa, SPIGA.NombreEmpresa) AS NombreEmpresa,
ISNULL(MODULO.NitEmisor, SPIGA.NitEmisor) AS NitEmisor, 
ISNULL(MODULO.NombreEmisor, SPIGA.NombreEmisor) AS NombreEmisor, 
ISNULL(MODULO.Cantidad, 0) AS Cantidad_Modulo, 
ISNULL(SPIGA.Cantidad, 0) AS Cantidad_Spiga,
ISNULL(MODULO.Cantidad, 0) - ISNULL(SPIGA.Cantidad, 0) AS Diferencia



FROM            (SELECT        YEAR(FechaEmision) AS Ano_Periodo, MONTH(FechaEmision) AS Mes_Periodo, CodEmpresa, NombreEmpresa, NitEmisor, NombreEmisor, COUNT(*) AS Cantidad
                          FROM            dbo.ArchivoDian
                          WHERE        (YEAR(FechaEmision) = @Ano_Periodo) AND (MONTH(FechaEmision) = @Mes_periodo) AND (CodEmpresa = @CodEmpresa)
                          GROUP BY CodEmpresa, NombreEmpresa, NitEmisor, NombreEmisor, YEAR(FechaEmision), MONTH(FechaEmision)) AS MODULO 
						  
						  FULL OUTER JOIN
                             
							 (SELECT        año AS Ano_Periodo, mes AS Mes_Periodo, IdEmpresas AS CodEmpresa, NombreEmpresa, nit AS NitEmisor, nombres AS NombreEmisor, COUNT(*) AS Cantidad
                               FROM            dbo.vw_FacturasProveedores
                               WHERE        (año = @Ano_Periodo) AND (mes = @Mes_periodo) AND (IdEmpresas = @CodEmpresa)
                               GROUP BY IdEmpresas, NombreEmpresa, nit, nombres, año, mes) AS SPIGA 
							   
							   ON 
							   MODULO.Ano_Periodo = SPIGA.Ano_Periodo 
							   AND MODULO.Mes_Periodo = SPIGA.Mes_Periodo 
							   AND MODULO.CodEmpresa = SPIGA.CodEmpresa 
							   AND MODULO.NitEmisor = SPIGA.NitEmisor
							   


END

```
