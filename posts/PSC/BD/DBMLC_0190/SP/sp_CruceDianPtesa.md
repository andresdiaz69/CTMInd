# Stored Procedure: sp_CruceDianPtesa

## Usa los objetos:
- [[ArchivoDian]]
- [[ArchivoPtesa]]
- [[vw_CruceFacturas_EmpleadosActivos]]

```sql


CREATE PROCEDURE [dbo].[sp_CruceDianPtesa]
@Ano_Periodo as int,
@Mes_periodo as int,
@Codigo_Empresa as smallint

AS
BEGIN

SET NOCOUNT ON;
   

SELECT cp.Ano_Periodo,		cp.Mes_Periodo,		cp.CodEmpresa,			cp.NombreEmpresa,			cp.Nit,				cp.Emisor,
	   cp.Prefijo,			cp.Numero,			cp.Usuario,				ea.Nombre_Unidad_Negocio,	ea.nombre_centro,	cp.Estado,	 
	   cp.Fecha_Aceptacion,	cp.CufeCude,		cp.Cantidad_Dian,		cp.Cantidad_Ptesa,			cp.Diferencia
  FROM (SELECT ISNULL(DIAN.Ano_Periodo,			PTESA.Ano_Periodo)		AS Ano_Periodo, 
	           ISNULL(DIAN.Mes_Periodo,			PTESA.Mes_Periodo)		AS Mes_Periodo, 
	           ISNULL(DIAN.CodEmpresa,			PTESA.CodEmpresa)		AS CodEmpresa, 
	           ISNULL(DIAN.NombreEmpresa,		PTESA.NombreEmpresa)	AS NombreEmpresa,
	           ISNULL(DIAN.NitEmisor,			PTESA.Emisor_ID)		AS Nit,
	           ISNULL(DIAN.NombreEmisor,		PTESA.Emisor)			AS Emisor,
	           ISNULL(DIAN.Prefijo,				PTESA.ID)				AS Prefijo,
			   ISNULL(PTESA.Usuario,            '')						AS Usuario,
			   ISNULL(PTESA.Estado,				'')						AS Estado,
			   ISNULL(PTESA.Fecha_Aceptacion,   '')						AS Fecha_Aceptacion,
	           ISNULL(DIAN.Folio,				PTESA.ID)				AS Numero,
	           ISNULL(DIAN.CufeCude,			PTESA.UUID)				AS CufeCude,
	           ISNULL(DIAN.Cantidad,			0)						AS Cantidad_Dian,
	           ISNULL(PTESA.Cantidad,			0)						AS Cantidad_Ptesa,
	           ISNULL(DIAN.Cantidad, 0) - ISNULL (PTESA.Cantidad, 0)	AS Diferencia
          FROM (SELECT YEAR(FechaEmision) AS Ano_Periodo,		MONTH(FechaEmision) AS Mes_Periodo,		CodEmpresa, 
					  NombreEmpresa,							NitEmisor,								NombreEmisor, 
					  Prefijo,									Folio,									CufeCude, 
					  COUNT(*) AS Cantidad
                  FROM dbo.ArchivoDian
                 WHERE (YEAR(FechaEmision)	= @Ano_Periodo) 
		           AND (MONTH(FechaEmision) = @Mes_periodo) 
		           AND CodEmpresa			= @Codigo_Empresa 
                 GROUP BY CodEmpresa,		NombreEmpresa,		NitEmisor,		NombreEmisor, 
						  Prefijo,			Folio,				CufeCude,		YEAR(FechaEmision), 
						  MONTH(FechaEmision)) AS DIAN   
				  FULL OUTER JOIN (SELECT YEAR(Emision) AS Ano_Periodo,		MONTH(Emision) AS Mes_Periodo,		CodEmpresa AS CodEmpresa, 
										  NombreEmpresa,					ID,									Emisor_ID, 
										  Emisor,							UUID,								COUNT(*) AS Cantidad,
										  Usuario,							Estado,								Fecha_Aceptacion
								     FROM dbo.ArchivoPtesa
								    WHERE (YEAR (Emision)	= @Ano_Periodo) 
								      AND (MONTH(Emision)	= @Mes_periodo) 
								      AND CodEmpresa		= @Codigo_Empresa 
								    GROUP BY CodEmpresa,		NombreEmpresa,		UUID,		ID, 
											 Emisor_ID,			Emisor,				Estado,		Usuario,
											 Fecha_Aceptacion,
											 Emision) AS PTESA ON DIAN.Ano_Periodo	= PTESA.Ano_Periodo 
															  AND DIAN.Mes_Periodo	= PTESA.Mes_Periodo 
															  AND DIAN.CodEmpresa	= PTESA.CodEmpresa
															  AND DIAN.NitEmisor	= PTESA.Emisor_ID
															  AND DIAN.NombreEmisor	= PTESA.Emisor
															  AND DIAN.CufeCude		= PTESA.UUID
		) cp LEFT JOIN vw_CruceFacturas_EmpleadosActivos ea ON REPLACE(RTRIM(LTRIM(cp.Usuario)), ' ', '')  = ea.NombreEmpleado 

END 

```
