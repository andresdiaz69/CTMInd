# Stored Procedure: sp_CarteraGerencia

## Usa los objetos:
- [[Empresas]]
- [[spiga_Cartera]]
- [[vw_Centros_Marca]]
- [[vw_Terceros_Registro_Unico]]

```sql
CREATE PROCEDURE [dbo].[sp_CarteraGerencia] 
(
	@AnoPeriodo int, 
	@MesPeriodo int, 
	@FechaCartera DateTime
)
AS 
--DECLARE @AnoPeriodo int, @MesPeriodo int, @FechaCartera DateTime
--SET @AnoPeriodo = 2021
--SET @MesPeriodo = 2
--SET @FechaCartera = GETDATE()

BEGIN 

SET NOCOUNT ON
SET FMTONLY OFF
--MS: 060923 -- se remplaza la tabla de terceros LlamadaAgendamientoDatosTerceroFechaAlta por la vista vw_Terceros_registro_unico 

SELECT Ano_Periodo, Mes_Periodo, CodigoEmpresa, NombreEmpresa, CodigoMarca, NombreMarca, CodigoCentro, NombreCentro, Seccion, CodigoDepartamento, Departamento, IdTerceros, 
	   DocumentoTercero, NombreTercero, IdTerceros_Pagador, DocumentoTerceroPagador, NombreTerceroPagador, NumeroFactura, FechaFactura, FechaVencimiento, TotalFactura, 
	   ValorPendiente, FormaPago, DiaDesde, DiaHasta, DiasEnCartera, DiasEnMora, IdSituacionEfectos, DescripcionSituacionEfectos, FechaSaldado, FechaEntregaVN, FechaEntregaVO, 
	   VIN, Referencia, ReferenciaInterna, IdPaises, IdMonedaOrigen, DescripcionMoneda, FactorCambioMoneda, FactorCambioMonedaContravalor, LimiteCredito, ciudad, Edad, 
	   OrdenEdad, DatoAdicional, CodTipoInforme, CASE WHEN CodTipoInforme = 1 THEN 'Agrícola'
													  WHEN CodTipoInforme = 2 THEN 'Boutique'
													  WHEN CodTipoInforme = 3 THEN 'Construcción'
													  WHEN CodTipoInforme = 4 THEN 'Golf & Turf'
													  WHEN CodTipoInforme = 5 THEN 'Mesa de Repuestos'
													  WHEN CodTipoInforme = 6 THEN 'JD Usados'
													  WHEN CodTipoInforme = 7 THEN 'Wirtgen' 
													  ELSE 'Pendiente' END TipoInforme
 FROM (SELECT *, CASE WHEN CodTipo = 0 AND CodigoMarca = 410 THEN 1 
                      ELSE CodTipo END CodTipoInforme
	     FROM (SELECT *, CASE  WHEN CodigoMarca = 410 AND ((Seccion LIKE '%Agrícola%') OR (Seccion LIKE '%Agricola%')) THEN 1 --Agrícola 
						       WHEN CodigoMarca = 410 AND Seccion LIKE '%Boutique%' THEN 2 --Boutique 
						       WHEN CodigoMarca = 410 AND ((Seccion LIKE '%construcción%') OR (Seccion LIKE '%construccion%')) THEN 3 --Construcción 
						       WHEN CodigoMarca = 410 AND Seccion LIKE '%Golf%' THEN 4 --Golf & Turf 
						       WHEN CodigoMarca = 410 AND Seccion LIKE '%Mesa%' THEN 5 --Mesa de Repuestos 
						       WHEN CodigoMarca = 410 AND Seccion LIKE '% VO %' THEN 6 --JD Usados 
						       WHEN CodigoMarca = 410 AND Seccion LIKE '%Wirtgen%' THEN 7 --Wirtgen 
						       ELSE 0 END CodTipo			
		        FROM (SELECT db1.Ano_Periodo,db1.Mes_Periodo,db1.IdEmpresas AS CodigoEmpresa,db3.NombreEmpresa,db2.CodigoMarca,db2.NombreMarca,db2.CodigoCentro,db1.NombreCentro, 
				             db1.DescripcionSeccion AS Seccion,db1.Departamento AS CodigoDepartamento,db1.NombreDepartamento AS Departamento,db1.IdTerceros,DocumentoTercero=db1.NifCif, 
				             db1.NombreTercero,db1.IdTerceros_Pagador,DocumentoTerceroPagador=db4.NifCif,db4.NombreTerceroPagador,db1.Factura AS NumeroFactura,db1.FechaFactura,
				             db1.FechaVencimiento,db1.TotalFactura,db1.ImportePendiente AS ValorPendiente,db1.DescripcionPagoFormas AS FormaPago,db1.DiaDesde,db1.DiaHasta,
				             DiasEnCartera=DATEDIFF(DAY,db1.FechaFactura,@FechaCartera),DiasEnMora=DATEDIFF(DAY,db1.FechaVencimiento,@FechaCartera),db1.IdSituacionEfectos, 
				             db1.DescripcionSituacionEfectos,db1.FechaSaldado,db1.FechaEntregaVN,db1.FechaEntregaVO,db1.VIN,db1.Referencia,db1.ReferenciaInterna,db1.IdPaises,
				             db1.IdMonedaOrigen,db1.DescripcionMoneda,db1.FactorCambioMoneda,db1.FactorCambioMonedaContravalor,db1.LimiteCredito,db1.ciudad,
				             Edad=CAST(db1.DiaDesde AS NVARCHAR(5))+' - '+CAST(db1.DiaHasta AS NVARCHAR(5)), DatoAdicional='',
				             OrdenEdad = CASE db1.DiaDesde WHEN 0 THEN 1
												           WHEN 31 THEN 2
												           WHEN 91 THEN 3
												           WHEN 181 THEN 4
												           WHEN 361 THEN 5 ELSE 6 END

			           FROM PSCService_DB.[dbo].spiga_Cartera AS db1
			           LEFT JOIN (SELECT PkTerceros, NifCif, NombreTerceroPagador = Nombre + ' ' + Apellido1 + ' ' + Apellido2
							        FROM vw_Terceros_Registro_Unico			 
						         )AS db4 ON db1.IdTerceros_Pagador = db4.PkTerceros

			           LEFT JOIN Empresas db3 ON db1.IdEmpresas = db3.CodigoEmpresa

			           LEFT JOIN (SELECT DISTINCT 
								 (SELECT TOP(1) CodigoCentro FROM vw_Centros_Marca WHERE NombreCentro = a.NombreCentro )  CodigoCentro,
								 (SELECT TOP(1) NombreCentro FROM vw_Centros_Marca WHERE NombreCentro = a.NombreCentro)  NombreCentro,
								 (SELECT TOP(1) CodigoMarca FROM vw_Centros_Marca WHERE NombreCentro = a.NombreCentro)  CodigoMarca,
								 (SELECT TOP(1) Marca FROM vw_Centros_Marca WHERE NombreCentro = a.NombreCentro)  NombreMarca
							        FROM vw_Centros_Marca a
						         ) AS db2 ON db1.NombreCentro = db2.NombreCentro

			          WHERE db1.Ano_Periodo = @AnoPeriodo 
					    AND db1.Mes_Periodo = @MesPeriodo
		             ) A
	           ) A
        )A
END

```
