# Table: PresupuestosPinturasProForma

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoFactura_Proforma | nvarchar | NO |
| PkFkSeries_FacturaProforma | nvarchar | NO |
| PkFkNumFactura_Proforma | nvarchar | NO |
| PkPresupuestosPinturasProForma_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| Precio | decimal | NO |
| PorcDescuento | decimal | NO |
| Unidades | decimal | NO |
| FechaBaja | datetime | YES |
| FkPinturaCodigos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkMarcas_Kit | smallint | YES |
| TallerKits | nvarchar | YES |
