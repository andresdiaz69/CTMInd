# Table: PropuestaPedidoReferencias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkPropuestaPedido | int | NO |
| PkFkMR | nvarchar | NO |
| PkFkReferencias | nvarchar | NO |
| NoPedirNormal | bit | YES |
| FkClasificacion1 | nvarchar | YES |
| FkClasificacion2 | nvarchar | YES |
| FkClasificacion3 | nvarchar | YES |
| FkClasificacion4 | nvarchar | YES |
| FkClasificacion5 | nvarchar | YES |
| FkClasificacion6 | nvarchar | YES |
| PrecioCompra | decimal | YES |
| PrecioMedio | decimal | YES |
| ImporteGastos | decimal | YES |
| Demanda1 | decimal | YES |
| Demanda2 | decimal | YES |
| Demanda3 | decimal | YES |
| DemandaMedia | decimal | YES |
| Stock | decimal | YES |
| StockVirtual | decimal | YES |
| UndEnvaseCompra | decimal | YES |
| UndPdteRecibir | decimal | YES |
| UndSugerido | decimal | YES |
| UndRevisado | decimal | YES |
| Fecha | datetime | NO |
| FkEmpresas_PedidoProveedor | smallint | YES |
| FkCentros_PedidoProveedor | smallint | YES |
| FkAñoPedidoProveedor | nvarchar | YES |
| FkSeries | nvarchar | YES |
| FkPedidoProveedor | int | YES |
| FkPedidoTipoCompras | smallint | YES |
| FkEmpleados | smallint | YES |
| Observacion | nvarchar | YES |
| Estado | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| UndPdteServir | decimal | YES |
| UnidadesPtesConfSalidaSV | decimal | YES |
| UnidadesPtesConfEntradaSV | decimal | YES |
| UnidadesPtesConfTRSSV | decimal | YES |
| UnidadesPtesConfTRESV | decimal | YES |
| Calificada | bit | YES |
| FormaPedido | nvarchar | YES |
| CantidadMinima | decimal | YES |
| PlazoAprovisionamiento | decimal | YES |
| FkDescuentos | nvarchar | YES |
| FkReferencias_PorMenor | nvarchar | YES |
| UnidadesPorMenor | decimal | YES |
| FechaMod | datetime | NO |
| Descripcion | nvarchar | YES |
| NumLineasVentas | smallint | YES |
| FrecuenciaVentas | decimal | YES |
| FkPartidaArancelaria | nvarchar | YES |
