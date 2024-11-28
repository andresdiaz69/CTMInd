# Table: PresupuestosManoObrasProForma

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoFactura_Proforma | nvarchar | NO |
| PkFkSeries_FacturaProforma | nvarchar | NO |
| PkFkNumFactura_Proforma | nvarchar | NO |
| PkFkManoObraGrupos | nvarchar | NO |
| PkPresupuestosManoObrasProForma_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| FkVariante | nvarchar | YES |
| UT | int | NO |
| PorcDescuento | decimal | NO |
| PrecioHora | decimal | NO |
| FkManoObraTipos | smallint | YES |
| FkManoObraCodigos | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkMarcas_Kit | smallint | YES |
| TallerKits | nvarchar | YES |
