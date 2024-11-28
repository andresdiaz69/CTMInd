# Table: PresupuestosReferenciasProForma

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoFactura_Proforma | nvarchar | NO |
| PkFkSeries_FacturaProforma | nvarchar | NO |
| PkFkNumFactura_Proforma | nvarchar | NO |
| PkPresupuestosReferenciasProForma_Iden | smallint | NO |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| Descripcion | nvarchar | NO |
| Precio | decimal | NO |
| PorcDescuento | decimal | NO |
| Unidades | decimal | NO |
| FkManoObraTipos | smallint | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| PorcCompensacion | decimal | YES |
| FkMarcas_Kit | smallint | YES |
| TallerKits | nvarchar | YES |
| Sobretasa | decimal | YES |
