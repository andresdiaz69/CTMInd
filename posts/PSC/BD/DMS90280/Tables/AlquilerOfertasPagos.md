# Table: AlquilerOfertasPagos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkAlquilerOfertas | smallint | NO |
| PkAlquilerOfertasPagos_Iden | smallint | NO |
| FkPagosTipos | smallint | NO |
| Descripcion | nvarchar | YES |
| Importe | decimal | NO |
| Fecha | datetime | NO |
| FkRecibos | int | YES |
| FkAñoFactura_CargoAdicional | nvarchar | YES |
| FkSeries_Factura_CargoAdicional | nvarchar | YES |
| FkNumFactura_CargoAdicional | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
