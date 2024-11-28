# Stored Procedure: sp_CruceDianPtesa_EmpresaAn

## Usa los objetos:
- [[ArchivoDian]]
- [[ArchivoPtesa_Saldos]]

```sql



CREATE PROCEDURE [dbo].[sp_CruceDianPtesa_EmpresaAn]
@Ano_Periodo as int

AS
BEGIN

	SET NOCOUNT ON;

   
   
SELECT        

ISNULL(MODULO.Ano_Periodo, PTESA.Ano_Periodo) AS Ano_Periodo, 
ISNULL(MODULO.CodEmpresa, PTESA.CodEmpresa) AS CodEmpresa, 
ISNULL(MODULO.NombreEmpresa, PTESA.NombreEmpresa) AS NombreEmpresa, 
ISNULL(MODULO.Cantidad, 0) AS Cantidad_Dian, 
ISNULL(PTESA.Cantidad, 0) AS Cantidad_Ptesa,
ISNULL(MODULO.Cantidad, 0) - ISNULL(PTESA.Cantidad, 0) AS Diferencia





FROM            (SELECT        YEAR(FechaEmision) AS Ano_Periodo, CodEmpresa, NombreEmpresa, COUNT(*) AS Cantidad
                          FROM            dbo.ArchivoDian
                          WHERE        (YEAR(FechaEmision) = @Ano_Periodo) 
                          GROUP BY CodEmpresa, NombreEmpresa, YEAR(FechaEmision)) AS MODULO 
						  
						  FULL OUTER JOIN

                             (SELECT        Ano_periodo AS Ano_Periodo, CodEmpresa AS CodEmpresa, NombreEmpresa, COUNT(*) AS Cantidad
                               FROM            dbo.ArchivoPtesa_Saldos
                               WHERE		   Ano_periodo = @Ano_Periodo
                               GROUP BY CodEmpresa, NombreEmpresa, Ano_periodo) AS PTESA 
							   
							   ON MODULO.Ano_Periodo = PTESA.Ano_Periodo 
							   AND MODULO.CodEmpresa = PTESA.CodEmpresa
							

	
END

```
