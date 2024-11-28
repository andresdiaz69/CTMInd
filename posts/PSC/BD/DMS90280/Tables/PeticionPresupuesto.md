# Table: PeticionPresupuesto

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkPeticionesPresupuesto_Iden | int | NO |
| FkAñoOT | nvarchar | YES |
| FkSeries_OT | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| FkCitas | int | YES |
| FkCitasDet | smallint | YES |
| FkSeries_Presupuesto | nvarchar | YES |
| FkNumPresupuesto | int | YES |
| FkAñoPresupuesto | nvarchar | YES |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| Descripcion | nvarchar | YES |
| Unidades | decimal | NO |
| Precio | decimal | YES |
| Dto | decimal | YES |
| Observaciones | nvarchar | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| FkUsuarios_Baja | smallint | YES |
| FkSeriesPresupuestoRE | nvarchar | YES |
| FkAñoPresupuestoRE | nvarchar | YES |
| FkNumPresupuestoRE | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpleados_Alta | smallint | YES |
