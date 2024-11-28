# Table: GarantiaTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkGarantiaTipos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| Meses | smallint | YES |
| Kmts | int | YES |
| Deferencia | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| SistemaNR | bit | NO |
| FkTipoInternoGarantia | nvarchar | YES |
| FkTipoContabilizacionGarantia | nvarchar | YES |
| PeriodoValidezReclamacion | smallint | YES |
| PeriodoValidezAutorizaciones | smallint | YES |
| PeriodoMaximoCorrecciones | smallint | YES |
| PermitirReutilizarGarantia | bit | NO |
| ReclamarFabricante | bit | NO |
| AbonarConcesionario | bit | NO |
| AfectaProvision | bit | NO |
| ImporteAutorizacionConcesionario | decimal | YES |
| ImporteAutorizacionFabricante | decimal | YES |
| FkBasesCalculoDeferenciasMO | nvarchar | YES |
| FkBasesCalculoDeferenciasMAT | nvarchar | YES |
