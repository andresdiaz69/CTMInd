# Table: OfertasVOTasaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertasVO | smallint | NO |
| PkOfertasVOTasaciones_Iden | smallint | NO |
| FkTasacion | int | YES |
| Prever | bit | NO |
| ImporteFinal | decimal | NO |
| FechaTasacion | datetime | NO |
| Matricula | nvarchar | YES |
| Entregado | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
