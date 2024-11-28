# Table: UbicacionesExpedientes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkUbicaVNO | nvarchar | NO |
| PkFechaExpedienteAlta | datetime | NO |
| Observacion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaRecepcionReal | datetime | YES |
| FechaAltaRegistro | datetime | YES |
| FkUsuarios_Recepcion | smallint | YES |
| FkUsuarios_AltaRegistro | smallint | YES |
| FechaBaja | datetime | YES |
| FkAñoTransporte | nvarchar | YES |
| FkSeriesTransporte | nvarchar | YES |
| FkNumTransporte | int | YES |
| FkAñoPedidosServicios | nvarchar | YES |
| FkSeriePedidosServicios | nvarchar | YES |
| FkPedidosServicios | int | YES |
| FechaRecepcionPrevista | datetime | YES |
| FechaSalidaReal | datetime | YES |
| KmsInicio | int | YES |
| KmsFin | int | YES |
