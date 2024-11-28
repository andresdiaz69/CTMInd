# Table: Viaticos_EnvioArchivos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Id | int | NO |
| IdSolicitud | int | NO |
| ArchivoTesoreria | bit | YES |
| ArchivoAnticipo | bit | YES |
| ArchivoContabilizacion | bit | YES |
| ArchivoDescuento | bit | YES |
| ArchivoGastosViaje | bit | YES |
| FechaEnvTesoreria | datetime | YES |
| FechaEnvAnticipo | datetime | YES |
| FechaEnvLegalizacion | datetime | YES |
| FechaEnvNovedades | datetime | YES |
| ArchivoAceptaTerminosDsco | bit | YES |
| FechaAceptaTerminosDsco | datetime | YES |
| IdMailTesoreria | int | YES |
| IdMailAnticipo | int | YES |
| IdMailLegalizacion | int | YES |
| IdMailNovedades | int | YES |
| IdUsuario | int | YES |
| FechaCreacionUsuario | datetime | YES |
| FechaEnvDescuentoNomina | datetime | YES |
| IdMailDescNomina | int | YES |
| IdUsuarioModifica | int | YES |
| FechaModificaUsuario | datetime | YES |
