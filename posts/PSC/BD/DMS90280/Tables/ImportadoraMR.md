# Table: ImportadoraMR

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkImportadoras | int | NO |
| PkFkMR | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| CodImportadora | nvarchar | YES |
| PorcIncrementoPrecioCosto | decimal | YES |
| PorcFijoGarantia | decimal | YES |
| FechaMod | datetime | NO |
| SumarDtoReferenciaACampaña | bit | NO |
| CodigoDMS | nvarchar | YES |
| ExpresionRegular | nvarchar | YES |
| LecturaReferencia | nvarchar | NO |
| ObligatorioRelacionClasificacion2con1 | bit | NO |
| AutoCompletar | bit | NO |
| LongitudReferencias | smallint | YES |
| Relleno | nvarchar | YES |
| PosicionRelleno | nvarchar | YES |
| Principal | bit | NO |
| ClasificacionGarantia | nvarchar | YES |
| PedidoProvPorClasif | bit | NO |
| DtoVentaPorClasificacion1 | bit | NO |
| ActualizarCodDto | bit | NO |
| PedidoProvPorIdClasif | nvarchar | YES |
| EnvioNumAlbaranExistente | bit | NO |
| PropuestaPedidoAutomaticaGenerica | bit | NO |
| CampañaAcumulaDtoVenta | tinyint | NO |
| CampañaAcumulaDtoCompra | tinyint | NO |
| VigenciaCampañaCompraREPorFechaPedido | bit | NO |
| CodifAutoLotes | bit | NO |
| ControlBackOrder | bit | NO |
| TrabajaConLineaDeNegocio | bit | NO |
| PedidoProveedorPorVIN | bit | NO |
