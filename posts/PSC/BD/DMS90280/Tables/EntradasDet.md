# Table: EntradasDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoEntradasAlbaran | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkFkSeries_Entradas | nvarchar | NO |
| PkFkNumEntradasAlbaran | nvarchar | NO |
| PkEntradasDet | int | NO |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| Unidades | decimal | NO |
| CodigoBulto | nvarchar | YES |
| DtoPorc | decimal | NO |
| GastosAdicionales | decimal | NO |
| FkUbicaciones | nvarchar | NO |
| FkPedidoTipoCompras | smallint | NO |
| Stock | decimal | NO |
| PrecioMedio | decimal | NO |
| PrecioCompra | decimal | NO |
| LoginGuardadoAutomatico | smallint | NO |
| HostGuardadoAutomatico | nvarchar | NO |
| FechaGuardadoAutomatico | datetime | NO |
| LoginPteConfirmar | smallint | YES |
| HostPteConfirmar | nvarchar | YES |
| FechaPteConfirmar | datetime | YES |
| LoginEntrada | smallint | NO |
| HostEntrada | nvarchar | NO |
| FechaAlta | datetime | NO |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkClasificacion1 | nvarchar | NO |
| FkEstadosCompras | nvarchar | YES |
| UndEnvaseCompra | decimal | NO |
| FkIncidenciasTipos | nvarchar | YES |
| CodRas | nvarchar | YES |
| FechaMod | datetime | NO |
| GastosAdicionalesAlbaran | decimal | YES |
| FkTarifas | tinyint | NO |
| FkVehiculos | int | YES |
| UnidadesDevolver | decimal | YES |
| HostRecepcion | nvarchar | YES |
| FechaRecepcion | datetime | YES |
| FkEmpleados_Recepcion | smallint | YES |
| UnidadesRecibidas | decimal | YES |
| HostUbicacion | nvarchar | YES |
| FechaUbicacion | datetime | YES |
| FkEmpleados_Ubicacion | smallint | YES |
| UnidadesAlbaran | decimal | YES |
| NumPedimento | nvarchar | YES |
| FechaEntrada | datetime | YES |
| Aduana | nvarchar | YES |
| FkPartidaArancelaria | nvarchar | YES |
| Item | int | YES |
| ValorDeclaracion | decimal | YES |
| FkPaises_Origen | nvarchar | YES |
| PrecioMedioPorEmpresa | decimal | YES |
| GastosAdicionalesAlbaranAlTraspasar | decimal | YES |
| CertificadoOrigen | bit | NO |
| FactorCambioPMContravalor | decimal | YES |
| FkLotes | int | YES |
| StockLote | decimal | YES |
| Sobretasa | decimal | YES |
| Observaciones | nvarchar | YES |
| FkEmpleados_Confirmacion | smallint | YES |
| Fecha_Confirmacion | datetime | YES |
| Host_Confirmacion | nvarchar | YES |