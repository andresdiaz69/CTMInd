# Stored Procedure: sp_CruceSpigaDianValores

## Usa los objetos:
- [[ArchivoDian]]
- [[vw_CruceFacturas_UsuarioDocumentos]]
- [[vw_spigaValorFacturasProveedores]]

```sql

---- PROCEDIMIENTOS ALMACENADOS ----

CREATE PROCEDURE [dbo].[sp_CruceSpigaDianValores]
@Ano_Periodo as int,
@Mes_periodo as int,
@Codigo_Empresa as smallint

AS


BEGIN

	SET NOCOUNT ON;

SELECT CV.Ano_Periodo,	 CV.Mes_Periodo,	 CV.CodEmpresa,		   CV.NombreEmpresa,		  CV.Codigo,					CV.Nit_Tercero, 
	   CV.NombreEmisor,	 CV.Folio,		     CV.Prefijo,		   CV.Cufe,					  CV.NitPrefijoNumeroDIAN,	    CV.NitPrefijoNumeroSpiga,
	   CV.IVA_DIAN,		 CV.IVA_Spiga,		 CV.Diferencia_IVA,    CV.Base_DIAN,			  CV.Base_Spiga,				CV.DiferenciaBase,
	   CV.Total_DIAN,	 CV.Total_Spiga,	 CV.Diferencia_Total,  us.CedulaEmpleado Cedula,  US.Nombre,					US.Nombre_Unidad_Negocio,
	   US.nombre_centro Nombre_Centro,		 US.Email_Corporativo
FROM(
      SELECT ISNULL(DIAN.Ano_Periodo,		SPIGA.Ano_Periodo)		  AS Ano_Periodo, 
	         ISNULL(DIAN.Mes_Periodo,		SPIGA.Mes_Periodo)		  AS Mes_Periodo,
	         ISNULL(DIAN.CodEmpresa,		SPIGA.CodEmpresa)		  AS CodEmpresa,
	         ISNULL(DIAN.NombreEmpresa,		SPIGA.NombreEmpresa)	  AS NombreEmpresa,
	         ISNULL(SPIGA.IdTerceros,		0)						  AS Codigo,
	         ISNULL(DIAN.NitEmisor,			SPIGA.Nit)				  AS Nit_Tercero,
	         ISNULL(DIAN.NombreEmisor,		SPIGA.NombreTercero)	  AS NombreEmisor,
	         ISNULL(DIAN.Prefijo,			SPIGA.Serie)			  AS Prefijo,
	         ISNULL(DIAN.Folio,				SPIGA.Numero)			  AS Folio,
	         DIAN.CufeCude											  AS Cufe,
	         DIAN.NitPrefijoNumeroDIAN								  AS NitPrefijoNumeroDIAN,
	         SPIGA.NitPrefijoNumeroSpiga							  AS NitPrefijoNumeroSpiga,
	         ISNULL(DIAN.Iva,				0)						  AS IVA_DIAN,
	         ISNULL(SPIGA.IVA,				0)						  AS IVA_Spiga,
	         (DIAN.Iva) -					(SPIGA.IVA)				  AS Diferencia_IVA,
	         ISNULL(DIAN.ValorBase,			0)						  AS Base_DIAN,
	         ISNULL(SPIGA.ValorBase,		0)						  AS Base_Spiga,
	         (DIAN.ValorBase) -				(SPIGA.ValorBase)		  AS DiferenciaBase,
	         ISNULL(DIAN.Total,				0)						  AS Total_DIAN,
	         ISNULL(SPIGA.ValorTotal,		0)						  AS Total_Spiga,
	         (DIAN.Total) -					(SPIGA.ValorTotal)		  AS Diferencia_Total

       FROM (SELECT YEAR(FechaEmision) Ano_Periodo,  MONTH(FechaEmision) Mes_Periodo,    CodEmpresa,
				    NombreEmpresa,					NombreEmisor NombreEmisor,			NitEmisor,
      				Prefijo,						Folio,								ValorBase = Total - Iva,
      				Iva IVA,						Total Total,						COUNT(*)Cantidad,
      				NitPrefijoNumeroDIAN = REPLACE(RTRIM(LTRIM(NitEmisor + Prefijo + Folio)),' ', ''),
      				CufeCude
               FROM dbo.ArchivoDian
      	      WHERE (YEAR(FechaEmision)	= @Ano_Periodo) 
      		    AND (MONTH(FechaEmision) = @Mes_periodo) 
      		    AND CodEmpresa			= @Codigo_Empresa 
      		    AND Prefijo NOT LIKE 'RU%' 
      		    AND Total > 0
              GROUP BY CodEmpresa,	NombreEmpresa,		Total, 
      				  NombreEmisor, TipoDocumento,		Iva, 
      				  FechaEmision, FechaRecepcion,		NitEmisor, 
      				  Prefijo,		Folio,				YEAR(FechaEmision), 
       				  MONTH(FechaEmision),				CufeCude
	          ) DIAN 
         FULL OUTER JOIN (SELECT Ano_Periodo,				Mes_Periodo,		IdEmpresas CodEmpresa, 
						  NombreEmpresa,					IdTerceros,			NombreTercero,	  
						  NifCif Nit,						Serie,				NumFactura Numero,		
						  ValorBase,						IVA,				ValorTotal,
						  COUNT(*) Cantidad,				NitPrefijoNumeroSpiga = REPLACE(RTRIM(LTRIM(NifCif + Serie + NumFactura)),' ', '')  
                     FROM dbo.vw_spigaValorFacturasProveedores
                    WHERE (Ano_Periodo = @Ano_Periodo) 
					  AND (Mes_Periodo = @Mes_periodo) 
					  AND IdEmpresas   = @Codigo_Empresa
					  AND Serie NOT LIKE 'RU%'
					  AND ValorBase > 0
                    GROUP BY IdEmpresas,	IdTerceros,		NombreEmpresa, 
							 NifCif,		NombreTercero,  Serie,			
							 NumFactura,	Ano_Periodo,	Mes_periodo,	
							 ValorBase,		IVA,			ValorTotal

				             ) SPIGA ON DIAN.Ano_Periodo		      = SPIGA.Ano_Periodo 
						            AND DIAN.Mes_Periodo		      = SPIGA.Mes_Periodo 
						            AND DIAN.CodEmpresa			  = SPIGA.CodEmpresa
						            AND DIAN.NitPrefijoNumeroDIAN	  = SPIGA.NitPrefijoNumeroSpiga
	 ) AS CV
LEFT JOIN vw_CruceFacturas_UsuarioDocumentos US ON CV.CodEmpresa = US.CodEmpresa
											   AND CV.Codigo	 = US.CodigoTercero
											   and CV.Prefijo	 = US.Serie
											   and CV.Folio      = US.Numero

END

```
