# Table: FacturaDetalleTasas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkFacturaDetalles | int | NO |
| PkFacturaDetalleTasas_Iden | int | NO |
| Descripcion | nvarchar | NO |
| Importe | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
