# Table: CartasLiquidez

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkCartasLiquidez_Iden | int | NO |
| NumCarta | nvarchar | NO |
| TipoCarta | nvarchar | NO |
| FechaCarta | datetime | NO |
| FechaAsiento | datetime | NO |
| FkTerceros | int | NO |
| Importe | decimal | NO |
| FkMonedas | smallint | NO |
| FactorCambio | decimal | NO |
| FkCentros | smallint | YES |
| FkPlantillas | nvarchar | YES |
| Observaciones | nvarchar | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
