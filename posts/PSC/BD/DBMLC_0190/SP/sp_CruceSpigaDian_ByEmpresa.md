# Stored Procedure: sp_CruceSpigaDian_ByEmpresa

## Usa los objetos:
- [[ArchivoDian]]
- [[vw_FacturasProveedores]]

```sql




CREATE PROCEDURE [dbo].[sp_CruceSpigaDian_ByEmpresa]
@Ano_Periodo as int,
@Mes_periodo as int

AS
BEGIN

	SET NOCOUNT ON;

   
SELECT        

ISNULL(MODULO.Ano_Periodo, SPIGA.Ano_Periodo) AS Ano_Periodo, 
ISNULL(MODULO.Mes_Periodo, SPIGA.Mes_Periodo) AS Mes_Periodo, 
ISNULL(MODULO.CodEmpresa, SPIGA.CodEmpresa) AS CodEmpresa, 


ISNULL(MODULO.NombreEmpresa, SPIGA.NombreEmpresa) AS NombreEmpresa, 

ISNULL(MODULO.Cantidad, 0) AS Cantidad_Modulo, 

ISNULL(SPIGA.Cantidad, 0) AS Cantidad_Spiga,
ISNULL(MODULO.Cantidad, 0) - ISNULL(SPIGA.Cantidad, 0) AS Diferencia





FROM            (SELECT        YEAR(FechaEmision) AS Ano_Periodo, MONTH(FechaEmision) AS Mes_Periodo, CodEmpresa, NombreEmpresa, COUNT(*) AS Cantidad
                          FROM            dbo.ArchivoDian
                          WHERE        (YEAR(FechaEmision) = @Ano_Periodo) AND (MONTH(FechaEmision) = @Mes_periodo)
                          GROUP BY CodEmpresa, NombreEmpresa, YEAR(FechaEmision), MONTH(FechaEmision)) AS MODULO 
						  
						  FULL OUTER JOIN

                             (SELECT        año AS Ano_Periodo, mes AS Mes_Periodo, IdEmpresas AS CodEmpresa, NombreEmpresa, COUNT(*) AS Cantidad
                               FROM            dbo.vw_FacturasProveedores
                               WHERE        (año = @Ano_Periodo) AND (mes = @Mes_periodo)
                               GROUP BY IdEmpresas, NombreEmpresa, año, mes) AS SPIGA 
							   
							   ON MODULO.Ano_Periodo = SPIGA.Ano_Periodo 
							   AND MODULO.Mes_Periodo = SPIGA.Mes_Periodo 
							   AND MODULO.CodEmpresa = SPIGA.CodEmpresa
						


END

```
