# Table: SalidasDetWRK

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoSalidasAlbaran | nvarchar | NO |
| PkFkSeries_Salidas | nvarchar | NO |
| PkFkNumSalidasAlbaran | nvarchar | NO |
| PkSalidasDet_Iden | int | NO |
| FechaAlta | datetime | NO |
| FkAñoOT | nvarchar | YES |
| FkSeries_OT | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| DtoPorc | decimal | NO |
| Precio | decimal | NO |
| StockActual | decimal | YES |
| PrecioMedioActual | decimal | NO |
| Unidades | decimal | NO |
| FkUbicaciones | nvarchar | YES |
| GastosAdicionales | decimal | YES |
| LoginGuardadoAutomatico | smallint | NO |
| HostGuardadoAutomatico | nvarchar | NO |
| LoginPteConfirmar | smallint | YES |
| HostPteConfirmar | nvarchar | YES |
| FechaPteConfirmar | datetime | YES |
| Confirmar | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkClasificacion1 | nvarchar | NO |
| IncrementoPVP | decimal | YES |
| UndEnvaseVenta | decimal | NO |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | NO |
| FkRutasRecogida | int | YES |
| HostRecogida | nvarchar | YES |
| FechaRecogida | datetime | YES |
| FkEmpleados_Recogida | smallint | YES |
| UnidadesRecogida | decimal | YES |
| FkBultos | int | YES |
| FkEmpleados_Confirmacion | smallint | YES |
| FechaConfirmacion | datetime | YES |
| HostConfirmacion | nvarchar | YES |
| UnidadesAlbaran | decimal | YES |
| OperacionPrincipal | bit | NO |
| SuReferencia | nvarchar | YES |
| Descripcion | nvarchar | YES |
| FkRecambiosKits | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| PrecioMedioPorEmpresa | decimal | YES |
| FkCampañas | nvarchar | YES |
| FactorCambioPMContravalor | decimal | YES |
| Peso | decimal | YES |
| Sobretasa | decimal | YES |
| FkMarcas_Kit | smallint | YES |
| TallerKits | nvarchar | YES |
| FkUsuarios_Autorizacion | smallint | YES |
| BloqueadaPorCDN | bit | NO |
