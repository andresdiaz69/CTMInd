# View: vw_cMandos_InventarioVN

## Usa los objetos:
- [[spiga_InventarioVN]]

```sql
CREATE VIEW [dbo].[vw_cMandos_InventarioVN] AS
SELECT Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas CodigoEmpresa, IdCentros CodigoCentro, AñoExpediente, SerieExpediente, NumExpediente, 
	ComprasNumDet, VIN, Matricula, Comision, IdSecciones,FkCompraTipos, NombreEmpresa, NombreCentro, DescripcionSeccion, DescripcionTipoCompra, 
	DescripcionTipoCombustible, IdMarcas, IdGamas, CodModelo, ExtModelo, AñoModelo, NombreMarca, NombreGama, NombreModelo, AñoFactura, SerieFactura, 
	NumFactura, FechaFactura, IdCompraEstados, AñoAlbaran, SerieAlbaran, NumAlbaran, FechaAlbaran, DescripcionEstadoCompra, Color, Tapiceria, 
	UltimaUbicacionVN, UbicacionVNFechaInventario, BaseImponibleCompra, GastosAumentanStock, GastosNoAumentanStock, GastosPendientesAumentanStock, 
	GastosPendientesNoAumentanStock, TotalGastosContraValor, BaseImponibleCompraContraValor, DescripcionCompraEstados, DtoImporte, ImporteReclamado,
	PedidosSinAsignarAumentaStock, UsoDestino, IdVersiones, IdIncidenciaTipos, IdTercerosActividadIncidenciaTipos, IdActividadIncidenciaTipos, 
	IdActividadesDetIncidenciaTipos, IncidenciaTiposDescripcion, DescripcionVersion, IdCategoriaGamaTipos, NumeroMotor, NumHomologacion, Fecha, 
	NumDeclaracion, FechaLevante, NumLevante, 
    Observaciones_Compra,--isnull(PrecioListaAntesDeImpuestos,0) 
	PrecioListaAntesDeImpuestos = BaseImponibleCompra+GastosAumentanStock+GastosPendientesAumentanStock
FROM            PSCService_DB.dbo.spiga_InventarioVN 
--left join [dbo].[vw_VehiculosDisponibles_Spiga]
--ON IdGamas=FkGamas  and IdMarcas=FkMarcas  and CodModelo=FkCodModelo COLLATE greek_CI_AS and AñoModelo=FkAñoModelo COLLATE greek_CI_AS




```
