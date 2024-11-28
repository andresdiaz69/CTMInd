# Table: TraspasosDatosImportacionWRK

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoTraspaso | nvarchar | NO |
| PkFKSeries_Traspaso | nvarchar | NO |
| PkFkNumTraspaso | int | NO |
| PkTraspasosDatosImportacion_Iden | tinyint | NO |
| NumDeclaracion | nvarchar | YES |
| NumLevante | nvarchar | YES |
| FechaLevante | datetime | YES |
| FkTerceros_Intermediario | int | YES |
| FkTerceros_Aduana | int | YES |
| Aduana | nvarchar | YES |
| FkTerceros_CancelacionDerechos | int | YES |
| FechaDeclaracion | datetime | YES |
| Manifiesto | nvarchar | YES |
| NumDocumentoTransporte | nvarchar | YES |
| FechaDocumentoTransporte | datetime | YES |
| ImporteFOB | decimal | YES |
| ImporteFletes | decimal | YES |
| ImporteSeguros | decimal | YES |
| ImporteOtrosGastos | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkDeclaracionImportacionTipos | tinyint | YES |
| CodigoAduana | nvarchar | YES |
| NumDeclaracionCambio | nvarchar | YES |
| ImporteDeclaracionCambio | decimal | YES |
| CodigoAutoadhesivo | nvarchar | YES |
| ImporteIVA | decimal | YES |
| ImporteAranceles | decimal | YES |
| ImporteAduana | decimal | YES |
| NumDeclaracionCambio2 | nvarchar | YES |
| ImporteDeclaracionCambio2 | decimal | YES |
| CantidadSubpartidas | smallint | YES |
| DeclaracionPrincipal | bit | NO |
| TasaMonedaOrigen | decimal | YES |
| TasaMonedaIntermedia | decimal | YES |
| Descripcion | nvarchar | YES |
| Incoterm | nvarchar | YES |
