# View: vw_cMandos_InventarioVO

## Usa los objetos:
- [[spiga_InventarioVO]]

```sql





CREATE VIEW [dbo].[vw_cMandos_InventarioVO]
AS
SELECT        IdSincronizacionSpiga, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas CodigoEmpresa, IdCentros CodigoCentro, AñoExpediente, SerieExpediente, NumExpediente, ComprasNumDet, FechaDepreciar, VIN, Matricula, IdSecciones, 
                         IdCompraTipos, IdRegistroTipos, FechaAsiento, IdCompraInternaTipos, DescripcionCompraInternaTipo, NombreEmpresa, NombreCentro, DescripcionSeccion, DescripcionTipoCompra, DescripcionTipoCombustible, 
                         TipoCompraInmovilizado, IdMarcas, IdGamas, CodModelo, ExtModelo, AñoModelo, NombreMarca, NombreGama, IdCompraEstados, NombreModelo, AñoFactura, SerieFactura, NumFactura, FechaFactura, 
                         DescripcionCompraEstados, UltimaUbicacionVN, UbicacionVNFechaInventario, Color, Tapiceria, BaseImponibleCompra, DepreciacionCompra, Compra576, Exentos, GastosAumentanStock, GastosNoAumentanStock, 
                         GastosPendientesAumentanStock, GastosPendientesNoAumentanStock, TotalGastosContraValor, ImporteCompraContraValor, PedidosSinAsignarAumentaStock, UsoDestino, ImporteTotalDepreciado, 
                         Observaciones_Compra
FROM           PSCService_DB.dbo.spiga_InventarioVO

```
