# Table: PresupuestosSubcontratadosProForma

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoFactura_Proforma | nvarchar | NO |
| PkFkSeries_FacturaProforma | nvarchar | NO |
| PkFkNumFactura_Proforma | nvarchar | NO |
| PkPresupuestosSubcontratadosProForma_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| Precio | decimal | NO |
| PorcDescuento | decimal | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Unidades | decimal | YES |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
