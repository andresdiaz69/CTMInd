# Table: EntradasDetDevoluciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoEntradasAlbaran | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkFkSeries_Entradas | nvarchar | NO |
| PkFkNumEntradasAlbaran | nvarchar | NO |
| PkFkEntradasDet | int | NO |
| PkFkSeries_Devolucion | nvarchar | NO |
| PkFkNumDevolucion | int | NO |
| Unidades | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| CodTransporte_Obsoleto | nvarchar | YES |
| FechaAlta | datetime | YES |
| HashDocumento_Obsoleto | nvarchar | YES |
| HashControl_Obsoleto | nvarchar | YES |
| FechaEnvioHashDocumento_Obsoleto | datetime | YES |
| FkTerceros_Destinatario_Obsoleto | int | YES |
| Vehiculo_Obsoleto | nvarchar | YES |
| FechaInicioTransporte_Obsoleto | datetime | YES |
| FechaFinTransporte_Obsoleto | datetime | YES |
| FkTerceroDirecciones_DestinatarioEnvio_Obsoleto | smallint | YES |
| FkTerceros_Transportista_Obsoleto | int | YES |
| MotivoTraslado_Obsoleto | nvarchar | YES |
| Ruta_Obsoleto | nvarchar | YES |
| DocumentoAduanero_Obsoleto | nvarchar | YES |
| FkTerceros_Chofer_Obsoleto | int | YES |
| NumTransito_Obsoleto | nvarchar | YES |
| Perteneciente_Obsoleto | nvarchar | YES |
| FechaEnvioIncidencia | datetime | YES |
| FkIncidenciasTipos | nvarchar | YES |
| FkImportadoras_IncidenciasAccionesTipos | int | YES |
| FkMR_IncidenciasAccionesTipos | nvarchar | YES |
| FkIncidenciasAccionesTipos | nvarchar | YES |
