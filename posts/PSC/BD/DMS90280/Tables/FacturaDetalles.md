# Table: FacturaDetalles

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFacturaDetalles_Iden | int | NO |
| FkReferencias | nvarchar | YES |
| FkMR | nvarchar | YES |
| Descripcion | nvarchar | NO |
| Unidades | decimal | YES |
| PrecioUnidad | decimal | YES |
| PorcDto | decimal | YES |
| IvaPorc | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkNumAlbaran | nvarchar | NO |
| FkSeries_Albaran | nvarchar | NO |
| FkAñoAlbaran | nvarchar | NO |
| GastosAdicionales | decimal | NO |
| ImporteNeto | decimal | NO |
| FechaAlbaran | datetime | NO |
| FkSecciones | int | YES |
| FkUbicaciones | nvarchar | YES |
| FechaMod | datetime | NO |
| UnidadesMedida | nvarchar | YES |
| Pedido | nvarchar | YES |
| FkRecambiosKits | nvarchar | YES |
| DescripcionKit | nvarchar | YES |
| ImporteKit | decimal | YES |
| SuReferencia | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| CodigoBarras | nvarchar | YES |
| FkCampañas | nvarchar | YES |
| Sobretasa | decimal | YES |
| FkCentros_Campañas | smallint | YES |
| FkClasificacion1 | nvarchar | YES |
| FkTarifas | tinyint | YES |
| FkBultos | int | YES |
| FkCentros_RecambiosKits | smallint | YES |
