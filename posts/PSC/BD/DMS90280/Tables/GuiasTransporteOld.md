# Table: GuiasTransporteOld

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkUbicaVNO | nvarchar | NO |
| PkFkFechaExpedienteAlta | datetime | NO |
| FkUbicaVNO_Destino | nvarchar | NO |
| FkFechaExpedienteAlta_Destino | datetime | NO |
| FkSerieTipos | nvarchar | NO |
| FkSeries_Transporte | nvarchar | NO |
| FkNumTransporte | int | NO |
| CodTransporte | nvarchar | YES |
| FechaAlta | datetime | NO |
| FechaSalida | datetime | YES |
| FechaLlegada | datetime | YES |
| Transportista | nvarchar | YES |
| TransportistaMatricula | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| CodigoIdentificacion | nvarchar | YES |
| Perteneciente | nvarchar | YES |
| HashDocumento | nvarchar | YES |
| HashControl | nvarchar | YES |
| FechaEnvioHashDocumento | datetime | YES |
| FkVehiculos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FkEmpleados | smallint | YES |
| FkCentros_Destino | smallint | NO |
| MotivoTranslado | nvarchar | YES |
| Ruta | nvarchar | YES |
| DocumentoAduanero | nvarchar | YES |
| FkTerceros_Transportista | int | YES |
| PkGuiasTransporte_Iden | smallint | NO |
| FechaAnulacion | datetime | YES |
| Coste | decimal | YES |
| Peso | decimal | YES |
| Volumen | decimal | YES |
| CargoCompañia | bit | YES |
| FkTipoTransporte | nvarchar | YES |
