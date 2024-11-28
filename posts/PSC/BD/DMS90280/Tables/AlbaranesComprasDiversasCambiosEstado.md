# Table: AlbaranesComprasDiversasCambiosEstado

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkAñoAlbaranesComprasDiversas | nvarchar | NO |
| PkFkSeries_AlbaranesComprasDiversas | nvarchar | NO |
| PkFkAlbaranesComprasDiversas | nvarchar | NO |
| PkAlbaranesComprasDiversasCambiosEstado_Iden | int | NO |
| FechaAlta | datetime | NO |
| FkEmpleados_CambiosEstado | smallint | NO |
| Observaciones | nvarchar | YES |
| FkWFEntidades | smallint | NO |
| FkWFEstados | smallint | YES |
| FkWFEstados_Anterior | smallint | YES |
| FkWFMotivosRechazo | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
