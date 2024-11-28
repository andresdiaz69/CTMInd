# Stored Procedure: sp_SegmentacionClientes_FormasDePagoDeFacturas

## Usa los objetos:
- [[Centros]]
- [[Empresas]]
- [[spiga_FormasDePagoDeFacturas]]
- [[spiga_Terceros]]
- [[spiga_TercerosDirecciones]]

```sql


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_SegmentacionClientes_FormasDePagoDeFacturas]
	-- Add the parameters for the stored procedure here
	@FechaDesde AS DateTime,
	@FechaHasta AS DateTime
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


SELECT * FROM

(

SELECT *, 

IDPerfil_Factor1 + IDPerfil_Factor2 + IDPerfil_Factor3 + IDPerfil_Factor4 AS Calificacion

FROM

(

SELECT        
PAGOS.IdSincronizacionSpiga, 
PAGOS.IdConsecutivo, 
PAGOS.Ano_Periodo, 
PAGOS.Mes_Periodo, 

PAGOS.IdEmpresas,
PAGOS.NombreEmpresa,
PAGOS.SiglaEmpresa,
PAGOS.IdCentros,
PAGOS.NombreCentro,

PAGOS.IdTerceros, 
PAGOS.IdTercerosPagador,

TERCEROS.NifCif,
TERCEROS.Tercero,

PAGOS.NumeroFactura AS NumeroDocumento, 
PAGOS.FechaFactura AS FechaDocumento,
PAGOS.FechaCancelacion,
PAGOS.FormaPago,
PAGOS.Importe,

TERCEROS.FkNaturalezaJuridicaTipos, 
TERCEROS.FkActividadTipos,

DIRECCIONES.FkProvincias, 
DIRECCIONES.Provincia, 

                         CASE 
						 WHEN FkNaturalezaJuridicaTipos = 'SJ' THEN 1
						 WHEN FkNaturalezaJuridicaTipos = 'SN' THEN 2
						 WHEN RIGHT(Tercero, 3) = ' EU' THEN 2
						 WHEN RIGHT(Tercero, 4) = ' EU.' THEN 2
						 WHEN RIGHT(Tercero, 4) = ' E U' THEN 2
						 WHEN RIGHT(Tercero, 4) = ' E.U' THEN 2
						 WHEN RIGHT(Tercero, 5) = ' E.U.' THEN 2
						 WHEN RIGHT(Tercero, 5) = ' E. U' THEN 2
						 WHEN RIGHT(Tercero, 5) = ' E U.' THEN 2
						 WHEN RIGHT(Tercero, 6) = ' E. U.' THEN 2
						 WHEN FkNaturalezaJuridicaTipos = 'GB' THEN 3 
						 ELSE 1 END AS IDPerfil_Factor1, 

                         CASE 
						 WHEN FkProvincias IN (47, 23, 5, 76, 25, 11, 81) THEN 1 
						 WHEN FkProvincias IN (44, 8, 13, 27, 20, 54, 15, 73, 19, 52, 91, 88, 68, 50) THEN 2 
						 WHEN FkProvincias IN (17, 70, 85, 99, 95, 97, 94, 18, 86, 41) THEN 3 
						 ELSE 1 END AS IDPerfil_Factor2, 

                         CASE  
						 WHEN FkActividadTipos IN (5511, 5512, 6810, 6820, 710, 6910, 6920, 8291, 4511, 4512, 7710, 4530, 4541, 4111, 4112, 4210, 4220, 4290) THEN 2 
						 WHEN FkActividadTipos IN (6614, 6615,4775, 9200, 2520, 9312, 9319, 2421, 820, 6499, 4911, 4912, 4921, 4922, 4923, 4930, 5011, 5012, 5021, 5022, 5111, 5112, 5121, 5122, 722) THEN 3 
						 ELSE 1 END AS IDPerfil_Factor3,

						 CASE 
						 WHEN IdTerceros <> IdTercerosPagador THEN 3
						 ELSE 1 END AS IDPerfil_Factor4

                         

						 FROM            (SELECT        PkFkTerceros, MAX(FkProvincias) AS FkProvincias, MAX(Provincia) as Provincia
                          FROM            [PSCService_DB].dbo.spiga_TercerosDirecciones
						  GROUP BY PkFkTerceros) AS DIRECCIONES 
						  
						  RIGHT OUTER JOIN

                             (SELECT        NifCif, PkTerceros, MAX(ISNULL(Nombre,'') + ' ' + ISNULL(Apellido1,'') + ' ' + ISNULL(Apellido2,'')) AS Tercero, MAX(FkNaturalezaJuridicaTipos) as FkNaturalezaJuridicaTipos, MAX(FkActividadTipos) as FkActividadTipos
                               FROM            [PSCService_DB].dbo.spiga_Terceros
							   group by NifCif, PkTerceros) AS TERCEROS ON DIRECCIONES.PkFkTerceros = TERCEROS.PkTerceros 
							   
							   RIGHT OUTER JOIN

                             (SELECT        MAX(IdSincronizacionSpiga) as IdSincronizacionSpiga, MAX(IdConsecutivo) as IdConsecutivo , MAX(Ano_Periodo) as Ano_Periodo, MAX(Mes_Periodo) as Mes_Periodo, IdEmpresas, Empresas.NombreEmpresa, Empresas.SiglaEmpresa, IdCentros, Centros.NombreCentro, IdTerceros, IdTercerosPagador, NumeroFactura, FechaFactura, FechaCancelacion, MAX(FormaPago) AS FormaPago, SUM(Importe) As Importe
                               FROM           
							   
								[PSCService_DB].dbo.spiga_FormasDePagoDeFacturas 
								LEFT OUTER JOIN
								Centros ON [PSCService_DB].dbo.spiga_FormasDePagoDeFacturas.IdCentros = Centros.CodigoCentro 
								LEFT OUTER JOIN
								Empresas ON [PSCService_DB].dbo.spiga_FormasDePagoDeFacturas.IdEmpresas = Empresas.CodigoEmpresa
							   
							   WHERE NumeroFactura IS NOT NULL
							   GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, Empresas.NombreEmpresa, Empresas.SiglaEmpresa, IdCentros, Centros.NombreCentro, IdTerceros, IdTercerosPagador, NumeroFactura, FechaFactura, FechaCancelacion) AS PAGOS ON TERCEROS.PkTerceros = PAGOS.IdTerceros

							   where PAGOS.FechaCancelacion >= @FechaDesde AND PAGOS.FechaCancelacion <= @FechaHasta


) AS SEGMENTACION


) AS CALIFICACION

ORDER BY FechaCancelacion


END

```
