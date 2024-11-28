# Table: PresupuestosCambiosEstado

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoPresupuesto | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumPresupuesto | int | NO |
| PkPresupuestosCambiosEstado_Iden | int | NO |
| FechaAlta | datetime | NO |
| FkEmpleados_CambioEstado | smallint | YES |
| Observaciones | nvarchar | YES |
| FkWFEntidades | smallint | YES |
| FkWFEstados | smallint | YES |
| FkWFEstados_Anterior | smallint | YES |
| FkWFMotivosRechazo | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| AutorizadoAutomaticamente | bit | YES |
