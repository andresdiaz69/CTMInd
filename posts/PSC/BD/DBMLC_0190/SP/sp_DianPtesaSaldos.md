# Stored Procedure: sp_DianPtesaSaldos

## Usa los objetos:
- [[ArchivoDian]]
- [[DianPtesaSaldos]]

```sql


CREATE PROCEDURE [dbo].[sp_DianPtesaSaldos]
@Ano_Periodo as int,
@Codigo_Empresa as smallint

AS
BEGIN

	SET NOCOUNT ON;

   
SELECT ISNULL(DIAN.Ano_Periodo,			PTESA.Ano_Periodo)			AS Ano_Periodo, 
	   ISNULL(DIAN.Mes_Periodo,			PTESA.Mes_Periodo)			AS Mes_Periodo, 
	   ISNULL(DIAN.CodEmpresa,			PTESA.CodEmpresa)			AS CodEmpresa, 
	   ISNULL(DIAN.NombreEmpresa,		PTESA.NombreEmpresa)		AS NombreEmpresa,
	   ISNULL(DIAN.NitEmisor,			PTESA.Emisor_ID)			AS Nit,
	   ISNULL(DIAN.NombreEmisor,		PTESA.Emisor)				AS Emisor,
	   ISNULL(DIAN.Prefijo,				PTESA.ID)					AS Prefijo,
	   ISNULL(DIAN.Folio,				PTESA.ID)					AS Numero,
	   ISNULL(PTESA.Usuario,			'')							AS Usuario,														
	   ISNULL(PTESA.Fecha_Aceptacion,	'')							AS Fecha_Aceptacion,							
	   ISNULL(PTESA.Estado,				'')							AS Estado,								
	   ISNULL(PTESA.Unidad_de_Negocio,	'')							AS Unidad_de_Negocio,										
	   ISNULL(PTESA.Centro,				'')							AS Centro,								
	   ISNULL(DIAN.CufeCude,			PTESA.UUID)					AS CufeCude,
	   ISNULL(DIAN.Cantidad,			0)							AS Cantidad_Dian,
	   ISNULL(PTESA.Cantidad,			0)							AS Cantidad_Ptesa,
	   ISNULL(DIAN.Cantidad, 0) - ISNULL (PTESA.Cantidad, 0)		AS Diferencia
  FROM (SELECT YEAR(FechaEmision) AS Ano_Periodo,		MONTH(FechaEmision) AS Mes_Periodo,			CodEmpresa, 
			   NombreEmpresa,							NitEmisor,									NombreEmisor, 
			   Prefijo,									Folio,										CufeCude, 
			   COUNT(*) AS Cantidad
          FROM dbo.ArchivoDian
         WHERE (YEAR(FechaEmision)	= @Ano_Periodo) 
		   AND CodEmpresa			= @Codigo_Empresa 
         GROUP BY CodEmpresa,		NombreEmpresa,		NitEmisor,				NombreEmisor,		Prefijo, 
				  Folio,			CufeCude,			MONTH(FechaEmision),	
				  YEAR(FechaEmision)) AS DIAN 
		 RIGHT JOIN (SELECT Ano_Periodo AS Ano_Periodo,			Mes_periodo as Mes_Periodo,			Numero, 
							CodEmpresa	AS CodEmpresa,			NombreEmpresa,						ID, 
							Emisor_ID,							Emisor,								UUID, 
							Usuario,							Fecha_Aceptacion,					Estado,
							Unidad_de_Negocio,					Centro,
							COUNT(*) AS Cantidad
                       FROM	dbo.DianPtesaSaldos
                      WHERE Ano_Periodo		= @Ano_Periodo 
					    AND CodEmpresa		= @Codigo_Empresa 
                      GROUP BY CodEmpresa,		NombreEmpresa,		UUID,			ID,			Numero, 
							   Emisor_ID,		Emisor,				Ano_periodo,	Usuario,	Fecha_Aceptacion,
							   Estado,			Unidad_de_Negocio,	Centro,
							   Mes_periodo) AS PTESA ON DIAN.Ano_Periodo  = PTESA.Ano_Periodo 
													AND DIAN.CodEmpresa	  = PTESA.CodEmpresa
													AND DIAN.NitEmisor	  = PTESA.Emisor_ID
													AND DIAN.CufeCude	  = PTESA.UUID 

END 

```
