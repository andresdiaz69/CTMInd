# Table: Tasaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkTasacion_Iden | int | NO |
| FechaAlta | datetime | NO |
| FkEmpleados_Tasador | smallint | NO |
| FkTerceros | int | YES |
| FkEmpleados_Vendedor | smallint | YES |
| Kms | int | YES |
| FechaProximaITV | datetime | YES |
| FechaUltimaITV | datetime | YES |
| ImporteSolicitado | decimal | NO |
| ImporteBaremado | decimal | NO |
| ImporteFinal | decimal | NO |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Matricula | nvarchar | NO |
| FkMarcas | smallint | NO |
| FkGamas | smallint | YES |
| FkCodModelo | nvarchar | YES |
| FkExtModelo | nvarchar | YES |
| FkAñoModelo | nvarchar | YES |
| Modelo | nvarchar | YES |
| Version | nvarchar | YES |
| Codificado | bit | NO |
| VIN | nvarchar | YES |
| FkVersiones | nvarchar | YES |
| FkAñoExpediente | nvarchar | YES |
| FkSeries_Expediente | nvarchar | YES |
| FkNumExpediente | int | YES |
| FkPresupuestosAcondicionamiento | smallint | YES |
| FechaMatriculacion | datetime | YES |
| FechaMod | datetime | NO |
| ObservacionDaños | nvarchar | YES |
| Daño1 | tinyint | NO |
| Daño2 | tinyint | NO |
| Daño3 | tinyint | NO |
| Daño4 | tinyint | NO |
| Daño5 | tinyint | NO |
| Daño6 | tinyint | NO |
| Daño7 | tinyint | NO |
| Daño8 | tinyint | NO |
| Daño9 | tinyint | NO |
| Daño10 | tinyint | NO |
| Daño11 | tinyint | NO |
| Daño12 | tinyint | NO |
| Daño13 | tinyint | NO |
| Daño14 | tinyint | NO |
| Daño15 | tinyint | NO |
| Daño16 | bit | NO |
| HorasUso | int | YES |
| SitioMatricula | nvarchar | YES |
| FechaSeguroObligatorio | datetime | YES |
| AFavorDe | nvarchar | YES |
| FechaInicioGarantia | datetime | YES |
| FechaProximaInspeccion | datetime | YES |
| Cilindrada | decimal | YES |
| FechaCompra | datetime | YES |
| FkCombustibleTipos | nvarchar | YES |