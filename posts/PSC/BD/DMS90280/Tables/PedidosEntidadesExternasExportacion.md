# Table: PedidosEntidadesExternasExportacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPedidosEntidadesExternasExportacion_Iden | int | NO |
| FkPedidosEntidadesExternasEstados | smallint | NO |
| FkEntidadesCM | smallint | NO |
| FkEmpresas_Origen | smallint | NO |
| FkCentros_Origen | smallint | NO |
| FkTerceros_Origen | int | NO |
| FkTerceroDirecciones_Origen | smallint | NO |
| FkVehiculos_Origen | int | NO |
| Serie | nvarchar | YES |
| Numero | int | YES |
| Año | nvarchar | YES |
| Descripcion | nvarchar | YES |
| Observaciones | nvarchar | YES |
| Importe | decimal | NO |
| IdInstalacion_Destino | nvarchar | YES |
| IdEmpresas_Destino | smallint | NO |
| IdCentros_Destino | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
