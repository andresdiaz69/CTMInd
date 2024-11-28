# Stored Procedure: sp_CruceDianSpigaValoresEmp

## Usa los objetos:
- [[ArchivoDian]]
- [[vw_spigaValorFacturasProveedores]]

```sql

CREATE PROCEDURE [dbo].[sp_CruceDianSpigaValoresEmp]
@Ano_Periodo as int,
@Mes_periodo as int

AS
BEGIN

	SET NOCOUNT ON;

   
   
SELECT ISNULL(MODULO.Ano_Periodo, SPIGA.Ano_Periodo)		AS Ano_Periodo,
	   ISNULL(MODULO.Mes_periodo, SPIGA.Mes_Periodo)		AS Mes_Periodo,
	   ISNULL(MODULO.CodEmpresa, SPIGA.CodEmpresa)			AS CodEmpresa, 
	   ISNULL(MODULO.NombreEmpresa, SPIGA.NombreEmpresa)	AS NombreEmpresa
  FROM (SELECT YEAR(FechaEmision) Ano_Periodo,
			   MONTH(FechaEmision) Mes_Periodo,
			   CodEmpresa, 
			   NombreEmpresa
          FROM dbo.ArchivoDian
         WHERE (YEAR(FechaEmision)	= @Ano_Periodo) 
		   AND (MONTH(FechaEmision) = @Mes_periodo)
			
      GROUP BY CodEmpresa, 
			   NombreEmpresa, 
			   YEAR(FechaEmision),
			   MONTH(FechaEmision)
	    ) MODULO 
						  
   FULL OUTER JOIN (SELECT Ano_Periodo, 
						   Mes_periodo,
						   IdEmpresas CodEmpresa, 
						   NombreEmpresa
                      FROM dbo.vw_spigaValorFacturasProveedores
                     WHERE Ano_periodo = @Ano_Periodo
					   AND Mes_periodo = @Mes_periodo
                     GROUP BY IdEmpresas, 
						   NombreEmpresa, 
						   Ano_periodo,
						   Mes_periodo
				    ) SPIGA ON MODULO.Ano_Periodo	= SPIGA.Ano_Periodo
						   AND MODULO.Mes_Periodo	= SPIGA.Mes_periodo
						   AND MODULO.CodEmpresa	= SPIGA.CodEmpresa
							
END

```
