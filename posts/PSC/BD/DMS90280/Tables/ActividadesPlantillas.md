# Table: ActividadesPlantillas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkAplicacionEventos | smallint | NO |
| PkActividadesPlantillas_Iden | int | NO |
| Precarga | bit | NO |
| Nombre | nvarchar | NO |
| FkMensajesDestinatarios_Tercero | smallint | NO |
| FkMensajesDestinatarios_Empleado | smallint | NO |
| FkActividadesDetTipos | smallint | NO |
| FkActividadesEstados | smallint | NO |
| FkDepartamentos | nvarchar | YES |
| ObservacionPrevista | nvarchar | YES |
| PrimeraProgramacionTipo | tinyint | NO |
| PrimeraProgramacion_IntervaloUnidadTiempo | nvarchar | YES |
| PrimeraProgramacion_IntervaloCantidad | smallint | YES |
| ActividadPeriodica_IntervaloUnidadTiempo | nvarchar | YES |
| ActividadPeriodica_IntervaloCantidad | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMensajesFechas | smallint | NO |
| ActividadPeriodica_FechaOrigen | tinyint | YES |
| FkActividadesTipos | smallint | NO |
| FkActividadesTipos_ActividadPeriodica | smallint | YES |
| FkActividadesDetTipos_ActividadPeriodica | smallint | YES |
| ActividadPeriodica_ObservacionPrevista | nvarchar | YES |
| ActividadPeriodica_Repeticiones | smallint | YES |
| FkEmpleados | smallint | YES |
| Fechabaja | datetime | YES |
| FkGarantiaAdicionalTipos | nvarchar | YES |
| FkGarantiaAdicionalGrupos | nvarchar | YES |
| FkSeguroTipos | nvarchar | YES |
| AñosAntiguedadVehiculo | tinyint | YES |
| FkEquivalencias | smallint | YES |
| FkEquivalencias_ActividadPeriodica | smallint | YES |
| FkActividadesEstados_ActividadPeriodica | smallint | YES |
