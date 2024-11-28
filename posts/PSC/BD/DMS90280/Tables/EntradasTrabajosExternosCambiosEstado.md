# Table: EntradasTrabajosExternosCambiosEstado

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoEntradaTrabajosExternos | nvarchar | NO |
| PkFkSeries_EntradasTrabajosExternos | nvarchar | NO |
| PkFkEntradasTrabajosExternos | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkPedidosTrabajosExternosCambiosEstado_Iden | int | NO |
| FechaAlta | datetime | NO |
| FkEmpleados_CambioEstado | smallint | NO |
| Observaciones | nvarchar | YES |
| FkWFEntidades | smallint | YES |
| FkWFEstados | smallint | YES |
| FkWFEstados_Anterior | smallint | YES |
| FkWFMotivosRechazo | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
