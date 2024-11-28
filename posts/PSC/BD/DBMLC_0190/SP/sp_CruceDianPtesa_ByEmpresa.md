# Stored Procedure: sp_CruceDianPtesa_ByEmpresa

## Usa los objetos:
- [[ArchivoDian]]
- [[ArchivoPtesa]]

```sql





CREATE PROCEDURE [dbo].[sp_CruceDianPtesa_ByEmpresa]
@Ano_Periodo as int,
@Mes_periodo as int

AS
BEGIN

	SET NOCOUNT ON;

   
   
SELECT        

ISNULL(MODULO.Ano_Periodo, PTESA.Ano_Periodo) AS Ano_Periodo, 
ISNULL(MODULO.Mes_Periodo, PTESA.Mes_Periodo) AS Mes_Periodo, 
ISNULL(MODULO.CodEmpresa, PTESA.CodEmpresa) AS CodEmpresa, 
ISNULL(MODULO.NombreEmpresa, PTESA.NombreEmpresa) AS NombreEmpresa, 
ISNULL(MODULO.Cantidad, 0) AS Cantidad_Dian, 
ISNULL(PTESA.Cantidad, 0) AS Cantidad_Ptesa,
ISNULL(MODULO.Cantidad, 0) - ISNULL(PTESA.Cantidad, 0) AS Diferencia





FROM            (SELECT        YEAR(FechaEmision) AS Ano_Periodo, MONTH(FechaEmision) AS Mes_Periodo, CodEmpresa, NombreEmpresa, COUNT(*) AS Cantidad
                          FROM            dbo.ArchivoDian
                          WHERE        (YEAR(FechaEmision) = @Ano_Periodo) AND (MONTH(FechaEmision) = @Mes_periodo)
                          GROUP BY CodEmpresa, NombreEmpresa, YEAR(FechaEmision), MONTH(FechaEmision)) AS MODULO 
						  
						  FULL OUTER JOIN

                             (SELECT        YEAR(Emision) AS Ano_Periodo, MONTH(Emision) AS Mes_Periodo, CodEmpresa AS CodEmpresa, NombreEmpresa, COUNT(*) AS Cantidad
                               FROM            dbo.ArchivoPtesa
                               WHERE        (YEAR(Emision) = @Ano_Periodo) AND (MONTH(Emision)  = @Mes_periodo)
                               GROUP BY CodEmpresa, NombreEmpresa, YEAR(Emision), MONTH(Emision)) AS PTESA 
							   
							   ON MODULO.Ano_Periodo = PTESA.Ano_Periodo 
							   AND MODULO.Mes_Periodo = PTESA.Mes_Periodo 
							   AND MODULO.CodEmpresa = PTESA.CodEmpresa
							

		


END

```
