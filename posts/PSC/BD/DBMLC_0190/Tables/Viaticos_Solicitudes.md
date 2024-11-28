# Table: Viaticos_Solicitudes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Id | int | NO |
| CodigoEmpleado | bigint | NO |
| FechaSolicitud | datetime | NO |
| FechaSalidaViaje | datetime | NO |
| FechaResgresoViaje | datetime | NO |
| IdTipo | int | NO |
| IdTipoMotivo | int | NO |
| CiudadOrigen | int | NO |
| DptoOrigen | int | NO |
| CiudadDestino | int | NO |
| DptoDestino | int | NO |
| Motivo | varchar | NO |
| IdDesplazamiento | int | NO |
| Kilometros | numeric | YES |
| IdEstado | int | NO |
| FechaAprobado | datetime | YES |
| AprobacionParcial | bit | YES |
| ValorParcialAprobado | numeric | YES |
| ValorAprobadoAlimentacion | numeric | YES |
| ValorAprobadoLavanderia | numeric | YES |
| ValorAprobadoPeajes | numeric | YES |
| ArchivoEnviado | bit | YES |
| AceptaTerminos | bit | YES |
| IdUsuario | int | YES |
| FechaCreacionUsuario | datetime | YES |
| IdUsuarioModifica | int | YES |
| FechaModificaUsuario | datetime | YES |
