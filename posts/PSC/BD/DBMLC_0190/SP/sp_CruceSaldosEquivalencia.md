# Stored Procedure: sp_CruceSaldosEquivalencia

## Usa los objetos:
- [[DianSpiga_HistoricoSaldos]]
- [[DianSpiga_HistoricoSaldosEquivalencia]]
- [[SpigaDianSaldos]]

```sql


CREATE PROCEDURE [dbo].[sp_CruceSaldosEquivalencia]
@Ano_periodo int,
@Cod_Empresa int
AS
BEGIN

INSERT INTO DianSpiga_HistoricoSaldosEquivalencia
SELECT ISNULL(SPIGA.Ano_periodo,		SALDOS.Ano_periodo)			AS Ano_periodo,
       ISNULL(SPIGA.CodEmpresa,			SALDOS.CodEmpresa)			AS CodEmpresa,
	   ISNULL(SPIGA.TipoDocumento,		SALDOS.Tipo_Documento)		AS Tipo_Documento,
	   ISNULL(SPIGA.Numero,				SALDOS.Folio)				AS Folio,
	   ISNULL(SPIGA.Prefijo,			SALDOS.Prefijo)				AS Prefijo,
	   ISNULL(SPIGA.FechaEmision,		SALDOS.Fecha_Emision)		AS Fecha_Emision,
	   ISNULL(SPIGA.FechaRecepcion,		SALDOS.Fecha_Recepcion)		AS Fecha_Recepcion,
	   ISNULL(SPIGA.NombreEmpresa,      SALDOS.NombreEmpresa)		AS NombreEmpresa,
	   ISNULL(SPIGA.Codigo,				SALDOS.Codigo)				AS Codigo,
	   ISNULL(SPIGA.Nit_Tercero,		SALDOS.Nit_tercero)			AS Nit_Tercero,
	   ISNULL(SPIGA.NombreEmisor,		SALDOS.NombreEmisor)		AS NombreEmisor,
	   ISNULL(SPIGA.Iva,				SALDOS.IVA)					AS IVA,
	   ISNULL(SPIGA.Total,				SALDOS.Total)				AS Total,
	   ISNULL(SALDOS.PrefijoFolio_FacturaEquivalente,'')			AS PrefijoFolio_FacturaEquivalente

  FROM(SELECT Ano_periodo,		CodEmpresa,		   TipoDocumento,	  Numero, 
			  FechaEmision,		FechaRecepcion,    NombreEmpresa,	  Codigo, 
		      NombreEmisor,	    IVA,			      Total,			  
			  Prefijo,		    Nit_Tercero
         FROM SpigaDianSaldos
		WHERE Ano_periodo	= @Ano_periodo AND
		      CodEmpresa	= @Cod_Empresa ) AS SPIGA
        --ORDER BY CodEmpresa) AS SPIGA
		 INNER JOIN (
		    SELECT Ano_periodo,      CodEmpresa,         Tipo_Documento,    Folio,            Prefijo,
				   Fecha_Emision,	 Fecha_Recepcion,    NombreEmpresa,     Codigo,           
				   NombreEmisor,	 IVA,				 Total,			    PrefijoFolio_FacturaEquivalente,
				   Nit_tercero
			  FROM DianSpiga_HistoricoSaldos
			 WHERE Ano_periodo = @Ano_periodo AND
				   CodEmpresa  = @Cod_Empresa) AS SALDOS
		     --ORDER BY CodEmpresa) AS SALDOS
			    ON SPIGA.Ano_periodo = SALDOS.Ano_periodo AND
				   SPIGA.CodEmpresa  = SALDOS.CodEmpresa  AND
				   SPIGA.Nit_Tercero = SALDOS.Nit_tercerO AND
				   SPIGA.Numero      = SALDOS.Folio		  AND
				   SPIGA.Prefijo	 = SALDOS.Prefijo


TRUNCATE TABLE DianSpiga_HistoricoSaldos
 

END

```
