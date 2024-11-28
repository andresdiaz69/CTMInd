# Table: OfertasCupos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkOfertasCupos_Iden | tinyint | NO |
| FkCentros_Expediente | smallint | YES |
| FkSeries_Expediente | nvarchar | YES |
| FkNumExpediente | int | YES |
| FkAñoExpediente | nvarchar | YES |
| FkComprasNumDet | smallint | YES |
| Matricula | nvarchar | YES |
| FkServicioTipos | tinyint | NO |
| Importe | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
