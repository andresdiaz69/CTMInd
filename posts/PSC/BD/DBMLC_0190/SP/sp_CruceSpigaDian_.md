# Stored Procedure: sp_CruceSpigaDian_

## Usa los objetos:
- [[ArchivoDian]]
- [[vw_CruceFacturas_UsuarioDocumentos]]
- [[vw_FacturasProveedores]]

```sql
CREATE PROCEDURE [dbo].[sp_CruceSpigaDian_]
@Ano_Periodo	as int,
@Mes_periodo	as int,
@Codigo_Empresa as smallint

AS
BEGIN

SET NOCOUNT ON;

SELECT sd.Ano_Periodo,			sd.Mes_Periodo,		  sd.TipoDocumento,	    sd.Folio,			sd.Prefijo,			 sd.Cufe,
	   sd.FechaEmision,			sd.FechaRecepcion,	  sd.CodEmpresa,		sd.Codigo,			sd.Nit_Tercero,		 sd.NombreEmisor,
	   sd.NombreEmpresa,		sd.IVA,				  sd.Total,			    sd.Cantidad_Dian,	sd.Cantidad_Spiga,	 sd.Diferencia,
	   sd.Notificacion_Ptesa,	ud.Email_Corporativo, ud.CedulaEmpleado
  FROM (SELECT ISNULL(MODULO.Ano_Periodo,		SPIGA.Ano_Periodo)		AS Ano_Periodo, 
			   ISNULL(MODULO.Mes_Periodo,		SPIGA.Mes_Periodo)		AS Mes_Periodo,
			   ISNULL(MODULO.TipoDocumento,		'')						AS TipoDocumento,
			   ISNULL(MODULO.Folio,				SPIGA.Numero)			AS Folio,
			   ISNULL(MODULO.Prefijo,			SPIGA.Serie)			AS Prefijo,
			   		 (MODULO.Cufe)										AS Cufe,
			   		 (MODULO.Fecha_Emision)								AS FechaEmision,
			   		 (MODULO.Fecha_Recepcion)							AS FechaRecepcion,
			   ISNULL(MODULO.CodEmpresa,		SPIGA.CodEmpresa)		AS CodEmpresa, 
			   ISNULL(SPIGA.CodigoTercero,		0)						AS Codigo,
			   ISNULL(MODULO.NitEmisor,			SPIGA.nit)				AS Nit_Tercero,
			   ISNULL(MODULO.NombreEmisor,		SPIGA.NombreEmisor)		AS NombreEmisor,
			   ISNULL(MODULO.NombreEmpresa,		SPIGA.NombreEmpresa)	AS NombreEmpresa,
			   ISNULL(MODULO.Iva,				0)						AS IVA,
			   ISNULL(MODULO.Total,				0)						AS Total,
			   ISNULL(MODULO.Cantidad,			0)						AS Cantidad_Dian, 
			   ISNULL(SPIGA.Cantidad,			0)						AS Cantidad_Spiga,
			   ISNULL(MODULO.Cantidad, 0) - ISNULL(SPIGA.Cantidad, 0)	AS Diferencia,
			   MODULO.Notificacion										AS Notificacion_Ptesa
          FROM (SELECT YEAR(FechaEmision) AS Ano_Periodo,			MONTH(FechaEmision) AS Mes_Periodo, 
					   NombreEmisor		  AS NombreEmisor,			Iva					AS IVA, 
					   FechaEmision		  AS Fecha_Emision,			FechaRecepcion		AS Fecha_Recepcion, 
					   TipoDocumento	  AS TipoDocumento,			Total				AS Total, 
					   CodEmpresa,									NombreEmpresa, 
					   NitEmisor,									Prefijo, 
					   Folio,										COUNT(*)			AS Cantidad,
					   CufeCude			  AS Cufe,					Notificacion
                  FROM dbo.ArchivoDian
				 WHERE (YEAR(FechaEmision)	= @Ano_Periodo)			 
				   AND (MONTH(FechaEmision)	= @Mes_periodo)			 
	        	   AND  CodEmpresa			= @Codigo_Empresa
	        	   AND  Prefijo				NOT LIKE 'RU%'	 
	        	   AND Total				> 0
              GROUP BY CodEmpresa,			NombreEmpresa,						Total,				NombreEmisor, 
					   TipoDocumento,		Iva,								FechaEmision,		FechaRecepcion, 
					   NitEmisor,			Prefijo,							Folio,				CufeCude,
					   Notificacion,
					   YEAR(FechaEmision),	MONTH(FechaEmision)) AS MODULO 
				  FULL OUTER JOIN (SELECT año			   AS Ano_Periodo,		mes	AS Mes_Periodo,					IdEmpresas	AS CodEmpresa, 
										  CodigoTercero	   AS CodigoTercero,	NombreEmpresa,						nombres		as NombreEmisor, 
										  nit,			    					Serie,								Numero, 
										  COUNT(*)		   AS Cantidad
									 FROM dbo.vw_FacturasProveedores
									WHERE (año		 = @Ano_Periodo)			
									  AND (mes		 = @Mes_periodo)			 
									  AND IdEmpresas = @Codigo_Empresa				
									  AND Serie		 NOT LIKE 'RU%'
								 GROUP BY IdEmpresas,		NombreEmpresa,	CodigoTercero,	nit, 
										  nombres,			Serie,			Numero,			año, 
										  mes) AS SPIGA ON MODULO.Ano_Periodo	= SPIGA.Ano_Periodo 
														AND MODULO.Mes_Periodo	= SPIGA.Mes_Periodo 
														AND MODULO.CodEmpresa	= SPIGA.CodEmpresa
 														AND MODULO.NitEmisor	= SPIGA.nit
														AND MODULO.Prefijo		= SPIGA.Serie
														AND MODULO.Folio		= SPIGA.Numero
		) sd LEFT JOIN vw_CruceFacturas_UsuarioDocumentos ud ON sd.Ano_Periodo = ud.Ano_Periodo 
														    AND sd.Mes_Periodo = ud.Mes_Periodo 
 															AND RTRIM(LTRIM(CONVERT(NVARCHAR, sd.Codigo) + sd.Prefijo + sd.Folio)) = RTRIM(LTRIM(CONVERT(NVARCHAR, ud.CodigoTercero) + ud.Serie + ud.Numero))

				
END

```
