# Table: CartasLiquidezVinculaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCartasLiquidez | int | NO |
| PkCartasLiquidezVinculaciones_Iden | smallint | NO |
| FkAñoAsiento_Factura | nvarchar | YES |
| FkAsientos_Factura | int | YES |
| FkCartasLiquidez_Compensacion | int | YES |
| Importe | decimal | NO |
| FkMonedas | smallint | NO |
| FactorCambio | decimal | NO |
| FkAñoAsiento_Vinculacion | nvarchar | YES |
| FkAsientos_Vinculacion | int | YES |
| FechaVinculacion | datetime | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
