# Stored Procedure: sp_CruceSpigaDianEmpresaAn

## Usa los objetos:
- [[ArchivoDian]]
- [[Spiga_Saldos]]

```sql







CREATE PROCEDURE [dbo].[sp_CruceSpigaDianEmpresaAn]
@Ano_Periodo as int

AS
BEGIN

	SET NOCOUNT ON;

   
SELECT        

ISNULL(MODULO.Ano_Periodo, SPIGA.Ano_Periodo) AS Ano_Periodo, 
ISNULL(MODULO.CodEmpresa, SPIGA.CodEmpresa) AS CodEmpresa, 
ISNULL(MODULO.NombreEmpresa, SPIGA.NombreEmpresa) AS NombreEmpresa, 
ISNULL(MODULO.Cantidad, 0) AS Cantidad_Modulo, 
ISNULL(SPIGA.Cantidad, 0) AS Cantidad_Spiga,
ISNULL(MODULO.Cantidad, 0) - ISNULL(SPIGA.Cantidad, 0) AS Diferencia

         
FROM            (SELECT        YEAR(FechaEmision) AS Ano_Periodo, CodEmpresa, NombreEmpresa, COUNT(*) AS Cantidad
                          FROM            dbo.ArchivoDian
                          WHERE        (YEAR(FechaEmision) = @Ano_Periodo) 
                          GROUP BY CodEmpresa, NombreEmpresa, YEAR(FechaEmision)) AS MODULO 
						  
						  FULL OUTER JOIN

                             (SELECT        Ano_Periodo AS Ano_Periodo, CodEmpresa AS CodEmpresa, NombreEmpresa AS NombreEmpresa,
							 COUNT(*) AS Cantidad
                               FROM            dbo.Spiga_Saldos
                               WHERE        Ano_Periodo = @Ano_Periodo

                               GROUP BY CodEmpresa, NombreEmpresa, Ano_Periodo) AS SPIGA 
							   
							   ON MODULO.Ano_Periodo = SPIGA.Ano_Periodo 
							   AND MODULO.CodEmpresa = SPIGA.CodEmpresa
							
							
					
					

END

```
