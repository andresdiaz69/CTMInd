# Table: OfertaTasaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkOfertaTasaciones_Iden | smallint | NO |
| FkTasacion | int | YES |
| Prever | bit | NO |
| ImporteFinal | decimal | NO |
| FechaTasacion | datetime | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Matricula | nvarchar | YES |
| Entregado | bit | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
