# Stored Procedure: sp_CruceDianPtesAn

## Usa los objetos:
- [[ArchivoDian]]
- [[ArchivoPtesa_Saldos]]

```sql







CREATE PROCEDURE [dbo].[sp_CruceDianPtesAn]
@Ano_Periodo as int,
@Codigo_Empresa as smallint

AS
BEGIN

	SET NOCOUNT ON;

   
SELECT        

ISNULL(MODULO.Ano_Periodo, PTESA.Ano_Periodo) AS Ano_Periodo, 
ISNULL(MODULO.CodEmpresa, PTESA.CodEmpresa) AS CodEmpresa, 
ISNULL(MODULO.NombreEmpresa, PTESA.NombreEmpresa) AS NombreEmpresa,
ISNULL(MODULO.NitEmisor, PTESA.Emisor_ID) AS Nit,
ISNULL(MODULO.NombreEmisor, PTESA.Emisor) AS Emisor,
ISNULL(MODULO.Prefijo, PTESA.ID) AS Prefijo,
ISNULL(MODULO.Folio, PTESA.ID) AS Numero,
ISNULL(MODULO.CufeCude, PTESA.UUID) AS CufeCude,
ISNULL(MODULO.Cantidad, 0) AS Cantidad_Dian,
ISNULL(PTESA.Cantidad, 0) AS Cantidad_Ptesa,
ISNULL(MODULO.Cantidad, 0) - ISNULL (PTESA.Cantidad, 0) AS Diferencia


FROM            (SELECT					YEAR(FechaEmision) AS Ano_Periodo, CodEmpresa, NombreEmpresa, NitEmisor, NombreEmisor, Prefijo, Folio, CufeCude, COUNT(*) AS Cantidad
                          FROM          dbo.ArchivoDian
                          WHERE			(YEAR(FechaEmision) = @Ano_Periodo) AND CodEmpresa = @Codigo_Empresa 
                          GROUP BY CodEmpresa, NombreEmpresa, NitEmisor, NombreEmisor, Prefijo, Folio, CufeCude, YEAR(FechaEmision)) AS MODULO 
						  
						    RIGHT JOIN


                             (SELECT        Ano_Periodo AS Ano_Periodo, CodEmpresa AS CodEmpresa, NombreEmpresa, ID, Emisor_ID, Emisor, UUID, COUNT(*) AS Cantidad
                               FROM			dbo.ArchivoPtesa_Saldos
                               WHERE		Ano_Periodo = @Ano_Periodo AND CodEmpresa = @Codigo_Empresa 
                               GROUP BY		CodEmpresa, NombreEmpresa, UUID, ID, Emisor_ID, Emisor, Ano_periodo) AS PTESA 

							   ON MODULO.Ano_Periodo = PTESA.Ano_Periodo 
							   AND MODULO.CodEmpresa = PTESA.CodEmpresa
							   AND MODULO.NitEmisor = PTESA.Emisor_ID
							   AND MODULO.NombreEmisor = PTESA.Emisor
							   AND MODULO.Prefijo = PTESA.ID
							   AND MODULO.CufeCude = PTESA.UUID 

END 

```
