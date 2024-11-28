# Table: TraspasosBancarios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkTraspasosBancarios_Iden | int | NO |
| FkCentros | smallint | NO |
| FkCtaBancariaOrigen | smallint | NO |
| FkCtaBancariaDestino | smallint | NO |
| FkConceptosBancariosOrigen | nvarchar | YES |
| FkConceptosBancariosDestino | nvarchar | YES |
| Importe | decimal | NO |
| FechaTraspaso | datetime | NO |
| Observaciones | nvarchar | YES |
| FechaBaja | datetime | YES |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| ReferenciaInterna | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ImporteDestino | decimal | YES |
| FkMonedas_Origen | smallint | YES |
| FkMonedas_Destino | smallint | YES |
| FactorOrigenAInstalacion | decimal | YES |
