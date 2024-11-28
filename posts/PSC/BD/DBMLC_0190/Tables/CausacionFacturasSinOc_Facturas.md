# Table: CausacionFacturasSinOc_Facturas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdRegistroFactura | int | NO |
| Empresa | varchar | YES |
| Linea | varchar | YES |
| Centro | varchar | YES |
| Modulo | varchar | YES |
| Tercero | bigint | YES |
| TipoIdentificacionTercero | int | YES |
| NumeroIdentificacionTercero | bigint | YES |
| TipoDocumentoSolicitud | int | YES |
| Clasificacion | varchar | YES |
| PrefijoFactura | varchar | YES |
| NumeroFactura | varchar | YES |
| AnnioFactura | int | YES |
| FechaFactura | date | YES |
| PrefijoOc | varchar | YES |
| NumeroOc | int | YES |
| AnnioOc | int | YES |
| EmailUsuarioCreador | varchar | YES |
| Estado | varchar | YES |
| ObservacionBot | varchar | YES |
| FechaProceso | datetime | YES |
| FechaRegistro | datetime | YES |
| URLImagen_Evidencia | varchar | YES |
| DescripcionError | varchar | YES |
| Bot | varchar | YES |
