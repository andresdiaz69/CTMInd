# Table: Leads

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkLeads_Iden | int | NO |
| FkOrigenesAplicacionesWebExternas | smallint | YES |
| Lead | nvarchar | YES |
| FkEmpleados | smallint | YES |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkTerceroClases | tinyint | YES |
| Nombre | nvarchar | YES |
| Apellido1 | nvarchar | YES |
| Apellido2 | nvarchar | YES |
| Telefono | nvarchar | YES |
| Email | nvarchar | YES |
| Observaciones | nvarchar | YES |
| IdLeadsEstados | tinyint | NO |
| FechaAlta | datetime | NO |
| FechaProceso | datetime | YES |
| FechaValidez | datetime | YES |
| FkTerceros | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Matricula | nvarchar | YES |
| FechaAsignacionTercero | datetime | YES |
| LeadVersion | nvarchar | YES |
| NifCif | nvarchar | YES |
| Telefono2 | nvarchar | YES |
| NombreCalle | nvarchar | YES |
| Numero | nvarchar | YES |
| Bloque | nvarchar | YES |
| Piso | nvarchar | YES |
| Puerta | nvarchar | YES |
| Complemento | nvarchar | YES |
| Complemento2 | nvarchar | YES |
| FkPaises | nvarchar | YES |
| CodigosPostales | nvarchar | YES |
| Poblacion | nvarchar | YES |
| Provincia | nvarchar | YES |
| Estado | nvarchar | YES |
| IdOrigen | nvarchar | YES |
| Tratamiento | nvarchar | YES |
| TipoDocumento | nvarchar | YES |
| TipoCalle | nvarchar | YES |
| FkDireccionTipos | tinyint | YES |
| FkEntradaTipos | nvarchar | YES |