# Table: CartasLiquidezDesglose

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCartasLiquidez | int | NO |
| PkCartasLiquidezDesglose_Iden | smallint | NO |
| FkCentros | smallint | NO |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FkTarifas | tinyint | YES |
| FkVentaCanales | nvarchar | YES |
| FkMonedas | smallint | YES |
| Porcentaje | decimal | YES |
| Importe | decimal | NO |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkManoObraTipos | smallint | YES |
| FkCompraCanales | nvarchar | YES |
