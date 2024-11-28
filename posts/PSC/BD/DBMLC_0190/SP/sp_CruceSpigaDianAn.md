# Stored Procedure: sp_CruceSpigaDianAn

## Usa los objetos:
- [[ArchivoDian]]
- [[Spiga_Saldos]]

```sql
CREATE PROCEDURE [dbo].[sp_CruceSpigaDianAn]
@Ano_Periodo as int,
@Codigo_Empresa as smallint

AS
BEGIN

	SET NOCOUNT ON;

   
SELECT        

ISNULL(MODULO.Ano_Periodo, SPIGA.Ano_Periodo) AS Ano_Periodo, 
ISNULL(MODULO.TipoDocumento, '') AS TipoDocumento,
ISNULL(MODULO.Folio, SPIGA.Numero) AS Folio,
ISNULL(MODULO.Prefijo, SPIGA.Prefijo) AS Prefijo,
ISNULL(MODULO.FechaEmision, '') AS FechaEmision,
ISNULL(MODULO.FechaRecepcion, '') AS FechaRecepcion,
ISNULL(MODULO.CodEmpresa, SPIGA.CodEmpresa) AS CodEmpresa,
ISNULL(SPIGA.CodigoTercero, 0) AS Codigo,
ISNULL(MODULO.NitEmisor, SPIGA.Nit_Tercero) AS Nit_Tercero,
ISNULL(MODULO.NombreEmisor, SPIGA.NombreEmisor) AS NombreEmisor,
ISNULL(MODULO.NombreEmpresa, SPIGA.NombreEmpresa) AS NombreEmpresa,
ISNULL(MODULO.Iva, 0) AS IVA,
ISNULL(MODULO.Total, 0) AS Total,
ISNULL(MODULO.Cantidad, 0) AS Cantidad_Dian, 
ISNULL(SPIGA.Cantidad, 0) AS Cantidad_Spiga,
ISNULL(MODULO.Cantidad, 0) - ISNULL(SPIGA.Cantidad, 0) AS Diferencia

 

FROM            (SELECT					YEAR(FechaEmision) AS Ano_Periodo, CodEmpresa as CodEmpresa, NombreEmpresa AS NombreEmpresa, NombreEmisor AS NombreEmisor, Iva AS IVA, FechaEmision AS FechaEmision, FechaRecepcion AS FechaRecepcion, TipoDocumento AS TipoDocumento, Total AS Total, NitEmisor AS NitEmisor, Prefijo AS Prefijo, Folio AS Folio, COUNT(*) AS Cantidad
                          FROM          dbo.ArchivoDian
                          WHERE			(YEAR(FechaEmision) = @Ano_Periodo) AND CodEmpresa = @Codigo_Empresa AND Prefijo NOT LIKE 'RU%'
                          GROUP BY CodEmpresa, NombreEmpresa,  Total, NombreEmisor, TipoDocumento, Iva, FechaEmision, FechaRecepcion, NitEmisor, Prefijo, Folio,  YEAR(FechaEmision)) AS MODULO 
						  
						   FULL OUTER JOIN

                             (SELECT        Ano_Periodo AS Ano_Periodo, CodEmpresa AS CodEmpresa, NombreEmpresa as NombreEmpresa, Codigo AS CodigoTercero, NombreEmisor as NombreEmisor, Nit_Tercero AS Nit_Tercero, Prefijo AS Prefijo, Numero AS Numero, COUNT(*) AS Cantidad
                               FROM			dbo.Spiga_Saldos
                               WHERE		(Ano_Periodo = @Ano_Periodo) AND CodEmpresa = @Codigo_Empresa AND Prefijo NOT LIKE 'RU%'
                               GROUP BY		CodEmpresa, NombreEmpresa, Nit_Tercero, Codigo, NombreEmisor, Prefijo, Numero, Ano_Periodo) AS SPIGA 
							   
							   ON MODULO.Ano_Periodo = SPIGA.Ano_Periodo 
							   AND MODULO.CodEmpresa = SPIGA.CodEmpresa
							   --AND MODULO.NombreEmpresa = SPIGA.NombreEmpresa
							   AND MODULO.NitEmisor = SPIGA.Nit_Tercero
							   AND MODULO.Prefijo = SPIGA.Prefijo
							   AND MODULO.Folio = SPIGA.Numero
							   
END

```
