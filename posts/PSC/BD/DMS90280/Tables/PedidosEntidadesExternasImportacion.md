# Table: PedidosEntidadesExternasImportacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPedidosEntidadesExternasImportacion_Iden | int | NO |
| FkPedidosEntidadesExternasEstados | smallint | NO |
| FkEntidadesCM | smallint | NO |
| IdEmpresas_Origen | smallint | NO |
| IdCentros_Origen | smallint | NO |
| IdTerceros_Origen | int | NO |
| IdTerceroDirecciones_Origen | smallint | NO |
| IdVehiculos_Origen | int | NO |
| IdPedidosEntidadesExternasExportacion_Origen | int | NO |
| IdInstalacion_Origen | nvarchar | YES |
| TipoClasificacion | nvarchar | YES |
| Serie | nvarchar | YES |
| Numero | int | YES |
| Año | nvarchar | YES |
| Descripcion | nvarchar | YES |
| Observaciones | nvarchar | YES |
| Importe | decimal | NO |
| FkEmpresas_Destino | smallint | NO |
| FkCentros_Destino | smallint | NO |
| NifCif_Destino | nvarchar | NO |
| Matricula | nvarchar | YES |
| VIN | nvarchar | YES |
| CodMarca | smallint | YES |
| CodGama | smallint | YES |
| CodModelo | nvarchar | YES |
| Modelo_Descripcion | nvarchar | YES |
| Color_Descripcion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| NombreEmpresa_Origen | nvarchar | NO |
| NombreCentro_Origen | nvarchar | NO |
| IdInstalacion_Destino | nvarchar | NO |
| Anulado | bit | NO |
| FkAñoOT | nvarchar | YES |
| FkSeries_OT | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| FechaRecepcion | datetime | YES |
| FechaProceso | datetime | YES |
| NifCif_Origen | nvarchar | NO |
| FkTerceros_ClienteCargo | int | YES |
| FkProcesos | int | YES |
