# Table: PresupuestosAcondicionamientoDetalle

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkPresupuestosAcondicionamiento_Iden | smallint | NO |
| PkNumPADet_Iden | smallint | NO |
| FkAcondicionamientoTipos | smallint | NO |
| FkTerceros | int | YES |
| Descripcion | nvarchar | NO |
| Importe | decimal | NO |
| FechaPrevista | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
