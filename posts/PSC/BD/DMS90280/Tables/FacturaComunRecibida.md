# Table: FacturaComunRecibida

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkSeries | nvarchar | NO |
| PkNumFactura | nvarchar | NO |
| PkAñoFactura | nvarchar | NO |
| FkCentros | smallint | NO |
| FechaFactura | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkModulos | nvarchar | NO |
| TipoFactura | tinyint | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FechaAlta | datetime | NO |
| TotalBI | decimal | NO |
| TotalCuotaIVA | decimal | NO |
| TotalTasas | decimal | NO |
| TotalFactura | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FactorCambioMonedaContravalor | decimal | YES |
