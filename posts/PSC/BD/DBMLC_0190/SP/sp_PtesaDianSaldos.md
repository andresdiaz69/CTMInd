# Stored Procedure: sp_PtesaDianSaldos

## Usa los objetos:
- [[ArchivoPtesa]]
- [[PtesaDianSaldos]]

```sql



CREATE PROCEDURE [dbo].[sp_PtesaDianSaldos]
@Ano_Periodo as int,
@Codigo_Empresa as smallint

AS
BEGIN

	SET NOCOUNT ON;

   
SELECT ISNULL(DIAN.Ano_Periodo,			PTESA.Ano_Periodo)		AS Ano_Periodo, 
	   ISNULL(DIAN.Mes_Periodo,			PTESA.Mes_Periodo)		AS Mes_Periodo, 
	   ISNULL(DIAN.CodEmpresa,			PTESA.CodEmpresa)		AS CodEmpresa, 
	   ISNULL(DIAN.NombreEmpresa,		PTESA.NombreEmpresa)	AS NombreEmpresa,
	   ISNULL(DIAN.Nit,					PTESA.Emisor_ID)		AS Nit,
	   ISNULL(DIAN.Emisor,				PTESA.Emisor)			AS Emisor,
	   ISNULL(DIAN.ID,					PTESA.ID)				AS Prefijo,
	   ISNULL(DIAN.Numero,				PTESA.ID)				AS Numero,
	   ISNULL(DIAN.Usuario,				'')						AS Usuario,														
	   ISNULL(DIAN.Fecha_Aceptacion,	'')						AS Fecha_Aceptacion,							
	   ISNULL(DIAN.Estado,				'')						AS Estado,								
	   ISNULL(DIAN.Unidad_de_Negocio,	'')						AS Unidad_de_Negocio,										
	   ISNULL(DIAN.Centro,				'')						AS Centro,	
	   ISNULL(DIAN.UUID,				PTESA.UUID)				AS CufeCude,
	   ISNULL(DIAN.Cantidad,			0)						AS Cantidad_Dian,
	   ISNULL(PTESA.Cantidad,			0)						AS Cantidad_Ptesa,
	   ISNULL(DIAN.Cantidad, 0) - ISNULL (PTESA.Cantidad, 0)	AS Diferencia
  FROM (SELECT YEAR(Emision) AS Ano_Periodo,		MONTH(Emision) AS Mes_Periodo,		CodEmpresa,			NombreEmpresa,
			   Emisor_ID,							Emisor,								ID,					UUID, 
			   COUNT(*)		 AS Cantidad
          FROM dbo.ArchivoPtesa
         WHERE (YEAR(Emision)	= @Ano_Periodo) 
		   AND CodEmpresa		= @Codigo_Empresa 
         GROUP BY CodEmpresa,		NombreEmpresa,		Emisor_ID, 
				  Emisor,			ID,					UUID, 
				  MONTH(Emision),	YEAR(Emision)) AS PTESA 
		 RIGHT JOIN (SELECT Ano_Periodo AS Ano_Periodo,		Mes_periodo as Mes_Periodo,		Numero, 
							CodEmpresa  AS CodEmpresa,		NombreEmpresa,					ID, 
							Emisor_ID	AS Nit,				Emisor,							UUID,
							Usuario,						Estado,							Fecha_Aceptacion,
							Unidad_de_Negocio,				Centro,
							COUNT(*) AS Cantidad
                       FROM	dbo.PtesaDianSaldos
                      WHERE	Ano_Periodo = @Ano_Periodo 
					    AND CodEmpresa	= @Codigo_Empresa 
                      GROUP BY CodEmpresa,			NombreEmpresa,		UUID,			ID,			Numero, 
							   Emisor_ID,			Emisor,				Ano_periodo,	Usuario,	Estado,							
							   Fecha_Aceptacion,	Unidad_de_Negocio,	Centro,
							   Mes_periodo) AS DIAN ON DIAN.Ano_Periodo = PTESA.Ano_Periodo 
							                       AND DIAN.CodEmpresa	= PTESA.CodEmpresa
							                       AND DIAN.Nit			= PTESA.Emisor_ID
							                       AND DIAN.UUID		= PTESA.UUID 

END 

```
