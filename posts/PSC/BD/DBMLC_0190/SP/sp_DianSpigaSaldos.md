# Stored Procedure: sp_DianSpigaSaldos

## Usa los objetos:
- [[SpigaDianSaldos]]
- [[vw_FacturasProveedores]]

```sql


CREATE PROCEDURE [dbo].[sp_DianSpigaSaldos]
@Ano_Periodo as int,
@Codigo_Empresa as smallint

AS
BEGIN

	SET NOCOUNT ON;

   
SELECT        

ISNULL(DIAN.Ano_Periodo,			SPIGA.Ano_Periodo)		AS Ano_Periodo, 
ISNULL(DIAN.TipoDocumento,			'')						AS TipoDocumento,
ISNULL(DIAN.Folio,					SPIGA.Folio)			AS Folio,
ISNULL(DIAN.Prefijo,				SPIGA.Prefijo)			AS Prefijo,
ISNULL(DIAN.Cufe,					'')						AS Cufe,
ISNULL(DIAN.FechaEmision,			'')						AS FechaEmision,
ISNULL(DIAN.FechaRecepcion,			'')						AS FechaRecepcion,
ISNULL(DIAN.CodEmpresa,				SPIGA.CodEmpresa)		AS CodEmpresa,
ISNULL(SPIGA.CodigoTercero,			0)						AS Codigo,
ISNULL(DIAN.NitEmisor,				SPIGA.NitEmisor)		AS Nit_Tercero,
ISNULL(DIAN.NombreEmisor,			SPIGA.NombreEmisor)		AS NombreEmisor,
ISNULL(DIAN.NombreEmpresa,			SPIGA.NombreEmpresa)	AS NombreEmpresa,
ISNULL(DIAN.Iva,					0)						AS IVA,
ISNULL(DIAN.Total,					0)						AS Total,
ISNULL(DIAN.Cantidad,				0)						AS Cantidad_Dian, 
ISNULL(SPIGA.Cantidad,				0)						AS Cantidad_Spiga,
ISNULL(DIAN.Cantidad, 0) - ISNULL(SPIGA.Cantidad, 0)		AS Diferencia

FROM (SELECT año			AS Ano_Periodo,				IdEmpresas	AS CodEmpresa,			CodigoTercero	AS CodigoTercero, 
			 NombreEmpresa	AS NombreEmpresa,			nombres		AS NombreEmisor,		nit				AS NitEmisor, 
			 Serie			AS Prefijo,					Numero		AS Folio,				COUNT(*)		AS Cantidad
        FROM dbo.vw_FacturasProveedores
       WHERE (año		= @Ano_Periodo)		
	     AND IdEmpresas = @Codigo_Empresa	
		 AND Serie		NOT LIKE 'RU%'
    GROUP BY año,			IdEmpresas,		NombreEmpresa, 
			 CodigoTercero,	nombres,		nit, 
			 Serie,			Numero) AS SPIGA 
			RIGHT JOIN (SELECT Ano_Periodo		AS Ano_Periodo,		CodEmpresa		as CodEmpresa,			NombreEmpresa AS NombreEmpresa, 
							   NombreEmisor		AS NombreEmisor,	Iva				AS IVA,					FechaEmision  AS FechaEmision,						FechaRecepcion	AS FechaRecepcion,		TipoDocumento AS TipoDocumento, 
							   Total			AS Total,			Nit_Tercero		AS NitEmisor,			Prefijo		  AS Prefijo, 
							   Numero			AS Folio,			COUNT(*)		AS Cantidad,			Cufe
                          FROM dbo.SpigaDianSaldos
                         WHERE Ano_Periodo	= @Ano_Periodo		
						   AND CodEmpresa	= @Codigo_Empresa	
						   AND Prefijo		NOT LIKE 'RU%'
                      GROUP BY CodEmpresa,		NombreEmpresa,		Nit_Tercero, 
							   Codigo,			NombreEmisor,		Prefijo, 
							   Numero,			TipoDocumento,		Iva, 
							   Total,			FechaEmision,		FechaRecepcion, 
							   Cufe,			Ano_Periodo)	AS DIAN ON DIAN.Ano_Periodo = SPIGA.Ano_Periodo 
																	   AND DIAN.CodEmpresa	= SPIGA.CodEmpresa
																	   AND DIAN.NitEmisor	= SPIGA.NitEmisor
																	   AND DIAN.Prefijo		= SPIGA.Prefijo
																	   AND DIAN.Folio		= SPIGA.Folio							   
END

```
