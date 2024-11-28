# Table: InmovilizadoDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| PkFkInmovilizado | nvarchar | NO |
| PkNumInmovilizadoDet_Iden | smallint | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FechaAmortizacion | datetime | NO |
| ValorAmortizado | decimal | NO |
| PorcAmortizacion | decimal | NO |
| ValorRevalorizado | decimal | NO |
| PorcAmortizacionRevalorizado | decimal | NO |
| FechaAlta | datetime | NO |
| CuotaAmortizacion | decimal | NO |
| CuotaRevalorizada | decimal | NO |
| AmortizacionInicial | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FactorCambioMonedaContravalor | decimal | YES |
