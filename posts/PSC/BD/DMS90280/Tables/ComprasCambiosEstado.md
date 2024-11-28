# Table: ComprasCambiosEstado

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkComprasNumDet | smallint | NO |
| PkComprasCambiosEstado_Iden | int | NO |
| FkEmpleados_CambioEstado | smallint | NO |
| FkWFEntidades | smallint | NO |
| FkWFEstados | smallint | NO |
| FkWFEstados_Anterior | smallint | NO |
| FkWFMotivosRechazo | smallint | YES |
| Observaciones | nvarchar | YES |
| FechaAlta | datetime | NO |
| AutorizadoAutomaticamente | bit | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
