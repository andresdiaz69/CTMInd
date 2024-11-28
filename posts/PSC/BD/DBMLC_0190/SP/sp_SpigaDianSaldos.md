# Stored Procedure: sp_SpigaDianSaldos

## Usa los objetos:
- [[ArchivoDian]]
- [[DianSpigaSaldos]]

```sql


CREATE PROCEDURE [dbo].[sp_SpigaDianSaldos]
@Ano_Periodo as int,
@Codigo_Empresa as smallint

AS
BEGIN

	SET NOCOUNT ON;

   
SELECT ISNULL(DIAN.Ano_Periodo,			SPIGA.Ano_Periodo)		AS Ano_Periodo, 
	   ISNULL(SPIGA.TipoDocumento,		DIAN.TipoDocumento)		AS TipoDocumento,
	   ISNULL(DIAN.Folio,				SPIGA.Folio)			AS Folio,
	   ISNULL(DIAN.Prefijo,				SPIGA.Prefijo)			AS Prefijo,
	   ISNULL(DIAN.CufeCude,			SPIGA.Cufe)				AS Cufe,
	   ISNULL(SPIGA.FechaEmision,		DIAN.FechaEmision)		AS FechaEmision,
	   ISNULL(SPIGA.FechaRecepcion,		DIAN.FechaRecepcion)	AS FechaRecepcion,
	   ISNULL(DIAN.CodEmpresa,			SPIGA.CodEmpresa)		AS CodEmpresa, 
	   ISNULL(SPIGA.Codigo,				0)						AS Codigo,
	   ISNULL(DIAN.NitEmisor,			SPIGA.NitEmisor)		AS Nit_Tercero,
	   ISNULL(DIAN.NombreEmisor,		SPIGA.NombreEmisor)		AS NombreEmisor,
	   ISNULL(DIAN.NombreEmpresa,		SPIGA.NombreEmpresa)	AS NombreEmpresa,
	   ISNULL(SPIGA.Iva,				DIAN.IVA)				AS IVA,
	   ISNULL(SPIGA.Total,				DIAN.Total)				AS Total,
	   DIAN.Notificacion										AS Notificacion,
	   ISNULL(DIAN.Cantidad,			0)						AS Cantidad_Dian, 
	   ISNULL(SPIGA.Cantidad,			0)						AS Cantidad_Spiga,
	   ISNULL(DIAN.Cantidad, 0) - ISNULL(SPIGA.Cantidad, 0)	AS Diferencia
  FROM (SELECT Ano_Periodo		AS Ano_Periodo,		CodEmpresa	  as CodEmpresa,		NombreEmpresa AS NombreEmpresa, 
			   NombreEmisor		AS NombreEmisor,	Iva			  AS IVA,				FechaEmision  AS FechaEmision, 
			   FechaRecepcion	AS FechaRecepcion,	TipoDocumento AS TipoDocumento,		Total		  AS Total, 
			   Nit_Tercero		AS NitEmisor,		Codigo		  AS Codigo,			Prefijo		  AS Prefijo, 
			   Numero			AS Folio,			COUNT(*)	  AS Cantidad,			Cufe
          FROM dbo.DianSpigaSaldos
         WHERE (Ano_Periodo = @Ano_Periodo) 
	       AND CodEmpresa   = @Codigo_Empresa 
		   AND Prefijo	  NOT LIKE 'RU%'
      GROUP BY CodEmpresa,		NombreEmpresa,		Nit_Tercero,		Codigo,			NombreEmisor, 
			   Prefijo,			Numero,				TipoDocumento,		Iva,			Total, 
			   FechaEmision,	FechaRecepcion,		Ano_Periodo,		Cufe) AS SPIGA
    LEFT JOIN (SELECT YEAR(FechaEmision) AS Ano_Periodo,			CodEmpresa	  as CodEmpresa,		NombreEmpresa AS NombreEmpresa, 
					  NombreEmisor		 AS NombreEmisor,		Iva			  AS IVA,				FechaEmision  AS FechaEmision, 
					  FechaRecepcion	 AS FechaRecepcion,		TipoDocumento AS TipoDocumento,		Total		  AS Total, 
					  NitEmisor			 AS NitEmisor,			Prefijo		  AS Prefijo,			Folio		  AS Folio, 
					  COUNT(*)			 AS Cantidad,			CufeCude,	  Notificacion
                 FROM dbo.ArchivoDian
                WHERE (YEAR(FechaEmision) = @Ano_Periodo) 
		          AND CodEmpresa			 = @Codigo_Empresa 
		 	      AND Prefijo			 NOT LIKE 'RU%' 
		 	      AND Total				 > 0
             GROUP BY CodEmpresa,		NombreEmpresa,		Total,				NombreEmisor,		TipoDocumento, 
					  Iva,				FechaEmision,		FechaRecepcion,		NitEmisor,			Prefijo, 
					  Folio,			YEAR(FechaEmision),	CufeCude,			Notificacion
					  ) AS DIAN ON SPIGA.Ano_Periodo	= DIAN.Ano_Periodo
																			 AND DIAN.CodEmpresa	= SPIGA.CodEmpresa
																			 AND DIAN.Prefijo		= SPIGA.Prefijo
																			 AND DIAN.Folio			= SPIGA.Folio				   
END

```
