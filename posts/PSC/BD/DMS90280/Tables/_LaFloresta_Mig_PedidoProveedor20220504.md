# Table: _LaFloresta_Mig_PedidoProveedor20220504

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkAñoPedidoProveedor | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkPedidoProveedor | int | NO |
| FkTerceros | int | NO |
| FkPedidoTipoCompras | smallint | NO |
| FkSecciones | int | NO |
| FkEmpleados | smallint | NO |
| NumPedidoProveedor | nvarchar | YES |
| FechaAlta | datetime | NO |
| FechaEstimadaRecepcion | datetime | YES |
| FechaEnvioMarca | datetime | YES |
| Observacion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkClasificacion | nvarchar | YES |
| FechaMod | datetime | NO |
| PedidoAprovisionamiento | bit | NO |
| ServirPorSeparado | bit | NO |
| FkWFEntidades | smallint | YES |
| FkWFEstados | smallint | YES |
| FKWFClasificaciones | nvarchar | YES |
| FkTerceroDirecciones_Envio | smallint | YES |
