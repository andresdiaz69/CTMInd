# View: vw_alerta_ContabilidadMovimientos

## Usa los objetos:
- [[Empresas]]
- [[vw_spiga_ContabilidadMovimientos]]

```sql
CREATE VIEW [dbo].[vw_alerta_ContabilidadMovimientos]
AS
SELECT        dbo.vw_spiga_ContabilidadMovimientos.IdSincronizacionSpiga, dbo.vw_spiga_ContabilidadMovimientos.IdConsecutivo, 

					     YEAR(dbo.vw_spiga_ContabilidadMovimientos.FechaAsiento) AS Ano_Periodo, 
                         MONTH(dbo.vw_spiga_ContabilidadMovimientos.FechaAsiento) AS Mes_Periodo, 
						 
						 dbo.vw_spiga_ContabilidadMovimientos.FechaDeCorte, dbo.Empresas.CodigoEmpresa, dbo.Empresas.NombreEmpresa, 
                         dbo.Empresas.SiglaEmpresa, dbo.vw_spiga_ContabilidadMovimientos.Cuenta, dbo.vw_spiga_ContabilidadMovimientos.CodigoTercero, dbo.vw_spiga_ContabilidadMovimientos.FechaAsiento, 
                         dbo.vw_spiga_ContabilidadMovimientos.NumeroAsiento, dbo.vw_spiga_ContabilidadMovimientos.Factura, dbo.vw_spiga_ContabilidadMovimientos.FechaFactura, dbo.vw_spiga_ContabilidadMovimientos.TipoFactura, 
                         dbo.vw_spiga_ContabilidadMovimientos.ReferenciaInterna, 
						 
						 dbo.vw_spiga_ContabilidadMovimientos.Debe, 
						 dbo.vw_spiga_ContabilidadMovimientos.Haber,                          
						 dbo.vw_spiga_ContabilidadMovimientos.Debe - dbo.vw_spiga_ContabilidadMovimientos.Haber AS SaldoContabilidad, 
						 
						 dbo.vw_spiga_ContabilidadMovimientos.concepto AS Concepto, 
						 
						 dbo.vw_spiga_ContabilidadMovimientos.FacturaConciliacion, 
                         dbo.vw_spiga_ContabilidadMovimientos.ExpedienteConciliacion, 
						 
						 dbo.vw_spiga_ContabilidadMovimientos.Centro AS CodigoCentro, 
						 dbo.vw_spiga_ContabilidadMovimientos.NombreCentro, 
						 
						 dbo.vw_spiga_ContabilidadMovimientos.Seccion, 
                         dbo.vw_spiga_ContabilidadMovimientos.NombreSeccion, dbo.vw_spiga_ContabilidadMovimientos.Departamento, dbo.vw_spiga_ContabilidadMovimientos.NombreDepartamento, 
                         dbo.vw_spiga_ContabilidadMovimientos.IdCtaBancarias, dbo.vw_spiga_ContabilidadMovimientos.CuentaBancaria, dbo.vw_spiga_ContabilidadMovimientos.Marca, dbo.vw_spiga_ContabilidadMovimientos.NombreMarca, 
                         dbo.vw_spiga_ContabilidadMovimientos.centroAux, dbo.vw_spiga_ContabilidadMovimientos.NombreCentroAux, dbo.vw_spiga_ContabilidadMovimientos.SeccionAux, 
                         dbo.vw_spiga_ContabilidadMovimientos.NombreSeccionAux, dbo.vw_spiga_ContabilidadMovimientos.DepartamentoAux, dbo.vw_spiga_ContabilidadMovimientos.NombreDepartamentoAux
FROM            dbo.vw_spiga_ContabilidadMovimientos LEFT OUTER JOIN
                         dbo.Empresas ON dbo.vw_spiga_ContabilidadMovimientos.IdEmpresas = dbo.Empresas.CodigoEmpresa

```
